import { TranscriptLine } from "./types/transcription";

export const timeToSeconds = (time: string): number => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};

export const secondsToTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export const isTimeInRange = (
  currentTime: number,
  startTime: string,
  endTime?: string,
  defaultEndTime = 999
): boolean => {
  const start = timeToSeconds(startTime);
  const end = endTime ? timeToSeconds(endTime) : defaultEndTime;

  return currentTime >= start && currentTime < end;
};

export const filterTranscript = (
  transcript: TranscriptLine[],
  query: string
): TranscriptLine[] => {
  if (!query.trim()) return transcript;

  const normalizedQuery = query.toLowerCase().trim();

  return transcript.filter((line) =>
    line.text.toLowerCase().includes(normalizedQuery)
  );
};

const TOKEN_KEY = "@transcriptor:token";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
