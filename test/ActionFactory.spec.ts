import test, { ExecutionContext } from 'ava';
import equal from 'fast-deep-equal';
import { check, gen, property } from 'testcheck';

import packageJson from '../package.json';
import {
  ActionCreator,
  handlerAction,
  payloadAction,
  simpleAction,
} from '../src/Action';
import { actionFactory } from '../src/ActionFactory';
import { HandlerAction, PayloadAction, SimpleAction } from '../src/ActionTypes';

const testcheckOptions = packageJson.testcheck;

test('actionFactory produces an object of action creators', t => {
  const { foo, bar, quux, ...rest } = actionFactory(
    {
      foo: simpleAction(),
      bar: payloadAction<number>(),
      quux: handlerAction<string, number>((str, num) => `${str}${num}`),
    },
    'xyzzy',
  );

  const fooExpectedResult = {
    type: 'foo',
    reducer: 'xyzzy',
  };

  const fooResult = foo();

  const barExpectedResult = {
    type: 'bar',
    payload: 42,
    reducer: 'xyzzy',
  };

  const barResult = bar(42);

  const quuxExpectedHandlerResult = 'the answer42';

  const quuxExpectedAction = {
    type: 'quux',
    reducer: 'xyzzy',
  };

  const { handler: quuxHandler, ...quuxAction } = quux(42);

  const quuxHandlerResult = quuxHandler('the answer');

  const expectedRest = {};

  t.deepEqual(fooResult, fooExpectedResult);
  t.deepEqual(barResult, barExpectedResult);
  t.deepEqual(quuxAction, quuxExpectedAction);
  t.deepEqual(quuxHandlerResult, quuxExpectedHandlerResult);
  t.deepEqual(rest, expectedRest);
});

test('actionFactory assigns types to constructor', t => {
  const { result } = check(
    property(
      genActionParts,
      gen.string,
      gen.JSON,
      gen.JSON,
      ([actionParts, actionTypes], reducer, payload, state) => {
        const actions = actionFactory(actionParts, reducer);

        for (const [type, actionType] of Object.entries(actionTypes)) {
          switch (actionType) {
            case ActionType.Simple: {
              // @ts-ignore
              const action = actions[type]();
              const passed = testSimple(t, action, type, reducer);
              if (!passed) return false;
              break;
            }
            case ActionType.Payload: {
              // @ts-ignore
              const action = actions[type](payload);
              // @ts-ignore
              const passed = testPayload(t, action, type, reducer, payload);
              if (!passed) return false;
              break;
            }
            case ActionType.Handler: {
              // @ts-ignore
              const action = actions[type](payload);
              // @ts-ignore
              const passed = testHandler(t, action, type, reducer, payload, state);
              if (!passed) return false;
              break;
            }
          }
        }

        return true;
      },
    ),
    { ...testcheckOptions, numTests: 50, maxSize: 50},
  );

  t.true(result);
});

function testSimple(
  t: ExecutionContext<{}>,
  action: SimpleAction<string, string>,
  type: string,
  reducer: string,
) {
  if (
    equal(action, {
      type,
      reducer,
    })
  ) {
    return true;
  }
  t.log({
    action,
    type,
    reducer,
  });
  return false;
}

function testPayload(
  t: ExecutionContext<{}>,
  action: PayloadAction<string, string, any>,
  type: string,
  reducer: string,
  payload: any,
) {
  if (
    equal(action, {
      type,
      reducer,
      payload,
    })
  ) {
    return true;
  }

  t.log({
    action,
    type,
    reducer,
    payload,
  });
  return false;
}

function testHandler(
  t: ExecutionContext<{}>,
  action: HandlerAction<string, string, any>,
  type: string,
  reducer: string,
  payload: any,
  state: any,
) {
  const { handler, ...rest } = action;

  const resultState = handler(state);

  if (
    equal(rest, {
      type,
      reducer,
    }) &&
    equal(resultState, [state, payload])
  ) {
    return true;
  }
  t.log({
    action,
    type,
    reducer,
    payload,
    state,
    resultState,
  });
  return false;
}

enum ActionType {
  Simple,
  Payload,
  Handler,
}

const genActionType = gen.oneOf([
  gen.return(ActionType.Simple),
  gen.return(ActionType.Payload),
  gen.return(ActionType.Handler),
]);

function createActionOfType(actionType: ActionType) {
  switch (actionType) {
    case ActionType.Simple:
      return simpleAction();
    case ActionType.Payload:
      return payloadAction();
    case ActionType.Handler:
      return handlerAction((state, replacement) => [state, replacement]);
  }
}

interface GeneratedActions {
  [key: string]:
    | ActionCreator<any, any, () => SimpleAction<any, any>>
    | ActionCreator<any, any, (payload: any) => PayloadAction<any, any, any>>
    | ActionCreator<any, any, (...args: any[]) => HandlerAction<any, any, any>>;
}

const genActionParts = gen
  .object(gen.string, genActionType)
  .then<[GeneratedActions, { [key: string]: ActionType }]>(typeMap => {
    return [
      Object.entries(typeMap).reduce(
        (parts, [key, type]) => {
          return Object.assign({}, parts, {
            [key]: createActionOfType(type),
          });
        },
        {} as GeneratedActions,
      ),
      typeMap,
    ];
  });
