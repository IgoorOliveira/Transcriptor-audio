import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ChatMessage as ChatMessageType } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isSystem = message.from === 'system';

  return (
    <div
      className={`flex gap-3 ${
        isSystem ? "justify-start" : "justify-end"
      }`}
    >
      {isSystem && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`px-4 py-3 rounded-2xl text-sm leading-snug max-w-[85%] ${
          isSystem
            ? "bg-muted/50 text-muted-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {message.text}
      </div>
      {!isSystem && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};