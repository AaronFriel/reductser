# Reductser

[![npm version](https://img.shields.io/npm/v/reductser.svg?style=flat-square)](https://www.npmjs.com/package/reductser)


#### Redux with No Strings Attached

#### [API Docs](docs/api.md)

You've read Erik Rasmussen's proposal, [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux) and Martin Hotell's [Improved Redux type safety with TypeScript 2.8](https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575), but you're not satisfied? The amount of stringly-typed Redux code leaving a bad taste in your mouth and code smells all over your tests?

Look no further than to ***REDUCTSER***! It's pronounced liked the famously sticky gray tape and it's just as powerful at gluing together your actions, reducers, and their behavior. Reductser can be used in a few different ways. Each with fewer strings than the last:

* [Reductser regular](#reductser-regular), scoping actions with an `actionFactory`, which adds to each action a property that scopes the actions. All of the action `type` properties are generated based on their keys, and the types carry over to the reducer static type checking and completion in supporting editors.

* [Reductser diet](#reductser-diet) using the `handlerAction` constructor exclusively, the reducer becomes a simple if statement with no strings except the reducer name.

* [Reductser zero](#reductser-zero) using the `reductser` constructor, even the reducer is now scoped by its key when supplied to a `reductserFactory`.

Here's what the the action creator type checking and code completion looks like:

![reductser-actions-completion](/docs/reductser-actions-completion.gif)

## Recipes

Add the reductser library to your project:

```sh
npm install --save reductser
```

All of these recipes start with the following import, interface, and function:

```ts
import {
  actionFactory,
  ActionUnion,
  handlerAction,
  payloadAction,
  reductser,
  simpleAction,
} from 'reductser';

interface LocationState {
  latitude?: number;
  longitude?: number;
  error?: string;
}

function getInitialState(): LocationState {
  return {
    latitude: undefined,
    longitude: undefined,
  };
}
```

### Reductser Regular

Easier to work with existing reducers, Reductser handles scoping based on keys. Code completion and type checking works on these scoped actions and their payloads.

```ts
const locationActionMap = {
  Clear: simpleAction(),
  Set: payloadAction<{
    latitude: number;
    longitude: number;
  }>(),
  GoWest: handlerAction<LocationState, number>((state, distance): LocationState => ({
    ...state,
    longitude: state.longitude ? state.longitude - distance : undefined,
  })),
};

export const locationAction = actionFactory(locationActionMap, 'LOCATION');

type LocationAction = ActionUnion<typeof locationAction>;

export default function reducer(state = getInitialState(), action: LocationAction): LocationState {
  switch (action.reducer) {
    case 'LOCATION': {
      switch (action.type) {
        case 'Set': {
          const { latitude, longitude } = action.payload;
          return { ...state, latitude, longitude };
        }
        case 'Clear':
          return { ...state, latitude: undefined, longitude: undefined };
        default:
          return action.handler(state);
      }
    }
    default:
      return state;
  }
}
```

### Reductser Diet

Converting all of the actions to use the `handlerAction` constructor allows removing every string except the reducer name.

```ts
const locationActionMap = {
  Clear: handlerAction<LocationState, void>(getInitialState),
  Set: handlerAction<LocationState, { latitude: number; longitude: number }>(
    (state, { latitude, longitude }) => ({
      ...state,
      latitude,
      longitude,
    }),
  ),
  GoWest: handlerAction<LocationState, number>((state, distance): LocationState => ({
    ...state,
    longitude: state.longitude ? state.longitude - distance : undefined,
  })),
};

export const locationAction = actionFactory(locationActionMap, 'LOCATION_DIET');

type LocationAction = ActionUnion<typeof locationAction>;

export default function reducer(state = getInitialState(), action: LocationAction): LocationState {
  if (action.reducer === 'LOCATION_DIET') {
    return action.handler(state);
  }
  return state;
}
```

### Reductser Zero

Finally, we can remove even that string by using the `reductser` constructor, and we get (for free!) scoped actions using the `reductserFactory`. (See just below in **Tying it all together**).

```ts
const locationActionMap = {
  Clear: handlerAction<LocationState, void>(getInitialState),
  Set: handlerAction<LocationState, { latitude: number; longitude: number }>(
    (state, { latitude, longitude }) => ({
      ...state,
      latitude,
      longitude,
    }),
  ),
  GoWest: handlerAction<LocationState, number>((state, distance): LocationState => ({
    ...state,
    longitude: state.longitude ? state.longitude - distance : undefined,
  })),
};

export default reductser(
  getInitialState,
  locationActionMap,
  (state, action) => action.handler(state),
);
```

### Tying it all together

The first two recipes produce regular Redux reducers and action creators, but what about this? To use a `reductser` with `combineReducers`, we use a `reductserFactory`. The `actions` key provides scoped action creators for every reductser, and the `reducers` key can be used with `combineReducers`, either as an argument or using the spread operator:

```ts
import { combineReducers } from 'redux';

import { reductserFactory } from 'reductser';

import location from './location';
import locationDiet from './location-diet';
import locationZero from './location-zero';

const { actions, reducers } = reductserFactory({
  locationZero,
});

export { actions };

export const reducer = combineReducers({
  location,
  locationDiet,
  ...reducers,
});
```

### Disclaimer

No strings, despite certain strongly held beliefs about them, were harmed in the making of this library.