# Memora

A knowledge management app that lets you save anything from the web — articles, tweets, videos, PDFs — and automatically organizes, tags, and resurfaces them using AI.

🌐 **Live app:** [https://memora-01wh.onrender.com](https://memora-01wh.onrender.com)

---

## What it does

- **Save anything** — use the browser extension to save any webpage in one click
- **AI enrichment** — every save gets an automatic summary, topic tags, and key topics extracted by AI
- **Knowledge graph** — visualize connections between your saves based on shared topics
- **Collections** — organize saves into folders
- **Highlights** — select text on any saved page and save it as a highlight
- **Memory resurfacing** — rediscover saves you forgot about

---

## Tech Stack

**Frontend** — React, D3.js, SCSS  
**Backend** — Node.js, Express, MongoDB  
**AI** — Mistral AI (summaries, tags, topics)  
**Auth** — JWT + HTTP-only cookies  
**Extension** — Chrome Extension (Manifest V3)

---

## Browser Extension

Memora has a Chrome extension that lets you save any webpage with one click without leaving your browser. It also lets you highlight text on any saved page.

→ [View the Extension Installation Guide](./extension/README.md)

---

## Getting Started (Local Development)

**Backend:**
```bash
cd server
npm install
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

Create a `.env` file in `server/` with:
```
MONGO_URI=mongo_uri
JWT_SECRET=don't_use_my_jwt_it_is_very_wierd_trust_me
MISTRAL_API_KEY=your_mistral_api_key
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
GOOGLE_REFRESH_TOKEN=google_refresh_token
GOOGLE_USER=yourAccount@yes.com
```

---

## Project Structure
```
Memora/
├── client/          # React frontend
│   └── src/
│       └── features/
│           ├── auth/
│           ├── dashboard/
│           ├── saves/
│           ├── graph/
│           └── collections/
├── server/          # Express backend
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── services/
└── extension/       # Chrome extension
    ├── popup.html
    ├── popup.js
    ├── content.js
    └── manifest.json
```

---

> ⚠️ Hosted on Render's free tier — first load may take 30–60 seconds while the server wakes up.