import { create } from 'zustand';

interface BookmarksState {
  bookmarks: ReadonlyArray<string>;
  addBookmark: (time: string) => void;
  removeBookmark: (time: string) => void;
  toggleBookmark: (time: string) => void;
  isBookmarked: (time: string) => boolean;
}

export const useBookmarksStore = create<BookmarksState>((set, get) => ({
  bookmarks: [] as ReadonlyArray<string>,
  
  addBookmark: (time) => set((state) => ({
    bookmarks: [...state.bookmarks, time] as ReadonlyArray<string>
  })),
  
  removeBookmark: (time) => set((state) => ({
    bookmarks: state.bookmarks.filter(bookmark => bookmark !== time) as ReadonlyArray<string>
  })),
  
  toggleBookmark: (time) => set((state) => ({
    bookmarks: state.bookmarks.includes(time)
      ? state.bookmarks.filter(bookmark => bookmark !== time)
      : [...state.bookmarks, time]
  })),

  isBookmarked: (time) => get().bookmarks.includes(time)
}));
