import {combineReducers, createStore} from 'redux';
import {globalReducer} from './globalReducer';

const reducers = combineReducers({
  global: globalReducer
});

const store = createStore(
  reducers,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const state = store.getState()

export type State = typeof state
export default store;