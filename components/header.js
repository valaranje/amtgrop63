/**
 * Site header component — navigation and mobile menu.
 */
import { siteConfig } from "../data/config.js";
import { getCurrentPage } from "../assets/js/utils.js";

export function renderHeader(container) {
  const currentPage = getCurrentPage();

  const navLinks = siteConfig.navigation
    .map(
      (item) =>
        `<a href="${item.href}" class="nav__link${currentPage === item.href ? " nav__link--active" : ""}">${item.label}</a>`
    )
    .join("");

  const mobileLinks = siteConfig.navigation
    .map(
      (item) =>
        `<a href="${item.href}" class="mobile-menu__link">${item.label}</a>`
    )
    .join("");

  container.innerHTML = `
    <header class="header" id="site-header">
      <div class="container header__inner">
        <a href="index.html" class="logo" aria-label="${siteConfig.name} — на главную">
          <span class="logo__mark">AMT</span>
          <span>${siteConfig.name}</span>
        </a>

        <nav class="nav" aria-label="Основная навигация">
          ${navLinks}
        </nav>

        <div class="header__actions">
          <a href="contacts.html" class="btn btn--primary">Оставить заявку</a>
        </div>

        <button class="menu-toggle" id="menu-toggle" aria-label="Открыть меню" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu__nav" aria-label="Мобильная навигация">
        ${mobileLinks}
        <a href="contacts.html" class="btn btn--primary btn--full" style="margin-top: 16px">Оставить заявку</a>
      </nav>
    </div>
  `;

  initHeaderBehavior();
}

/** Handle scroll state and mobile menu toggle. */
function initHeaderBehavior() {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");

  window.addEventListener("scroll", () => {
    header.classList.toggle("header--scrolled", window.scrollY > 8);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("mobile-menu--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("mobile-menu--open");
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  });
}
