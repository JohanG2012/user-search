import types from './types';

const INITIAL_STATE = {
  data: [],
  error: [],
};

const avatarsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_AVATARS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default avatarsReducer;
