const APP_URL = "https://memora-01wh.onrender.com";
const API_URL = "https://memora-01wh.onrender.com";

let existingSaveId = null;
let update = false;

// Screen helpers
function showScreen(name) {
  ["save", "saved", "exists", "login"].forEach((s) => {
    document.getElementById(`screen-${s}`).classList.add("hidden");
  });
  document.getElementById(`screen-${name}`).classList.remove("hidden");
}

// Open app buttons
["open-app", "open-app-2", "open-app-3"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: APP_URL });
    });
  }
});

// Open login button
document.getElementById("open-login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: `${APP_URL}/login` });
});

// On popup open
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tab = tabs[0];
  const url = tab.url;
  const title = tab.title;

  document.getElementById("page-title").value = title || "";
  document.getElementById("page-url").value = url || "";

  try {
    const res = await fetch(
      `${API_URL}/api/saves/exists?url=${encodeURIComponent(url)}`,
      { credentials: "include" },
    );

    // 401 = not logged in
    if (res.status === 401) {
      showScreen("login");
      return;
    }

    const data = await res.json();

    if (data.exists) {
      existingSaveId = data.id;

      document.getElementById("saved-ago-text").textContent =
        `You saved this ${data.savedAgo || "before"}`;

      document
        .getElementById("view-existing-btn")
        .addEventListener("click", (e) => {
          e.preventDefault();
          chrome.tabs.create({ url: `${APP_URL}/saves/${data.id}` });
        });

      showScreen("exists");
      return;
    }
  } catch (err) {
    // backend not running — still show save form
  }

  showScreen("save");
});

// Save button
document.getElementById("save-btn").addEventListener("click", async () => {
  const title = document.getElementById("page-title").value.trim();
  const url = document.getElementById("page-url").value.trim();
  const note = document.getElementById("note").value.trim();
  const tags = document
    .getElementById("tags")
    .value.split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!url) return;

  const btn = document.getElementById("save-btn");
  btn.disabled = true;
  btn.textContent = "Saving...";

  try {
    const endpoint = update
      ? `${API_URL}/api/saves/${existingSaveId}/update`
      : `${API_URL}/api/saves`;

    const res = await fetch(endpoint, {
      method: update ? "PATCH" : "POST",
      credentials: "include", // ← auth cookie
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        update ? { title, note, tags } : { title, url, note, tags },
      ),
    });

    // 401 = session expired mid-session
    if (res.status === 401) {
      showScreen("login");
      return;
    }

    const data = await res.json();

    if (data.save?.tags?.length > 0) {
      document.getElementById("auto-tags-text").textContent =
        `Tags: ${data.save.tags.join(", ")}`;
    }

    if (data.save?._id) {
      document
        .getElementById("view-item-btn")
        .addEventListener("click", (e) => {
          e.preventDefault();
          chrome.tabs.create({ url: `${APP_URL}/saves/${data.save._id}` });
        });
    }

    showScreen("saved");
  } catch (err) {
    btn.disabled = false;
    btn.textContent = "Save to Memora";
    document.getElementById("error-msg").classList.remove("hidden");
  } finally {
    update = false;
    existingSaveId = null;
  }
});

// Save again anyway
document.getElementById("save-anyway-btn").addEventListener("click", () => {
  if (!existingSaveId) return;

  showScreen("save");
  update = true;
});

document.getElementById("page-url").addEventListener("input", () => {
  document.getElementById("error-msg").classList.add("hidden");
});
