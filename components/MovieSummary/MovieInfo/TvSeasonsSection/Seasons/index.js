// import React from 'react';
// import Link from 'next/link';
// import LINKS from 'utils/constants/links';

// const Seasons = ({ className, movie, episodes }) => (
//   <div className={className}>
//     {movie.seasons.map(season => (
//       <div key={season.id}>
//         <h2>Season {season.season_number}</h2>
//         <div className="episode-list">
//           {episodes.map((episode, index) => (
//             <Link
//               key={episode.id}
//               href={{
//                 pathname: LINKS.EPISODES.HREF,
//                 query: {
//                   id: movie.id,
//                   season: season.season_number,
//                   episode: index + 1,
//                   page: 1
//                 }
//               }}
//               passHref>
//               <a className="episode-button">Episode {index + 1}</a>
//             </Link>
//           ))}
//         </div>
//       </div>
//     ))}
//     <style jsx>{`
//       .episode-list {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 10px; /* Adjust as needed */
//       }
//       .episode-button {
//         display: inline-block;
//         padding: 5px 10px;
//         border: 1px solid #ccc;
//         border-radius: 5px;
//         background-color: #f0f0f0;
//         color: #333;
//         text-decoration: none;
//         cursor: pointer;
//       }
//       .episode-button:hover {
//         background-color: #e0e0e0;
//       }
//     `}</style>
//   </div>
// );

// export default Seasons;
