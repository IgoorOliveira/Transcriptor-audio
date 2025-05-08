import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Button } from './components/ui/button';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileSidebar } from './components/layout/MobileSidebar';
import { VideoPlayer } from './components/player/VideoPlayer';
import { PlayerControls } from './components/player/PlayerControls';
import { TranscriptionViewer } from './components/transcript/TranscriptionViewer';
import { ChatWindow } from './components/chat/ChatWindow';
import { useConversationsStore } from './store/conversationStore';
import { BookOpen, Sparkles, MessageSquare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './components/ui/tooltip';
import "./index.css";
import { BrailleExportButton } from './components/transcript/BrailleExportButton';

const App: FC = () => {
  const { sidebarOpen } = useConversationsStore();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Sidebar */}
            <MobileSidebar />

            <div className="flex flex-col lg:flex-row gap-6 w-full min-h-full">
              <Card className="flex-1 shadow-sm border-muted/20">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BookOpen size={18} />
                        Visualizador de Conteúdo
                      </CardTitle>
                      <CardDescription>Faça upload do seu vídeo e visualize a transcrição</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <BrailleExportButton />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Sparkles size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Melhorar com IA</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <VideoPlayer />
                  <PlayerControls />
                  <TranscriptionViewer />
                </CardContent>
              </Card>

              <Card className="w-full lg:max-w-md flex flex-col shadow-sm border-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare size={18} /> Assistente de IA
                  </CardTitle>
                  <CardDescription>Faça perguntas sobre o conteúdo do vídeo</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 p-4 overflow-hidden">
                  <ChatWindow />
                </CardContent>
                <CardFooter className="p-4 border-t border-muted/20">
                  <p className="text-xs text-muted-foreground text-center">
                    TranscribeAI Pro pode ocasionalmente gerar informações incorretas
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;