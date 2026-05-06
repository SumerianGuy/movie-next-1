import Router from 'next/router';

import Cookies from 'js-cookie';
import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';


const getGenres = () => async dispatch => {
  try {
    // Get the media type from the cookie
    const selectedMediaType = Cookies.get('selectedMediaType') || 'movie';

    // Determine the API endpoint based on the media type
    let endpoint;
    if (selectedMediaType === 'tv') {
      endpoint = `/${TMDB_API_VERSION}/genre/tv/list`;
    } else if (selectedMediaType === 'movie') {
      endpoint = `/${TMDB_API_VERSION}/genre/movie/list`;
      Cookies.set('selectedMediaType', selectedMediaType);

    }
    // Make the API call
    const response = await tmdbAPI.get(endpoint);

    // Dispatch the fetched genres to the store
    dispatch({
      type: TYPES.FETCH_GENRES,
      payload: response.data
    });
  } catch (error) {
    console.log('[getGenres] error => ', error);
    dispatch({ type: TYPES.INSERT_ERROR, payload: error.response });
    Router.push(LINKS.ERROR.HREF);
  }
};

export default getGenres;
