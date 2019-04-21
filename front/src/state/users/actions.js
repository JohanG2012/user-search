import { RSAA } from 'redux-api-middleware';
import types from './types';
import BASE_URI from '../../configs/URI';
import { USERS, USER } from '../../constants/endpoints';

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

export const fetchUsers = ({ querystring = '', permission, next }) => async dispatch => {
  const url = querystring
    ? `${BASE_URI}${USERS}${querystring}`
    : `${BASE_URI}${USERS}?permission=${permission}&fields=_id,name.first,name.last,picture.thumbnail,permission${next}`;

  // Always update user state to avoid unnecessary API requests - reducer will remove duplicates
  const result = await dispatch({
    [RSAA]: {
      endpoint: url,
      method: 'GET',
      types: [types.FETCH_USERS_REQUEST, types.FETCH_USERS_SUCCESS, types.FETCH_USERS_FAILURE],
    },
  });
  if (url.includes('permission=true')) {
    dispatch({ type: types.SET_ASSIGNED_NEXT, payload: { next: result.payload.next || '' } });
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
export const setUserPermission = ({ user, permission }) => async dispatch => {
  const type = permission ? types.ADD_PERMISSION_ROOT : types.REMOVE_PERMISSION_ROOT;
  dispatch({ type: types[`${type}_REQUEST`] });
  const result = await dispatch(patchUser(user._id, { permission }));
  if (result.type === types.UPDATE_USER_SUCCESS) {
    dispatch({
      type: types.UPDATE_USER,
      payload: { id: user._id, user: { permission } },
    });
    dispatch({ type: types[`${type}_SUCCESS`] });
  } else {
    dispatch({ type: types[`${type}_FAILURE`], payload: result.payload });
  }
};
/* eslint-enable no-underscore-dangle */

export const setUserAvatar = ({ picture, id }) => async dispatch => {
  dispatch({ type: types.UPDATE_AVATAR_REQUEST });
  const result = await dispatch(patchUser(id, { picture }));

  if (result.type === types.UPDATE_USER_SUCCESS) {
    dispatch({
      type: types.UPDATE_USER,
      payload: { id, user: { picture } },
    });
    dispatch({ type: types.UPDATE_AVATAR_SUCCESS });
  } else {
    dispatch({ type: types.UPDATE_AVATAR_FAILURE, payload: result.payload });
  }
};
