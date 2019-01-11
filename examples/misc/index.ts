import { reductserFactory } from 'reductser';
import { combineReducers } from 'redux';

import { counter } from './counter-reducer';
import location from './location';
import locationDiet from './location-diet';
import locationZero from './location-zero';
import { todos } from './todo-reducer';

const { actions, reducers } = reductserFactory({
  counter,
  locationZero,
  todos,
});

export { actions };

export const reducer = combineReducers({
  location,
  locationDiet,
  ...reducers,
});
