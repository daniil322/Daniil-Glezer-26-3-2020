import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import weatherReducer from '../reducers/weather-reducer';

const Store = createStore(
  weatherReducer,
  (applyMiddleware(thunk))
);

export default Store;