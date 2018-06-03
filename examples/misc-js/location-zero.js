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

export default reductser(
  getInitialState,
  locationActionMap,
  (state, action) => action.handler(state),
);
