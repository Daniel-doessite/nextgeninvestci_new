import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, User, ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { askDomino } from "@/services/dominoService";

interface DominoMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: "user" | "domino";
}

interface DominoChatProps {
  currentUserId: string | undefined;
  formatDate: (dateString: string) => string;
  className?: string;
}

const DOMINO_AVATAR = "/images/domino-avatar.png";
const INITIAL_GREETING = "Bonjour ! Je suis Domino, ton assistant trading. Comment puis-je vous aider aujourd'hui ?";

const TRADING_SUGGESTIONS = [
  "Comment analyser un graphique ?",
  "Quels sont les indicateurs techniques les plus utiles ?",
  "Comment gérer mon risque ?",
  "Parlez-moi des stratégies de trading populaires",
  "Comment utiliser le journal de trading ?",
  "Quelles sont les meilleures heures pour trader sur le Forex ?"
];

const DominoChat = ({ currentUserId, formatDate, className }: DominoChatProps) => {
  const [messages, setMessages] = useState<DominoMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [trialEndsAt, setTrialEndsAt] = useState<Date | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Simuler la vérification d'un utilisateur premium
  useEffect(() => {
    // Dans une application réelle, cela viendrait de votre backend
    setIsPremium(false);
    
    // Définir la date de fin de l'essai (1 mois à partir de maintenant)
    const trialEnd = new Date();
    trialEnd.setMonth(trialEnd.getMonth() + 1);
    setTrialEndsAt(trialEnd);
    
    // Message initial de Domino
    if (currentUserId) {
      setMessages([
        {
          id: "initial",
          content: INITIAL_GREETING,
          timestamp: new Date(),
          sender: "domino"
        }
      ]);
    }
  }, [currentUserId]);
  
  // Scroll automatique vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    try {
      const response = await askDomino(userMessage);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: response,
          timestamp: new Date(),
          sender: "domino"
        }
      ]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de générer une réponse. Veuillez réessayer.",
      });
    } finally {
      setIsTyping(false);
    }
  };
  
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
    
    // Générer la réponse de Domino
    await generateResponse(newMessage);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };
  
  return (
    <Card className={className ? className + " flex flex-col" : "h-[calc(100vh-250px)] flex flex-col"}>
      <CardContent className="p-6 flex-1 flex flex-col h-full">
        <div className="flex items-center mb-4 pb-4 border-b">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={DOMINO_AVATAR} alt="Domino AI" />
            <AvatarFallback>
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Domino</h3>
              <Badge variant="outline" className="ml-2 flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
                <span className="text-xs">IA Trading</span>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Toujours disponible pour vous aider</p>
          </div>
        </div>
        
        {!isPremium && trialEndsAt && (
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-md p-3 mb-4">
            <p className="text-sm">
              <span className="font-medium">Mode essai</span> - Vous profitez de Domino gratuitement jusqu'au {formatDate(trialEndsAt.toISOString())}.
              <a href="/subscription" className="text-primary hover:underline ml-1">
                Passer à la version premium
              </a>
            </p>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto mb-4 h-full space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                {message.sender === "domino" && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={DOMINO_AVATAR} alt="Domino AI" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
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
                  <AvatarImage src={DOMINO_AVATAR} alt="Domino AI" />
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
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
        
        <div className="mt-2 mb-4">
          <div className="text-sm font-medium mb-2">Suggestions :</div>
          <div className="flex flex-wrap gap-2">
            {TRADING_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2 items-center">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez une question sur le trading..."
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

export default DominoChat; 