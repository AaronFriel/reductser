import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AnyAction } from 'redux';

import { actions } from '../reducers';

interface Props {
  dispatch: Dispatch<AnyAction>;
}

const AddTodo = ({ dispatch }: Props) => {
  let input: HTMLInputElement | null;

  return (
    <div>
      <form
        onSubmit={e => {
          if (input) {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            dispatch(actions.todos.add(input.value));
            input.value = '';
          }
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect()(AddTodo);
