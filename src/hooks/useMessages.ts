import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  created_at: string | null;
  sender_id: string;
  receiver_id: string | null;
  is_admin_message: boolean | null;
  sender_name: string;
  is_read: boolean | null;
}

interface UserProfile {
  id: string;
  username: string;
}

export const useMessages = (user: UserProfile | null, isAuthenticated: boolean) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Load messages when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchMessages();
      
      // Set up real-time subscription for new messages
      const channel = supabase
        .channel('messages_changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `receiver_id=eq.${user.id}`
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages(prevMessages => [...prevMessages, newMessage]);
            
            // Show notification for new messages
            toast({
              title: "Nouveau message",
              description: `De: ${newMessage.sender_name}`,
            });
          }
        )
        .subscribe();
        
      // Cleanup subscription
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated, user]);

  const fetchMessages = async () => {
    if (!user) return;
    
    try {
      setInitialLoading(true);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id},receiver_id.is.null`)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      // Mark received messages as read
      const unreadMessageIds = data
        .filter(msg => msg.receiver_id === user.id && !msg.is_read)
        .map(msg => msg.id);
        
      if (unreadMessageIds.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', unreadMessageIds);
      }
      
      setMessages((data || []).map(msg => ({
        ...msg,
        created_at: msg.created_at ?? ""
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les messages",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    if (!user) return;
    if (!content.trim()) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('messages')
        .insert({
          content: content.trim(),
          sender_id: user.id,
          receiver_id: null, // null means it's sent to all admins
          is_admin_message: false,
          sender_name: user.username,
          is_read: false
        })
        .select();
        
      if (error) throw error;
      
      // Add the new message to the state
      if (data && data[0]) {
        setMessages([...messages, data[0]]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer le message",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    initialLoading,
    sendMessage,
  };
};
