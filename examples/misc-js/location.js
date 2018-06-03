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
  Clear: simpleAction(),
  Set: payloadAction(),
  GoWest: handlerAction((state, distance) => ({
    ...state,
    longitude: state.longitude ? state.longitude - distance : undefined,
  })),
};

export const locationAction = actionFactory(locationActionMap, 'LOCATION');

export default function reducer(state = getInitialState(), action) {
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
