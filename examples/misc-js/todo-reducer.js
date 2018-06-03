import { handlerAction, reductser } from 'reductser';

let nextTodoId = 0;

function getInitialState() {
  return {
    list: [],
  };
}

export const todos = reductser(
  getInitialState,
  {
    add: handlerAction((state, text) => ({
      ...state,
      list: [
        ...state.list,
        {
          text,
          completed: false,
          id: (nextTodoId = nextTodoId + 1),
        },
      ],
    })),
    toggle: handlerAction((state, id) => ({
      ...state,
      list: state.list.map(
        todo =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
      ),
    })),
  },
  (state, action) => {
    return action.handler(state);
  },
);
