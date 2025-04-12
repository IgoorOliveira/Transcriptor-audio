import { FC } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useTranscription } from "../../hooks/useTranscription";

export const SearchBar: FC = () => {
  const { searchQuery, setSearchQuery } = useTranscription();

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar na transcrição..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
