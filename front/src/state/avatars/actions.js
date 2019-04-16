import { RSAA } from 'redux-api-middleware';
import types from './types';
import BASE_URI from '../../configs/URI';
import { AVATARS } from '../../configs/endpoints';

export const fetchAvatars = () => ({
  [RSAA]: {
    endpoint: `${BASE_URI}${AVATARS}`,
    method: 'GET',
    types: [types.FETCH_AVATARS_REQUEST, types.FETCH_AVATARS_SUCCESS, types.FETCH_AVATARS_FAILURE],
  },
});

export default fetchAvatars;
