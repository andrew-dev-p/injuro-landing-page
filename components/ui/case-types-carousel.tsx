"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
}

export function CaseTypesCarousel({
  items,
  autoPlayInterval = 5000,
}: CarouselProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractionRef = useRef(false);
  const isProgrammaticChangeRef = useRef(false);

  const pauseAutoplay = useCallback(() => {
    setIsAutoplayPaused(true);
    isUserInteractionRef.current = true;

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoplayPaused(false);
      isUserInteractionRef.current = false;
    }, 5000);
  }, []);

  const goToSlide = useCallback(
    (targetIndex: number, pause = false) => {
      if (pause) {
        pauseAutoplay();
      }
      setActiveSlideIndex(targetIndex);
      if (swiperRef.current) {
        isProgrammaticChangeRef.current = true;
        setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.slideTo(targetIndex);
          }
          setTimeout(() => {
            isProgrammaticChangeRef.current = false;
          }, 100);
        }, 0);
      }
    },
    [pauseAutoplay]
  );

  const goToNextSlide = useCallback(() => {
    setActiveSlideIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % items.length;
      if (swiperRef.current) {
        isProgrammaticChangeRef.current = true;
        setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.slideTo(nextIndex);
          }
          setTimeout(() => {
            isProgrammaticChangeRef.current = false;
          }, 100);
        }, 0);
      }
      return nextIndex;
    });
  }, [items.length]);

  const handleNext = useCallback(() => {
    pauseAutoplay();
    setActiveSlideIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % items.length;
      if (swiperRef.current) {
        isProgrammaticChangeRef.current = true;
        setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.slideTo(nextIndex);
          }
          setTimeout(() => {
            isProgrammaticChangeRef.current = false;
          }, 100);
        }, 0);
      }
      return nextIndex;
    });
  }, [items.length, pauseAutoplay]);

  const handlePrev = useCallback(() => {
    pauseAutoplay();
    setActiveSlideIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + items.length) % items.length;
      if (swiperRef.current) {
        isProgrammaticChangeRef.current = true;
        setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.slideTo(newIndex);
          }
          setTimeout(() => {
            isProgrammaticChangeRef.current = false;
          }, 100);
        }, 0);
      }
      return newIndex;
    });
  }, [items.length, pauseAutoplay]);

  useEffect(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    if (!isAutoplayPaused) {
      autoplayIntervalRef.current = setInterval(() => {
        if (!isUserInteractionRef.current) {
          goToNextSlide();
        }
      }, autoPlayInterval);
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [goToNextSlide, autoPlayInterval, isAutoplayPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={pauseAutoplay}
      onMouseLeave={() => {
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
          setIsAutoplayPaused(false);
          isUserInteractionRef.current = false;
        }, 5000);
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        loop={false}
        speed={600}
        slidesPerView="auto"
        watchOverflow={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          if (isProgrammaticChangeRef.current) {
            return;
          }
          if (isUserInteractionRef.current) {
            pauseAutoplay();
          }
          const newIndex = Math.min(
            Math.max(0, swiper.activeIndex),
            items.length - 1
          );
          setActiveSlideIndex(newIndex);
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          if (isProgrammaticChangeRef.current) {
            return;
          }
          const newIndex = Math.min(
            Math.max(0, swiper.activeIndex),
            items.length - 1
          );
          setActiveSlideIndex(newIndex);
        }}
        onTouchStart={pauseAutoplay}
        navigation={{
          enabled: false,
        }}
        pagination={{
          enabled: false,
        }}
        autoplay={false}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} className="case-types-slide">
            <div
              className={cn(
                "flex flex-col gap-5 transition-opacity duration-300 w-full",
                activeSlideIndex === index ? "opacity-100" : "opacity-60"
              )}
            >
              <div className="bg-(--stroke-surface) h-px w-full" />
              <p className="font-medium text-2xl leading-[1.33] text-(--text-strong)">
                {item.title}
              </p>
              <Image
                src={item.image}
                alt={item.title}
                width={343}
                height={400}
              />
              <p className="leading-[1.62] text-(--text-surface)">
                {item.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-[40px] flex items-center justify-between">
        <div className="carousel-pagination flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, true)}
              className={cn(
                "carousel-bullet transition-all duration-300 cursor-pointer",
                activeSlideIndex === index && "carousel-bullet-active"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            className="carousel-prev flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-gray-800 cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="carousel-next flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-gray-800 cursor-pointer"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        :global(.carousel-bullet) {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background-color: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        :global(.carousel-bullet-active) {
          width: 24px;
          background-color: #111827;
        }
        :global(.swiper-wrapper) {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.case-types-slide) {
          width: calc(100% - 12px) !important;
        }
        @media (min-width: 640px) {
          :global(.case-types-slide) {
            width: calc(50% - 12px) !important;
          }
        }
        @media (min-width: 768px) {
          :global(.case-types-slide) {
            width: calc(33.333% - 16px) !important;
          }
        }
        @media (min-width: 1024px) {
          :global(.case-types-slide) {
            width: 343px !important;
          }
        }
      `}</style>
    </div>
  );
}
