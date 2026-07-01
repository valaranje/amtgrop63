/**
 * Call-to-action section component.
 */

/**
 * @param {HTMLElement} container
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.description
 * @param {string} [options.buttonText]
 * @param {string} [options.buttonLink]
 */
export function renderCTA(container, options) {
  const {
    title,
    description,
    buttonText = "Оставить заявку",
    buttonLink = "contacts.html",
  } = options;

  container.innerHTML = `
    <section class="section section--border">
      <div class="container">
        <div class="cta fade-in">
          <h2 class="cta__title">${title}</h2>
          <p class="cta__description">${description}</p>
          <a href="${buttonLink}" class="btn btn--primary">${buttonText}</a>
        </div>
      </div>
    </section>
  `;
}
