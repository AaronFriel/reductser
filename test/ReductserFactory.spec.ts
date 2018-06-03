import test from 'ava';
import equal from 'fast-deep-equal';
import { check, gen, property } from 'testcheck';

import packageJson from '../package.json';
import {
  ActionUnion,
  handlerAction,
  payloadAction,
  reductser,
  simpleAction,
} from '../src';

const testcheckOptions = packageJson.testcheck;

test('Calculator reducer scenario', t => {
  const calculator = reductser(
    () => 0,
    {
      neg: simpleAction(),
      add: payloadAction<number>(),
      sub: payloadAction<number>(),
      mul: handlerAction<number, number>((x, y) => x * y),
      div: handlerAction<number, number>((x, y) => x / y),
      set: handlerAction<number, number>((_, y) => y),
    },
    (x, action) => {
      switch (action.type) {
        case 'neg':
          return -x;
        case 'add':
          return x + action.payload;
        case 'sub':
          return x - action.payload;
        default:
          return action.handler(x);
      }
    },
  );

  const { actions, reducer } = calculator('calculator');

  const { neg, add, sub, mul, div, set } = actions;

  type actions = ActionUnion<typeof actions>;

  const genAction = gen.oneOf<actions>([
    gen.return(neg()),
    gen.number.then(add),
    gen.number.then(sub),
    gen.number.then(mul),
    gen.number.then(div),
    gen.number.then(set),
    gen.return(div(0)),
  ]);

  const { result, ...parts } = check(
    property(gen.number, genAction, (state, action) => {
        let expectedState = state;
        switch (action.type) {
          case 'neg':
            expectedState = -expectedState;
            break;
          case 'add':
            expectedState = expectedState + action.payload;
            break;
          case 'sub':
            expectedState = expectedState - action.payload;
            break;
          default:
            expectedState = action.handler(expectedState);
        }
        const resultState = reducer(state, action);

        const valid = equal(resultState, expectedState);

        if (!valid) {
          t.log({
            state,
            expectedState,
            valid,
            action,
          });
          return false;
        }
        return true;
      }
    ),
    testcheckOptions,
  );

  t.true(result);
  t.log(parts);
});
