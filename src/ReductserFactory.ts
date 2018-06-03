import { Reducer } from 'redux';

import { ActionFactory, ActionUnion, FunctionMap } from './ActionFactory';
import { SerializableKey } from './Common';
import { ReducerCreator } from './Reductser';

export type ReducerParts<T> = {
  [K in keyof T]: T[K] extends ReducerCreator<infer A, infer S, infer R> ? ReducerCreator<A, S, any> : never;
}

export type ReductserFactory<R> = {
  actions: {
    [K in keyof R & SerializableKey]: R[K] extends ReducerCreator<infer A, infer S, any>
      ? ActionFactory<A, K>
      : never
  };
  reducers: {
    [K in keyof R & SerializableKey]: R[K] extends ReducerCreator<infer A, infer S, any>
      ? Reducer<S, ActionUnion<ActionFactory<A, K>>>
      : never
  };
}

export function reductserFactory<T extends FunctionMap>(reducerParts: T & ReducerParts<T>): ReductserFactory<T> {
  return Object.entries(reducerParts).reduce(
    (obj, [reducerName, reducerPart]) => {
      const { actions, reducer } = reducerPart(reducerName);

      return {
        actions: Object.assign({}, obj.actions, {
          [reducerName]: actions,
        }),
        reducers: Object.assign({}, obj.reducers, {
          [reducerName]: reducer,
        }),
      };
    },
    {
      actions: {},
      reducers: {},
    } as ReductserFactory<T>,
  );
}
