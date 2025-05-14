"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "keen-slider/keen-slider.min.css";

export interface BannerProps {
  imageUrl: string;
  alt: string;
  link: string;
}

interface BannerSliderProps {
  banners: BannerProps[];
  autoPlayInterval?: number; // 자동 슬라이드 간격(ms)
}

export default function BannerSlider({
  banners,
  autoPlayInterval = 4000,
}: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: "auto",
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 640px)": {
          // sm 이상
          disabled: false,
          slides: {
            perView: "auto",
            spacing: 16,
          },
        },
        "(max-width: 639px)": {
          // sm 미만
          disabled: false,
          slides: {
            perView: 1,
            spacing: 16,
          },
        },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, autoPlayInterval);
        }

        slider.on("created", () => {
          // sm 이상 화면에서만 자동 슬라이드 활성화
          if (window.innerWidth >= 640) {
            slider.container.addEventListener("mouseover", () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener("mouseout", () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          }

          // 화면 크기 변경 시 슬라이더 업데이트
          const resizeObserver = new ResizeObserver(() => {
            slider.update();

            // sm 이상 화면으로 전환 시 자동 슬라이드 활성화
            if (window.innerWidth >= 640 && !mouseOver) {
              nextTimeout();
            } else {
              clearNextTimeout();
            }
          });

          resizeObserver.observe(document.body);

          return () => {
            resizeObserver.unobserve(document.body);
          };
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", () => {
          if (window.innerWidth >= 640) nextTimeout();
        });
        slider.on("updated", () => {
          if (window.innerWidth >= 640) nextTimeout();
        });
      },
    ],
  );

  if (!loaded) {
    return (
      <div className="h-[335px] w-full animate-pulse rounded-lg bg-gray-200"></div>
    );
  }

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider overflow-hidden rounded-lg">
        {banners.map((banner, idx) => (
          <Link
            key={idx}
            href={banner.link}
            className="keen-slider__slide relative aspect-square overflow-hidden rounded-lg sm:aspect-auto sm:!min-h-[335px] sm:!w-[335px]"
            style={{
              height: "100%",
              flexShrink: 0,
            }}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.alt}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1200px) 335px, 335px"
              className="object-cover"
              priority={idx < 3}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </Link>
        ))}
      </div>

      {/* 모바일(sm 미만)에서만 보이는 인덱스 UI */}
      {banners.length > 1 && (
        <div className="absolute right-4 bottom-4 rounded-full bg-black/40 px-3 py-1 text-sm text-white sm:hidden">
          {currentSlide + 1} | {banners.length}
        </div>
      )}
    </div>
  );
}
