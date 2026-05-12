import Document, { Html, Head, Main, NextScript } from "next/document"

import Script from "utils/hocs/Script"
import CLASS_NAMES from "utils/constants/class-names"
import { mediaStyles } from "utils/helpers/media"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Charset */}
          <meta charSet="utf-8" />

          {/* Color scheme */}
          <meta name="supported-color-schemes" content="dark light" />
          <meta name="color-scheme" content="dark light" />

          {/* SEO */}

          <meta
            name="title"
            content="Watch Free Movies & TV Shows Online"
          />

          <meta
            name="description"
            content="Watch free movies and TV shows online in HD quality."
          />

          <meta
            name="keywords"
            content="free movies, watch movies online, tv shows online, streaming"
          />

          {/* Canonical */}
          <link rel="canonical" href="https://flixwave.online/" />

          {/* =========================
              SIMPLIFIED FAVICONS
             ========================= */}

          {/* Keep ONLY these */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />

          {/* =========================
              OPEN GRAPH
             ========================= */}

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://flixwave.online/" />

          <meta
            property="og:title"
            content="Watch Free Movies & TV Shows Online"
          />

          <meta
            property="og:description"
            content="Watch free movies and TV shows online in HD."
          />

          <meta
            property="og:image"
            content="https://flixwave.online/movies-meta-image.jpg"
          />

          {/* =========================
              TWITTER
             ========================= */}

          <meta
            property="twitter:card"
            content="summary_large_image"
          />

          <meta
            property="twitter:title"
            content="Free Movies & TV Shows!"
          />

          <meta
            property="twitter:description"
            content="Watch movies and TV shows online."
          />

          <meta
            property="twitter:image"
            content="https://flixwave.online/movies-meta-image.jpg"
          />

          {/* Media styles */}
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: mediaStyles,
            }}
          />

          {/* Error listener */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                addEventListener('error', window.__e=function f(e){
                  f.q=f.q||[];
                  f.q.push(e)
                });
              `,
            }}
          />
        </Head>

        <body className={CLASS_NAMES.LIGHT}>
          {/* Dark mode flash prevention */}
          <Script>
            {() => {
              ;(function () {
                var storageKey = "darkMode"
                var classNameDark = "dark"
                var classNameLight = "light"

                function setClassOnDocumentBody(darkMode) {
                  document.body.classList.add(
                    darkMode ? classNameDark : classNameLight
                  )

                  document.body.classList.remove(
                    darkMode ? classNameLight : classNameDark
                  )
                }

                var preferDarkQuery = "(prefers-color-scheme: dark)"

                var mql = window.matchMedia(preferDarkQuery)

                var supportsColorSchemeQuery =
                  mql.media === preferDarkQuery

                var localStorageTheme = null

                try {
                  localStorageTheme =
                    localStorage.getItem(storageKey)
                } catch (err) {}

                var localStorageExists =
                  localStorageTheme !== null

                if (localStorageExists) {
                  localStorageTheme =
                    JSON.parse(localStorageTheme)
                }

                if (localStorageExists) {
                  setClassOnDocumentBody(localStorageTheme)
                } else if (supportsColorSchemeQuery) {
                  setClassOnDocumentBody(mql.matches)

                  localStorage.setItem(
                    storageKey,
                    JSON.stringify(mql.matches)
                  )
                } else {
                  var isDarkMode =
                    document.body.classList.contains(
                      classNameDark
                    )

                  localStorage.setItem(
                    storageKey,
                    JSON.stringify(isDarkMode)
                  )
                }
              })()
            }}
          </Script>

          <Main />
          <NextScript />

          {/* Lazy analytics */}
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `
                requestIdleCallback(() => {
                  import('/analytics/base.min.js')
                    .then(analytics => analytics.init())
                    .catch(() => {});
                });
              `,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument