import { FC } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChat } from "../../hooks/useChat";

export const ChatWindow: FC = () => {
  const { messages } = useChat();

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 max-h-[500px] scrollbar-thin">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};
