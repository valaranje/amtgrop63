/**
 * Dynamic content renderers — services, portfolio, reviews, stats.
 */
import { siteConfig } from "../../data/config.js";
import { fetchJSON, arrowIcon } from "./utils.js";

/** Render service cards from services.json into a container. */
export async function renderServices(container, options = {}) {
  const { limit, showDetails = true } = options;
  const services = await fetchJSON("data/services.json");
  const items = limit ? services.slice(0, limit) : services;

  container.innerHTML = items
    .map(
      (service, i) => `
      <article class="card fade-in fade-in--delay-${Math.min(i + 1, 4)}">
        <div class="card__image">
          <img src="${service.image}" alt="${service.title}" loading="lazy" decoding="async"
               onerror="this.src='assets/images/placeholder.jpg'">
        </div>
        <div class="card__body">
          <h3 class="card__title">${service.title}</h3>
          <p class="card__description">${service.description}</p>
          ${
            showDetails && service.details
              ? `<div class="service-card__details">${service.details.map((d) => `<span class="service-card__tag">${d}</span>`).join("")}</div>`
              : ""
          }
          <a href="${service.buttonLink}" class="card__link">
            ${service.buttonText} ${arrowIcon}
          </a>
        </div>
      </article>`
    )
    .join("");
}

/** Render portfolio grid from portfolio.json. */
export async function renderPortfolio(container, options = {}) {
  const { limit, featuredOnly = false } = options;
  let projects = await fetchJSON("data/portfolio.json");

  if (featuredOnly) projects = projects.filter((p) => p.featured);
  if (limit) projects = projects.slice(0, limit);

  container.innerHTML = projects
    .map(
      (project, i) => `
      <article class="card fade-in fade-in--delay-${Math.min(i + 1, 4)}">
        <div class="card__image">
          <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async"
               onerror="this.src='assets/images/placeholder.jpg'">
        </div>
        <div class="card__body">
          <span class="card__category">${project.category} · ${project.location}</span>
          <h3 class="card__title">${project.title}</h3>
        </div>
      </article>`
    )
    .join("");
}

/** Render review cards from reviews.json. */
export async function renderReviews(container) {
  const reviews = await fetchJSON("data/reviews.json");

  container.innerHTML = reviews
    .map(
      (review, i) => `
      <article class="card review-card fade-in fade-in--delay-${Math.min(i + 1, 4)}">
        <blockquote class="review-card__quote">«${review.quote}»</blockquote>
        <footer>
          <cite class="review-card__author">${review.author}</cite>
          <p class="review-card__role">${review.role}, ${review.company}</p>
        </footer>
      </article>`
    )
    .join("");
}

/** Render stats from config.js. */
export function renderStats(container) {
  container.innerHTML = siteConfig.stats
    .map(
      (stat, i) => `
      <div class="stat fade-in fade-in--delay-${Math.min(i + 1, 4)}">
        <div class="stat__value">${stat.value}${stat.suffix}</div>
        <div class="stat__label">${stat.label}</div>
      </div>`
    )
    .join("");
}

/** Render process steps from config.js. */
export function renderProcessSteps(container) {
  container.innerHTML = siteConfig.processSteps
    .map(
      (step, i) => `
      <div class="process-step fade-in fade-in--delay-${Math.min(i + 1, 4)}">
        <div class="process-step__number">${String(i + 1).padStart(2, "0")}</div>
        <h3 class="process-step__title">${step.title}</h3>
        <p class="process-step__description">${step.description}</p>
      </div>`
    )
    .join("");
}

/** Render client segments from config.js. */
export function renderClientSegments(container) {
  container.innerHTML = siteConfig.clientSegments
    .map(
      (segment, i) => `
      <article class="card fade-in fade-in--delay-${Math.min(i + 1, 4)}" style="padding: var(--space-3)">
        <h3 class="card__title">${segment.title}</h3>
        <p class="card__description">${segment.description}</p>
        <ul style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px">
          ${segment.details.map((d) => `<li class="service-card__tag">${d}</li>`).join("")}
        </ul>
      </article>`
    )
    .join("");
}

/** Render brand list from config.js. */
export function renderBrands(container) {
  container.innerHTML = `
    <div class="brands fade-in">
      ${siteConfig.brands.map((brand) => `<span class="brands__item">${brand}</span>`).join("")}
    </div>`;
}

/** Render advantages list from config.js. */
export function renderAdvantages(container) {
  container.innerHTML = siteConfig.advantages
    .map(
      (item, i) => `
      <div class="advantage-item fade-in fade-in--delay-${Math.min(i + 1, 4)}">
        <h3 class="advantage-item__title">${item.title}</h3>
        <p>${item.description}</p>
      </div>`
    )
    .join("");
}

/** Render contact info block from config.js. */
export function renderContactInfo(container) {
  const { phones, email, address, workingHours, vkUrl, vkDiscount } = siteConfig;

  container.innerHTML = `
    <div class="contact-info">
      <div class="contact-info__item">
        <span class="contact-info__label">Телефон</span>
        ${phones.map((p) => `<a href="tel:${p.replace(/[^\d+]/g, "")}" class="contact-info__value">${p}</a>`).join("")}
      </div>
      <div class="contact-info__item">
        <span class="contact-info__label">Email</span>
        <a href="mailto:${email}" class="contact-info__value">${email}</a>
      </div>
      <div class="contact-info__item">
        <span class="contact-info__label">Адрес</span>
        <span class="contact-info__value">${address}</span>
      </div>
      <div class="contact-info__item">
        <span class="contact-info__label">Режим работы</span>
        <span class="contact-info__value">${workingHours}</span>
      </div>
      <div class="contact-info__item">
        <span class="contact-info__label">ВКонтакте</span>
        <a href="${vkUrl}" class="contact-info__value" target="_blank" rel="noopener noreferrer">
          Подписаться — скидка ${vkDiscount}
        </a>
      </div>
    </div>`;
}
