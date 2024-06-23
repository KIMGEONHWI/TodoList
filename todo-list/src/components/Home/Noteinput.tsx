import React, { useState } from "react";
import styled from "styled-components";
import { NoteType } from "../../hooks/useNotes";
import axios from "axios";
import { useParams } from "react-router-dom";

interface NoteInputProps {
  addNote: (note: NoteType) => void;
  onCancel: () => void;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

interface TodoResponse {
  todo_id: number;
  user: string;
  date: string;
  content: string;
  is_checked: boolean;
  emoji: string;
}

const NoteInput = ({ addNote, onCancel, setNotes }: NoteInputProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userId, date } = useParams<{ userId: string; date: string }>();

  console.log("Base URL:", import.meta.env.VITE_BASE_URL);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date();
    const utcDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const formattedDate = utcDate.toISOString().split("T")[0];

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    const url = `${import.meta.env.VITE_BASE_URL}/api/todos/${userId}`;
    console.log("Sending POST request to:", url);
    console.log("Request data:", { date: formattedDate, content });

    try {
      const response = await axios.post<TodoResponse>(url, {
        date: formattedDate,
        content: content,
      });

      console.log("POST Response data:", response.data);

      if (response.status === 200) {
        const newNote: NoteType = {
          id: response.data.todo_id.toString(),
          title: title,
          content: response.data.content,
          createdAt: new Date(response.data.date),
          updatedAt: new Date(response.data.date),
          bookmarked: false,
          date: response.data.date,
        };
        addNote(newNote);
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setTitle("");
        setContent("");

        setTimeout(async () => {
          await handleGetTodos();
        }, 1000);
      }
    } catch (error) {
      console.error("To-do 생성 실패", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      }
    }
  };

  const handleGetTodos = async () => {
    if (!userId || !date) {
      console.error("User ID or date is missing");
      return;
    }

    const [month, day] = date.split("-");
    console.log("Date parameters:", { month, day });

    const url = `${
      import.meta.env.VITE_BASE_URL
    }/api/todos/${userId}?month=${month}&day=${day}`;
    console.log("GET API request URL:", url);

    try {
      const response = await axios.get<TodoResponse[]>(url);
      console.log("GET Full API response:", response);
      console.log("Response data type:", typeof response.data);
      console.log(
        "Response data length:",
        Array.isArray(response.data) ? response.data.length : "Not an array"
      );

      if (response.status === 200) {
        console.log("GET API response data:", response.data);
        if (Array.isArray(response.data) && response.data.length === 0) {
          console.log("No todos found for this date");
          setNotes([]);
        } else {
          const fetchedNotes: NoteType[] = response.data.map((todo) => ({
            id: todo.todo_id.toString(),
            title: "",
            content: todo.content,
            createdAt: new Date(todo.date),
            updatedAt: new Date(todo.date),
            bookmarked: false,
            date: todo.date,
            isChecked: todo.is_checked,
            emoji: todo.emoji,
          }));
          console.log("Fetched notes:", fetchedNotes);
          setNotes(fetchedNotes);
        }
      }
    } catch (error) {
      console.error("Failed to fetch todos", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      }
    }
    onCancel();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <ButtonWrapper>
        <Button type="submit">일정 생성</Button>
        <CancelButton type="button" onClick={handleGetTodos}>
          리스트
        </CancelButton>
      </ButtonWrapper>
    </Form>
  );
};

export default NoteInput;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 7rem;
`;

const Input = styled.input`
  padding: 2rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  height: 28rem;
  padding: 2rem 0 8rem 2rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: 1px solid #ccc;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  width: 48%;
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

const CancelButton = styled(Button)`
  background-color: lightgrey;

  &:hover {
    background-color: grey;
  }
`;
