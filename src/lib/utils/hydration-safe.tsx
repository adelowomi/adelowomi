/**
 * Utilities to prevent hydration mismatches caused by browser extensions
 * and other client-side only features
 */

import { useEffect, useState } from 'react';

/**
 * Hook to safely check if component is mounted on client-side
 * Prevents hydration mismatches by ensuring consistent rendering
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook to safely access window object
 * Returns null during SSR to prevent hydration mismatches
 */
export function useWindow(): Window | null {
  const [windowObj, setWindowObj] = useState<Window | null>(null);

  useEffect(() => {
    setWindowObj(window);
  }, []);

  return windowObj;
}

/**
 * Component wrapper that only renders children on client-side
 * Useful for components that use browser-only APIs
 */
export function ClientOnly({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const isClient = useIsClient();

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Safely execute client-side only code
 * Returns null during SSR
 */
export function clientSideOnly<T>(fn: () => T): T | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return fn();
}

/**
 * Clean HTML content to prevent browser extension interference
 * Removes common browser extension attributes that cause hydration mismatches
 */
export function cleanHtmlForHydration(html: string): string {
  const patterns = [
    /data-new-gr-c-s-check-loaded="[^"]*"/g,
    /data-gr-ext-installed="[^"]*"/g,
    /data-grammarly-shadow-root="[^"]*"/g,
    /data-lt-installed="[^"]*"/g,
    /spellcheck="[^"]*"/g,
    /contenteditable="[^"]*"/g
  ];

  let cleanedHtml = html;
  patterns.forEach(pattern => {
    cleanedHtml = cleanedHtml.replace(pattern, '');
  });

  return cleanedHtml;
}

/**
 * Suppress hydration warnings for specific elements
 * Use sparingly and only when hydration mismatches are unavoidable
 */
export function suppressHydrationWarning(element: HTMLElement): void {
  if (typeof window !== 'undefined') {
    element.setAttribute('suppressHydrationWarning', 'true');
  }
}

/**
 * Generate a stable key for React components that prevents hydration issues
 * Uses a combination of static and deterministic values
 */
export function generateStableKey(prefix: string, ...identifiers: (string | number)[]): string {
  return `${prefix}-${identifiers.join('-')}`;
}
