"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VIEWPORT DETECTION
 * ---------------------------------------------------------------------------
 * Deliberately separate from the animation layer. This file knows when an
 * element is on screen and nothing about what should happen when it is.
 *
 * All callers share a small pool of IntersectionObservers keyed by their
 * options, rather than each component creating its own.
 */

type Callback = (entry: IntersectionObserverEntry) => void;

interface ObserverRecord {
  observer: IntersectionObserver;
  callbacks: Map<Element, Callback>;
}

const pool = new Map<string, ObserverRecord>();

function getObserver(rootMargin: string, threshold: number): ObserverRecord {
  const key = `${rootMargin}|${threshold}`;
  const existing = pool.get(key);
  if (existing) return existing;

  const callbacks = new Map<Element, Callback>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        callbacks.get(entry.target)?.(entry);
      }
    },
    { rootMargin, threshold },
  );

  const record = { observer, callbacks };
  pool.set(key, record);
  return record;
}

export interface InViewOptions {
  /** Shrinks or expands the trigger area. Negative bottom delays the trigger. */
  rootMargin?: string;
  threshold?: number;
  /** Stop observing after the first entry. Default true. */
  once?: boolean;
}

/**
 * Imperative subscription — used by the animation layer, which needs to react
 * without triggering a React render.
 */
export function observeInView(
  element: Element,
  onEnter: (entry: IntersectionObserverEntry) => void,
  { rootMargin = "0px 0px -6% 0px", threshold = 0, once = true }: InViewOptions = {},
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    // No observer support: treat the element as visible immediately so the
    // content is never left in a hidden state.
    onEnter({ target: element, isIntersecting: true } as IntersectionObserverEntry);
    return () => {};
  }

  const { observer, callbacks } = getObserver(rootMargin, threshold);

  const handler: Callback = (entry) => {
    if (!entry.isIntersecting) return;
    onEnter(entry);
    if (once) {
      observer.unobserve(element);
      callbacks.delete(element);
    }
  };

  callbacks.set(element, handler);
  observer.observe(element);

  return () => {
    observer.unobserve(element);
    callbacks.delete(element);
  };
}

/** React-state version, for components that need to render differently. */
export function useInView<T extends HTMLElement>(options: InViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return observeInView(element, () => setInView(true), options);
    // Options are treated as static per mount, which is how they are used.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
