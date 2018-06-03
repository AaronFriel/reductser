import test from 'ava';
import equal from 'fast-deep-equal';
import { check, gen, property } from 'testcheck';

import packageJson from '../package.json';
import { handlerAction, payloadAction, simpleAction } from '../src/Action';

const testcheckOptions = packageJson.testcheck;

test('simpleAction returns a SimpleAction constructor', t => {
  const { result } = check(
    property(gen.string, gen.string, (type, reducer) => {
      const createAction = simpleAction()(type, reducer);

      const resultAction = createAction();
      const expectedAction = {
        reducer,
        type,
      };

      if (equal(resultAction, expectedAction)) {
        return true;
      }

      t.log({
        resultAction,
        expectedAction,
      });
      return false;
    }),
    testcheckOptions,
  );

  t.true(result);
});

test('payloadAction returns a PayloadAction constructor', t => {
  const { result } = check(
    property(gen.any, gen.string, gen.string, (payload, type, reducer) => {
      const createAction = payloadAction<any>()(type, reducer);

      const resultAction = createAction(payload);
      const expectedAction = {
        reducer,
        type,
        payload,
      };

      if (equal(resultAction, expectedAction)) {
        return true;
      }

      t.log({
        resultAction,
        expectedAction,
      });
      return false;
    }),
    testcheckOptions,
  );

  t.true(result);
});

test('handlerAction returns a HandlerAction constructor', t => {
  const { result } = check(
    property(
      gen.any,
      gen.any,
      gen.string,
      gen.string,
      (state, args, type, reducer) => {
        const createAction = handlerAction((s, a) => [s, a])(type, reducer);

        const { handler, ...resultAction } = createAction(args);

        const expectedState = [state, args];
        const resultState = handler(state);

        const expectedAction = {
          reducer,
          type,
        };

        if (equal(resultAction, expectedAction) && equal(resultState, expectedState)) {
          return true;
        }

        t.log({
          action: {
            resultAction,
            expectedAction,
          },
          state: {
            resultState,
            expectedState,
          },
        });
        return false;
      },
    ),
  );

  t.true(result);
});
