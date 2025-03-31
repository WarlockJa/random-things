import { useState } from "react";
import TodosProvider, { useTodos, useTodosDispatch } from "./TodosProvider";
import { TTodo } from "./todosData";

export default function Todos() {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  return (
    <TodosProvider>
      <h1>Todos</h1>
      {isAddingTodo ? (
        <AddTodo closeAddTodo={() => setIsAddingTodo(false)} />
      ) : (
        <button onClick={() => setIsAddingTodo(true)}>Add New Todo</button>
      )}
      <TodosList />
    </TodosProvider>
  );
}

function AddTodo({ closeAddTodo }: { closeAddTodo: () => void }) {
  const [newTodo, setNewTodo] = useState<Pick<TTodo, "title" | "description">>({
    title: "",
    description: "",
  });
  const dispatch = useTodosDispatch();

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
      </div>
      <button
        onClick={() => {
          dispatch({ type: "add", todo: newTodo });
          closeAddTodo();
        }}
      >
        Add
      </button>
      <button onClick={closeAddTodo}>Cancel</button>
    </div>
  );
}

function TodosList() {
  const todos = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

function Todo({ todo }: { todo: TTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<TTodo>(todo);
  const dispatch = useTodosDispatch();
  return isEditing ? (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          type="text"
          value={editedTodo.title}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, title: e.target.value })
          }
        />
        <input
          type="text"
          value={editedTodo.description}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, description: e.target.value })
          }
        />
      </div>
      <button
        onClick={() => {
          dispatch({ type: "update", todo: editedTodo });
          setIsEditing(false);
        }}
      >
        Save
      </button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  ) : (
    <div>
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button
        onClick={() => dispatch({ type: "delete", todo: { id: todo.id } })}
      >
        Delete
      </button>
    </div>
  );
}
