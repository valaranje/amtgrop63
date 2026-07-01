/**
 * Reusable contact form component with validation and Telegram submission.
 */
import { submitForm } from "../assets/js/api.js";
import { isValidPhone, isValidFutureDate } from "../assets/js/utils.js";

const FIELDS = [
  { name: "name", label: "Имя", type: "text", required: true },
  { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "eventDate", label: "Дата мероприятия", type: "date", required: false },
  { name: "equipment", label: "Необходимое оборудование", type: "text", required: false },
  { name: "comment", label: "Комментарий", type: "textarea", required: false },
];

/**
 * Render and initialize the contact form.
 * @param {HTMLElement} container
 * @param {Object} [options]
 * @param {string} [options.title]
 * @param {string} [options.description]
 */
export function renderForm(container, options = {}) {
  const {
    title = "Оставить заявку",
    description = "Заполните форму, и мы свяжемся с вами в ближайшее время.",
  } = options;

  const fieldsHTML = FIELDS.map((field) => {
    const requiredClass = field.required ? " form__label--required" : "";
    const requiredAttr = field.required ? " required" : "";

    if (field.type === "textarea") {
      return `
        <div class="form__group">
          <label class="form__label${requiredClass}" for="field-${field.name}">${field.label}</label>
          <textarea class="form__textarea" id="field-${field.name}" name="${field.name}" rows="4"></textarea>
          <span class="form__error" id="error-${field.name}" role="alert"></span>
        </div>`;
    }

    return `
      <div class="form__group">
        <label class="form__label${requiredClass}" for="field-${field.name}">${field.label}</label>
        <input class="form__input" type="${field.type}" id="field-${field.name}" name="${field.name}"
               placeholder="${field.placeholder || ""}"${requiredAttr}>
        <span class="form__error" id="error-${field.name}" role="alert"></span>
      </div>`;
  }).join("");

  container.innerHTML = `
    <div class="card" style="padding: var(--space-4)">
      <h2 class="section-title" style="margin-bottom: var(--space-1)">${title}</h2>
      <p style="margin-bottom: var(--space-3)">${description}</p>

      <form class="form" id="contact-form" novalidate>
        ${fieldsHTML}

        <p class="form__consent">
          Нажимая кнопку «Отправить заявку», вы даёте согласие на обработку персональных данных
          в соответствии с Федеральным законом №152-ФЗ.
        </p>

        <div class="form__status" id="form-status" role="status" hidden></div>

        <button type="submit" class="btn btn--primary btn--full" id="form-submit">
          Отправить заявку
        </button>
      </form>
    </div>
  `;

  initFormBehavior(container.querySelector("#contact-form"));
}

/** Attach validation and submit handler to the form. */
function initFormBehavior(form) {
  const submitBtn = form.querySelector("#form-submit");
  const statusEl = form.querySelector("#form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const data = getFormData(form);
    setLoading(submitBtn, true);
    hideStatus(statusEl);

    try {
      await submitForm(data);
      showStatus(statusEl, "success", "Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      form.reset();
    } catch (err) {
      showStatus(statusEl, "error", err.message || "Не удалось отправить заявку. Попробуйте позже.");
    } finally {
      setLoading(submitBtn, false);
    }
  });

  form.querySelectorAll(".form__input, .form__textarea").forEach((input) => {
    input.addEventListener("input", () => clearFieldError(input));
  });
}

/** Collect form field values into an object. */
function getFormData(form) {
  return {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    eventDate: form.eventDate.value,
    equipment: form.equipment.value.trim(),
    comment: form.comment.value.trim(),
  };
}

/** Validate all form fields. Returns true if valid. */
function validateForm(form) {
  let valid = true;
  const data = getFormData(form);

  if (!data.name) {
    setFieldError(form.name, "Введите имя");
    valid = false;
  }

  if (!data.phone) {
    setFieldError(form.phone, "Введите телефон");
    valid = false;
  } else if (!isValidPhone(data.phone)) {
    setFieldError(form.phone, "Введите корректный номер телефона");
    valid = false;
  }

  if (data.eventDate && !isValidFutureDate(data.eventDate)) {
    setFieldError(form.eventDate, "Дата не может быть в прошлом");
    valid = false;
  }

  return valid;
}

function setFieldError(input, message) {
  input.classList.add("form__input--error");
  const errorEl = document.getElementById(`error-${input.name}`);
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(input) {
  input.classList.remove("form__input--error");
  const errorEl = document.getElementById(`error-${input.name}`);
  if (errorEl) errorEl.textContent = "";
}

function setLoading(btn, loading) {
  btn.disabled = loading;
  btn.innerHTML = loading
    ? '<span class="btn__loader"></span> Отправка…'
    : "Отправить заявку";
}

function showStatus(el, type, message) {
  el.hidden = false;
  el.className = `form__status form__status--${type}`;
  el.textContent = message;
}

function hideStatus(el) {
  el.hidden = true;
  el.textContent = "";
}
