import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import DominoChat from "./DominoChat";
import AdminContact from "./AdminContact";

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

interface MessageContainerProps {
  messages?: Message[];
  currentUserId: string | undefined;
  initialLoading?: boolean;
  loading?: boolean;
  formatDate: (dateString: string) => string;
  sendMessage?: (content: string) => Promise<void>;
}

const MessageContainer = ({
  messages = [],
  currentUserId,
  initialLoading = false,
  loading = false,
  formatDate,
  sendMessage = async () => {},
}: MessageContainerProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'admin' | 'domino' | 'support'>('all');

  const filteredMessages = activeTab === 'admin' 
    ? messages.filter(m => m.is_admin_message || m.receiver_id === null)
    : messages;

  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'admin' | 'domino' | 'support')}>
      <TabsList className="mb-4 grid grid-cols-4 max-w-lg mx-auto">
        <TabsTrigger value="all">Messages</TabsTrigger>
        <TabsTrigger value="domino">Domino AI</TabsTrigger>
        <TabsTrigger value="admin">Admins</TabsTrigger>
        <TabsTrigger value="support">Support</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <div className="flex justify-center">
          <Card className="w-full max-w-xl h-[300px] md:h-[300px] flex flex-col rounded-2xl shadow-xl border bg-background items-center justify-center">
            <CardContent className="flex flex-1 items-center justify-center h-full">
              <span className="text-muted-foreground text-lg font-semibold">En cours de développement</span>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="domino">
        <div className="flex justify-center">
          <DominoChat 
            currentUserId={currentUserId} 
            formatDate={formatDate} 
            className="w-full max-w-xl h-[500px] md:h-[600px] rounded-2xl shadow-xl border bg-background"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="admin">
        <div className="flex justify-center">
          <AdminContact 
            currentUserId={currentUserId} 
            formatDate={formatDate}
            className="w-full max-w-xl h-[500px] md:h-[600px] rounded-2xl shadow-xl border bg-background"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="support">
        <div className="flex justify-center">
          <div className="w-full max-w-xl h-[500px] md:h-[600px] rounded-2xl shadow-xl border bg-background flex items-center justify-center">
            <span className="text-muted-foreground">Support en développement</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MessageContainer;
