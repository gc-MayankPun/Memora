const APP_URL = "http://localhost:5173";
const API_URL = "http://localhost:3000";

// ── Screen helpers ──
function showScreen(name) {
  document.getElementById("screen-save").classList.add("hidden");
  document.getElementById("screen-saved").classList.add("hidden");
  document.getElementById("screen-exists").classList.add("hidden");
  document.getElementById(`screen-${name}`).classList.remove("hidden");
}

// ── Open full app on ↗ click ──
["open-app", "open-app-2", "open-app-3"].forEach((id) => {
  document.getElementById(id).addEventListener("click", (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: APP_URL });
  });
});

// ── On popup open: get current tab info ──
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tab = tabs[0];
  const url = tab.url;
  const title = tab.title;

  document.getElementById("page-title").value = title || "";
  document.getElementById("page-url").value = url || "";

  // Check if this URL is already saved
  try {
    const res = await fetch(
      `${API_URL}/api/saves/exists?url=${encodeURIComponent(url)}`,
    );
    const data = await res.json();

    if (data.exists) {
      const d = document.getElementById("saved-ago-text");
      d.textContent = `You saved this ${data.savedAgo || "before"}`;

      document.getElementById("view-existing-btn").href =
        `${APP_URL}/saves/${data.id}`;
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
    // backend not running yet, just show the save form
  }

  showScreen("save");
});

// ── Save button ──
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
    const res = await fetch(`${API_URL}/api/saves`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, note, tags }),
    });

    const data = await res.json();

    // Show auto-generated tags if backend returns them
    if (data.save?.tags && data.save.tags.length > 0) {
      document.getElementById("auto-tags-text").textContent =
        `Tags: ${data.save.tags.join(", ")}`;
    }

    // Wire up "View in Memora" button
    if (data.save?._id) {
      const viewBtn = document.getElementById("view-item-btn");
      viewBtn.href = `${APP_URL}/saves/${data.id}`;
      viewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: `${APP_URL}/saves/${data.save._id}` });
      });
    }

    showScreen("saved");
  } catch (err) {
    btn.disabled = false;
    btn.textContent = "Save to Memora";
    const errMsg = document.getElementById("error-msg");
    errMsg.classList.remove("hidden");
  }
});

// ── "Save again anyway" button ──
document.getElementById("save-anyway-btn").addEventListener("click", () => {
  showScreen("save");
});

document.getElementById("page-url").addEventListener("input", () => {
  document.getElementById("error-msg").classList.add("hidden");
});
