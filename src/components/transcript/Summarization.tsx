import { FC } from "react";
import { Button } from "../ui/button";
import { ExternalLink, Sparkles, MessageSquare } from "lucide-react";

export const Summarization: FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-muted/10 p-4 rounded-lg border border-muted/20">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Sparkles size={16} /> Tópicos Principais
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Introdução ao sistema de transcrição</li>
          <li>Demonstração de upload de vídeo</li>
          <li>Recursos de interação com IA</li>
          <li>Funcionalidades avançadas de busca</li>
        </ul>
      </div>

      <div className="bg-muted/10 p-4 rounded-lg border border-muted/20">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <MessageSquare size={16} /> Resumo Executivo
        </h3>
        <p className="text-sm text-muted-foreground">
          O vídeo apresenta o sistema de transcrição, demonstrando como fazer
          upload de vídeos e acessar funcionalidades como chat com IA, busca
          avançada, marcação de trechos importantes e controle de velocidade de
          reprodução. O conteúdo é focado em mostrar os benefícios da plataforma
          para usuários que precisam trabalhar com transcrições eficientes.
        </p>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="gap-2">
          <ExternalLink size={14} /> Expandir sumário
        </Button>
      </div>
    </div>
  );
};
