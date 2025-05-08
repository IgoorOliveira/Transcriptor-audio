import { FC } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useConversationsStore } from '../../store/conversationStore';
import { useChatStore } from '../../store/chatStore';
import { ChevronDown, Video, Mic } from 'lucide-react';

export const MobileSidebar: FC = () => {
  const { conversations, setActiveConversation } = useConversationsStore();
  const { addSystemMessage } = useChatStore();

  const handleSwitchConversation = (id: number) => {
    setActiveConversation(id);
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      addSystemMessage(`Transcrição "${conversation.title}" carregada. Como posso ajudar?`);
    }
  };

  const visibleConversations = conversations.slice(0, 3);
  const hiddenConversations = conversations.slice(3);

  return (
    <div className="md:hidden bg-muted/20 rounded-lg p-2 mb-6">
      <div className="flex items-center">
        <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {visibleConversations.map(conv => (
            <div 
              key={conv.id}
              onClick={() => handleSwitchConversation(conv.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer min-w-max transition-colors ${
                conv.active 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              {conv.type === "video" ? <Video size={14} /> : <Mic size={14} />}
              <span className="text-sm font-medium whitespace-nowrap">{conv.title}</span>
              <Badge variant="outline" className="bg-background/40 text-xs">
                {conv.date}
              </Badge>
            </div>
          ))}
        </div>

        {hiddenConversations.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2">
                <span className="mr-1">Mais</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Conversas anteriores</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hiddenConversations.map(conv => (
                <DropdownMenuItem 
                  key={conv.id} 
                  onClick={() => handleSwitchConversation(conv.id)}
                  className="flex justify-between"
                >
                  <div className="flex items-center gap-2">
                    {conv.type === "video" ? <Video size={14} /> : <Mic size={14} />}
                    <span>{conv.title}</span>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {conv.date}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
