import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { apiMiddleware } from 'redux-api-middleware';
import avatars from './avatars';
import users from './users';
import loading from './loading';
import search from './search';
import cache from './cache';

const middlewares = [thunk, apiMiddleware];
const composeEnhancers = composeWithDevTools({});
const middleware = composeEnhancers(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
  avatars,
  users,
  loading,
  search,
  cache,
});

/**
 * Takes initial state and returns redux store configured
 * @param  {Object} initialState Inital state
 * @return {Object}              Redux store
 */
const configureStore = initialState => {
  const store = createStore(rootReducer, middleware, initialState);
  return { store };
};

export default configureStore;
