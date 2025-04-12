import { useCallback } from 'react';
import { useBookmarksStore } from '../store/bookmarksStore';
import { useTranscriptionStore } from '../store/transcriptionStore';
import { TranscriptLine } from '../types/transcription';

export function useBookmarks() {
  const { bookmarks, toggleBookmark } = useBookmarksStore();
  const { transcript } = useTranscriptionStore();

  const isBookmarked = useCallback((time: string) => {
    return bookmarks.includes(time);
  }, [bookmarks]);

  const bookmarkedTranscriptLines = useCallback((): TranscriptLine[] => {
    return transcript.filter(line => bookmarks.includes(line.time));
  }, [transcript, bookmarks]);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    bookmarkedTranscriptLines
  };
}