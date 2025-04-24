import { useCallback } from "react";
import { useTranscriptionStore } from "../store/transcriptionStore";

export function useVideoPlayer() {
  const {
    currentVideoTime,
    setCurrentVideoTime,
    playbackSpeed,
    setPlaybackSpeed,
  } = useTranscriptionStore();

  const updateCurrentTime = useCallback(
    (time: number) => {
      setCurrentVideoTime(time);
    },
    [setCurrentVideoTime]
  );

  const updatePlaybackSpeed = useCallback(
    (speed: number[]) => {
      setPlaybackSpeed(speed[0]);
    },
    [setPlaybackSpeed]
  );

  return {
    currentVideoTime,
    playbackSpeed,
    updateCurrentTime,
    updatePlaybackSpeed,
  };
}
