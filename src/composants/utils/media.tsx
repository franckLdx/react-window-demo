import React from "react";

export const breakpoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560
}

export function useWindowSize() {
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
  React.useLayoutEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}