import { createContext, ReactNode, useContext, useReducer } from "react";
import { initTodos, TTodo } from "./todosData";
import todosReducer, { TTodoAction } from "./todosReducer";

const TodosContext = createContext<TTodo[]>([]);
const TodosDispatchContext = createContext<
  ((action: TTodoAction) => void) | null
>(null);

export default function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, initTodos);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);

  if (dispatch === null)
    throw new Error("useTodosDispatch should be used inside TodosProvider");

  return dispatch;
}
