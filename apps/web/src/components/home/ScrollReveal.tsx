"use client";

import React, { useEffect, useRef, useState } from "react";

export type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale-in";

/**
 * Shared IntersectionObserver hook returning [ref, isVisible].
 * Marks visible immediately if reduced-motion is preferred or element starts inside/above the viewport.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.06,
  rootMargin = "0px 0px -40px 0px"
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      const raf = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.96) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

const VARIANT_HIDDEN_CLASSES: Record<RevealVariant, string> = {
  "fade-up": "opacity-0 translate-y-6 scale-[0.985]",
  "fade-left": "opacity-0 -translate-x-6",
  "fade-right": "opacity-0 translate-x-6",
  "scale-in": "opacity-0 translate-y-4 scale-[0.96]",
};

const VARIANT_VISIBLE_CLASSES = "opacity-100 translate-x-0 translate-y-0 scale-100";

/**
 * Shared style & className helper for staggered children sharing a single observer.
 */
export function getRevealMotionProps(
  visible: boolean,
  delay = 0,
  duration = 600,
  variant: RevealVariant = "fade-up"
): { style: React.CSSProperties; className: string } {
  return {
    style: {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    className: `transition-[opacity,transform] will-change-[opacity,transform] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
      visible ? VARIANT_VISIBLE_CLASSES : VARIANT_HIDDEN_CLASSES[variant]
    }`,
  };
}

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * GPU-composited scroll-triggered entrance wrapper with calibrated ease-out curve.
 */
export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  className = "",
}: ScrollRevealProps) {
  const [ref, isVisible] = useInViewOnce<HTMLDivElement>();
  const motion = getRevealMotionProps(isVisible, delay, duration, variant);

  return (
    <div
      ref={ref}
      style={motion.style}
      className={`${motion.className} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Subtle viewport-centered vertical parallax wrapper for floating studio widgets.
 * Wraps rotated children without overwriting their CSS rotation classes.
 */
export function ScrollParallax({
  children,
  speed = -0.08,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const delta = (elementCenter - viewportCenter) * speed;
      const clamped = Math.max(-28, Math.min(28, delta));
      setOffsetY(clamped);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      style={{ transform: `translate3d(0, ${offsetY.toFixed(1)}px, 0)` }}
      className={`will-change-transform motion-reduce:!transform-none ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Top hairline reading progress indicator driven smoothly by page scroll.
 */
export function HomeScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.max(0, Math.min(1, window.scrollY / docHeight));
      setProgress(next);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none bg-transparent"
    >
      <div
        className="h-full w-full origin-left bg-[#2563EB] dark:bg-[#38BDF8] transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress.toFixed(4)})` }}
      />
    </div>
  );
}
