import Document, { Html, Head, Main, NextScript } from 'next/document';

import Script from 'utils/hocs/Script';
import CLASS_NAMES from 'utils/constants/class-names';
import { mediaStyles } from 'utils/helpers/media';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
           <title>Free Movies & TV Shows!</title>
        <Head>
          
          <meta charSet='utf-8' />
          <meta name='supported-color-schemes' content='dark light' />
          <meta name='color-scheme' content='dark light' />
       

          <meta name='title' content='Watch Free Movies & TV Shows Online | Best Fmovies, Soap2day & 123Movies Alternative!' />
          <meta name="description" content="Watch free movies and TV shows online in HD. Flixwave is the top safe alternative to Fmovies, Soap2day, 123Movies, Putlocker, YesMovies, and SolarMovie!" />
          <meta
            name="keywords"
            content="
              stream movies online free,
              watch free movies online,
              free movie streaming,
              free tv streaming,
              online cinema,
              hd movie streaming,
              free streaming service,
              netflix alternative,
              fmovies alternative,
              soap2day alternative,
              123movies alternative,
              putlocker alternative,
              solarmovie alternative,
              yesmovies alternative,
              watchseries alternative,
              popcornflix alternative,
              tubi alternative,
              crackle alternative,
              free netflix alternatives,
              free online movie sites,
              sites like fmovies,
              sites like soap2day,
              best free streaming sites,
              watch series free online
            "
          />


          {/* LIGHT MODE ICONS */}
          <link rel="icon" href="/light-favicon.ico" media="(prefers-color-scheme: light)" />
          <link rel="apple-touch-icon" href="/light-apple-touch-icon.png" media="(prefers-color-scheme: light)" />
          <link rel="manifest" href="/light-manifest.webmanifest" media="(prefers-color-scheme: light)" />
          <link rel="mask-icon" href="/light-safari-pinned-tab.svg" color="#000000" media="(prefers-color-scheme: light)" />
          <link rel="icon" type="image/png" sizes="16x16" href="/light-favicon-16x16.png" media="(prefers-color-scheme: light)" />
          <link rel="icon" type="image/png" sizes="32x32" href="/light-favicon-32x32.png" media="(prefers-color-scheme: light)" />

          {/* DARK MODE ICONS */}
          <link rel="icon" href="/dark-favicon.ico" media="(prefers-color-scheme: dark)" />
          <link rel="apple-touch-icon" href="/dark-apple-touch-icon.png" media="(prefers-color-scheme: dark)" />
          <link rel="manifest" href="/dark-manifest.webmanifest" media="(prefers-color-scheme: dark)" />
          <link rel="mask-icon" href="/dark-safari-pinned-tab.svg" color="#ffffff" media="(prefers-color-scheme: dark)" />
          <link rel="icon" type="image/png" sizes="16x16" href="/dark-favicon-16x16.png" media="(prefers-color-scheme: dark)" />
          <link rel="icon" type="image/png" sizes="32x32" href="/dark-favicon-32x32.png" media="(prefers-color-scheme: dark)" />
          {/* Open Graph / Facebook */}

          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://flixwave.online/' />
          <meta property='og:description' content='Watch Your Favorite Movies & TV Shows!' />
          <meta property='og:image' content='https://flixwave.online/movies-meta-image.jpg' />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='628' />

          {/* Twitter */}
          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content='https://flixwave.online/' />
          <meta property='twitter:title' content='Free Movies && TV Shows!' />
          <meta property='twitter:description' content='Watch Your Favorite Free Movies && TV Shows!' />
          <meta property='twitter:image' content='https://flixwave.online/movies-meta-image.jpg' />

          <style
            type='text/css'
            dangerouslySetInnerHTML={{__html: mediaStyles}} />
          {/* Adds an event listener to capture uncaught errors. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                addEventListener('error', window.__e=function f(e){f.q=f.q||[];f.q.push(e)});
              `
            }} />
          {/* <script async src="https://www.google-analytics.com/analytics.js"></script> */}
        </Head>
        <body className={CLASS_NAMES.LIGHT}>
          {/* MEMO: inspired by https://github.com/donavon/use-dark-mode#that-flash */}
          <Script>
            {() => {
              // Insert this script in your index.html right after the <body> tag.
              // This will help to prevent a flash if dark mode is the default.

              (function() {
                // Change these if you use something different in your hook.
                var storageKey = 'darkMode';
                var classNameDark = 'dark';
                var classNameLight = 'light';

                function setClassOnDocumentBody(darkMode) {
                  document.body.classList.add(darkMode ? classNameDark : classNameLight);
                  document.body.classList.remove(darkMode ? classNameLight : classNameDark);
                }
                
                var preferDarkQuery = '(prefers-color-scheme: dark)';
                var mql = window.matchMedia(preferDarkQuery);
                var supportsColorSchemeQuery = mql.media === preferDarkQuery;
                var localStorageTheme = null;
                try {
                  localStorageTheme = localStorage.getItem(storageKey);
                } catch (err) {}
                var localStorageExists = localStorageTheme !== null;
                if (localStorageExists) {
                  localStorageTheme = JSON.parse(localStorageTheme);
                }

                // Determine the source of truth
                if (localStorageExists) {
                  // source of truth from localStorage
                  setClassOnDocumentBody(localStorageTheme);
                } else if (supportsColorSchemeQuery) {
                  // source of truth from system
                  setClassOnDocumentBody(mql.matches);
                  localStorage.setItem(storageKey, mql.matches);
                } else {
                  // source of truth from document.body
                  var isDarkMode = document.body.classList.contains(classNameDark);
                  localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
                }
              })();
            }}
          </Script>
          <Main />
          <NextScript />
          {/* TODO: transpile */}
          <script
            type='module'
            dangerouslySetInnerHTML={{
              __html: `
                import('/analytics/base.min.js').then(analytics => analytics.init());
              `
            }} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
