
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessageItemProps {
  message: {
    id: string;
    content: string;
    created_at: string;
    sender_id: string;
    is_admin_message: boolean;
    sender_name: string;
  };
  currentUserId: string;
  formatDate: (dateString: string) => string;
}

const MessageItem = ({ message, currentUserId, formatDate }: MessageItemProps) => {
  const isOwnMessage = message.sender_id === currentUserId;

  return (
    <div 
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-2 max-w-[80%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback>{message.sender_name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div 
            className={`rounded-lg px-4 py-2 ${
              isOwnMessage 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            } ${
              message.is_admin_message ? 'border-l-4 border-amber-500' : ''
            }`}
          >
            <div className="flex justify-between items-center gap-4 mb-1">
              <span className="text-xs font-semibold">
                {isOwnMessage ? 'Vous' : message.sender_name}
                {message.is_admin_message && ' (Admin)'}
              </span>
              <span className="text-xs opacity-75">
                {formatDate(message.created_at)}
              </span>
            </div>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
