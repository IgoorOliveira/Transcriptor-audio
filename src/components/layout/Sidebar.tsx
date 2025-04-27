import { FC, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useConversationsStore } from '../../store/conversationStore';
import { useChatStore } from '../../store/chatStore';
import { Home, FileText, Settings, Plus, Video, Mic } from 'lucide-react';

export const Sidebar: FC = () => {
  const { 
    conversations, 
    createConversation, 
    setActiveConversation, 
    loadConversations 
  } = useConversationsStore();
  const { addSystemMessage } = useChatStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        await loadConversations();
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [loadConversations]);

  const handleCreateConversation = () => {
    createConversation();
    addSystemMessage("Olá! Como posso te ajudar com esta nova transcrição?");
  };

  const handleSwitchConversation = (id: number) => {
    setActiveConversation(id);
  };

  return (
    <aside className="w-64 border-r border-muted/20 bg-background flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        <div className="p-4">
          <Button 
            variant="default" 
            className="w-full gap-2" 
            onClick={handleCreateConversation}
          >
            <Plus size={16} /> Nova Transcrição
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          <h3 className="px-4 py-2 text-sm font-medium text-muted-foreground">Histórico Recente</h3>
          <div className="space-y-1">
            {loading ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">Carregando histórico...</div>
            ) : conversations.length > 0 ? (
              conversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => handleSwitchConversation(conv.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    conv.active 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex-shrink-0">
                    {conv.type === "video" ? (
                      <Video size={16} className="text-muted-foreground" />
                    ) : (
                      <Mic size={16} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{conv.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{conv.date}</span>
                      {conv.progress < 100 && (
                        <span className="text-xs text-muted-foreground">{conv.progress}%</span>
                      )}
                    </div>
                    {conv.progress < 100 && (
                      <Progress value={conv.progress} className="h-1 mt-1" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">Nenhum histórico encontrado</div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-muted/20">
          <nav className="space-y-1">
            <a key="home" href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted/50">
              <Home size={16} /> Início
            </a>
            <a key="docs" href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted/50">
              <FileText size={16} /> Documentação
            </a>
            <a key="settings" href="#" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted/50">
              <Settings size={16} /> Configurações
            </a>
          </nav>
        </div>  
      </div>
    </aside>
  );
};