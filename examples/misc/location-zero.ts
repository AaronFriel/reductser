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
