import TodoList from "./components/todolist";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="todo-list">
        <TodoList />
      </div>
    </main>
  );
}