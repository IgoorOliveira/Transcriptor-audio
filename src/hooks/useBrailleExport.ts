import { useState } from "react";
import { api } from "../lib/api";
import { toast } from "sonner";

export function useBrailleExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportBraille = async (
    id: string | number,
    useEnhanced: boolean = false
  ) => {
    if (!id) {
      toast.error("Erro ao exportar: ID da transcrição não foi fornecido.");
      return;
    }

    try {
      setIsExporting(true);

      const response = await fetch(
        `${api.defaults.baseURL}/api/transcription/${id}/braille?enhanced=${useEnhanced}`
      );

      if (!response.ok) {
        throw new Error("Falha ao baixar o arquivo Braille");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `transcription-${id}.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success(
        "Exportação iniciada: O arquivo Braille está sendo baixado."
      );
    } catch (error) {
      console.error("Erro ao exportar arquivo Braille:", error);
      toast.error(
        "Erro ao exportar: Não foi possível baixar o arquivo Braille."
      );
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportBraille,
  };
}
