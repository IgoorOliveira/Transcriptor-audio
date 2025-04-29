import { useTranscriptionStore } from "@/store/transcriptionStore";
import { filterTranscript, timeToSeconds } from "@/utils";
import { useCallback } from "react";

export function useTranscription() {
  const {
    transcript,
    searchQuery,
    currentVideoTime,
    playbackSpeed,
    autoScroll,
    activeTab,
    setCurrentVideoTime,
    setSearchQuery,
    setPlaybackSpeed,
    setAutoScroll,
    setActiveTab,
  } = useTranscriptionStore();

  const filteredTranscript = useCallback(() => {
    return filterTranscript([...transcript], searchQuery);
  }, [transcript, searchQuery]);

  const jumpToTime = useCallback(
    (time: string) => {
      const seconds = timeToSeconds(time);
      setCurrentVideoTime(seconds);
      console.log(`Pulando para ${seconds} segundos`);
    },
    [setCurrentVideoTime]
  );

  return {
    transcript,
    filteredTranscript: filteredTranscript(),
    searchQuery,
    currentVideoTime,
    playbackSpeed,
    autoScroll,
    activeTab,
    setSearchQuery,
    jumpToTime,
    setPlaybackSpeed,
    setAutoScroll,
    setActiveTab,
  };
}
