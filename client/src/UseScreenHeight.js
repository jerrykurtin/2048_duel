import { useEffect } from 'react';

const useScreenHeight = () => {
  useEffect(() => {
    const updateScreenHeight = () => {
      const screenHeight = window.innerHeight;
      document.documentElement.style.setProperty('--screen-height', `${screenHeight}px`);
    };

    updateScreenHeight();

    window.addEventListener('resize', updateScreenHeight);

    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);
};

export default useScreenHeight;