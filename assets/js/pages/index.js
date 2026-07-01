/**
 * Page-specific initialization router.
 */
import { siteConfig } from "../../../data/config.js";
import { renderHero } from "../../../components/hero.js";
import { renderCTA } from "../../../components/cta.js";
import { renderForm } from "../../../components/form.js";
import {
  renderServices,
  renderPortfolio,
  renderReviews,
  renderStats,
  renderProcessSteps,
  renderClientSegments,
  renderBrands,
  renderAdvantages,
  renderContactInfo,
} from "../render.js";

const pages = {
  home: initHomePage,
  services: initServicesPage,
  portfolio: initPortfolioPage,
  about: initAboutPage,
  contacts: initContactsPage,
};

/** Route to the correct page initializer. */
export async function initPage(pageName) {
  const init = pages[pageName];
  if (init) await init();
}

async function initHomePage() {
  const heroEl = document.getElementById("hero-section");
  if (heroEl) {
    renderHero(heroEl, {
      title: "Оборудование для мероприятий",
      description: siteConfig.description,
      showImage: true,
    });
  }

  await renderSection("client-segments", renderClientSegments);
  await renderSection("process-steps", renderProcessSteps, { gridClass: "grid grid--3" });
  await renderSection("services-preview", (el) => renderServices(el, { limit: 3 }), { gridClass: "grid grid--3" });
  await renderSection("stats", renderStats, { gridClass: "stats" });
  await renderSection("portfolio-preview", (el) => renderPortfolio(el, { limit: 6, featuredOnly: true }), { gridClass: "grid grid--3" });
  await renderSection("reviews", renderReviews, { gridClass: "grid grid--2" });
  await renderSection("brands", renderBrands);

  const ctaEl = document.getElementById("cta-section");
  if (ctaEl) {
    renderCTA(ctaEl, {
      title: "Готовы обсудить ваш проект?",
      description: "Оставьте заявку — подберём оборудование под ваш бюджет и масштаб мероприятия.",
    });
  }
}

async function initServicesPage() {
  await renderSection("services-grid", renderServices, { gridClass: "grid grid--2" });
  await renderSection("process-steps", renderProcessSteps, { gridClass: "grid grid--3" });
  await renderSection("brands", renderBrands);

  const ctaEl = document.getElementById("cta-section");
  if (ctaEl) {
    renderCTA(ctaEl, {
      title: "Нужна консультация?",
      description: "Расскажите о вашем мероприятии — мы подберём оптимальное решение.",
    });
  }
}

async function initPortfolioPage() {
  await renderSection("portfolio-grid", renderPortfolio, { gridClass: "grid grid--3" });

  const ctaEl = document.getElementById("cta-section");
  if (ctaEl) {
    renderCTA(ctaEl, {
      title: "Хотите такой же результат?",
      description: `Больше работ в нашей группе ВКонтакте. Подписчикам — скидка ${siteConfig.vkDiscount}.`,
      buttonText: "Перейти в ВКонтакте",
      buttonLink: siteConfig.vkUrl,
    });
  }
}

async function initAboutPage() {
  await renderSection("advantages", renderAdvantages);
  await renderSection("stats", renderStats, { gridClass: "stats" });
  await renderSection("client-segments", renderClientSegments, { gridClass: "grid grid--3" });

  const ctaEl = document.getElementById("cta-section");
  if (ctaEl) {
    renderCTA(ctaEl, {
      title: "Работаем с 2009 года",
      description: "Доверьте техническое оснащение профессионалам — от подбора до монтажа.",
    });
  }
}

async function initContactsPage() {
  const formEl = document.getElementById("contact-form-section");
  if (formEl) renderForm(formEl);

  const infoEl = document.getElementById("contact-info-section");
  if (infoEl) renderContactInfo(infoEl);

  const mapEl = document.getElementById("contact-map");
  if (mapEl && siteConfig.mapEmbed) {
    mapEl.src = siteConfig.mapEmbed;
  }
}

/** Helper to render content into a section grid container. */
async function renderSection(id, renderFn, options = {}) {
  const section = document.getElementById(id);
  if (!section) return;

  const grid = section.querySelector("[data-render-target]");
  if (!grid) return;

  if (options.gridClass) grid.className = options.gridClass;
  await renderFn(grid);
}
