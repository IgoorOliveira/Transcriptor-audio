import { FC } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useTranscription } from "../../hooks/useTranscription";
import { useBookmarks } from "../../hooks/useBookmarks";
import { Bookmark } from "lucide-react";
import { TranscriptLine } from "../../types/transcription";
import { isTimeInRange } from "@/utils";

interface TranscriptionItemProps {
  line: TranscriptLine;
  isHighlighted: boolean;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onTimeClick: () => void;
}

const TranscriptionItem: FC<TranscriptionItemProps> = ({
  line,
  isHighlighted,
  isBookmarked,
  onBookmarkToggle,
  onTimeClick,
}) => (
  <div
    className={`p-2 rounded-md transition-colors ${
      isHighlighted
        ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
        : "hover:bg-muted/20"
    }`}
  >
    <div className="flex items-start gap-3">
      <Badge
        variant="secondary"
        className="text-xs font-mono bg-muted/20 text-muted-foreground cursor-pointer hover:bg-primary/20"
        onClick={onTimeClick}
      >
        {line.time}
      </Badge>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {line.text}
      </p>
      <Button
        variant="ghost"
        size="sm"
        className="p-0 h-6 w-6"
        onClick={onBookmarkToggle}
      >
        <Bookmark
          size={16}
          className={
            isBookmarked
              ? "fill-yellow-500 text-yellow-500"
              : "text-muted-foreground"
          }
        />
      </Button>
    </div>
  </div>
);

export const TranscriptionList: FC = () => {
  const { filteredTranscript, currentVideoTime, jumpToTime } =
    useTranscription();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const isLineActive = (line: TranscriptLine, index: number): boolean => {
    const nextLine =
      index < filteredTranscript.length - 1
        ? filteredTranscript[index + 1]
        : null;
    return isTimeInRange(currentVideoTime, line.time, nextLine?.time, 999);
  };

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin">
      {filteredTranscript.map((line, index) => (
        <TranscriptionItem
          key={index}
          line={line}
          isHighlighted={isLineActive(line, index)}
          isBookmarked={isBookmarked(line.time)}
          onBookmarkToggle={() => toggleBookmark(line.time)}
          onTimeClick={() => jumpToTime(line.time)}
        />
      ))}
    </div>
  );
};
