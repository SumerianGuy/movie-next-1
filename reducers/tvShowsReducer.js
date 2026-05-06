import * as TYPES from 'actions/types';

const INITIAL_STATE = Object.freeze({
  total_pages: 0,
  page: 1,
  loading: true,
  results: []
});

const tvShowsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_GENRE_TVSHOWS:
    case TYPES.FETCH_STATIC_CATEGORY_TVSHOWS:
    case TYPES.FETCH_SEARCH_TVSHOWS:
      return { ...state, ...action.payload };
    case TYPES.SET_TVSHOW_LOADING:
      return { ...state, loading: true };
    case TYPES.UNSET_TVSHOW_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default tvShowsReducer;
