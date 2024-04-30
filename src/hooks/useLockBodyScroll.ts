import { useEffect } from 'react';

const useLockBodyScroll = () => {
  useEffect(() => {
    const body = document.body;

    body.classList.add('no-scroll');

    return () => {
      body.classList.remove('no-scroll');
    };
  }, []);
};

export default useLockBodyScroll;
