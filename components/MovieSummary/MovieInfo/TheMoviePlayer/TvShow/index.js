"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import tmdbAPI from "services/tmdbAPI"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import * as TYPES from "/actions/types"
import { TMDB_API_VERSION } from "config/tmdb"

const MoviePlayer = ({ videoUrl, season = 1, episode = 1 }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [currEp, setEpisodeId] = useState(null)
  const [seasonId, setSeasonId] = useState(null)
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const [episodeInfo, setEpisodeInfo] = useState(null)

  useEffect(() => {
    const { season: seasonQueryParam, episode: episodeQueryParam } = router.query
    setSeasonId(seasonQueryParam ?? "1")
    setSelectedEpisode(episodeQueryParam ?? "1")
  }, [router.query])

  useEffect(() => {
    if (seasonId !== null) {
      dispatch({ type: TYPES.SET_MOVIE_LOADING })

      const fetchEpisodes = async () => {
        try {
          const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/tv/${videoUrl}/season/${season}`)

          const episodes = response?.data?.episodes || []
          const matchedEpisode = episodes.find((e) => e.episode_number === Number.parseInt(selectedEpisode, 10))

          if (matchedEpisode) {
            setEpisodeId(matchedEpisode.id)
            setSeasonId(response?.data?.id)
            setEpisodeInfo(matchedEpisode)
          } else {
            console.error("Episode not found")
          }
        } catch (error) {
          dispatch({ type: TYPES.INSERT_ERROR, payload: error })
        }
      }

      fetchEpisodes()
    }
  }, [seasonId, currEp])

  const generateServers = () => {
    const servers = [
      {
        name: "VidSrcMe 1",
        url: `https://vidsrcme.ru/embed/tv?tmdb=${videoUrl}&season=${season}&episode=${episode}`,
      },
      {
        name: "VidSrcMe 2",
        url: `https://vidsrcme.su/embed/tv?tmdb=${videoUrl}&season=${season}&episode=${episode}`,
      },
      {
        name: "vidsrc-me 3",
        url: `https://vidsrc-me.ru/embed/tv?tmdb=${videoUrl}&season=${season}&episode=${episode}`,
      },
      {
        name: "vidsrc-me 4",
        url: `https://vidsrc-me.su/embed/tv?tmdb=${videoUrl}&season=${season}&episode=${episode}`,
      },
      {
        name: "vsembed",
        url: `https://vsembed.ru/embed/tv?tmdb=${videoUrl}&season=${season}&episode=${episode}`,
      },
      // {
      //   name: "CC",
      //   url: `https://vidsrc.win/watch/${videoUrl}/${season}/${episode}?autoPlay=true`,
      // },
      {
        name: "111Movies",
        url: `https://111movies.net/tv/${videoUrl}/${season}/${episode}`,
      },
      {
        name: "FullHD",
        url: `https://player.videasy.net/tv/${videoUrl}/${season}/${episode}?nextEpisode=false&autoplayNextEpisode=false&episodeSelector=false&color=#E50914`,
      },
    ]

    return servers.filter((server) => server.url)
  }

  const servers = generateServers()

  const [activeServer, setActiveServer] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedServer = Cookies.get("activeMovieServer")
    if (savedServer !== undefined && savedServer !== null) {
      setActiveServer(Number.parseInt(savedServer))
    }
  }, [])


  // useEffect(() => {
  //   const script = document.createElement("script")
  //   script.src = "https://www.googletagmanager.com/gtag/js?id=G-8SDD3QZDM4"
  //   script.async = true
  //   document.head.appendChild(script)

  //   window.dataLayer = window.dataLayer || []
  //   function gtag() {
  //     window.dataLayer.push(arguments)
  //   }
  //   gtag("js", new Date())
  //   gtag("config", "G-8SDD3QZDM4")

  //   return () => {
  //     document.head.removeChild(script)
  //   }
  // }, [])

  // useEffect(() => {
  //     const script = document.createElement("script");

  //     script.type = "text/javascript";
  //     script.src =
  //       "//helplessfew.com/c.De9/6Hb_2F5/lDSWWuQA9/N/zyAyyKOoDjI/1VMiyO0Q3YM/DQIy4XMtjMUp3g";

  //     script.async = true;
  //     script.referrerPolicy = "no-referrer-when-downgrade";

  //     document.body.appendChild(script);

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);



    useEffect(() => {
      const handleFirstClick = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//helplessfew.com/c.De9/6Hb_2F5/lDSWWuQA9/N/zyAyyKOoDjI/1VMiyO0Q3YM/DQIy4XMtjMUp3g";
        script.async = true;
        script.referrerPolicy = "no-referrer-when-downgrade";

        document.body.appendChild(script);

        // Immediately remove the listener so it only injects ONCE per session
        document.removeEventListener('click', handleFirstClick);
      };

      document.addEventListener('click', handleFirstClick);
      return () => {
        document.removeEventListener('click', handleFirstClick);
      };
    }, []);



    useEffect(() => {
      const handleFirstClick = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://s0-greate.net/p/2976373";
        script.async = true;
        script.referrerPolicy = "no-referrer-when-downgrade";

        document.body.appendChild(script);

        // Immediately remove the listener so it only injects ONCE per session
        document.removeEventListener('click', handleFirstClick);
      };

      // Listens for a click on the page before loading the script
      document.addEventListener('click', handleFirstClick);

      // Clean up listener if the component unmounts
      return () => {
        document.removeEventListener('click', handleFirstClick);
      };
    }, []);



    // useEffect(() => {
    //   const handleFirstClick = () => {
    //     let trafficSource = "worldwide_other";
    //     const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    //     if (timeZone.includes("America") || timeZone.includes("US")) {
    //       trafficSource = "USA";
    //     } else if (timeZone.includes("Calcutta") || timeZone.includes("Asia/Kolkata")) {
    //       trafficSource = "India";
    //     }

    //     // Split up cleanly so you can see the tracking path explicitly:
    //     const domain = "https://hippogrypos.com";
    //     const path = "/or/djex/ejzdem";
    //     const params = "?source_id=tv_player&subid1=";
        
    //     const smartLinkUrl = domain + path + params + trafficSource;
        
    //     window.open(smartLinkUrl, '_blank');
    //     document.removeEventListener('click', handleFirstClick);
    //   };

    //   document.addEventListener('click', handleFirstClick);
    //   return () => document.removeEventListener('click', handleFirstClick);
    // }, []);



  const blockedTmdbIds = ["292740", "61441"]

  if (blockedTmdbIds.includes(videoUrl?.toString())) {
    return (
      <div
        style={{
          color: "#ef4444",
          fontSize: "32px",
          textAlign: "center",
          padding: "120px 24px",
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        This content is unavailable.
      </div>
    )
  }

  const handleServerChange = (index) => {
    setActiveServer(index)
    Cookies.set("activeMovieServer", index, { expires: 7 })
    setIsLoading(true)
  }

  return (
    <>
      <div className="tv-player">
        <div className="server-controls">
          <label htmlFor="serverSelect" className="server-label">
            Select Player:
          </label>
          <select
            id="serverSelect"
            value={activeServer}
            onChange={(e) => handleServerChange(Number.parseInt(e.target.value))}
            className="server-dropdown"
          >
            {servers.map((server, index) => (
              <option key={index} value={index}>
                {server.name}
              </option>
            ))}
          </select>
        </div>

        <div className="player-container">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          <iframe
            src={servers[activeServer].url}
            className="player-iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>

        {episodeInfo && (
          <div className="episode-info-card">
            <div className="episode-info-header">
              <h3 className="episode-title">
                Season {season} - Episode {episode}: {episodeInfo.name}
              </h3>
            </div>
            <div className="episode-info-content">
              {episodeInfo.overview && <p className="episode-overview">{episodeInfo.overview}</p>}
              <div className="episode-metadata">
                {episodeInfo.air_date && (
                  <div className="metadata-item">
                    <span className="metadata-label">Air Date:</span>
                    <span className="metadata-value">{episodeInfo.air_date}</span>
                  </div>
                )}
                {episodeInfo.vote_average && (
                  <div className="metadata-item">
                    <span className="metadata-label">Rating:</span>
                    <span className="metadata-value">{episodeInfo.vote_average.toFixed(1)}/10</span>
                  </div>
                )}
                {episodeInfo.runtime && (
                  <div className="metadata-item">
                    <span className="metadata-label">Runtime:</span>
                    <span className="metadata-value">{episodeInfo.runtime} minutes</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .tv-player {
          padding: 24px;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          position: relative;
          max-width: 75%;
          margin: 24px auto;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .server-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .server-label {
          font-size: 16px;
          font-weight: 600;
          color: #f3f4f6;
          letter-spacing: 0.5px;
        }

        .server-dropdown {
          padding: 10px 16px;
          font-size: 15px;
          background-color: #374151;
          color: #f3f4f6;
          border: 2px solid #4b5563;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .server-dropdown:hover {
          background-color: #4b5563;
          border-color: #6b7280;
        }

        .server-dropdown:focus {
          outline: none;
          background-color: #4b5563;
          border-color: #9ca3af;
          box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.1);
        }

        .player-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background-color: #000;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .player-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          border-radius: 6px;
        }

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .episode-info-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 16px;
          backdrop-filter: blur(10px);
        }

        .episode-info-header {
          margin-bottom: 12px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 12px;
        }

        .episode-title {
          font-size: 18px;
          font-weight: 700;
          color: #3b82f6;
          margin: 0;
        }

        .episode-info-content {
          color: #d1d5db;
        }

        .episode-overview {
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 12px 0;
          color: #e5e7eb;
        }

        .episode-metadata {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
        }

        .metadata-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metadata-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9ca3af;
        }

        .metadata-value {
          font-size: 15px;
          font-weight: 500;
          color: #f3f4f6;
        }

        @media (max-width: 768px) {
          .tv-player {
            padding: 16px;
            margin: 16px;
            max-width: calc(100% - 32px);
          }

          .server-dropdown {
            padding: 8px 12px;
            font-size: 14px;
          }

          .server-label {
            font-size: 14px;
          }

          .episode-title {
            font-size: 16px;
          }

          .episode-metadata {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default MoviePlayer
