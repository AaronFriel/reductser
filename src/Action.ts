import { HandlerAction, PayloadAction, SimpleAction } from './ActionTypes';
import { SerializableKey } from './Common';

export type ActionCreator<T, R extends SerializableKey, C> = (type: T, reducer: R) => C;

/** 
 * An intermediate type used by {@link actionFactory}
 * 
 * @typedef ActionCreator
 * @param {SerializableKey} type
 * @param {SerializableKey} reducer
 * @returns {object}
 */

/**
 * An action creator with no payload.
 * @returns {ActionCreator}
 */
export function simpleAction(): ActionCreator<any, any, () => SimpleAction<any, any>> {
  return (type: any, reducer: any) => () => {
    return { reducer, type };
  };
}

/**
 * An action creator with a typed payload.
 *
 * @returns {ActionCreator}
 */
export function payloadAction<P>(): ActionCreator<any, any, (payload: P) => PayloadAction<P>> {
  return (type: any, reducer: any) => (payload: P) => ({
    type,
    reducer,
    payload,
  });
}

/**
 * An action creator with a handler function payload.
 * 
 * @param handler like a reducer, a function taking the previous state and 
 * arguments to the action creator to create a new state.
 * @returns {ActionCreator}
 */
export function handlerAction<S = any, P = any>(
  handler: (state: S, args: P) => S
): ActionCreator<any, any, (args: P) => HandlerAction<any, any, S>> {
  return (type: any, reducer: any) => (args: P) => ({
    type,
    reducer,
    handler: (state: S) => handler(state, args),
  });
}
