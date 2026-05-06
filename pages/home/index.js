import Head from 'next/head';
import Link from 'next/link';
import Header from 'parts/Header';
import PageWrapper from 'parts/PageWrapper';
import PaddingWrapper from 'parts/PaddingWrapper';

const Genre = () => {
  return (
    <PageWrapper>
      <PaddingWrapper>
        <Head>
          <title>Home Page</title>
        </Head>
        <Header title={'Home Page'} />
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            <Link legacyBehavior href="/?category=Popular&page=1">
              <a style={{ textDecoration: 'none', color: '#333' }}>Flixwave - Watch Movies Online for FREE</a>
            </Link>
          </p>
          <p style={{ fontSize: '2rem', lineHeight: '1.5' }}>
            Flixwave is your ultimate destination for online movie streaming, bringing the magic of cinema right to your fingertips. With an extensive database, exciting features, and unparalleled movie-watching experience, Flixwave is the go-to platform for film enthusiasts worldwide.
          </p>
          <p style={{ fontSize: '2rem', lineHeight: '1.5' }}>
            At Flixwave, we are proud of our diverse database that spans various genres, eras, and countries. From Hollywood blockbusters to independent gems, there is something for everyone. Our database is regularly updated with the latest releases, ensuring you are always in-the-know about the hottest films in the industry.
          </p>
          <p style={{ fontSize: '2rem', lineHeight: '1.5' }}>
            One of the standout features of Flixwave is our personalized recommendation system. Our advanced algorithms analyze your viewing history, preferences, and ratings to curate a customized list of movie recommendations tailored to your tastes. Discover new films you will love and embark on cinematic adventures you never knew existed. In addition to our extensive database and personalized recommendations, Flixwave offers high-quality streaming for an immersive viewing experience. Enjoy movies in stunning high-definition resolution, accompanied by crisp audio, bringing the theater experience to your home. Our adaptive streaming technology ensures smooth playback, adjusting to your internet connection for uninterrupted enjoyment. Flixwave also prioritizes convenience and accessibility. Our platform is compatible with various devices, including laptops, tablets, and smartphones, allowing you to watch movies anytime, anywhere. Whether you are at home or on the go, Flixwave keeps you connected to your favorite films.
          </p>
          <p style={{ fontSize: '2rem', lineHeight: '1.5' }}>
            Furthermore, Flixwave fosters a vibrant community of movie enthusiasts. Engage in discussions, share reviews, and interact with fellow cinephiles through our dedicated forums and social features. Connect with like-minded individuals, exchange recommendations, and delve deeper into the world of cinema. In summary, Flixwave is your ultimate online movie streaming destination, offering a vast database, personalized recommendations, high-quality streaming, device compatibility, and an engaging community. Get ready to be captivated by the world of cinema as you embark on a cinematic journey like no other. Welcome to Flixwave, where movies come to life.
          </p>
        </div>
      </PaddingWrapper>
    </PageWrapper>
  );
};

export default Genre;
