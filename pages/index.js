"use client"

import { useEffect } from "react"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { animateScroll as scroll } from "react-scroll"
import { useState } from "react"
import Cookies from "js-cookie"
import PageWrapper from "parts/PageWrapper"
import MovieList from "components/MovieList"
import TvShowList from "components/TvShowList"
import Loader from "components/UI/Loader"
import setSelectedMenuItemName from "actions/setSelectedMenuItemName"
import getStaticCategoryMovies from "actions/getStaticCategoryMovies"
import getStaticCategoryTvShows from "actions/getStaticCategoryTvShows"
import clearMovies from "actions/clearMovies"
import STATIC_MOVIE_CATEGORIES from "utils/constants/static-movie-categories"
import QUERY_PARAMS from "utils/constants/query-params"
import LINKS from "utils/constants/links"
import checkEmptyObject from "utils/helpers/checkEmptyObject"
import getGenres from "../actions/getGenres"

const Home = () => {
  const dispatch = useDispatch()
  const general = useSelector((state) => state.general)
  const movies = useSelector((state) => state.movies)
  const { query } = useRouter()

  const [selectedMediaType, setSelectedMediaType] = useState(Cookies.get("selectedMediaType"))

  const categoryName = query[QUERY_PARAMS.CATEGORY]
  const page = Number(query[QUERY_PARAMS.PAGE])

  useEffect(() => {
    return () => {
      dispatch(setSelectedMenuItemName())
      dispatch(clearMovies())
    }
  }, [dispatch])

  useEffect(() => {
    if (Router.router.asPath !== LINKS.HOME.HREF && checkEmptyObject(query)) return

    const initialCategoryName = Router.query[QUERY_PARAMS.CATEGORY]
    const initialPage = Router.query[QUERY_PARAMS.PAGE]

    if (!initialCategoryName && !initialPage) {
      const newCategoryName = STATIC_MOVIE_CATEGORIES[0].name
      const newPage = 1
      Router.replace({
        query: {
          [QUERY_PARAMS.CATEGORY]: newCategoryName,
          [QUERY_PARAMS.PAGE]: newPage,
        },
      })
    } else if (!initialCategoryName && initialPage) {
      const newCategoryName = STATIC_MOVIE_CATEGORIES[0].name
      const newPage = initialPage
      Router.replace({
        query: {
          [QUERY_PARAMS.CATEGORY]: newCategoryName,
          [QUERY_PARAMS.PAGE]: newPage,
        },
      })
    } else if (initialCategoryName && !initialPage) {
      const newCategoryName = initialCategoryName
      const newPage = 1
      Router.replace({
        query: {
          [QUERY_PARAMS.CATEGORY]: newCategoryName,
          [QUERY_PARAMS.PAGE]: newPage,
        },
      })
    }
  }, [dispatch, query])

  useEffect(() => {
    ;(async () => {
      if (!categoryName || !page) return

      scroll.scrollToTop({ smooth: true })

      dispatch(setSelectedMenuItemName(categoryName))
      if (selectedMediaType === "movie") {
        dispatch(getStaticCategoryMovies(categoryName, page))
        dispatch(getGenres())
      } else {
        dispatch(getStaticCategoryTvShows(categoryName, page))
        dispatch(getGenres())
      }
    })()
  }, [categoryName, page, selectedMediaType, dispatch])

  const handleToggle = () => {
    const newMediaType = selectedMediaType === "movie" ? "tv" : "movie"
    setSelectedMediaType(newMediaType)

    Cookies.set("selectedMediaType", newMediaType)
  }

  const { secure_base_url: baseUrl } = general.base.images

  // Use useEffect to load GA4 script
  useEffect(() => {
    // Load the Google Analytics script dynamically
    const script = document.createElement("script")
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-8SDD3QZDM4"
    script.async = true
    document.head.appendChild(script)

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", "G-8SDD3QZDM4")

    return () => {
      // Cleanup the script if component unmounts
      document.head.removeChild(script)
    }
  }, [])

  return (
    <>
      <Head>
        {/* MAIN TITLE (only ONE allowed) */}
        <title>Flixwave - Stream Movies & TV Shows Online for FREE</title>

        {/* Primary SEO */}
        <meta
          name="description"
          content="Watch unlimited movies and TV shows online for free. Stream the latest blockbusters, classics, and popular series in HD quality. No registration required. Flixwave - Your ultimate streaming destination."
        />
        <meta
          name="keywords"
          content="stream movies online free, watch tv shows online, free movie streaming, online cinema, watch movies free, tv series streaming, netflix alternative, free streaming service"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="author" content="Flixwave" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://flixwave.online/" />

        {/* Multilingual hreflang */}
        <link rel="alternate" href="https://flixwave.online/" hrefLang="en" />
        <link rel="alternate" href="https://flixwave.online/" hrefLang="x-default" />

        {/* Multilingual alternate titles (safe additional SEO signals) */}
        <meta name="alternate-title" lang="es" content="Flixwave - Películas y Series Gratis Online" />
        <meta name="alternate-title" lang="fr" content="Flixwave - Films et Séries en Streaming Gratuit" />
        <meta name="alternate-title" lang="de" content="Flixwave - Filme & Serien Kostenlos Streamen" />
        <meta name="alternate-title" lang="pt" content="Flixwave - Filmes e Séries Grátis Online" />
        <meta name="alternate-title" lang="ar" content="Flixwave - شاهد أفلام ومسلسلات مجانًا" />

        {/* Open Graph (Facebook, WhatsApp etc.) */}
        <meta property="og:title" content="Flixwave - Stream Movies & TV Shows Online for FREE" />
        <meta
          property="og:description"
          content="Watch unlimited movies and TV shows online for free. Stream the latest blockbusters, classics, and popular series in HD quality."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flixwave.online/" />
        <meta property="og:image" content="https://flixwave.online/og-image.jpg" />
        <meta property="og:site_name" content="Flixwave" />

        {/* Multilingual OG titles */}
        <meta property="og:title" lang="es" content="Flixwave - Ver Películas y Series Gratis Online" />
        <meta property="og:title" lang="fr" content="Flixwave - Films et Séries en Streaming Gratuit" />
        <meta property="og:title" lang="de" content="Flixwave - Filme & Serien Kostenlos Streamen" />
        <meta property="og:title" lang="pt" content="Flixwave - Filmes e Séries Grátis Online" />
        <meta property="og:title" lang="ar" content="Flixwave - شاهد أفلام ومسلسلات مجانًا" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flixwave - Stream Movies & TV Shows Online for FREE" />
        <meta name="twitter:description" content="Watch unlimited movies and TV shows online for free." />
        <meta name="twitter:image" content="https://flixwave.online/og-image.jpg" />

        {/* Multilingual Twitter titles */}
        <meta name="twitter:title" lang="es" content="Flixwave - Películas y Series Gratis Online" />
        <meta name="twitter:title" lang="fr" content="Flixwave - Films et Séries en Streaming Gratuit" />
        <meta name="twitter:title" lang="de" content="Flixwave - Filme & Serien Kostenlos Streamen" />
        <meta name="twitter:title" lang="pt" content="Flixwave - Filmes e Séries Grátis Online" />
        <meta name="twitter:title" lang="ar" content="Flixwave - شاهد أفلام ومسلسلات مجانًا" />

        {/* Additional SEO */}
        <meta name="language" content="en, es, fr, de, pt, ar" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#000000" />

        {/* JSON-LD #1: Web App */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Flixwave",
            description: "Stream movies and TV shows online for free in HD quality",
            url: "https://flixwave.online/",
            inLanguage: ["en", "es", "fr", "de", "pt", "ar"],
            applicationCategory: "EntertainmentApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD"
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "5000"
            }
          })}
        </script>

        {/* JSON-LD #2: Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Flixwave",
            url: "https://flixwave.online/",
            description: "Free online movie and TV show streaming platform",
            inLanguage: ["en", "es", "fr", "de", "pt", "ar"],
            sameAs: [
              "https://www.facebook.com/flixwave",
              "https://www.twitter.com/flixwave",
              "https://www.youtube.com/flixwave"
            ]
          })}
        </script>
      </Head>

      <button onClick={handleToggle}>Switch to {selectedMediaType === "movie" ? "TV Shows" : "Movies"}</button>

      {movies.loading ? (
        <Loader />
      ) : (
        <PageWrapper>
          {selectedMediaType === "movie" ? (
            <MovieList movies={movies} baseUrl={baseUrl} />
          ) : (
            <TvShowList tvShows={movies} baseUrl={baseUrl} />
          )}
        </PageWrapper>
      )}
    </>
  )
}

export default Home
