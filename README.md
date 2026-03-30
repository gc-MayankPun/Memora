# Memora Browser Extension — Installation Guide

The Memora extension lets you save any webpage to your Memora account directly from your browser. Since it's not on the Chrome Web Store, you'll need to load it manually. It takes about 2 minutes.

---

## Prerequisites

- Google Chrome browser
- A Memora account ([Sign up here](https://your-memora.vercel.app/register))

---

## Step 1 — Download the Extension

1. Go to the [Memora GitHub repository](https://github.com/yourusername/memora)
2. Click the green **Code** button
3. Click **Download ZIP**
4. Once downloaded, **unzip** the file somewhere on your computer (e.g. your Desktop)

> You'll see a folder called `memora-main` or similar. Inside it, find the `extension` folder — that's the one you need.

---

## Step 2 — Open Chrome Extensions

1. Open **Google Chrome**
2. In the address bar, type:
   ```
   chrome://extensions
   ```
   and press **Enter**

---

## Step 3 — Enable Developer Mode

In the top-right corner of the Extensions page, toggle on **Developer mode**

![Developer mode toggle in top right](https://i.imgur.com/placeholder.png)

---

## Step 4 — Load the Extension

1. Click **Load unpacked** (appears after enabling Developer mode)
2. In the file picker, navigate to the unzipped folder
3. Select the **`extension`** folder (the one containing `manifest.json`)
4. Click **Select Folder**

---

## Step 5 — Pin the Extension

1. Click the **puzzle piece icon** (🧩) in the Chrome toolbar
2. Find **Memora** in the list
3. Click the **pin icon** next to it

The Memora icon will now appear in your toolbar permanently.

---

## Using the Extension

1. Browse to any webpage you want to save
2. Click the **Memora icon** in your toolbar
3. If you're not logged in, it will prompt you to sign in first
4. Add an optional note or tags
5. Click **Save to Memora**

Your save will be enriched with an AI-generated summary and tags automatically.

---

## Troubleshooting

**"Could not connect to Memora"**
Your backend may be starting up (free tier spins down after inactivity). Wait 30 seconds and try again.

**Extension shows blank popup**
Try removing and re-adding the extension via Load unpacked.

**Already saved message**
The page is already in your Memora. Click "View saved item" to open it, or "Save again anyway" to update it.

**Popup says "You're not logged in"**
Click "Sign in to Memora" — it'll open the login page. Sign in, then come back and click the extension icon again.

---

## Updating the Extension

When a new version is released:

1. Download the new ZIP from GitHub
2. Unzip it
3. Go to `chrome://extensions`
4. Click the **refresh icon** on the Memora card, or remove and re-add it using Load unpacked

---

## Note on Developer Mode

Because this extension is loaded manually and not from the Chrome Web Store, Chrome may occasionally show a warning saying *"Disable developer mode extensions"* when you open a new window. Just dismiss it — the extension is safe to use.