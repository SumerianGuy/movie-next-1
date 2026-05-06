// episodesReducer.js

import * as TYPES from 'actions/types';

const INITIAL_STATE = {
  episodes: [], // Initialize episodes array
  cast: [], // Initialize cast array
  loading: true
};

const episodesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.FETCH_EPISODES:
      return { ...state, episodes: action.payload }; // Update episodes array
    case TYPES.FETCH_CREDITS:
      return { ...state, cast: action.payload }; // Update cast array
    case TYPES.SET_EPISODES_LOADING:
      return { ...state, loading: true }; // Set loading to true
    case TYPES.UNSET_EPISODES_LOADING:
      return { ...state, loading: false }; // Set loading to false
    case TYPES.CLEAR_EPISODES:
      return { ...state, episodes: [] }; // Clear episodes array
    default:
      return state;
  }
};

export default episodesReducer;
