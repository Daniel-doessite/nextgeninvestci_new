import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, ArrowUp, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AdminMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: "user" | "admin";
  adminName?: string;
}

interface AdminContactProps {
  currentUserId: string | undefined;
  formatDate: (dateString: string) => string;
  className?: string;
}

const ADMIN_AVATARS = {
  "Daniel": "/images/admin-daniel.png",
  "Kagura": "/images/admin-kagura.png",
  "E-mubs": "/images/admin-emubs.png"
};

const ADMIN_INITIAL_MESSAGE = "Bonjour ! Les administrateurs ne sont pas connectés pour le moment. Ils vous répondront dès que possible. N'hésitez pas à laisser votre message.";

const AdminContact = ({ currentUserId, formatDate, className }: AdminContactProps) => {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<string>("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Message initial administrateur
    if (currentUserId) {
      setMessages([
        {
          id: "initial",
          content: ADMIN_INITIAL_MESSAGE,
          timestamp: new Date(),
          sender: "admin",
          adminName: "Système"
        }
      ]);
    }
  }, [currentUserId]);
  
  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessageObj = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      sender: "user" as const
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    setNewMessage("");
    
    // Simuler un message automatique
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Message automatique de réponse
    let adminName = "Système";
    let content = "Votre message a été reçu. Un administrateur vous répondra dès que possible.";
    
    if (selectedAdmin !== "all") {
      adminName = selectedAdmin;
      content = `Merci pour votre message. ${adminName} n'est pas disponible pour le moment, mais vous répondra dès que possible.`;
    }
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      sender: "admin",
      adminName
    }]);
    
    setIsTyping(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  if (!currentUserId) {
    return (
      <Card className="h-[calc(100vh-250px)] flex flex-col">
        <CardContent className="p-6 flex items-center justify-center h-full">
          <div className="text-center">
            <ShieldAlert className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Connectez-vous pour contacter un administrateur</h3>
            <p className="text-muted-foreground">
              Les administrateurs sont prêts à vous aider dès que vous serez connecté.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={className ? className + " flex flex-col" : "h-[calc(100vh-250px)] flex flex-col"}>
      <CardContent className="p-6 flex-1 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarFallback>
                <ShieldAlert className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">Administrateurs</h3>
              <p className="text-xs text-muted-foreground">Contactez l'équipe de gestion</p>
            </div>
          </div>
          
          <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choisir un admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les admins</SelectItem>
              <SelectItem value="Daniel">Daniel</SelectItem>
              <SelectItem value="Kagura">Kagura</SelectItem>
              <SelectItem value="E-mubs">E-mubs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 h-full space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                {message.sender === "admin" && (
                  <Avatar className="h-8 w-8 mr-2">
                    {message.adminName && ADMIN_AVATARS[message.adminName as keyof typeof ADMIN_AVATARS] ? (
                      <AvatarImage 
                        src={ADMIN_AVATARS[message.adminName as keyof typeof ADMIN_AVATARS]} 
                        alt={message.adminName} 
                      />
                    ) : (
                      <AvatarFallback>
                        <ShieldAlert className="h-4 w-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
                
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.sender === "admin" && message.adminName && (
                    <div className="mb-1">
                      <Badge variant="outline" className="text-xs font-normal">
                        {message.adminName}
                      </Badge>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-[10px] mt-1 opacity-70">
                    {formatDate(message.timestamp.toISOString())}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>
                    <ShieldAlert className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2 items-center">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message pour ${selectedAdmin === 'all' ? 'les administrateurs' : selectedAdmin}...`}
            disabled={isTyping}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isTyping || !newMessage.trim()}
            className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminContact; 