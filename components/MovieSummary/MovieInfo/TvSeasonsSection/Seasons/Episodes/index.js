// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import clsx from 'clsx';
// import * as TYPES from '/actions/types'; // Import the fetchEpisodes action
// import tmdbAPI from 'services/tmdbAPI';
// import LINKS from 'utils/constants/links';
// import { TMDB_API_VERSION } from 'config/tmdb';

// const Seasons = ({
//   className,
//   baseUrl,
//   movie
// }) => {
//   const dispatch = useDispatch();
//   const episodes = useSelector(state => state.episodes); // Get episodes from Redux store

//   const handleSeasonChange = async (event) => {
//     const seasonNumber = event.target.value;
//     dispatch({ type: TYPES.SET_MOVIE_LOADING });

//     try {
//       const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/tv/${movie.id}/season/${seasonNumber}`, {
//         params: { append_to_response: 'videos' }
//       });
      
//       // Dispatch action to update episodes in the store
//       dispatch({ type: TYPES.FETCH_EPISODES, payload: response.data.episodes });
//       dispatch({ type: TYPES.UNSET_MOVIE_LOADING });
//     } catch (error) {
//       console.error('[handleSeasonChange] Error:', error);
//       dispatch({ type: TYPES.INSERT_ERROR, payload: error });
//     }
//   };
  
//   return (
//     <>
//       <div className={clsx('basics-section', className)}>
//         <h2>Seasons</h2>
//         <select onChange={handleSeasonChange}>
//           {movie?.seasons?.map(season => (
//             <option key={season.id} value={season.season_number}>
//               Season {season.season_number}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="episode-row">
//         {/* {episodes?.map(episode => (
//           <button
//             key={episode.id}
//             className="episode-button"
//             onClick={() => console.log('Clicked episode:', episode.name)} // Handle click event
//           >
//             {episode.episode_number}
//           </button>
//         ))} */}
//       </div>
//       <style jsx>{`
//         .basics-section {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }
        
//         .episode-row {
//           display: flex;
//           gap: 10px;
//           margin-top: 20px;
//         }
        
//         .episode-button {
//           padding: 8px 12px;
//           background-color: #f0f0f0;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//           cursor: pointer;
//         }
        
//         .episode-button:hover {
//           background-color: #e0e0e0;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Seasons;
