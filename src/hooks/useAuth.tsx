"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useRouter, usePathname } from "next/navigation";
import { Database, Profile, ProfileInsert, ProfileUpdate } from "@/types/database";

type UserProfile = Profile;

// Liste des administrateurs autorisés (pour test - en production, ce serait stocké en base de données)
// const ADMIN_IDS = ["daniel-admin-id", "kagura-admin-id", "emubs-admin-id", "test-user-id-123"];

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  isViewingAsAdmin: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, birthdate: string, isAdmin?: boolean, inviteCode?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
  toggleAdminView: () => void;
  generateAdminInviteLink: () => Promise<string>;
  getPendingAdminInvites: () => Promise<UserProfile[]>;
  approveAdminInvite: (userId: string) => Promise<void>;
  rejectAdminInvite: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isViewingAsAdmin, setIsViewingAsAdmin] = useState(false);
  const [pendingAdminInvites, setPendingAdminInvites] = useState<UserProfile[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  // Log pour suivre l'initialisation du AuthProvider
  console.log("AuthProvider initializing");

  useEffect(() => {
    // Check active session on mount
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Session found, updating user state");
          await updateUserState(session.user);
        } else {
          console.log("No active session found");
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setIsLoading(false);
        console.log("Session check complete");
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event);
        if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          await updateUserState(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAdmin(false);
          setIsViewingAsAdmin(false);
        }
      }
    );

    checkSession();

    // Clean up subscription on unmount
    return () => {
      console.log("AuthProvider unmounting, cleaning up subscription");
      subscription.unsubscribe();
    };
  }, []);

  // Helper to update user state with profile data
  const updateUserState = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) throw error;

      if (profile) {
        const typedProfile = profile as Profile;
        const userIsAdmin = typedProfile.role === 'admin' && typedProfile.is_approved;
        setIsAdmin(userIsAdmin);
        
        if (userIsAdmin && !isViewingAsAdmin) {
          setIsViewingAsAdmin(userIsAdmin);
        }

        setUser(typedProfile);
        
        if (userIsAdmin) {
          await fetchPendingAdminInvites();
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchPendingAdminInvites = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin')
        .eq('is_approved', false);
      
      if (error) throw error;
      
      if (data) {
        setPendingAdminInvites(data as Profile[]);
      }
    } catch (error) {
      console.error("Error fetching pending admin invites:", error);
    }
  };

  const toggleAdminView = () => {
    if (isAdmin) {
      setIsViewingAsAdmin(!isViewingAsAdmin);
      
      // Rediriger vers la page appropriée selon le rôle actif
      const path = !isViewingAsAdmin ? '/admin' : '/';
      console.log(`Toggling admin view, navigating to: ${path}`);
      router.push(path);
      
      toast({
        title: `Mode ${!isViewingAsAdmin ? 'administrateur' : 'utilisateur'} activé`,
        description: `Vous naviguez maintenant en tant qu'${!isViewingAsAdmin ? 'administrateur' : 'utilisateur'}.`,
      });
    }
  };

  const generateAdminInviteLink = async () => {
    if (!user || !isAdmin) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous devez être administrateur pour générer une invitation.",
      });
      return "";
    }
    
    try {
      // Générer un code unique (en production, stocker en base de données)
      const inviteCode = Math.random().toString(36).substring(2, 15);
      
      // Simuler l'enregistrement de l'invitation en base de données
      // En production, il faudrait une table invitations
      console.log(`Invitation d'administrateur générée: ${inviteCode}`);
      
      // Construire l'URL d'invitation
      const inviteUrl = `${window.location.origin}/register-admin?code=${inviteCode}&invited_by=${user.id}`;
      
      toast({
        title: "Invitation générée",
        description: "L'URL d'invitation a été générée avec succès.",
      });
      
      return inviteUrl;
    } catch (error) {
      console.error("Error generating admin invite:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de l'invitation.",
      });
      return "";
    }
  };

  const getPendingAdminInvites = async () => {
    if (!isAdmin) return [];
    return pendingAdminInvites;
  };

  const approveAdminInvite = async (userId: string) => {
    if (!user || !isAdmin) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous devez être administrateur pour approuver une invitation.",
      });
      return;
    }
    
    try {
      const updateData: ProfileUpdate = {
        role: 'admin',
        is_approved: true,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);
      
      if (error) throw error;
      
      setPendingAdminInvites(pendingAdminInvites.filter(invite => invite.id !== userId));
      
      toast({
        title: "Invitation approuvée",
        description: "L'utilisateur a été promu administrateur avec succès.",
      });
    } catch (error) {
      console.error("Error approving admin invite:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'approbation de l'invitation.",
      });
    }
  };

  const rejectAdminInvite = async (userId: string) => {
    if (!user || !isAdmin) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Vous devez être administrateur pour rejeter une invitation.",
      });
      return;
    }

    try {
      const updateData: ProfileUpdate = {
        role: 'user',
        invited_by: null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);
      
      if (error) throw error;
      
      setPendingAdminInvites(pendingAdminInvites.filter(invite => invite.id !== userId));
      
      toast({
        title: "Invitation rejetée",
        description: "L'invitation a été rejetée avec succès.",
      });
    } catch (error) {
      console.error("Error rejecting admin invite:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors du rejet de l'invitation.",
      });
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      console.log(`Tentative de connexion pour: ${identifier}`);
      
      // Check if identifier is an email
      const isEmail = identifier.includes('@');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: isEmail ? identifier : `${identifier}@example.com`,
        password: password,
      });

      if (error) throw error;

      if (data.user) {
        await updateUserState(data.user);
        
        const userIsAdmin = data.user.user_metadata?.role === 'admin';
        
        toast({
          title: "Connexion réussie",
          description: `Vous êtes maintenant connecté${userIsAdmin ? ' en tant qu\'administrateur' : ''}.`,
        });
        
        console.log("Navigation vers / après connexion réussie");
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message || "Une erreur s'est produite lors de la connexion.",
      });
    }
  };

  const register = async (email: string, username: string, password: string, birthdate: string, isAdmin = false, inviteCode = "") => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            birthdate,
            role: isAdmin ? 'admin' : 'user',
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        const now = new Date().toISOString();
        const profileData: ProfileInsert = {
          id: data.user.id,
          email,
          username,
          birthdate,
          role: isAdmin ? 'admin' : 'user',
          is_approved: !isAdmin,
          invited_by: inviteCode || null,
          is_premium: false,
          updated_at: now,
          gender: null,
          avatar_url: null
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData);

        if (profileError) throw profileError;

        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé avec succès. Veuillez vérifier votre email pour confirmer votre inscription.",
        });

        router.push("/login");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Une erreur s'est produite lors de l'inscription.",
      });
    }
  };

  const logout = async () => {
    try {
      console.log("Tentative de déconnexion");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setIsAdmin(false);
      setIsViewingAsAdmin(false);
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
      
      console.log("Navigation vers / après déconnexion");
      router.push("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur s'est produite lors de la déconnexion.",
      });
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      console.log("Mise à jour du profil utilisateur");
      if (!user) throw new Error("Vous devez être connecté pour modifier votre profil");
      
      if (data.email && data.email !== user.email) {
        const { error: updateAuthError } = await supabase.auth.updateUser({
          email: data.email,
        });
        
        if (updateAuthError) throw updateAuthError;
      }
      
      const updateData: ProfileUpdate = {
        username: data.username || user.username,
        birthdate: data.birthdate || user.birthdate,
        gender: data.gender || user.gender,
        updated_at: new Date().toISOString(),
      };

      const { error: updateProfileError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);
      
      if (updateProfileError) throw updateProfileError;
      
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
      
      console.log("Navigation vers / après mise à jour du profil");
      router.push('/');
      
      return Promise.resolve();
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de mise à jour",
        description: error.message || "Une erreur s'est produite lors de la mise à jour du profil.",
      });
      
      return Promise.reject(error);
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      console.log(`Envoi d'un email de vérification à ${email}`);
      // Dans une vraie application, utiliser Supabase pour envoyer un email de vérification
      // Ici simulation pour la démo
      
      // Simuler l'envoi d'un email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Email envoyé",
        description: `Un email de vérification a été envoyé à ${email}`,
      });
      
      return Promise.resolve();
    } catch (error: any) {
      console.error("Email verification error:", error);
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: error.message || "Une erreur s'est produite lors de l'envoi de l'email.",
      });
      
      return Promise.reject(error);
    }
  };

  const sendResetPasswordEmail = async (email: string) => {
    try {
      console.log(`Envoi d'un email de réinitialisation à ${email}`);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Un email de réinitialisation a été envoyé.",
      });
      
      return Promise.resolve();
    } catch (error: any) {
      console.error("Password reset email error:", error);
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: error.message || "Une erreur s'est produite lors de l'envoi de l'email.",
      });
      
      return Promise.reject(error);
    }
  };

  const resetPassword = async (newPassword: string) => {
    try {
      console.log("Réinitialisation du mot de passe");
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) throw error;
      
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      });
      
      return Promise.resolve();
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de réinitialisation",
        description: error.message || "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
      });
      
      return Promise.reject(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAdmin,
        isViewingAsAdmin,
        login,
        register,
        logout,
        updateProfile,
        sendVerificationEmail,
        sendResetPasswordEmail,
        resetPassword,
        toggleAdminView,
        generateAdminInviteLink,
        getPendingAdminInvites,
        approveAdminInvite,
        rejectAdminInvite
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Corriger l'export pour le rendre compatible avec Fast Refresh
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
