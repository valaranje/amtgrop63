# AMT-GROUP Website

Premium, data-driven website for AMT-GROUP — event equipment rental in Samara.

Built with vanilla HTML, CSS, and JavaScript. No build step required. Fully compatible with Vercel deployment.

## Project Structure

```
/
├── index.html              # Homepage
├── about.html              # About page
├── contacts.html           # Contact page with form
├── portfolio.html          # Portfolio gallery
├── services.html           # Services listing
├── api/
│   └── telegram.js         # Serverless function (Telegram notifications)
├── assets/
│   ├── css/                # Stylesheets (base, layout, components, animations)
│   ├── js/                 # Application logic and renderers
│   ├── images/             # Photos (services, portfolio, hero)
│   └── icons/              # Favicon and icons
├── components/             # Reusable UI components (header, footer, hero, form, cta)
├── data/
│   ├── config.js           # Company info, contacts, navigation, stats
│   ├── services.json       # Service cards
│   ├── portfolio.json      # Portfolio projects
│   └── reviews.json        # Client testimonials
├── vercel.json             # Vercel configuration
├── .env.example            # Environment variables template
└── README.md
```

## Quick Start

### Local Development

Serve the project with any static file server:

```bash
npx serve .
```

Or with Python:

```bash
python -m http.server 3000
```

For Telegram form testing locally, use Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Create `.env.local` from `.env.example` with your Telegram credentials.

## Editing Content

### Services

Edit **`data/services.json`** only. Each service object:

```json
{
  "id": "sound",
  "title": "Звуковое оборудование",
  "description": "...",
  "image": "assets/images/services/sound.jpg",
  "buttonText": "Подробнее",
  "buttonLink": "contacts.html",
  "details": ["Акустические системы", "..."]
}
```

Add a new service by adding one object to the array. Place the image in `assets/images/services/`.

### Contacts & Company Info

Edit **`data/config.js`** only. This file contains:

- Phone numbers, email, address
- Working hours, VK link
- Navigation menu
- Stats, brands, advantages, process steps
- Client segments

Never duplicate contact information in HTML files.

### Portfolio

Edit **`data/portfolio.json`** only. Each project:

```json
{
  "id": "volgafest",
  "title": "Фестивали набережных «ВолгаФест»",
  "location": "Самара",
  "category": "Фестиваль",
  "image": "assets/images/portfolio/volgafest.jpg",
  "featured": true
}
```

Set `"featured": true` to show the project on the homepage preview.

### Reviews

Edit **`data/reviews.json`** to update client testimonials.

### Images

Replace files in:

- `assets/images/services/` — service card photos
- `assets/images/portfolio/` — project photos
- `assets/images/hero.jpg` — homepage hero
- `assets/images/about.jpg` — about page photo

Recommended: JPEG, 1200px wide, optimized for web. Use the same filename to avoid editing JSON.

## Telegram Integration

Form submissions from `contacts.html` are sent to Telegram via a Vercel Serverless Function.

### Setup

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Get your Chat ID (message [@userinfobot](https://t.me/userinfobot) or add the bot to a group)
3. Set environment variables in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot token from BotFather |
| `TELEGRAM_CHAT_ID` | Your chat or group ID |

**Important:** Bot token and Chat ID must never appear in frontend code. They are only read server-side in `api/telegram.js`.

### Message Format

```
📩 Новая заявка

👤 Имя: ...
📞 Телефон: ...
📅 Дата мероприятия: ...
🎤 Необходимое оборудование: ...
💬 Комментарий: ...

🕒 Время отправки: ...
```

## Deploy to Vercel

1. Push the project to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables
4. Deploy

Vercel automatically:
- Serves static HTML/CSS/JS
- Deploys `api/telegram.js` as a serverless function at `/api/telegram`

No database or additional server required.

### Custom Domain

In Vercel Dashboard → Domains, add `amt-group63.ru` and update DNS records as instructed.

## Design System

| Token | Value |
|---|---|
| Background | `#FAFAF8` |
| Cards | `#FFFFFF` |
| Primary text | `#171717` |
| Secondary text | `#6B7280` |
| Accent | `#111111` |
| Borders | `#E5E7EB` |
| Font | Inter (Google Fonts) |
| Spacing | 8px grid system |

## Architecture Notes

- **No build step** — edit JSON/JS and refresh
- **Single source of truth** — all company data in `data/config.js`
- **Component pattern** — header, footer, hero, form, and CTA are JS modules injected into HTML placeholders
- **Dynamic rendering** — services, portfolio, and reviews are fetched from JSON at runtime
- **Mobile-first** — responsive from 320px up
- **Accessibility** — semantic HTML, ARIA labels, focus states, reduced motion support
- **Performance** — lazy-loaded images, cached assets via `vercel.json`, minimal JS

## License

© AMT-GROUP. All rights reserved.
