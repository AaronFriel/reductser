import { createStore } from 'redux';

import rootReducer from '../reducers';

const store = createStore(rootReducer);

export type State = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;
