import { ActionCreator } from './Action';
import { HandlerAction, PayloadAction, SimpleAction } from './ActionTypes';
import { SerializableKey } from './Common';

export type ActionParts = Record<SerializableKey, ActionCreator<any, any, any>>;

// Type functions for inferring the state of action parts:
export type StatefulActionDictionary<S> = {
  [K: string]:
    | ((type: any, reducer: any) => (args: any | void) => HandlerAction<any, any, S>)
    | ((type: any, reducer: any) => (payload: any) => PayloadAction<any, any, any>)
    | ((type: any, reducer: any) => () => SimpleAction<any, any>);
};

export type ActionPartState<T> = T extends StatefulActionDictionary<infer S> ? S : never;

// Type function for applying the type T and reducer R to action parts:
export type MachinedActionPart<Part, T, R extends SerializableKey>
  = Part extends ActionCreator<any, any, () => SimpleAction<any, any>>
    ? ActionCreator<T, R, () => SimpleAction<T, R>>
  : Part extends ActionCreator<any, any, (payload: infer P) => PayloadAction<any, any, any>>
    ? ActionCreator<T, R, (payload: P) => PayloadAction<T, R, P>>
  : Part extends ActionCreator<any, any, (args: void) => HandlerAction<any, any, infer S>>
    ? ActionCreator<T, R, () => HandlerAction<T, R, S>>
  : Part extends ActionCreator<any, any, (args: infer P) => HandlerAction<any, any, infer S>>
    ? ActionCreator<T, R, (args: P) => HandlerAction<T, R, S>>
  : never;

export type ActionFactory<A, R extends SerializableKey> = {
  [K in keyof A]: ReturnType<MachinedActionPart<A[K], K, R>>
};

// Type function for creating the set of actions
export type FunctionMap = {
  [K: string]: (...args: any[]) => any;
};

export type ActionUnion<A extends FunctionMap> = ReturnType<A[keyof A]>;

/** 
 * An object whose values create actions.
 * 
 * @typedef ActionFactory
 */

/**
 * Fills in the type and reducer parameters on an an object values are
 * action creators (see: {@link simpleAction}, {@link payloadAction}, {@link handlerAction}.)
 * 
 * @param actionParts an object whose values are action creators
 * @param reducer the scope (and value of the "reducer" key) on all of the actions created by these actions
 * @returns {ActionFactory}
 */
export function actionFactory<A extends ActionParts, R extends SerializableKey>(
  actionParts: A,
  reducer: R,
): ActionFactory<A, R> {
  return Object.entries(actionParts).reduce(
    (obj, [key, part]) => Object.assign({}, obj, { [key]: part(key, reducer) }),
    {} as ActionFactory<A, R>,
  );
}
