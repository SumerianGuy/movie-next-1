"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"


const MoviePlayer = ({ videoUrl }) => {
  const servers = [
    {
      name: "VidSrcMe",
      url: `https://vidsrcme.ru/embed/movie/${videoUrl}?autoPlay=true`,
    },
    {
      name: "VidSrcMe",
      url: `https://vidsrcme.su/embed/movie/${videoUrl}`,
    },
    {
      name: "VidSrcMe",
      url: `https://vidsrc-me.ru/embed/movie?tmdb=${videoUrl}`,
    },
    {
      name: "vidsrcru",
      url: `https://vidsrc-me.su/embed/movie/${videoUrl}`,
    },
    {
      name: "vsembed",
      url: `https://vsembed.ru/embed/movie/${videoUrl}`,
    },
    {
      name: "videasy",
      url: `https://player.videasy.net/movie/${videoUrl}`,
    },
    {
      name: "111Movies",
      url: `https://111movies.net/movie/${videoUrl}`,
    },
  ]

  const [activeServer, setActiveServer] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedServer = Cookies.get("activeMovieServer")

    if (!savedServer) return

    const index = Number.parseInt(savedServer, 10)

    if (
      Number.isNaN(index) ||
      index < 0 ||
      index >= servers.length
    ) {
      Cookies.remove("activeMovieServer")
      setActiveServer(0)
      return
    }

    setActiveServer(index)
  }, [])


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
  //     const params = "?source_id=movie_player&subid1=";
      
  //     const smartLinkUrl = domain + path + params + trafficSource;
      
  //     window.open(smartLinkUrl, '_blank');
  //     document.removeEventListener('click', handleFirstClick);
  //   };

  //   document.addEventListener('click', handleFirstClick);
  //   return () => document.removeEventListener('click', handleFirstClick);
  // }, []);


    // First ad - first click
  // useEffect(() => {
  //   const handleFirstClick = () => {
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.src = "https://s0-greate.net/p/2976373";
  //     script.async = true;
  //     script.referrerPolicy = "no-referrer-when-downgrade";

  //     document.body.appendChild(script);
  //     document.removeEventListener("click", handleFirstClick);
  //   };

  //   document.addEventListener("click", handleFirstClick);

  //   return () => {
  //     document.removeEventListener("click", handleFirstClick);
  //   };
  // }, []);

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
  const script = document.createElement("script");

  script.src = "/antiadblock.js";
  script.async = true;

  document.body.appendChild(script);

  return () => script.remove();
}, []);


  const blockedTmdbIds = ["1147710", "292740", "387931", "725435"]
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
      <div className="movie-player">
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
      </div>

      <style jsx>{`
        .movie-player {
          padding: 24px;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          position: relative;
          width: 100%;
          max-width: 80%;
          margin: 24px auto;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .server-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
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
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .movie-player {
            padding: 16px;
            margin: 16px;
          }

          .server-dropdown {
            padding: 8px 12px;
            font-size: 14px;
          }

          .server-label {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  )
}

export default MoviePlayer
