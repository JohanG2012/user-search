import { RSAA } from 'redux-api-middleware';
import types from './types';
import BASE_URI from '../../configs/URI';
import { USERS, USER } from '../../configs/endpoints';

export const patchUser = (id, body) => ({
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

export const fetchUsers = ({ querystring = '' }) => async dispatch => {
  const url = `${BASE_URI}${USERS}${querystring}`;

  // Always update user state to avoid unnecessary API requests - reducer will remove duplicates
  const result = await dispatch({
    [RSAA]: {
      endpoint: url,
      method: 'GET',
      types: [types.FETCH_USERS_REQUEST, types.FETCH_USERS_SUCCESS, types.FETCH_USERS_FAILURE],
    },
  });
  if (url.includes('permission=true')) {
    dispatch({ type: types.SET_PERMISSION_NEXT, payload: { next: result.payload.next || '' } });
  }
  if (url.includes('permission=false')) {
    dispatch({ type: types.SET_NEXT, payload: { next: result.payload.next || '' } });
  }
};

export const initUsersState = () => async dispatch => {
  dispatch(
    fetchUsers({
      querystring: '?permission=true&fields=_id,name.first,name.last,picture.thumbnail,permission',
    }),
  );
  dispatch(
    fetchUsers({
      querystring: '?permission=false&fields=_id,name.first,name.last,picture.thumbnail,permission',
    }),
  );
};

/* eslint-disable no-underscore-dangle */
export const setUserPermission = ({ user, permission, action }) => async dispatch => {
  dispatch({ type: `${action}_REQUEST` });
  const result = await dispatch(patchUser(user._id, { permission }));
  if (result.type === types.UPDATE_USER_SUCCESS) {
    dispatch({
      type: types.UPDATE_USER_MANUALLY,
      payload: { id: user._id, user: { permission } },
    });
    dispatch({ type: `${action}_SUCCESS` });
  }
};
/* eslint-enable no-underscore-dangle */
