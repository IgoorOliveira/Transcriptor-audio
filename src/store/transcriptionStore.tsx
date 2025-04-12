import { create } from 'zustand';
import { TranscriptLine, TranscriptionTab } from '../types/transcription';

interface TranscriptionState {
  transcript: ReadonlyArray<TranscriptLine>;
  currentVideoTime: number;
  searchQuery: string;
  activeTab: TranscriptionTab;
  playbackSpeed: number;
  autoScroll: boolean;
  
  setTranscript: (transcript: ReadonlyArray<TranscriptLine>) => void;
  setCurrentVideoTime: (time: number) => void;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: TranscriptionTab) => void;
  setPlaybackSpeed: (speed: number) => void;
  setAutoScroll: (autoScroll: boolean) => void;
}

const initialTranscript: ReadonlyArray<TranscriptLine> = [
  { time: "00:01", text: "Olá, seja bem-vindo ao nosso vídeo." },
  { time: "00:04", text: "Hoje vamos aprender como usar o sistema de transcrição." },
  { time: "00:08", text: "Você pode fazer upload de um vídeo e visualizar a transcrição aqui." },
  { time: "00:12", text: "Além disso, temos um chat ao lado para interagir com a IA." },
  { time: "00:16", text: "Este sistema possui recursos avançados de busca e filtragem." },
  { time: "00:20", text: "É possível marcar trechos importantes para revisão posterior." },
  { time: "00:24", text: "Outra funcionalidade útil é o controle de velocidade de reprodução." },
  { time: "00:28", text: "Os sumários gerados pela IA ajudam a compreender rapidamente o conteúdo." },
  { time: "00:33", text: "Você também pode exportar a transcrição em diferentes formatos." },
  { time: "00:38", text: "Agradecemos por utilizar nossa plataforma de transcrição inteligente." },
];

export const useTranscriptionStore = create<TranscriptionState>((set) => ({
  transcript: initialTranscript,
  currentVideoTime: 0,
  searchQuery: '',
  activeTab: 'transcription',
  playbackSpeed: 1,
  autoScroll: true,

  setTranscript: (transcript) => set({ transcript }),
  setCurrentVideoTime: (time) => set({ currentVideoTime: time }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setAutoScroll: (autoScroll) => set({ autoScroll }),
}));