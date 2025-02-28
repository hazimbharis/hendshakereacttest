"use client";

import { useState, useEffect } from "react";

type Todo = {
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [formData, setFormData] = useState<Todo>({
    activity: "",
    price: 0,
    type: "Education",
    bookingRequired: false,
    accessibility: 0.5,
  });

  // Load tasks from localStorage when the page loads
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save tasks to localStorage whenever `todos` changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function called when submitting a task from the form, adding it to the list
  const addTodo = () => {
    if (!formData.activity.trim()) return;
    setTodos([...todos, formData]);
    setFormData({ activity: "", price: 0, type: "Education", bookingRequired: false, accessibility: 0.5 });
  };

  // Function called when clicking the delete button to remove tasks from the list
  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      {/* Total Items Count */}
      <div className="text-lg font-semibold text-gray-700 text-center">
        Total Activities: <span className="text-blue-600">{todos.length}</span>
      </div>  

      {/* Form */}
      <div className="space-y-3">
        <input
          type="text"
          value={formData.activity}
          onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
          className="w-full border p-2 rounded"
          placeholder="Enter your activity..."
        />

        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          className="w-full border p-2 rounded"
          placeholder="Price"
        />

        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full border p-2 rounded"
        >
          {["Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.bookingRequired}
            onChange={(e) => setFormData({ ...formData, bookingRequired: e.target.checked })}
          />
          Booking Required
        </label>

        <div className="flex flex-col">
          <label>Accessibility: {formData.accessibility}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={formData.accessibility}
            onChange={(e) => setFormData({ ...formData, accessibility: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>

        <button onClick={addTodo} className="w-full bg-blue-500 text-white p-2 rounded">
          Add Activity
        </button>
      </div>

      {/* List */}
      <ul className="mt-4 space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <div>
              <strong>{todo.activity}</strong> - {todo.type} (£{todo.price})  
              {todo.bookingRequired && <span className="text-red-500 ml-2">(Booking Required)</span>}
              <span className="block text-sm text-gray-600">Accessibility: {todo.accessibility}</span>
            </div>
            <button onClick={() => removeTodo(index)} className="text-red-500">✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
