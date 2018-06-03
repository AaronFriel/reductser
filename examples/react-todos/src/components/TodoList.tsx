import * as React from 'react';

import { TodoItem } from '../reducers';

import Todo from './Todo';

export interface TodoListProps {
  todos: TodoItem[];
  toggleTodo: (id: number) => void;
}

const TodoList = ({ todos, toggleTodo }: TodoListProps) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
);
export default TodoList;
