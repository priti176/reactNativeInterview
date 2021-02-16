import {createStore, applyMiddleware} from 'redux';
import reducers from './Reducer';
import thunk from 'redux-thunk';

var middlewares = applyMiddleware(thunk);

export default function configureStore(initialState) {
  return createStore(reducers, initialState, middlewares);
}