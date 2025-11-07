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
import { QuoteIcon } from "@/components/svgs";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface TestimonialsCarouselProps {
  items: TestimonialItem[];
  autoPlayInterval?: number;
}

export function TestimonialsCarousel({
  items,
  autoPlayInterval = 5000,
}: TestimonialsCarouselProps) {
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
      className="max-w-[624px]"
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
        slidesPerView={1}
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
        {items.map((item) => (
          <SwiperSlide key={item.id} className="testimonials-slide">
            <div className="w-full">
              <div className="flex items-end justify-between">
                <QuoteIcon />
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                />
              </div>
              <p className="max-w-[624px] mt-16 font-medium text-[32px] leading-tight text-(--text-strong) tracking-[-0.01em]">
                &quot;{item.quote}&quot;
              </p>
              <p className="mt-8 font-medium text-lg leading-[1.33] text-(--text-strong)">
                {item.name}
              </p>
              <p className="mt-2 leading-[1.62] text-(--text-surface)">
                {item.role}
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
        :global(.testimonials-slide) {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
}
