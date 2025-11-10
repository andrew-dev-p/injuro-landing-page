"use client";

import Script from "next/script";
import { useEffect, useRef, useState, useCallback } from "react";

export default function TermsOfService() {
  const [isLoading, setIsLoading] = useState(true);
  const embedRef = useRef<HTMLDivElement>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Wait for Termly to initialize by checking for content
  const waitForTermlyInit = useCallback(() => {
    // Clear any existing interval
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    checkIntervalRef.current = setInterval(() => {
      attempts++;
      if (embedRef.current) {
        // Check if Termly has rendered content (has children or specific Termly elements)
        const hasContent = 
          embedRef.current.children.length > 0 ||
          embedRef.current.querySelector('[id*="termly"]') !== null ||
          embedRef.current.innerHTML.trim().length > 0;
        
        if (hasContent || attempts >= maxAttempts) {
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
            checkIntervalRef.current = null;
          }
          setIsLoading(false);
        }
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (embedRef.current) {
      embedRef.current.setAttribute("name", "termly-embed");
      embedRef.current.setAttribute(
        "data-id",
        "40222f49-90a3-443b-85c8-c69225cd72c7"
      );
    }

    // Check if script is already loaded (client-side navigation case)
    const existingScript = document.getElementById("termly-jssdk");
    if (existingScript) {
      // Script already exists, start checking for content immediately
      // Give it a moment for Termly to process the new embed
      setTimeout(() => {
        waitForTermlyInit();
      }, 300);
    }

    return () => {
      // Cleanup interval on unmount
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [waitForTermlyInit]);

  const handleScriptLoad = () => {
    // Give Termly a moment to process the embed
    setTimeout(() => {
      waitForTermlyInit();
    }, 300);
  };

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
        onLoad={handleScriptLoad}
        onError={() => {
          setIsLoading(false);
        }}
      />
    </main>
  );
}
