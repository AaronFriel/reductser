import { connect, Dispatch } from 'react-redux';
import { AnyAction } from 'redux';

import TodoList, { TodoListProps } from '../components/TodoList';
import { actions, TodoItem, VisibilityFilters } from '../reducers';
import { State } from '../store';

const getVisibleTodos = (todos: TodoItem[], filter: VisibilityFilters) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

function mapStateToProps(state: State): Pick<TodoListProps, 'todos'> {
  const { todos } = state;
  return {
    todos: getVisibleTodos(todos.list, state.visibilityFilter)
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>
): Pick<TodoListProps, 'toggleTodo'> {
  return {
    toggleTodo: (id: number) => dispatch(actions.todos.toggle(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
