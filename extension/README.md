# Memora Browser Extension — Installation Guide

The Memora extension lets you save any webpage to your Memora account directly from your browser. Since it's not on the Chrome Web Store, you'll need to load it manually. It takes about 2 minutes.

---

## Prerequisites

Before installing the extension, make sure you have:

- A Chromium-based browser (e.g. Chrome, Brave, Edge)
- A Memora account ([Sign up here](https://memora-01wh.onrender.com/register))
- If you're using Brave, disable Shields for the Highlight feature to work correctly

---

## Step 1 — Download the Extension

1. [⬇️ Download Extension (ZIP)](https://github.com/gc_mayankpun/repo/raw/main/extension.zip)
2. Once downloaded, **unzip** the file somewhere on your computer (e.g. your Desktop)

> You'll see a folder called `extension`, that's the one you need.

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

![Chrome extensions page with Developer Mode toggle enabled](https://res.cloudinary.com/dnc0kiyts/image/upload/v1774892215/1_rbc6mg.png)

---

## Step 4 — Load the Extension

1. Click **Load unpacked** (appears after enabling Developer mode)
2. In the file picker, navigate to the unzipped folder
3. Select the **`extension`** folder (the one containing `manifest.json`)
4. Click **Select Folder**

![Load unpacked button visible after enabling Developer Mode](https://res.cloudinary.com/dnc0kiyts/image/upload/v1774892216/2_pvt7ck.png)

> ⚠️ Select the inner `extension` folder, not the outer `Memora-main` folder.

---

## Step 5 — Pin the Extension

1. Click the **puzzle piece icon** (🧩) in the Chrome toolbar
2. Find **Memora** in the list
3. Click the **pin icon** next to it

![Chrome toolbar puzzle piece menu with Memora pin icon](https://res.cloudinary.com/dnc0kiyts/image/upload/v1774892220/5_lhkemy.png)

The Memora icon will now appear in your toolbar permanently.

---

## Using the Extension

![Memora extension popup](https://res.cloudinary.com/dnc0kiyts/image/upload/v1774892220/6_pktkmj.png)

1. Browse to any webpage you want to save
2. Click the **Memora icon** in your toolbar
3. If you're not logged in, it will prompt you to sign in first
4. Add an optional note or tags
5. Click **Save to Memora**

Your save will be enriched with an AI-generated summary and tags automatically.

---

## Troubleshooting

**"Saving..." takes a long time or gets stuck**
Memora is hosted on Render's free tier, which spins down after inactivity. If the button stays on "Saving..." for more than 15–20 seconds, the server is likely cold-starting. Wait 30 seconds, then try saving again, your first attempt may not have gone through.

**"Could not connect to Memora"**
Same cause as above, the server is waking up. Wait 30 seconds and try again.

<!-- **"Could not connect to Memora"**
Your backend may be starting up (free tier spins down after inactivity). Wait 30 seconds and try again. -->

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

> ⚠️ If you downloaded to a new folder location, the refresh icon won't work — remove the extension and re-add it using Load unpacked instead.

---

## Note on Developer Mode

Because this extension is loaded manually and not from the Chrome Web Store, Chrome may occasionally show a warning saying _"Disable developer mode extensions"_ when you open a new window. Just dismiss it, the extension is safe to use.
