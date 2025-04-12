import { useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import { SuggestionItem } from '@/types/chat';

export function useChat() {
  const { messages, input, setInput, sendMessage } = useChatStore();

  const suggestions: SuggestionItem[] = [
    { text: "Pontos principais", query: "Quais são os pontos principais deste vídeo?" },
    { text: "Funcionalidades", query: "Explique mais sobre as funcionalidades de busca" },
    { text: "Exportar", query: "Como exportar a transcrição?" }
  ];

  const applySuggestion = useCallback((query: string) => {
    setInput(query);
  }, [setInput]);

  const handleSendMessage = useCallback(() => {
    if (input.trim()) {
      sendMessage(input);
    }
  }, [input, sendMessage]);

  return {
    messages,
    input,
    setInput,
    sendMessage: handleSendMessage,
    suggestions,
    applySuggestion
  };
}