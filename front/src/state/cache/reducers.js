import types from './types';
import { generateSearchCache, removeDeprecatedCache } from './helpers';

const INITIAL_STATE = {
  search: {},
};

const avatarsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SEARCH_CACHE:
      return {
        ...state,
        ...generateSearchCache(state, action),
      };
    case types.REMOVE_DEPRECATED_CACHE:
      return {
        ...state,
        ...removeDeprecatedCache(state, action),
      };
    default:
      return state;
  }
};

export default avatarsReducer;
