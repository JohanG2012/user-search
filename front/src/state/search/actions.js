import axios from 'axios';
import BASE_URI from '../../configs/URI';
import { USERS } from '../../configs/endpoints';
import usersTypes from '../users/types';
import types from './types';
import cacheTypes from '../cache/types';

let cancelationToken;

export const searchForUsers = ({ searchQuery, permission, next }) => async (dispatch, getState) => {
  const searchType = permission ? types.SEARCH_ASSIGNED_USERS_ROOT : types.SEARCH_USERS_ROOT;

  if (cancelationToken) {
    cancelationToken.cancel();
  }
  cancelationToken = axios.CancelToken.source();
  dispatch({ type: types[`${searchType}_REQUEST`] });
  const baseString = `?fields=_id,name.first,name.last,picture.thumbnail,permission`;
  const filterString = `&permission=${permission}`;
  const nextString = next || '';
  const searchString = searchQuery ? `&search=${searchQuery}` : '';
  const queryString = baseString + nextString + searchString + filterString;
  const searchCache = getState().cache.search[queryString];

  if (searchCache) {
    dispatch({
      type: types[`${searchType}_SUCCESS`],
      payload: {
        data: searchCache.data,
        next: searchCache.next,
      },
    });
    return;
  }

  try {
    const {
      data: { data, next: nextPage },
      status,
    } = await axios.get(BASE_URI + USERS + queryString, { cancelToken: cancelationToken.token });
    if (status === 200) {
      // Always send to users state to avoid unecessary scroll request.
      // Reducer will handle duplicates
      dispatch({
        type: usersTypes.FETCH_USERS_SUCCESS,
        payload: {
          data,
        },
      });

      // Set search results
      dispatch({
        type: types[`${searchType}_SUCCESS`],
        payload: {
          data,
          nextPage,
          prev: next,
        },
      });
      // Set cache
      dispatch({
        type: cacheTypes.SET_SEARCH_CACHE,
        payload: {
          data,
          next: nextPage,
          queryString,
        },
      });
    }
  } catch (err) {
    if (axios.isCancel(err)) {
      dispatch({ type: types[`${searchType}_CANCELED`] });
    } else {
      dispatch({ type: types[`${searchType}_FAILURE`] });
    }
  }
};

export const removeSearch = ({ permission }) => {
  const type = permission ? types.SEARCH_ASSIGNED_USERS_RESET : types.SEARCH_USERS_RESET;
  return {
    type,
  };
};
