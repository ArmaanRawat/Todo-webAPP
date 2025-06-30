import { useState } from "react";
import { TodoProvider } from "./contexts";
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import Toast from "./components/Toast";

function App() {
  const [todos, setTodos] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message, emoji = "🎉") => {
    setToast({ show: true, message: `${emoji} ${message}` });
  };

  const addTodo = (todo) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...todo,
      },
    ]);
    showToast("Task added!", "📝");
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((item) => (item.id === id ? todo : item)));
    showToast("Task updated!", "✏️");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
    showToast("Task deleted!", "🗑️");
  };

  const toggleComplete = (id) => {
    setTodos((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      // If all tasks are completed after this toggle, show congrats
      if (updated.length > 0 && updated.every((item) => item.completed)) {
        showToast("Congratulations! All tasks completed!", "🏆");
      }
      return updated;
    });
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="min-h-screen py-8 px-2 bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 font-sans transition-colors duration-500">
        <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-3xl px-6 py-6 text-gray-900 bg-white/90 backdrop-blur-md border border-white/40 drop-shadow-xl transition-all duration-500 hover:scale-[1.025]">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 mt-2 flex flex-col items-center gap-2">
            <span className="text-5xl animate-bounce">👋🗒️</span>
            <span>Make Your Day Productive!</span>
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3 min-h-[60px]">
            {todos.length === 0 ? (
              <div className="w-full text-center text-2xl text-gray-500 py-12 flex flex-col items-center gap-2">
                <span className="text-6xl">✨</span>
                <span className="font-semibold">
                  Create your todo list for an effective day ahead!
                </span>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="w-full transition-all duration-300 transform hover:scale-[1.025]">
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
        <Toast
          show={toast.show}
          message={toast.message}
          onClose={() => setToast({ show: false, message: "" })}
        />
      </div>
    </TodoProvider>
  );
}

export default App;
