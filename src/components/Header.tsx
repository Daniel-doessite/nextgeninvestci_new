"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, X, User, ShieldAlert, ToggleLeft, ToggleRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        "hover:bg-accent hover:text-accent-foreground px-4 py-2",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, isAdmin, isViewingAsAdmin, toggleAdminView, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-lg flex items-center gap-2" onClick={closeMobileMenu}>
          NextGen Invest
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/beginners">Débutants</NavLink>
          <NavLink href="/journal">Journal</NavLink>
          <NavLink href="/messages">Messages</NavLink>
          <NavLink href="/about">À propos</NavLink>
          <NavLink href="/subscription">Abonnements</NavLink>
          {isAdmin && (
            <NavLink href="/admin">
              <div className="flex items-center gap-1">
                <ShieldAlert className="h-4 w-4" />
                Admin
              </div>
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAdminView}
                  className="hidden md:flex items-center gap-1"
                >
                  {isViewingAsAdmin ? (
                    <>
                      <ToggleRight className="h-4 w-4" />
                      <span>Mode admin</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4" />
                      <span>Mode utilisateur</span>
                    </>
                  )}
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user?.avatar_url || ""} alt={user?.username} />
                <AvatarFallback>
                  {user?.username ? user.username.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">Profil</Link>
                  </DropdownMenuItem>
                  
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">Administration</Link>
                    </DropdownMenuItem>
                  )}
                  
                  {isAdmin && (
                    <DropdownMenuItem onClick={toggleAdminView}>
                      {isViewingAsAdmin ? "Passer en mode utilisateur" : "Passer en mode admin"}
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {isAdmin && (
                <Badge 
                  variant={isViewingAsAdmin ? "default" : "outline"} 
                  className="hidden md:flex"
                >
                  {isViewingAsAdmin ? "Admin" : "Utilisateur"}
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex gap-2 ml-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Inscription</Link>
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden container py-4 flex flex-col space-y-2">
          <NavLink href="/beginners" className="w-full" onClick={closeMobileMenu}>
            Débutants
          </NavLink>
          <NavLink href="/journal" className="w-full" onClick={closeMobileMenu}>
            Journal
          </NavLink>
          <NavLink href="/messages" className="w-full" onClick={closeMobileMenu}>
            Messages
          </NavLink>
          <NavLink href="/about" className="w-full" onClick={closeMobileMenu}>
            À propos
          </NavLink>
          <NavLink href="/subscription" className="w-full" onClick={closeMobileMenu}>
            Abonnements
          </NavLink>
          {isAdmin && (
            <NavLink href="/admin" className="w-full" onClick={closeMobileMenu}>
              <div className="flex items-center gap-1">
                <ShieldAlert className="h-4 w-4" />
                Administration
              </div>
            </NavLink>
          )}
          
          {isAuthenticated ? (
            <>
            <NavLink href="/profile" className="w-full" onClick={closeMobileMenu}>
              Profil
            </NavLink>
              {isAdmin && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAdminView}
                  className="flex items-center gap-1"
                >
                  {isViewingAsAdmin ? (
                    <>
                      <ToggleRight className="h-4 w-4" />
                      <span>Mode admin</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4" />
                      <span>Mode utilisateur</span>
                    </>
                  )}
                </Button>
              )}
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link href="/register">Inscription</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
