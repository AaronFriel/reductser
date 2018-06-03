import {
  actionFactory,
  ActionUnion,
  handlerAction,
  reductser,
  ReductserFactory,
  reductserFactory,
} from 'reductser';

export interface CounterState {
  value: number;
}

function getInitialState(): CounterState {
  return {
    value: 0,
  };
}

export const counter = reductser(
  getInitialState,
  {
    increment: handlerAction<CounterState, number | undefined>(({ value }, amount: number = 1) => ({
      value: value + amount,
    })),
  },
  (state, action) => {
    return action.handler(state);
  },
);
