export type TranscriptLine = {
    readonly time: string;
    readonly text: string;
  };

export type TranscriptionTab = 'transcription' | 'summarization' | 'bookmarks';
