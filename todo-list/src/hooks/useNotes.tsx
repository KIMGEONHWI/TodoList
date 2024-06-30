import { useState, useEffect } from "react";
import axios from "axios";

export interface NoteType {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  bookmarked: boolean;
  date: string;
  checked: boolean;
  emoji: string;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<{ [date: string]: NoteType[] }>({});
  const [sortOption, setSortOption] = useState("recentlyCreated");

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes) as {
        [date: string]: NoteType[];
      };
      for (const date in parsedNotes) {
        parsedNotes[date] = parsedNotes[date].map((note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
      }
      setNotes(parsedNotes);
    }
  }, []);

  const saveNotesToLocalStorage = (notes: { [date: string]: NoteType[] }) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const addNote = (note: NoteType) => {
    const newNotes = {
      ...notes,
      [note.date]: [...(notes[note.date] || []), note],
    };
    setNotes(newNotes);
    saveNotesToLocalStorage(newNotes);
  };

  const editNote = async (
    user_id: string,
    date: string,
    todo_id: string,
    newTitle: string,
    newContent: string,
    newEmoji: string,
    newChecked: boolean
  ) => {
    const url = `${import.meta.env.VITE_BASE_URL}/api/todos/${user_id}`;
    console.log("URL:", url);
    console.log("Request Data:", {
      content: newContent,
      date: new Date().toISOString(),
      emoji: newEmoji,
      is_checked: newChecked,
    });

    try {
      const response = await axios.post(url, {
        content: newContent,
        date: new Date().toISOString(),
        emoji: newEmoji,
        is_checked: newChecked,
      });

      if (response.status === 200) {
        console.log("투두 수정 성공:", response.data);

        const updatedNotes = {
          ...notes,
          [date]: notes[date].map((note) =>
            note.id === todo_id
              ? {
                  ...note,
                  title: newTitle,
                  content: newContent,
                  emoji: newEmoji,
                  checked: newChecked,
                  updatedAt: new Date(),
                }
              : note
          ),
        };
        setNotes(updatedNotes);
        saveNotesToLocalStorage(updatedNotes);
      } else {
        console.error("투두 수정 실패:", response.status);
      }
    } catch (error) {
      console.error("투두 수정 중 오류 발생:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      }
    }
  };

  const deleteNote = async (user_id: string, date: string, todo_id: string) => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/api/todos/${user_id}/${todo_id}`;
    console.log("DELETE API request URL:", url);

    try {
      const response = await axios.delete(url);

      if (response.status === 204) {
        console.log("투두 삭제 성공");
        const updatedNotes = {
          ...notes,
          [date]: notes[date].filter((note) => note.id !== todo_id),
        };
        setNotes(updatedNotes);
        saveNotesToLocalStorage(updatedNotes);
      } else {
        console.error("투두 삭제 실패:", response.status);
      }
    } catch (error) {
      console.error("투두 삭제 중 오류 발생:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      }
    }
  };

  const toggleBookmark = (date: string, id: string) => {
    const updatedNotes = {
      ...notes,
      [date]: notes[date].map((note) =>
        note.id === id ? { ...note, bookmarked: !note.bookmarked } : note
      ),
    };
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const toggleCheck = (date: string, id: string) => {
    const updatedNotes = {
      ...notes,
      [date]: notes[date].map((note) =>
        note.id === id ? { ...note, checked: !note.checked } : note
      ),
    };
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const changeEmoji = (date: string, id: string, newEmoji: string) => {
    const updatedNotes = {
      ...notes,
      [date]: notes[date].map((note) =>
        note.id === id ? { ...note, emoji: newEmoji } : note
      ),
    };
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
  };

  const getSortedNotes = (date: string) => {
    if (!notes[date]) return [];
    const notesForDate = notes[date];
    if (sortOption === "bookmarked") {
      return notesForDate.filter((note) => note.bookmarked);
    }
    return notesForDate.sort((a, b) => {
      if (sortOption === "recentlyCreated") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortOption === "recentlyUpdated") {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      return 0;
    });
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  return {
    getSortedNotes,
    addNote,
    editNote,
    deleteNote,
    toggleBookmark,
    toggleCheck,
    changeEmoji,
    handleSortChange,
  };
};
