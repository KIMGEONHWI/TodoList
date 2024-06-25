import { useState } from "react";
import styled from "styled-components";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface NoteProps {
  title: string;
  content: string;
  bookmarked: boolean;
  checked: boolean;
  emoji: string;
  onEdit: (
    newTitle: string,
    newContent: string,
    newEmoji: string,
    newChecked: boolean
  ) => void;
  onDelete: () => void;
  onToggleBookmark: () => void;
  onToggleCheck: () => void;
  onEmojiChange: (newEmoji: string) => void; // 추가된 부분
}

const Note = ({
  title,
  content,
  bookmarked,
  checked,
  emoji,
  onEdit,
  onDelete,
  onToggleBookmark,
  onToggleCheck,
  onEmojiChange,
}: NoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [newEmoji, setNewEmoji] = useState(emoji);
  const [newChecked, setNewChecked] = useState(checked);

  const handleSave = () => {
    onEdit(title, newContent, newEmoji, newChecked);
    setIsEditing(false);
  };

  return (
    <NoteCard>
      {isEditing ? (
        <>
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={newChecked}
              onChange={() => setNewChecked(!newChecked)}
            />
            <EmojiInput
              type="text"
              value={newEmoji}
              onChange={(e) => {
                setNewEmoji(e.target.value);
                onEmojiChange(e.target.value);
              }}
              placeholder="Add emoji"
            />
          </CheckboxContainer>
          <ButtonGroup>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <Header>
            <NoteTitle>{title}</NoteTitle>
          </Header>
          <NoteContent>{content}</NoteContent>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={checked}
              onChange={onToggleCheck}
            />
            <Emoji>{emoji}</Emoji>
          </CheckboxContainer>
          <ButtonGroup>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button onClick={onDelete}>Delete</Button>
            <BookmarkButton
              onClick={onToggleBookmark}
              bookmarked={bookmarked.toString()}
            >
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </BookmarkButton>
          </ButtonGroup>
        </>
      )}
    </NoteCard>
  );
};

export default Note;

const NoteCard = styled.div`
  padding: 1rem;
  margin-bottom: 0.3rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteTitle = styled.h3`
  margin-bottom: 0.3rem;
  font-size: 1.5rem;
`;

const NoteContent = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.3rem;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  width: 100%;
  height: 6rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
`;

const EmojiInput = styled.input`
  padding: 0.5rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  background-color: lightgray;
  font-size: 1rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
`;

const BookmarkButton = styled(Button)<{ bookmarked: string }>`
  background-color: ${({ bookmarked }) =>
    bookmarked === "true" ? "gray" : "lightgray"};

  &:hover {
    background-color: ${({ bookmarked }) =>
      bookmarked === "true" ? "darkgray" : "gray"};
  }

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Emoji = styled.span`
  font-size: 2rem;
`;
