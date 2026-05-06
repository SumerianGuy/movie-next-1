import { Element } from 'react-scroll';

import Header from 'parts/Header';
import NotFound from 'parts/NotFound';
import PaddingWrapper from 'parts/PaddingWrapper';
import TvShowList from 'components/TvShowList';
import Loader from 'components/UI/Loader';
import { SCROLL_TO_ELEMENT } from 'utils/constants';

const RecommendedTvShowList = ({
  recommendedTvShows,
  baseUrl
}) => (
  <PaddingWrapper>
    <Element name={SCROLL_TO_ELEMENT}>
      <Header
        title='Recommended'
        subtitle='TV Shows' />
    </Element>
    {recommendedTvShows.loading ? (
      <Loader centerRow />
    ) : (
        recommendedTvShows.total_results === 0 ? (
        <NotFound
          title='Sorry!'
          subtitle='There are no recommended movies...' />
      ) : (
        <TvShowList
          tvShows={recommendedTvShows}
          baseUrl={baseUrl} />
      )
    )}
  </PaddingWrapper>
);

export default RecommendedTvShowList;
