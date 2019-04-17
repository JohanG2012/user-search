import types from './types';
/* eslint-disable no-underscore-dangle */

const INITIAL_STATE = {
  data: [],
  search: {},
  next: {
    users: '',
    permission: '',
  },
};

const avatarsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
      };
    case types.FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.payload.data,
      };
    case types.SET_NEXT:
      return {
        ...state,
        next: {
          ...state.next,
          users: action.payload.next,
        },
      };
    case types.SET_PERMISSION_NEXT:
      return {
        ...state,
        next: {
          ...state.next,
          permission: action.payload.next,
        },
      };
    case types.UPDATE_USER:
      return {
        ...state,
        data: state.data.map(user =>
          user._id === action.payload.id ? { ...user, ...action.payload.user } : user,
        ),
      };
    default:
      return state;
  }
};

export default avatarsReducer;
