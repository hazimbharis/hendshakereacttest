"use client";

import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold mb-4">To-Do List</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Enter a task..."
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            {todo}
            <button onClick={() => removeTodo(index)} className="text-red-500">
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
