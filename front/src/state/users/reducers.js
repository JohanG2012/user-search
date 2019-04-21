import { uniq } from 'underscore';
import types from './types';
/* eslint-disable no-underscore-dangle */

const INITIAL_STATE = {
  data: [],
  next: {
    users: '',
    assignedUsers: '',
  },
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: uniq([...state.data, ...action.payload.data], '_id'),
      };
    case types.SET_NEXT:
      return {
        ...state,
        next: {
          ...state.next,
          users: action.payload.next,
        },
      };
    case types.SET_ASSIGNED_NEXT:
      return {
        ...state,
        next: {
          ...state.next,
          assignedUsers: action.payload.next,
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

export default usersReducer;
