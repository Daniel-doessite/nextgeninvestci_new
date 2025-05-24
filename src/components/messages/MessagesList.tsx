
import { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import MessageItem from "./MessageItem";

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string | null;
  is_admin_message: boolean;
  sender_name: string;
  is_read: boolean;
}

interface MessagesListProps {
  messages: Message[];
  currentUserId: string | undefined;
  formatDate: (dateString: string) => string;
  initialLoading: boolean;
}

const MessagesList = ({ messages, currentUserId, formatDate, initialLoading }: MessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-muted-foreground mb-2">Aucun message</p>
        <p className="text-sm text-muted-foreground">
          Commencez à discuter avec l'équipe en envoyant un message ci-dessous.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem 
          key={message.id} 
          message={message} 
          currentUserId={currentUserId || ""} 
          formatDate={formatDate} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
