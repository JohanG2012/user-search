import types from './types';

const INITIAL_STATE = {
  isLoading: false,
  data: [],
  error: [],
};

const avatarsReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.FETCH_AVATARS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };
    case types.FETCH_AVATARS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_AVATARS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.data,
      };
    default:
      return state;
  }
};

export default avatarsReducer;
