import * as React from 'react';

interface Props {
  onClick: (event: React.MouseEvent<any>) => void;
  completed: boolean;
  text: string;
}

const Todo = ({ onClick, completed, text }: Props) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

export default Todo;
