import { FC } from "react";
import { Button } from "../ui/button";
import { ExternalLink, MessageSquare } from "lucide-react";
import { useTranscriptionStore } from "@/store/transcriptionStore";

export const Summarization: FC = () => {
  const { summary } = useTranscriptionStore();

  const defaultText = "Não foi possível obter sumário";

  return (
    <div className="space-y-4">
      <div className="bg-muted/10 p-4 rounded-lg border border-muted/20">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <MessageSquare size={16} /> Resumo Executivo
        </h3>
        <p className="text-sm text-muted-foreground">{summary || defaultText}</p>
      </div>
      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-2">
          <ExternalLink size={14} /> Expandir sumário
        </Button>
      </div>
    </div>
  );
};
