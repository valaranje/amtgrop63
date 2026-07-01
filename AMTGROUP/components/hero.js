/**
 * Hero section component.
 */
import { siteConfig } from "../data/config.js";

/**
 * @param {HTMLElement} container
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.description
 * @param {string} [options.label]
 * @param {boolean} [options.showImage]
 * @param {string} [options.imageSrc]
 * @param {string} [options.imageAlt]
 */
export function renderHero(container, options) {
  const {
    title,
    description,
    label = siteConfig.tagline,
    showImage = false,
    imageSrc = "assets/images/hero.jpg",
    imageAlt = "Оборудование для мероприятий AMT-GROUP",
  } = options;

  const imageBlock = showImage
    ? `<div class="hero__image fade-in fade-in--delay-2">
        <img src="${imageSrc}" alt="${imageAlt}" loading="eager" decoding="async"
             onerror="this.src='assets/images/placeholder.jpg'">
       </div>`
    : "";

  container.innerHTML = `
    <section class="hero${showImage ? " hero--split" : ""}" id="hero">
      <div class="container">
        <div class="hero__content fade-in">
          <span class="hero__label">${label}</span>
          <h1 class="hero__title">${title}</h1>
          <p class="hero__description">${description}</p>

          <div class="hero__actions fade-in fade-in--delay-1">
            <a href="contacts.html" class="btn btn--primary">Оставить заявку</a>
            <a href="services.html" class="btn btn--secondary">Наши услуги</a>
          </div>
        </div>

        ${imageBlock}
      </div>
    </section>
  `;
}