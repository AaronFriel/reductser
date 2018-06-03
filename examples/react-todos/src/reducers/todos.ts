import { handlerAction, reductser } from 'reductser';

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  list: TodoItem[];
}

let nextTodoId = 0;

function getInitialState(): TodoState {
  return {
    list: []
  };
}

export const todos = reductser(
  getInitialState,
  {
    add: handlerAction<TodoState, string>((state, text): TodoState => ({
      ...state,
      list: [
        ...state.list,
        {
          id: nextTodoId++,
          text,
          completed: false
        }
      ]
    })),
    toggle: handlerAction<TodoState, number>((state, id): TodoState => ({
      ...state,
      list: state.list.map(
        todo =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed
              }
            : todo
      )
    }))
  },
  (state, action) => {
    return action.handler(state);
  }
);
