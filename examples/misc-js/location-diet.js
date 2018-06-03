import {
  actionFactory,
  ActionUnion,
  handlerAction,
  payloadAction,
  reductser,
  simpleAction,
} from 'reductser';

function getInitialState() {
  return {
    latitude: undefined,
    longitude: undefined,
  };
}

const locationActionMap = {
  Clear: handlerAction(getInitialState),
  Set: handlerAction(
    (state, { latitude, longitude }) => ({
      ...state,
      latitude,
      longitude,
    }),
  ),
  GoWest: handlerAction((state, distance) => ({
    ...state,
    longitude: state.longitude ? state.longitude - distance : undefined,
  })),
};

export const locationAction = actionFactory(locationActionMap, 'LOCATION_DIET');

export default function reducer(state = getInitialState(), action) {
  if (action.reducer === 'LOCATION_DIET') {
    return action.handler(state);
  }
  return state;
}
