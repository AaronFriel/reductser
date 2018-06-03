import { reductserFactory } from 'reductser';
import { combineReducers } from 'redux';

import { todos } from './todos';
import visibilityFilter from './visibilityFilter';

const reductsers = reductserFactory({
  todos
});

export default combineReducers({
  visibilityFilter,
  ...reductsers.reducers
});

export const actions = reductsers.actions;

export * from './todos';
export * from './visibilityFilter';
