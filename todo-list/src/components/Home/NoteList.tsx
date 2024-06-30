import styled from "styled-components";
import Note from "./Note";

interface NoteType {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  bookmarked: boolean;
  checked: boolean;
  emoji: string;
}

interface NoteListProps {
  notes: NoteType[];
  userId: string;
  date: string;
  onEditNote: (
    id: string,
    newTitle: string,
    newContent: string,
    newEmoji: string,
    newChecked: boolean
  ) => void;
  onDeleteNote: (userId: string, date: string, id: string) => void;
  onToggleBookmark: (id: string) => void;
  onToggleCheck: (id: string) => void;
  onEmojiChange: (id: string, newEmoji: string) => void;
  onAddNewNote: () => void;
}

const NoteList = ({
  notes,
  userId,
  date,
  onEditNote,
  onDeleteNote,
  onToggleBookmark,
  onToggleCheck,
  onEmojiChange,
  onAddNewNote,
}: NoteListProps) => {
  return (
    <ListWrapper>
      <List>
        {notes.map((note) => (
          <Note
            key={note.id}
            title={note.title}
            content={note.content}
            bookmarked={note.bookmarked}
            checked={note.checked}
            emoji={note.emoji}
            onEdit={(newTitle, newContent, newEmoji, newChecked) =>
              onEditNote(note.id, newTitle, newContent, newEmoji, newChecked)
            }
            onDelete={() => onDeleteNote(userId, date, note.id)}
            onToggleBookmark={() => onToggleBookmark(note.id)}
            onToggleCheck={() => onToggleCheck(note.id)}
            onEmojiChange={(newEmoji) => onEmojiChange(note.id, newEmoji)} // 추가된 부분
          />
        ))}
      </List>
      <AddButton onClick={onAddNewNote}>일정 추가</AddButton>
    </ListWrapper>
  );
};

export default NoteList;

const ListWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6rem;
`;

const List = styled.div`
  display: flex;
  width: 100%;
  max-height: 50rem;
  overflow-y: auto;
  flex-direction: column;
`;

const AddButton = styled.button`
  display: flex;
  position: absolute;
  bottom: 1rem;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  width: 72.5rem;
  height: 7rem;
  border: none;
  background-color: lightgray;
  font-size: 3rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;
