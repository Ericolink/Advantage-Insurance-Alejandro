"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

const INTERVAL_MS = 30_000;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export interface CarouselLabels {
  label: string;
  /** "{n} of {total}" */
  slide: string;
  previous: string;
  next: string;
  /** "Show slide {n}" */
  goTo: string;
}

const format = (text: string, vars: Record<string, number>) => text.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));

/**
 * Cross-fading hero slideshow. Slides are rendered on the server and stacked in one grid cell, so the height never jumps.
 * Arrows sit at the screen edges (vertically centered from 1280px; at the bottom corners below that, clear of the text).
 * It holds still while hovered or focused, does not autoplay with reduced motion, and hidden slides are inert.
 */
export function HeroCarousel({ slides, labels }: { slides: ReactNode[]; labels: CarouselLabels }) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const still = held || reducedMotion;
  const total = slides.length;

  useEffect(() => {
    if (still || total < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % total), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, still, total]);

  const go = (next: number) => setIndex((next + total) % total);
  const arrow =
    "absolute bottom-6 z-20 grid size-tap place-items-center rounded-full border border-gray-200 bg-white text-navy-900 shadow-sm transition-colors duration-150 hover:bg-navy-50 xl:top-1/2 xl:bottom-auto xl:-translate-y-1/2";

  return (
    <div
      aria-roledescription="carousel"
      aria-label={labels.label}
      className="relative"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
      }}
    >
      <div className="grid" aria-live={still ? "polite" : "off"}>
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={format(labels.slide, { n: i + 1, total })}
            aria-hidden={i !== index}
            inert={i !== index}
            className={`col-start-1 row-start-1 transition-opacity duration-700 motion-reduce:transition-none ${i === index ? "z-10 opacity-100" : "opacity-0"}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button type="button" onClick={() => go(index - 1)} aria-label={labels.previous} className={`${arrow} left-3 sm:left-4`}>
            <Icon name="chevron-left" className="size-5" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label={labels.next} className={`${arrow} right-3 sm:right-4`}>
            <Icon name="chevron-right" className="size-5" />
          </button>
          {/* Full-width row: pointer-events only on the dots, so it never blocks the bottom arrows on mobile. */}
          <ul className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex items-center justify-center lg:bottom-10">
            {slides.map((_, i) => (
              <li key={i} className="pointer-events-auto">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={format(labels.goTo, { n: i + 1 })}
                  aria-current={i === index ? "true" : undefined}
                  className="grid h-tap w-8 place-items-center"
                >
                  <span className={`block h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-red-600" : "w-2.5 bg-gray-500"}`} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
