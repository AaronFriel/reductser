import { Reducer } from 'redux';

import { ActionFactory, ActionUnion, FunctionMap } from './ActionFactory';
import { SerializableKey } from './Common';
import { ReductserCreator } from './Reductser';

export type ReducerParts<T> = {
  [K in keyof T]: T[K] extends ReductserCreator<infer A, infer S, any> ? ReductserCreator<A, S, any> : never;
}

export type ReductserFactory<R> = {
  actions: {
    [K in keyof R & SerializableKey]: R[K] extends ReductserCreator<infer A, any, any>
      ? ActionFactory<A, K>
      : never
  },
  reducers: {
    [K in keyof R & SerializableKey]: R[K] extends ReductserCreator<infer A, infer S, any>
      ? Reducer<S, ActionUnion<ActionFactory<A, K>>>
      : never
  },
}

/** 
 * The result of supplying reductsers to a {@link reductserFactory}
 * 
 * @typedef ReductserFactory
 * @property actions action constructors
 * @property reducers - Indicates whether the Power component is present.
 * @param {SerializableKey} reducer
 * @returns {object}
 */

/** 
 * The result of supplying reductsers to a {@link reductserFactory}
 * 
 * @typedef ReductserFactory
 * @property actions action constructors
 * @property reducers - Indicates whether the Power component is present.
 * @param {SerializableKey} reducer
 * @returns {object}
 */

/**
 * Returns the scoped actions and reducers from a map of reductsers.
 *
 * @param reducerParts An object whose values were constructed by {@link reductser}
 * @returns {ReductserFactory}
 */
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
