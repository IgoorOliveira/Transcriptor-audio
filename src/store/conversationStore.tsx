import { create } from 'zustand';
import { api } from '../lib/api';
import { Conversation, ConversationType } from '../types/conversation.ts';


interface ConversationsState {
  conversations: ReadonlyArray<Conversation>;
  sidebarOpen: boolean;
  loadConversations: () => Promise<void>;

  createConversation: (title?: string, type?: string) => void;
  deleteConversation: (id: number) => void;
  setActiveConversation: (id: number) => void;
  updateConversationProgress: (id: number, progress: number) => void;
  updateConversationTitle: (id: number, title: string) => void;
  toggleSidebar: () => void;
  getActiveConversation: () => Conversation | undefined;
}

export const useConversationsStore = create<ConversationsState>((set, get) => ({
  conversations: [],
  sidebarOpen: true,

  loadConversations: async () => {
    try {
      const response = await api.get('users/history');
      set({ conversations: response.data });
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
    }
  },

  createConversation: (title = "Nova transcrição", type = "video") => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][currentDate.getMonth()]}`;

    const newConversation: Conversation = {
      id: Date.now(),
      title,
      date: formattedDate,
      active: true,
      type: type as ConversationType,
      progress: 0
    };

    set((state) => ({
      conversations: [
        newConversation,
        ...state.conversations.map(c => ({ ...c, active: false }))
      ]
    }));
  },

  deleteConversation: (id) => set((state) => ({
    conversations: state.conversations.filter(conv => conv.id !== id)
  })),

  setActiveConversation: (id) => set((state) => ({
    conversations: state.conversations.map(conv => ({
      ...conv,
      active: conv.id === id
    }))
  })),

  updateConversationProgress: (id, progress) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === id ? { ...conv, progress } : conv
    )
  })),

  updateConversationTitle: (id, title) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === id ? { ...conv, title } : conv
    )
  })),

  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),

  getActiveConversation: () => get().conversations.find(conv => conv.active)
}));
