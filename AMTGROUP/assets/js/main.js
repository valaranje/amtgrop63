/**
 * Main application entry — initializes shared layout and page-specific content.
 */
import { renderHeader } from "../../components/header.js";
import { renderFooter } from "../../components/footer.js";
import { initAnimations } from "./animations.js";
import { initPage } from "./pages/index.js";

document.addEventListener("DOMContentLoaded", async () => {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) renderHeader(headerEl);
  if (footerEl) renderFooter(footerEl);

  const page = document.body.dataset.page;
  if (page) await initPage(page);

  initAnimations();
});
