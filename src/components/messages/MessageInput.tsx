import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  placeholder?: string;
}

const MessageInput = ({ onSendMessage, isLoading, placeholder = "Écrivez votre message..." }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    setMessage("");
    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={isLoading || message.trim() === ""}
        onClick={handleSendMessage} 
      >
        {isLoading ? <span className="animate-spin">⏳</span> : "Envoyer"}
      </Button>
    </div>
  );
};

export default MessageInput;
