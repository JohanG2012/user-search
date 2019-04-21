import types from './types';

const INITIAL_STATE = {
  users: {
    data: [],
    next: '',
  },
  assigned: {
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
        assigned: {
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
        assigned: {
          data: [],
          next: '',
        },
      };
    default:
      return state;
  }
};

export default avatarsReducer;
