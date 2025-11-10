"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function TermsOfService() {
  const [isLoading, setIsLoading] = useState(true);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedRef.current) {
      embedRef.current.setAttribute("name", "termly-embed");
      embedRef.current.setAttribute(
        "data-id",
        "40222f49-90a3-443b-85c8-c69225cd72c7"
      );
    }
  }, []);

  return (
    <main className="min-h-screen">
      <div className="container-lg py-8 px-5 md:py-12 md:px-10">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
              <p className="text-sm text-gray-600">
                Loading terms of service...
              </p>
            </div>
          </div>
        )}
        <div ref={embedRef} className={isLoading ? "hidden" : ""}></div>
      </div>

      <Script
        id="termly-jssdk"
        strategy="afterInteractive"
        src="https://app.termly.io/embed-policy.min.js"
        onLoad={() => {
          // Give Termly a moment to initialize
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }}
        onError={() => {
          setIsLoading(false);
        }}
      />
    </main>
  );
}
