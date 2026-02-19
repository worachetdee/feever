/**
 * Format cents to a display price string.
 * e.g. 2900 -> "$29.00", 999 -> "$9.99"
 */
export function formatPrice(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format a number with compact notation.
 * e.g. 1200 -> "1.2K", 1000000 -> "1M"
 */
export function formatCompact(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}
