"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

const INTERVAL_MS = 7000;

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
  pause: string;
  play: string;
}

const format = (text: string, vars: Record<string, number>) => text.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));

/**
 * Cross-fading hero slideshow. Slides are rendered on the server and stacked in one grid cell, so the height never jumps.
 * Accessible: pause button, pauses while hovered or focused, no autoplay with reduced motion, hidden slides are inert.
 */
export function HeroCarousel({ slides, labels }: { slides: ReactNode[]; labels: CarouselLabels }) {
  const [index, setIndex] = useState(0);
  // null = the visitor has not pressed pause/play: autoplay unless they prefer reduced motion.
  const [choice, setChoice] = useState<boolean | null>(null);
  const [held, setHeld] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const paused = choice ?? reducedMotion;
  const total = slides.length;

  useEffect(() => {
    if (paused || held || total < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % total), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, held, total]);

  const go = (next: number) => setIndex((next + total) % total);
  const control =
    "grid size-tap place-items-center rounded-full border border-gray-200 bg-white text-navy-900 transition-colors duration-150 hover:bg-navy-50";

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
      <div className="grid" aria-live={paused || held ? "polite" : "off"}>
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
        <div className="absolute inset-x-0 bottom-6 z-20 lg:bottom-10">
          <div className="mx-auto flex w-full max-w-page items-center gap-2 px-gutter">
            <button type="button" onClick={() => go(index - 1)} aria-label={labels.previous} className={control}>
              <Icon name="chevron-left" className="size-5" />
            </button>
            <ul className="flex items-center">
              {slides.map((_, i) => (
                <li key={i}>
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
            <button type="button" onClick={() => go(index + 1)} aria-label={labels.next} className={control}>
              <Icon name="chevron-right" className="size-5" />
            </button>
            <button type="button" onClick={() => setChoice(!paused)} aria-label={paused ? labels.play : labels.pause} className={`${control} ml-2`}>
              <Icon name={paused ? "play" : "pause"} className="size-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
