/**
 * Site footer component — contacts, navigation, copyright.
 */
import { siteConfig } from "../data/config.js";
import { phoneToTel } from "../assets/js/utils.js";

export function renderFooter(container) {
  const phoneLinks = siteConfig.phones
    .map(
      (phone) =>
        `<a href="tel:${phoneToTel(phone)}" class="footer__link">${phone}</a>`
    )
    .join("");

  const navLinks = siteConfig.navigation
    .map((item) => `<a href="${item.href}" class="footer__link">${item.label}</a>`)
    .join("");

  const year = new Date().getFullYear();

  container.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="index.html" class="logo">
              <span class="logo__mark">AMT</span>
              <span>${siteConfig.name}</span>
            </a>
            <p>${siteConfig.description.slice(0, 120)}…</p>
          </div>

          <div>
            <h3 class="footer__heading">Контакты</h3>
            <div class="footer__links">
              ${phoneLinks}
              <a href="mailto:${siteConfig.email}" class="footer__link">${siteConfig.email}</a>
              <span class="footer__link">${siteConfig.address}</span>
            </div>
          </div>

          <div>
            <h3 class="footer__heading">Навигация</h3>
            <div class="footer__links">
              ${navLinks}
              <a href="${siteConfig.vkUrl}" class="footer__link" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <span>&copy; ${year} ${siteConfig.name}. Все права защищены.</span>
          <span>${siteConfig.workingHours}</span>
        </div>
      </div>
    </footer>
  `;
}
