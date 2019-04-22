import types from './types';
/* eslint-disable no-underscore-dangle */

const INITIAL_STATE = {
  users: {
    data: [],
    next: '',
  },
  assignedUsers: {
    data: [],
    next: '',
  },
};

const avatarsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: {
          data: action.payload.prev
            ? [...state.users.data, ...action.payload.data]
            : action.payload.data,
          next: action.payload.nextPage,
        },
      };
    case types.SEARCH_ASSIGNED_USERS_SUCCESS:
      return {
        ...state,
        assignedUsers: {
          data: action.payload.prev
            ? [...state.assigned.data, ...action.payload.data]
            : action.payload.data,
          next: action.payload.nextPage,
        },
      };
    case types.SEARCH_USERS_RESET:
      return {
        ...state,
        users: {
          data: [],
          next: '',
        },
      };
    case types.SEARCH_ASSIGNED_USERS_RESET:
      return {
        ...state,
        assignedUsers: {
          data: [],
          next: '',
        },
      };
    case types.UPDATE_USERS_SEARCH:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.map(user =>
            user._id === action.payload.id ? { ...user, ...action.payload.user } : user,
          ),
        },
      };
    case types.UPDATE_ASSIGNED_SEARCH:
      return {
        ...state,
        assignedUsers: {
          ...state.users,
          data: state.assignedUsers.data.map(user =>
            user._id === action.payload.id ? { ...user, ...action.payload.user } : user,
          ),
        },
      };
    case types.REMOVE_FROM_USERS_SEARCH:
      return {
        ...state,
        users: {
          ...state.users,
          data: state.users.data.filter(user => user._id !== action.payload.id),
        },
      };
    case types.REMOVE_FROM_ASSIGNED_SEARCH:
      return {
        ...state,
        assignedUsers: {
          ...state.assignedUsers,
          data: state.assignedUsers.data.filter(user => user._id !== action.payload.id),
        },
      };
    default:
      return state;
  }
};

export default avatarsReducer;
