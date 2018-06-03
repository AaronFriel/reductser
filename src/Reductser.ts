import { Reducer } from 'redux';

import {
  ActionFactory,
  actionFactory,
  ActionParts,
  ActionPartState,
  ActionUnion,
} from './ActionFactory';
import { SerializableKey } from './Common';

export type ReductserCreator<
  A extends ActionParts,
  S extends ActionPartState<A>,
  R extends SerializableKey
> = (
  reducerName: R,
) => {
  actions: ActionFactory<A, R>;
  reducer: Reducer<S, ActionUnion<ActionFactory<A, R>>>;
};

/** 
 * An intermediate type used by {@link reductserFactory}
 * 
 * @typedef ReductserCreator
 * @param {SerializableKey} reducer
 * @returns Reductser Parts
 */

/**
 * Create a reductser, to be supplied as values on an object supplied to a {@link reductserFactory}.
 *
 * @export
 * @param initialState A function producing an initial state.
 * @param actionParts An object whose values are action creators, e.g.: {@link simpleAction}
 * @param reducer A reducer on the previous state and the incoming action.
 * @returns {ReductserCreator}
 */
export function reductser<
  A extends ActionParts,
  S extends ActionPartState<A>,
  R extends SerializableKey
>(
  initialState: () => S,
  actionParts: A,
  reducer: (state: S, action: ActionUnion<ActionFactory<A, R>>) => any,
): ReductserCreator<A, S, R> {
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
