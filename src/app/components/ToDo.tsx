"use client";
import { useState, useEffect } from "react";

interface TodoItem {
  id: number;
  text: string;
}

function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    const newTodo: TodoItem = {
      id: new Date().getTime(),
      text: inputValue,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  }

  function handleDeleteTodo(id: number) {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  }

  function handleEditTodoStart(id: number, text: string) {
    setEditingTodoId(id);
    setEditingTodoText(text);
  }

  function handleEditTodoSave(id: number, newText: string) {
    const editedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: newText,
        };
      } else {
        return todo;
      }
    });
    setTodos(editedTodos);
    setEditingTodoId(null);
    setEditingTodoText("");
  }

  function handleEditTodoCancel() {
    setEditingTodoId(null);
    setEditingTodoText("");
  }

  return (
    <div>
      <h1>My Todos</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          {editingTodoId === todo.id ? (
            <div>
              <input
                type="text"
                value={editingTodoText}
                onChange={(e) => setEditingTodoText(e.target.value)}
              />
              <button
                onClick={() => handleEditTodoSave(todo.id, editingTodoText)}
              >
                Save
              </button>
              <button onClick={handleEditTodoCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <span>{todo.text}</span>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleEditTodoStart(todo.id, todo.text)}>
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Todo;
