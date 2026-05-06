import { useEffect, useState } from 'react';
import clsx from 'clsx';

const MainWrapper = ({
  theme,
  className = '',
  children
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className={clsx('main-wrapper', className)}>
          {children}
        </div>
      )}
      <style jsx>{`
        .main-wrapper {
          position: relative;
          display: flex;
          align-items: flex-start;
          user-select: none;
        }

        @media ${theme.mediaQueries.large} {
          .main-wrapper {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default MainWrapper;
