import { Reducer } from 'redux';

import {
  ActionFactory,
  actionFactory,
  ActionParts,
  ActionPartState,
  ActionUnion,
} from './ActionFactory';
import { SerializableKey } from './Common';

export type ReducerCreator<
  A extends ActionParts,
  S extends ActionPartState<A>,
  R extends SerializableKey
> = (
  reducerName: R,
) => {
  actions: ActionFactory<A, R>;
  reducer: Reducer<S, ActionUnion<ActionFactory<A, R>>>;
};

export function reductser<
  A extends ActionParts,
  S extends ActionPartState<A>,
  R extends SerializableKey
>(
  initialState: () => S,
  actionParts: A,
  reducer: (state: S, action: ActionUnion<ActionFactory<A, R>>) => any,
): ReducerCreator<A, S, R> {
  return (reducerName: R) => ({
    actions: actionFactory<A, R>(actionParts, reducerName),
    reducer: (state = initialState(), action: ActionUnion<ActionFactory<A, R>>) => {
      if (action.reducer === reducerName) {
        return reducer(state, action);
      }
      return state;
    },
  });
}
