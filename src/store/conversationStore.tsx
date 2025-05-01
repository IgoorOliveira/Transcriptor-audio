import { create } from 'zustand';
import { api } from '../lib/api';
import { Conversation, ConversationType } from '../types/conversation';
import { useTranscriptionStore } from './transcriptionStore';

interface ConversationsState {
  conversations: ReadonlyArray<Conversation>;
  sidebarOpen: boolean;
  activeConversationId: number | null;
  
  loadConversations: () => Promise<void>;
  createConversation: (title?: string, type?: string) => number;
  deleteConversation: (id: number) => Promise<void>;
  setActiveConversation: (id: number) => void;
  updateConversationProgress: (id: number, progress: number) => void;
  updateConversationTitle: (id: number, title: string) => Promise<void>;
  toggleSidebar: () => void;
  getActiveConversation: () => Conversation | undefined;
}

export const useConversationsStore = create<ConversationsState>((set, get) => ({
  conversations: [],
  sidebarOpen: true,
  activeConversationId: null,

  loadConversations: async () => {
    try {
      const response = await api.get('/users/history');
      set({ conversations: response.data });
      
      if (response.data.length > 0 && !response.data.some((c: Conversation) => c.active)) {
        const firstConversation = response.data[0];
        set((state) => ({
          conversations: state.conversations.map(c => ({
            ...c,
            active: c.id === firstConversation.id
          })),
          activeConversationId: firstConversation.id
        }));
      } else if (response.data.length > 0) {
        const activeConversation = response.data.find((c: Conversation) => c.active);
        if (activeConversation) {
          set({ activeConversationId: activeConversation.id });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
    }
  },

  createConversation: (title = "Nova transcrição", type = "video") => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][currentDate.getMonth()]}`;

    const newConversationId = Date.now();
    const newConversation: Conversation = {
      id: newConversationId,
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
      ],
      activeConversationId: newConversationId
    }));
    
    return newConversationId;
  },

  deleteConversation: async (id) => {
    try {
      
      set((state) => {
        const newConversations = state.conversations.filter(conv => conv.id !== id);
        
        let newActiveId = state.activeConversationId;
        if (state.activeConversationId === id) {
          if (newConversations.length > 0) {
            newConversations[0].active = true;
            newActiveId = newConversations[0].id;
          } else {
            newActiveId = null;
          }
        }
        
        return {
          conversations: newConversations,
          activeConversationId: newActiveId
        };
      });
    } catch (error) {
      console.error('Erro ao excluir conversa:', error);
    }
  },

  setActiveConversation: (id) => {
  const state = get();
  const conversation = state.conversations.find(conv => conv.id === id);

  if (conversation) { 
    const { fetchTranscriptFromApi } = useTranscriptionStore.getState();
    fetchTranscriptFromApi(id);
  }

  set({
    conversations: state.conversations.map(conv => ({
      ...conv,
      active: conv.id === id
    })),
    activeConversationId: id
  });
},

  updateConversationProgress: (id, progress) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === id ? { ...conv, progress } : conv
    )
  })),

  updateConversationTitle: async (id, title) => {
    try {
      set((state) => ({
        conversations: state.conversations.map(conv => 
          conv.id === id ? { ...conv, title } : conv
        )
      }));
    } catch (error) {
      console.error('Erro ao atualizar título da conversa:', error);
    }
  },

  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),

  getActiveConversation: () => {
    const state = get();
    return state.conversations.find(conv => conv.id === state.activeConversationId);
  }
}));