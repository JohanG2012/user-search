import { RSAA } from 'redux-api-middleware';
import types from './types';
import BASE_URI from '../../configs/URI';
import { USERS, USER } from '../../configs/endpoints';

export const updateUser = (id, body) => ({
  [RSAA]: {
    endpoint: `${BASE_URI}${USER}/${id}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    types: [types.UPDATE_USER_REQUEST, types.UPDATE_USER_SUCCESS, types.UPDATE_USER_FAILURE],
  },
});

export const fetchUsers = ({ querystring = '' }) => ({
  [RSAA]: {
    endpoint: `${BASE_URI}${USERS}${querystring}`,
    method: 'GET',
    types: [types.FETCH_USERS_REQUEST, types.FETCH_USERS_SUCCESS, types.FETCH_USERS_FAILURE],
  },
});

export const initUsersState = () => async dispatch => {
  dispatch(fetchUsers({ querystring: '?permissions=true' }));
  dispatch(fetchUsers({}));
};

export default updateUser;
