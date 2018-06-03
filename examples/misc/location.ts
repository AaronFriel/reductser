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
