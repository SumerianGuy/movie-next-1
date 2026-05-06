import Router from 'next/router';

import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import getCreditsTv from './getCreditsTv';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';

const getTvShow = id => async dispatch => {
  try {
    dispatch({type: TYPES.SET_MOVIE_LOADING});
    const [response] = await Promise.all([
      tmdbAPI.get(`/${TMDB_API_VERSION}/tv/${id}/${seasonNum}`, {params: {append_to_response: 'videos'}}),
      // dispatch(getCreditsTv(id))
    ]);
    await dispatch({
      type: TYPES.FETCH_TV_SEASON,
      payload: response.data
    });
    dispatch({type: TYPES.UNSET_MOVIE_LOADING});
  } catch (error) {
    console.log('[getTvShow] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response});
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getTvShow;
