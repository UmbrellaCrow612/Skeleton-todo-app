"use client";

import { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";

interface Todo {
  id: number;
  text: string;
}

export default function Input(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add the new todo to the array

    if (text.trim().length < 3) return alert("Must write something longer");

    setTodos([...todos, { id: Date.now(), text }]);
    // Clear the text field
    setText("");
  };

  return (
    <div>
      <form
        className="relative w-full h-16 overflow-auto border-b-2 border-slate-200 rounded-xl"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-full h-full p-3 text-white bg-transparent outline-none rounded-xl"
          placeholder="Write something to do"
          required
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
        />
        <button
          type="submit"
          className="absolute px-4 py-2 bg-white right-3 top-3 rounded-xl"
        >
          <AiOutlineSend className="text-xl" />
        </button>
      </form>
    </div>
  );
}
