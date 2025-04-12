import { create } from 'zustand';
import { Conversation, ConversationType } from '../types/conversation';

interface ConversationsState {
  conversations: ReadonlyArray<Conversation>;
  sidebarOpen: boolean;
  
  createConversation: (title?: string, type?: ConversationType) => void;
  deleteConversation: (id: number) => void;
  setActiveConversation: (id: number) => void;
  updateConversationProgress: (id: number, progress: number) => void;
  updateConversationTitle: (id: number, title: string) => void;
  toggleSidebar: () => void;
  getActiveConversation: () => Conversation | undefined;
}

const initialConversations: ReadonlyArray<Conversation> = [
  { id: 1, title: "Entrevista com Carlos", date: "12 Abr", active: true, type: "video", progress: 100 },
  { id: 2, title: "Reunião de projeto", date: "10 Abr", active: false, type: "audio", progress: 85 },
  { id: 3, title: "Podcast episódio #42", date: "08 Abr", active: false, type: "audio", progress: 100 },
  { id: 4, title: "Aula de marketing", date: "05 Abr", active: false, type: "video", progress: 72 },
  { id: 5, title: "Palestra TED", date: "02 Abr", active: false, type: "video", progress: 100 },
  { id: 6, title: "Discurso inaugural", date: "28 Mar", active: false, type: "audio", progress: 100 },
];

export const useConversationsStore = create<ConversationsState>((set, get) => ({
  conversations: initialConversations,
  sidebarOpen: true,
  
  createConversation: (title = "Nova transcrição", type = "video") => set((state) => {
    const newId = Math.max(...state.conversations.map(c => c.id)) + 1;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][currentDate.getMonth()]}`;
    
    const newConversation: Conversation = {
      id: newId,
      title,
      date: formattedDate,
      active: true,
      type,
      progress: 0
    };
    
    return {
      conversations: [
        newConversation,
        ...state.conversations.map(c => ({ ...c, active: false }))
      ] as ReadonlyArray<Conversation>
    };
  }),
  
  deleteConversation: (id) => set((state) => ({
    conversations: state.conversations.filter(conv => conv.id !== id) as ReadonlyArray<Conversation>
  })),
  
  setActiveConversation: (id) => set((state) => ({
    conversations: state.conversations.map(conv => ({
      ...conv,
      active: conv.id === id
    })) as ReadonlyArray<Conversation>
  })),
  
  updateConversationProgress: (id, progress) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === id ? { ...conv, progress } : conv
    ) as ReadonlyArray<Conversation>
  })),

  updateConversationTitle: (id, title) => set((state) => ({
    conversations: state.conversations.map(conv => 
      conv.id === id ? { ...conv, title } : conv
    ) as ReadonlyArray<Conversation>
  })),
  
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  })),

  getActiveConversation: () => get().conversations.find(conv => conv.active)
}));