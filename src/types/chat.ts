export type MessageSender = 'user' | 'system';

export type ChatMessage = {
  readonly from: MessageSender;
  readonly text: string;
  readonly timestamp?: Date;
};

export type SuggestionItem = {
  readonly text: string;
  readonly query: string;
};