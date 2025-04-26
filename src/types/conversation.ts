export type ConversationType = "audio" | "video";

export interface Conversation {
  id: number;
  title: string;
  date: string;
  type: ConversationType;
  progress: number;
  active: boolean;
}
