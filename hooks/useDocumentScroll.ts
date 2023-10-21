import { useEffect, useState } from "react";

const useDocumentScroll = () => {
  const [scrollPosition, setScrollPosition] = useState({
    previousScrollTop: 0,
    currentScrollTop: 0,
  });

  const handleDocumentScroll = () => {
    const { scrollTop: currentScrollTop } =
      document.documentElement || document.body;
    setScrollPosition((previous) => ({
      previousScrollTop: previous.currentScrollTop,
      currentScrollTop,
    }));
  };

  const handleDocumentScrollThrottled = throttle(handleDocumentScroll, 100);
  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScrollThrottled, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", handleDocumentScrollThrottled);
  }, []);

  return scrollPosition;
};

function throttle(func: (...args: any[]) => any, delay: number) {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func.apply(this, args);
  };
}

export default useDocumentScroll;
