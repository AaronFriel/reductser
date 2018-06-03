import { HandlerAction, PayloadAction, SimpleAction } from './ActionTypes';
import { SerializableKey } from './Common';

export type ActionCreator<T, R extends SerializableKey, C> = (type: T, reducer: R) => C;

export function simpleAction(): ActionCreator<any, any, () => SimpleAction<any, any>> {
  return (type: any, reducer: any) => () => {
    return { reducer, type };
  };
}

export function payloadAction<P>(): ActionCreator<any, any, (payload: P) => PayloadAction<P>> {
  return (type: any, reducer: any) => (payload: P) => ({
    type,
    reducer,
    payload,
  });
}

export function handlerAction<S = any, P = any>(
  handle: (state: S, args: P) => S,
): ActionCreator<any, any, (args: P) => HandlerAction<any, any, S>> {
  return (type: any, reducer: any) => (args: P) => ({
    type,
    reducer,
    handler: (state: S) => handle(state, args),
  });
}
