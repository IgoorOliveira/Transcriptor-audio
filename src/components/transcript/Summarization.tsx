import { FC, useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  ExternalLink,
  MessageSquare,
  X,
  Copy,
  Check,
  Search,
  Clock,
  Loader2,
  Wand2,
  FileText,
  RefreshCw,
} from "lucide-react";
import { useTranscriptionStore } from "@/store/transcriptionStore";
import { useConversationsStore } from "@/store/conversationStore";
import { useChatStore } from "@/store/chatStore";
import { api } from "@/lib/api";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Summarization: FC = () => {
  const {
    summary,
    transcript,
    isLoading,
    setSummary,
    activeTranscriptionId,
  } = useTranscriptionStore();

  const { getActiveConversation } = useConversationsStore();
  const { sendMessage, addSystemMessage } = useChatStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [copied, setCopied] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [enhancingTranscription, setEnhancingTranscription] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultText = "Não foi possível obter sumário";
  const fullTranscription =
    transcript?.map((segment) => segment.text).join("\n") ||
    "Transcrição não disponível";

  const filteredTranscript = transcript && filterText
    ? transcript.filter((segment) =>
        segment.text.toLowerCase().includes(filterText.toLowerCase())
      )
    : transcript;

  const activeConversation = getActiveConversation();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchSummary = async () => {
    if (!activeTranscriptionId || loadingSummary) return;

    try {
      setLoadingSummary(true);
      setErrorMessage(null);
      const response = await api.get(
        `/api/transcription/${activeTranscriptionId}/summary`
      );
      if (response.data?.summary) {
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error("Erro ao buscar resumo:", error);
      setErrorMessage("Falha ao gerar o resumo. Tente novamente.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const enhanceTranscription = async () => {
    if (!activeTranscriptionId || enhancingTranscription) return;

    try {
      setEnhancingTranscription(true);
      const response = await api.get(
        `/api/transcription/${activeTranscriptionId}/enhance`
      );
      
      if (response.data?.segments) {
        useTranscriptionStore.getState().setTranscript(response.data.segments);
        addSystemMessage("Transcrição aprimorada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao aprimorar transcrição:", error);
      addSystemMessage("Não foi possível aprimorar a transcrição. Tente novamente mais tarde.");
    } finally {
      setEnhancingTranscription(false);
    }
  };

  const exportToBraille = async () => {
    if (!activeTranscriptionId) return;
    
    try {
      window.open(`/api/transcription/${activeTranscriptionId}/braille`, '_blank');
    } catch (error) {
      console.error("Erro ao exportar para braille:", error);
      addSystemMessage("Não foi possível exportar para braille. Tente novamente mais tarde.");
    }
  };

  const sendToChat = (text: string) => {
    sendMessage(text);
    setIsOpen(false);
  };

  useEffect(() => {
    if (
      isOpen &&
      activeTab === "summary" &&
      !summary &&
      !loadingSummary &&
      activeTranscriptionId
    ) {
      fetchSummary();
    }
  }, [isOpen, activeTab, summary, loadingSummary, activeTranscriptionId]);

  useEffect(() => {
    setErrorMessage(null);
  }, [activeTranscriptionId]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(e.target.value);
  };

  const renderSummaryContent = () => {
    if (loadingSummary) {
      return (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm">Gerando resumo...</span>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="py-4 text-center">
          <p className="text-sm text-red-500 mb-2">{errorMessage}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchSummary}
            className="gap-2"
          >
            <RefreshCw size={14} />
            Tentar novamente
          </Button>
        </div>
      );
    }

    return (
      <p className="text-sm text-muted-foreground">
        {summary || defaultText}
      </p>
    );
  };

  const renderTranscriptPreview = () => {
    if (!transcript?.length) return null;

    return (
      <div className="mt-4 pt-4 border-t border-muted/20">
        <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
          <Clock size={14} /> Transcrição
        </h4>
        <div className="max-h-40 overflow-y-auto text-sm text-muted-foreground bg-muted/5 rounded p-2">
          {transcript.slice(0, 5).map((segment, index) => (
            <div key={index} className="mb-1 flex">
              <span className="text-muted-foreground/70 mr-2 min-w-[40px]">
                {segment.time || "--:--"}
              </span>
              <p>{segment.text}</p>
            </div>
          ))}
          {transcript.length > 5 && (
            <div className="text-sm text-primary mt-2 italic text-center border-t border-dashed border-muted/20 pt-2">
              ... e mais {transcript.length - 5} segmentos. Clique em
              expandir para ver tudo.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFullTranscript = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      );
    }

    if (!filteredTranscript?.length) {
      return (
        <p className="text-muted-foreground italic text-center py-4">
          {filterText
            ? `Nenhum resultado encontrado para "${filterText}"`
            : "Transcrição não disponível"}
        </p>
      );
    }

    return (
      <div className="space-y-2">
        {filteredTranscript.map((segment, index) => (
          <div
            key={index}
            className="flex hover:bg-muted/10 p-1 rounded group"
          >
            <span className="text-sm font-medium text-muted-foreground mr-3 min-w-[60px]">
              {segment.time || "--:--"}
            </span>
            <p className="text-sm flex-1">{segment.text}</p>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
              onClick={() => sendToChat(`Sobre "${segment.text}"`)}
            >
              <MessageSquare size={12} />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  const renderActionButtons = () => (
    <div className="flex justify-between">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={enhanceTranscription}
        disabled={enhancingTranscription || !activeTranscriptionId}
      >
        {enhancingTranscription ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Wand2 size={14} />
        )}
        Aprimorar transcrição
      </Button>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <FileText size={14} />
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={exportToBraille}>
              Exportar para Braille
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyToClipboard(fullTranscription)}>
              Copiar texto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => setIsOpen(true)}
        >
          <ExternalLink size={14} /> Expandir sumário
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="bg-muted/10 p-4 rounded-lg border border-muted/20">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium flex items-center gap-2">
            <MessageSquare size={16} /> Resumo Executivo
          </h3>
          {!summary && !loadingSummary && !errorMessage && activeTranscriptionId && (
            <Badge variant="outline" className="cursor-pointer" onClick={fetchSummary}>
              Gerar
            </Badge>
          )}
        </div>
        {renderSummaryContent()}
        {renderTranscriptPreview()}
      </div>

      {renderActionButtons()}

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-0 overflow-hidden flex flex-col"
        >
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle className="flex justify-between items-center">
              <span>Detalhes da Transcrição</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      activeTab === "summary"
                        ? summary || ""
                        : fullTranscription
                    )
                  }
                  className="h-8 w-8 p-0"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <X size={16} />
                  </Button>
                </SheetClose>
              </div>
            </SheetTitle>
          </SheetHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full flex-1 flex flex-col"
          >
            <div className="border-b">
              <TabsList className="w-full">
                <TabsTrigger value="summary" className="flex-1">
                  Resumo
                </TabsTrigger>
                <TabsTrigger value="transcript" className="flex-1">
                  Transcrição Completa
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="summary"
              className="flex-1 overflow-auto p-0 data-[state=active]:flex flex-col"
            >
              {loadingSummary ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                    <p>Gerando resumo executivo...</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Isso pode levar alguns segundos
                    </p>
                  </div>
                </div>
              ) : errorMessage ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <p className="text-red-500 mb-4">{errorMessage}</p>
                  <Button onClick={fetchSummary} className="gap-2">
                    <RefreshCw size={16} />
                    Tentar novamente
                  </Button>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none dark:prose-invert p-4 flex-1">
                  {summary || defaultText}
                  {summary && (
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => sendToChat("Elabore mais sobre os pontos deste resumo")}
                      >
                        <MessageSquare size={14} />
                        Perguntar sobre o resumo
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="transcript"
              className="flex-1 overflow-hidden flex flex-col mt-0 p-0 data-[state=active]:flex"
            >
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Filtrar transcrição..."
                    className="pl-8"
                    value={filterText}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                {renderFullTranscript()}
              </div>

              {transcript && transcript.length > 0 && (
                <div className="p-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full gap-2"
                    onClick={enhanceTranscription}
                    disabled={enhancingTranscription}
                  >
                    {enhancingTranscription ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Wand2 size={14} />
                    )}
                    Aprimorar transcrição
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
};