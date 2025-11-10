"use client";

import { useEffect, useState } from "react";

// Hook to detect small screen viewport (below 920px)
export const useIsSmallScreen = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 920);
    };

    checkSmallScreen();
    window.addEventListener("resize", checkSmallScreen);

    return () => window.removeEventListener("resize", checkSmallScreen);
  }, []);

  return isSmallScreen;
};
