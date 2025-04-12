import { FC, KeyboardEvent } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useChat } from '../../hooks/useChat';
import { Zap } from 'lucide-react';

export const ChatInput: FC = () => {
  const { input, setInput, sendMessage, suggestions, applySuggestion } = useChat();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={sendMessage} className="gap-2">
          Enviar <Zap size={16} />
        </Button>
      </div>

      <div className="mt-4 p-3 bg-muted/10 rounded-lg border border-muted/20">
        <p className="text-xs text-muted-foreground mb-2">Sugestões de perguntas:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="cursor-pointer hover:bg-muted/20"
              onClick={() => applySuggestion(suggestion.query)}
            >
              {suggestion.text}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};
