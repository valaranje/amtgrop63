/**
 * Vercel Serverless Function — sends form submissions to Telegram.
 * Environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return res.status(500).json({ success: false, message: "Сервер не настроен" });
  }

  const { name, phone, eventDate, equipment, comment } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: "Имя и телефон обязательны" });
  }

  const timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Samara" });

  const message = [
    "📩 Новая заявка",
    "",
    `👤 Имя: ${escapeHtml(name)}`,
    `📞 Телефон: ${escapeHtml(phone)}`,
    `📅 Дата мероприятия: ${eventDate ? escapeHtml(eventDate) : "—"}`,
    `🎤 Необходимое оборудование: ${equipment ? escapeHtml(equipment) : "—"}`,
    `💬 Комментарий: ${comment ? escapeHtml(comment) : "—"}`,
    "",
    `🕒 Время отправки: ${timestamp}`,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return res.status(502).json({ success: false, message: "Ошибка отправки в Telegram" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Telegram send error:", error);
    return res.status(500).json({ success: false, message: "Внутренняя ошибка сервера" });
  }
}

/** Sanitize user input for plain-text Telegram messages. */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
