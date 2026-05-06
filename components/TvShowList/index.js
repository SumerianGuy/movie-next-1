import TvShowsGridContainer from './TvShowsGridContainer';
import TvShowListItem from './TvShowListItem';
import Pagination from 'components/Pagination';
import withTheme from 'utils/hocs/withTheme';

const TvList = ({
  theme,
  tvShows,
  baseUrl
}) => (
  <>
    <TvShowsGridContainer theme={theme}>
      {tvShows.results.map((tv, index) => (
        <TvShowListItem
          theme={theme}
          key={tv.id}
          tv={tv}
          fetchpriority={index === 0? "high" : "low"}
          baseUrl={baseUrl} />
      ))}
    </TvShowsGridContainer>
    <Pagination
      page={tvShows.page}
      totalPages={tvShows.total_pages} />
  </>
);

export default withTheme(TvList);
