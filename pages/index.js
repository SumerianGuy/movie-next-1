"use client"

import { useEffect, useState } from "react"
import Head from "next/head"
import Router, { useRouter } from "next/router"
import Script from "next/script"
import { useDispatch, useSelector } from "react-redux"
import { animateScroll as scroll } from "react-scroll"
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
import getGenres from "actions/getGenres"

const Home = () => {
  const dispatch = useDispatch()
  const general = useSelector((state) => state.general)
  const movies = useSelector((state) => state.movies)
  const { query } = useRouter()

  const [selectedMediaType, setSelectedMediaType] = useState(
    Cookies.get("selectedMediaType") || "movie"
  )

  const categoryName = query[QUERY_PARAMS.CATEGORY]
  const page = Number(query[QUERY_PARAMS.PAGE])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(setSelectedMenuItemName())
      dispatch(clearMovies())
    }
  }, [dispatch])

  // Prevent excessive route replacements
  useEffect(() => {
    if (!Router?.router) return

    if (Router.router.asPath !== LINKS.HOME.HREF && checkEmptyObject(query)) {
      return
    }

    const initialCategoryName = Router.query[QUERY_PARAMS.CATEGORY]
    const initialPage = Router.query[QUERY_PARAMS.PAGE]

    // Only replace once when needed
    if (!initialCategoryName || !initialPage) {
      Router.replace(
        {
          query: {
            [QUERY_PARAMS.CATEGORY]:
              initialCategoryName || STATIC_MOVIE_CATEGORIES[0].name,
            [QUERY_PARAMS.PAGE]: initialPage || 1,
          },
        },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }, [query])

  // Fetch content
  useEffect(() => {
    if (!categoryName || !page) return

    scroll.scrollToTop({ smooth: true })

    dispatch(setSelectedMenuItemName(categoryName))

    if (selectedMediaType === "movie") {
      dispatch(getStaticCategoryMovies(categoryName, page))
    } else {
      dispatch(getStaticCategoryTvShows(categoryName, page))
    }

    dispatch(getGenres())
  }, [categoryName, page, selectedMediaType, dispatch])

  const handleToggle = () => {
    const newMediaType = selectedMediaType === "movie" ? "tv" : "movie"

    setSelectedMediaType(newMediaType)

    Cookies.set("selectedMediaType", newMediaType)
  }

  const baseUrl = general?.base?.images?.secure_base_url || ""

  return (
    <>
      {/* =========================
          SEO (SIMPLIFIED)
      ========================== */}

      <Head>
        {/* Main SEO */}
        <title>Flixwave - Watch Movies & TV Shows Online</title>

        <meta
          name="description"
          content="Watch movies and TV shows online in HD quality for free on Flixwave."
        />

        {/* HilltopsAdsBoost */}
        <meta name="referrer" content="no-referrer-when-downgrade" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://flixwave.online/" />

        {/* OpenGraph */}
        <meta
          property="og:title"
          content="Flixwave - Watch Movies & TV Shows Online"
        />

        <meta
          property="og:description"
          content="Stream movies and TV shows online for free in HD quality."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flixwave.online/" />

        {/* Keep ONLY one OG image */}
        <meta
          property="og:image"
          content="https://flixwave.online/og-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* MINIMAL favicon setup */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />

        {/* REMOVE THESE TO REDUCE EDGE REQUESTS */}
        {/*
          apple-touch-icon
          android-chrome-*.png
          manifest.webmanifest
          site.webmanifest
          multiple dark/light favicon variants
        */}
      </Head>

      {/* =========================
          GOOGLE ANALYTICS
          (optimized loading)
      ========================== */}

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8SDD3QZDM4"
        strategy="lazyOnload"
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', 'G-8SDD3QZDM4', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* =========================
          UI
      ========================== */}

      <button onClick={handleToggle}>
        Switch to {selectedMediaType === "movie" ? "TV Shows" : "Movies"}
      </button>

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