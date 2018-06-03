import {
  actionFactory,
  ActionUnion,
  handlerAction,
  reductser,
  ReductserFactory,
  reductserFactory,
} from 'reductser';

function getInitialState() {
  return {
    value: 0,
  };
}

export const counter = reductser(
  getInitialState,
  {
    increment: handlerAction(({ value }, amount = 1) => ({
      value: value + amount,
    })),
  },
  (state, action) => {
    return action.handler(state);
  },
);
