/**
 * Utility functions used across the project.
 */

/** Merge class names, filtering falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Fetch JSON from a path relative to site root. */
export async function fetchJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

/** Get current page filename for active nav highlighting. */
export function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  return page === "" ? "index.html" : page;
}

/** Format phone number for tel: link. */
export function phoneToTel(phone) {
  return phone.replace(/[^\d+]/g, "");
}

/** Validate Russian phone number (basic). */
export function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 12;
}

/** Validate that a date is not in the past. */
export function isValidFutureDate(dateStr) {
  if (!dateStr) return true;
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

/** Create an element from HTML string. */
export function createElement(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

/** Arrow icon SVG for links. */
export const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

/** Image with lazy loading and error fallback. */
export function createImage(src, alt, className = "") {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  if (className) img.className = className;
  img.onerror = () => {
    img.src = "assets/images/placeholder.jpg";
  };
  return img;
}
