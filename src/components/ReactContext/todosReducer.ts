import { TTodo } from "./todosData";

type TTodoActionAdd = {
  type: "add";
  todo: {
    title: string;
    description: string;
  };
};

type TTodoActionUpdate = {
  type: "update";
  todo: {
    id: number;
    title?: string;
    description?: string;
  };
};

type TTodoActionDelete = {
  type: "delete";
  todo: {
    id: number;
  };
};

export type TTodoAction =
  | TTodoActionAdd
  | TTodoActionUpdate
  | TTodoActionDelete;

let todoId = 2;

export default function todosReducer(todos: TTodo[], action: TTodoAction) {
  switch (action.type) {
    case "add":
      const newTodo: TTodo = {
        id: todoId++,
        title: action.todo.title ?? "New Todo",
        description: action.todo.description ?? "New Todo Description",
      };
      return [...todos, newTodo];
    case "update":
      return todos.map((todo) =>
        todo.id === action.todo.id ? { ...todo, ...action.todo } : todo
      );
    case "delete":
      return todos.filter((todo) => todo.id !== action.todo.id);

    default:
      throw new Error("unknown action type");
  }
}
