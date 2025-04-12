import { FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useTranscription } from "../../hooks/useTranscription";
import { Bookmark } from "lucide-react";

export const BookmarksList: FC = () => {
  const { bookmarkedTranscriptLines, toggleBookmark } = useBookmarks();
  const { jumpToTime } = useTranscription();

  const bookmarks = bookmarkedTranscriptLines();

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-20" />
        <p>Você ainda não marcou nenhum trecho favorito</p>
        <p className="text-sm mt-2">
          Clique no ícone de marcador ao lado de qualquer linha para salvá-la
          aqui
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin">
      {bookmarks.map((line, index) => (
        <div key={index} className="p-2 rounded-md hover:bg-muted/20">
          <div className="flex items-start gap-3">
            <Badge
              variant="secondary"
              className="text-xs font-mono bg-yellow-100 dark:bg-yellow-900/30 text-muted-foreground cursor-pointer"
              onClick={() => jumpToTime(line.time)}
            >
              {line.time}
            </Badge>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {line.text}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-6 w-6"
              onClick={() => toggleBookmark(line.time)}
            >
              <Bookmark size={16} className="fill-yellow-500 text-yellow-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
