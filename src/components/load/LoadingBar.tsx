import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

interface LoadingBarProps {
  isLoading: boolean;
}

const LoadingBar = ({ isLoading }: LoadingBarProps) => {
  useEffect(() => {
    if (isLoading) {
      NProgress.configure({ showSpinner: false });
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return (
    <header style={{ height: '4px', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }}>
      {isLoading && <div className="loading-bar"></div>}
    </header>
  );
};

export default LoadingBar;