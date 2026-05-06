import { combineReducers } from 'redux';
import generalReducer from './generalReducer';
import moviesReducer from './moviesReducer';
import tvShowsReducer from './tvShowsReducer';
import movieReducer from './movieReducer';
import tvShowReducer from './tvShowReducer';
import personReducer from './personReducer';
import recommendedMoviesReducer from './recommendedMoviesReducer';
import personMoviesReducer from './personMoviesReducer';
import errorsReducer from './errorsReducer';
import seasonEpisode from './episodeReducer'
import seasonEpisodes from './episodesReducer'


const combinedReducer = combineReducers({
  general: generalReducer,
  movies: moviesReducer,
  movie: movieReducer,
  tvShow: tvShowReducer,
  tvShows: tvShowsReducer,
  episode: seasonEpisode,  
  episodes: seasonEpisodes,

  person: personReducer,
  recommendedMovies: recommendedMoviesReducer,
  personMovies: personMoviesReducer,
  errors: errorsReducer
});

export default combinedReducer;
