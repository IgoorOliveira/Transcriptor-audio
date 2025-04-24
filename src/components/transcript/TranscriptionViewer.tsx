import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TranscriptionList } from "./TranscriptionList";
import { BookmarksList } from "./BookmarksList";
import { Summarization } from "./Summarization";
import { SearchBar } from "./SearchBar";
import { useTranscription } from "../../hooks/useTranscription";
import { FileText, Sparkles, Bookmark } from "lucide-react";
import { useTranscriptionStore } from "../../store/transcriptionStore"

export const TranscriptionViewer: FC = () => {
  const { transcript } = useTranscriptionStore(); 
  const { activeTab, setActiveTab } = useTranscription();

  if (!transcript || transcript.length === 0) return null;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-muted/10">
        <TabsTrigger value="transcription" className="flex items-center gap-2">
          <FileText size={14} /> Transcrição
        </TabsTrigger>
        <TabsTrigger value="summarization" className="flex items-center gap-2">
          <Sparkles size={14} /> Sumário
        </TabsTrigger>
        <TabsTrigger value="bookmarks" className="flex items-center gap-2">
          <Bookmark size={14} /> Favoritos
        </TabsTrigger>
      </TabsList>

      <div className="mt-3 mb-3">
        <SearchBar />
      </div>

      <TabsContent value="transcription">
        <TranscriptionList />
      </TabsContent>

      <TabsContent value="summarization">
        <Summarization />
      </TabsContent>

      <TabsContent value="bookmarks">
        <BookmarksList />
      </TabsContent>
    </Tabs>
  );
};