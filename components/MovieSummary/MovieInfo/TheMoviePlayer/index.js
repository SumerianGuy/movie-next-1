import AdSectionWrapper from 'parts/AdSectionWrapper';
import Website from 'parts/Website';
import Imdb from 'parts/Imdb';
import Movie from './Movie';
import { W780H1170 } from 'config/image-sizes';

const MovieAdSection = ({ websiteUrl, imdbId }) => (
  <AdSectionWrapper>
    <Website href={websiteUrl} />
    <Imdb id={imdbId} />
    {/* Pass the IMDb ID as the videoUrl */}
    <Movie width={W780H1170.WIDTH}
      height={W780H1170.HEIGHT} videoUrl={imdbId} />
  </AdSectionWrapper>
);

export default MovieAdSection;
