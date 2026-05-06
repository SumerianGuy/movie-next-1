"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import clsx from "clsx"
import * as TYPES from "/actions/types"
import tmdbAPI from "services/tmdbAPI"
import { TMDB_API_VERSION } from "config/tmdb"
import { useRouter } from "next/router"

const TvSeasonsSection = ({ className, movie }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [episodes, setEpisodes] = useState([])
  const [seasonNumber, setSeasonNumber] = useState(null)
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  useEffect(() => {
    const { season: seasonQueryParam, episode: episodeQueryParam } = router.query
    setSeasonNumber(seasonQueryParam ?? "1")
    setSelectedEpisode(episodeQueryParam)
  }, [router.query])

  useEffect(() => {
    if (seasonNumber !== null) {
      dispatch({ type: TYPES.SET_MOVIE_LOADING })

      const fetchEpisodes = async () => {
        try {
          const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/tv/${movie.id}/season/${seasonNumber}`, {
            params: { append_to_response: "videos" },
          })

          setEpisodes(response.data.episodes)
          dispatch({ type: TYPES.SET_MOVIE_LOADING })
        } catch (error) {
          console.error("[fetchEpisodes] Error:", error)
          dispatch({ type: TYPES.INSERT_ERROR, payload: error })
        }
      }

      fetchEpisodes()
    }
  }, [seasonNumber, movie.id, dispatch])

  const handleSeasonChange = (event) => {
    const seasonNumber = event.target.value
    if (seasonNumber !== "0") {
      setSeasonNumber(seasonNumber)
      setSelectedEpisode(null)
    }
  }

  return (
    <div className={clsx("seasons-container", className)}>
      <h2>Seasons</h2>
      <select onChange={handleSeasonChange} value={seasonNumber} className="season-select">
        {movie?.seasons?.map(
          (season) =>
            season.name !== "Specials" && (
              <option key={season.id} value={season.season_number}>
                {season.name}
              </option>
            ),
        )}
      </select>
      <div className="episode-row">
        {episodes.length > 0 &&
          episodes.map((episode) => (
            <button
              key={episode.id}
              className={`episode-button ${episode.episode_number.toString() === selectedEpisode ? "active" : ""}`}
              onClick={() => {
                const episodeNumber = episode.episode_number
                const url = `/tv?id=${movie.id}&season=${seasonNumber}&episode=${episodeNumber}&page=1`
                router.push(url)
              }}
            >
              {episode.episode_number}
            </button>
          ))}
      </div>
      <style jsx>{`
        .seasons-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px;
          max-width: 75%;
          margin: 0 auto;

          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          border: 1px solid #374151;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          height: fit-content;
        }

        .seasons-container h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: #f3f4f6;
          letter-spacing: 0.5px;
        }

        .season-select {
          padding: 12px 16px;
          font-size: 15px;
          background-color: #374151;
          color: #f3f4f6;
          border: 2px solid #4b5563;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          width: 100%;
        }

        .season-select:hover {
          background-color: #4b5563;
          border-color: #6b7280;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.1);
        }

        .season-select:focus {
          outline: none;
          background-color: #4b5563;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .episode-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
          gap: 8px;
          margin-top: 8px;
        }
        
        .episode-button {
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 600;
          background-color: #374151;
          color: #f3f4f6;
          border: 2px solid #4b5563;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .episode-button:hover {
          background-color: #4b5563;
          border-color: #6b7280;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .episode-button.active {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-color: #1d4ed8;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .episode-button.active:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          border-color: #1e40af;
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }

        @media (max-width: 768px) {
          .seasons-container {
            padding: 16px;
          }

          .episode-row {
            grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
          }

          .episode-button {
            padding: 8px 10px;
            font-size: 13px;
            min-height: 36px;
          }
        }
      `}</style>
    </div>
  )
}

export default TvSeasonsSection
