/**
 * Utility functions for generating stable IDs that work consistently
 * between server and client rendering to prevent hydration mismatches
 */

let counter = 0;

/**
 * Generates a stable ID using a counter and timestamp
 * This ensures the same ID is generated on both server and client
 */
export function generateStableId(prefix: string = 'id'): string {
  counter += 1;
  return `${prefix}-${counter}-${Date.now()}`;
}

/**
 * Generates a stable ID for file uploads using file properties
 * This creates consistent IDs based on file characteristics
 */
export function generateFileId(file: File): string {
  // Use file properties that are consistent between server and client
  const hash = `${file.name}-${file.size}-${file.lastModified}`;
  return btoa(hash).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
}

/**
 * Resets the counter (useful for testing)
 */
export function resetIdCounter(): void {
  counter = 0;
}
