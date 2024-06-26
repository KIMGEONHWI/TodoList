import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Title from "../components/Home/Title";
import Toggle from "../components/Home/Toggle";
import NoteInput from "../components/Home/Noteinput";
import NoteList from "../components/Home/NoteList";
import CustomDropdown from "../components/Home/CustomDropDown";
import { NoteType, useNotes } from "../hooks/useNotes";
import { lightTheme, darkTheme } from "../theme";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const {
    getSortedNotes,
    addNote,
    editNote,
    deleteNote,
    toggleBookmark,
    toggleCheck,
    changeEmoji,
    handleSortChange,
  } = useNotes();
  const [showNoteInput, setShowNoteInput] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { date, userId } = useParams<{ date: string; userId: string }>();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<NoteType[]>([]);

  if (!date || !userId) {
    navigate("/");
    return null;
  }

  const handleAddNote = (note: Omit<NoteType, "id" | "date">) => {
    const newNote: NoteType = {
      ...note,
      id: uuidv4(),
      date: date,
    };
    addNote(newNote);
    setShowNoteInput(false);
  };

  const handleEditNote = (
    id: string,
    newTitle: string,
    newContent: string,
    newEmoji: string,
    newChecked: boolean
  ) => {
    editNote(userId, date, id, newTitle, newContent, newEmoji, newChecked);
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(userId, date, id);
  };

  const handleToggleCheck = (id: string) => {
    toggleCheck(date, id);
  };

  const handleChangeEmoji = (id: string, newEmoji: string) => {
    changeEmoji(date, id, newEmoji);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredNotes = getSortedNotes(date);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <HomeWrapper>
        <HomeContainer>
          <DateTitle>{date}</DateTitle>
          <HomeHeader>
            <Title />
            <Toggle toggleTheme={toggleTheme} />
          </HomeHeader>
          {!showNoteInput && (
            <CustomDropdown
              options={[
                { value: "recentlyCreated", label: "최근 생성순" },
                { value: "recentlyUpdated", label: "최신 수정순" },
                { value: "bookmarked", label: "북마크된 노트" },
              ]}
              onChange={(value) => handleSortChange(value)}
            />
          )}
          {showNoteInput ? (
            <NoteInput
              addNote={handleAddNote}
              onCancel={() => setShowNoteInput(false)}
              setNotes={setNotes}
            />
          ) : (
            <NoteList
              notes={notes.length > 0 ? notes : filteredNotes}
              userId={userId}
              date={date}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
              onToggleBookmark={(id) => toggleBookmark(date, id)}
              onToggleCheck={handleToggleCheck}
              onEmojiChange={handleChangeEmoji}
              onAddNewNote={() => setShowNoteInput(true)}
            />
          )}
        </HomeContainer>
      </HomeWrapper>
    </ThemeProvider>
  );
}

export default Home;

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url("/src/assets/img/background.jpg");
  background-size: cover;
  background-position: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 80vh;
  border-radius: 5rem;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  padding: 2rem;
  position: relative;
`;

const HomeHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10rem;
  width: 100%;
  margin-left: 15rem;
  gap: 5rem;
`;

const DateTitle = styled.h1`
  display: flex;
  font-size: 2rem;
  color: grey;
`;
