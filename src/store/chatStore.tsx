import { create } from "zustand";
import { ChatMessage, MessageSender, SuggestionItem } from "../types/chat";

interface ChatState {
  messages: ReadonlyArray<ChatMessage>;
  input: string;
  suggestions: ReadonlyArray<SuggestionItem>;
  isLoading: boolean;

  setInput: (input: string) => void;
  sendMessage: (text: string) => void;
  addSystemMessage: (text: string) => void;
  clearMessages: () => void;
  setSuggestions: (suggestions: ReadonlyArray<SuggestionItem>) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const initialMessages: ReadonlyArray<ChatMessage> = [
  {
    from: "system",
    text: "Olá! Como posso te ajudar com a transcrição?",
    timestamp: new Date(),
  },
];

const initialSuggestions: ReadonlyArray<SuggestionItem> = [
  { text: "Resumir conteúdo", query: "Resuma o conteúdo deste vídeo" },
  { text: "Principais tópicos", query: "Quais são os tópicos principais?" },
  { text: "Gerar notas", query: "Gere notas detalhadas" },
];

export const useChatStore = create<ChatState>((set) => ({
  messages: initialMessages,
  input: "",
  suggestions: initialSuggestions,
  isLoading: false,

  setInput: (input) => set({ input }),

  sendMessage: (text) => {
    if (!text.trim()) return;


    set((state) => ({
      messages: [
        ...state.messages,
        {
          from: "user" as MessageSender,
          text,
          timestamp: new Date(),
        },
      ],
      input: "",
      isLoading: true,
    }));

    setTimeout(() => {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            from: "system" as MessageSender,
            text: `Entendi sua mensagem sobre "${text}". Posso ajudar com mais detalhes da transcrição?`,
            timestamp: new Date(),
          },
        ],
        isLoading: false,
      }));
    }, 800);
  },

  addSystemMessage: (text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          from: "system" as MessageSender,
          text,
          timestamp: new Date(),
        },
      ],
    })),

  clearMessages: () =>
    set(() => ({
      messages: [
        {
          from: "system" as MessageSender,
          text: "Olá! Como posso te ajudar com a transcrição?",
          timestamp: new Date(),
        },
      ],
    })),

  setSuggestions: (suggestions) => set({ suggestions }),

  setIsLoading: (isLoading) => set({ isLoading }),
}));
