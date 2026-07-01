/**
 * API client for form submissions.
 */

const API_ENDPOINT = "/api/telegram";

/**
 * Submit contact form data to Telegram via serverless function.
 * @param {Object} data - Form field values
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function submitForm(data) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Ошибка отправки заявки");
  }

  return result;
}
