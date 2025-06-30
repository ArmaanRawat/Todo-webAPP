import React from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = React.useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}

export default TodoForm;

// Note: The form submission logic should be handled in the parent component or using a context.
// This component assumes that the necessary state management and context are set up in the parent component.
// The form should call the addTodo function from the context when the form is submitted.
// You can use the useTodo hook to access the addTodo function and pass it to this component as a prop or use it directly within this component.
// Ensure that the TodoContext is properly set up in the parent component to provide the necessary functions
// and state for managing todos.
// This component is designed to be reusable and can be placed within the TodoProvider context in the App component.
// It will allow users to add new todos to the list, which can then be displayed in the TodoItem component.
// The form should handle the input state and call the addTodo function when the form is submitted.
// You can also add validation to ensure that the input is not empty before adding a new todo.
// Additionally, you can enhance the form with features like auto-focus, clear input after submission, and error handling.
// This will improve the user experience and make the todo management process more efficient
