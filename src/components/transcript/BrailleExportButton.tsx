import { FC } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FileText, Loader2 } from "lucide-react";
import { useTranscriptionStore } from "@/store/transcriptionStore";
import { useBrailleExport } from "@/hooks/useBrailleExport";

interface BrailleExportButtonProps {
  transcriptionId?: string | number;
  useEnhanced?: boolean;
}

export const BrailleExportButton: FC<BrailleExportButtonProps> = ({
  transcriptionId,
  useEnhanced = false,
}) => {
  const { isExporting, exportBraille } = useBrailleExport();
  const { activeTranscriptionId } = useTranscriptionStore();

  const id = transcriptionId || activeTranscriptionId;

  const handleExport = () => {
    if (id) {
      exportBraille(id, useEnhanced);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleExport}
            disabled={isExporting || !id}
          >
            {isExporting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <FileText size={16} />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Exportar em Braille</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
