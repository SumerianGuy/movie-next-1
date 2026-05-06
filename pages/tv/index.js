"use client"

import { useState } from "react"

import { useEffect } from "react"
import Router, { useRouter } from "next/router"
import Head from "next/head"
import { useDispatch, useSelector } from "react-redux"
import { animateScroll as scroll } from "react-scroll"
import Cookies from "js-cookie"
import PageWrapper from "parts/PageWrapper"
import Loader from "components/UI/Loader"
import RecommendedTvShowList from "components/RecommendedTvShowList"
import MovieSummary from "components/MovieSummary"
import getTvShow from "actions/getTvShow"
import getRecommendedTvShows from "actions/getRecommendedTvShows"
import clearRecommendedtvShows from "actions/clearRecommendedMovies"
import clearMovie from "actions/clearMovie"
import QUERY_PARAMS from "utils/constants/query-params"
import LINKS from "utils/constants/links"
import checkEmptyObject from "utils/helpers/checkEmptyObject"
import MoviePlayer from "components/MovieSummary/MovieInfo/TheMoviePlayer/TvShow"
import TvSeasons from "components/MovieSummary/MovieInfo/TvSeasonsSection"
import getGenres from "actions/getGenres"

const TvShow = () => {
  const dispatch = useDispatch()
  const general = useSelector((state) => state.general)
  const tvShow = useSelector((state) => state.tvShow)
  const recommendedTvShows = useSelector((state) => state.recommendedMovies)
  const { query } = useRouter()

  const tvShowId = query[QUERY_PARAMS.ID]
  const tvSeasonId = query[QUERY_PARAMS.SEASON]
  const epId = query[QUERY_PARAMS.EPISODE]
  const [selectedMediaType, setSelectedMediaType] = useState(Cookies.get("selectedMediaType") || "movie")

  const page = Number(query[QUERY_PARAMS.PAGE])

  useEffect(() => {
    return () => {
      dispatch(clearMovie())
      dispatch(clearRecommendedtvShows())
    }
  }, [dispatch])

  useEffect(() => {
    if (checkEmptyObject(query)) return

    const initialMovieId = Router.query[QUERY_PARAMS.ID]
    const initialPage = Router.query[QUERY_PARAMS.PAGE]

    if (!initialPage) {
      const newtvShowId = initialMovieId
      const newPage = 1
      console.log("[Movie useEffect] query parameter update: newMovieId, newPage => ", newtvShowId, newPage)
      Router.replace({
        pathname: LINKS.TVSHOW.HREF,
        query: {
          [QUERY_PARAMS.ID]: newtvShowId,
          [QUERY_PARAMS.PAGE]: newPage,
        },
      })
    }
  }, [dispatch, query])

  useEffect(() => {
    if (!tvShowId) return

    scroll.scrollToTop({ smooth: true, delay: 500 })
    dispatch(getTvShow(tvShowId, tvSeasonId, epId))
  }, [tvShowId, dispatch, tvSeasonId, epId])

  useEffect(() => {
    if (!tvShowId || !page) return
    dispatch(getRecommendedTvShows(tvShowId, page))

    const blockedTmdbIds = ["1147710", "292740", "387931", "725435"]

    if (blockedTmdbIds.includes(tvShowId)) {
      return (
        <div style={{ color: "red", fontSize: "50px", textAlign: "center", padding: "120px" }}>
          This content is unavailable.
        </div>
      )
    }

    const newMediaType = selectedMediaType === "movie" ? "tv" : "movie"
    setSelectedMediaType(newMediaType)
    dispatch(getGenres())
  }, [tvShowId, page, dispatch])

  if (tvShow.loading) {
    return <Loader />
  }

  const { secure_base_url: baseUrl } = general.base.images

  return (
    <PageWrapper>
      <Head>
        <title>{`${tvShow.name} - TV Library`}</title>
      </Head>
      <MoviePlayer videoUrl={tvShow.id} season={tvSeasonId} episode={epId} />
      <TvSeasons baseUrl={baseUrl} movie={tvShow} />
      <MovieSummary baseUrl={baseUrl} movie={tvShow} />
      <RecommendedTvShowList baseUrl={baseUrl} recommendedTvShows={recommendedTvShows} />
    </PageWrapper>
  )
}

export default TvShow
