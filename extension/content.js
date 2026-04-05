// const API_URL = "https://memora-01wh.onrender.com";
const API_URL = "http://localhost:3000";

let tooltip = null;
let selectedText = "";
let currentSaveId = null;

// Check if current page is saved in Memora
async function checkIfSaved() { 
  try {
    const res = await fetch(
      `${API_URL}/api/saves/exists?url=${encodeURIComponent(window.location.href)}`,
      { credentials: "include" },
    );
    const data = await res.json();
    if (data.exists) {
      currentSaveId = data.id;
    }
  } catch (err) {
    // not saved or backend unreachable
  }
}

// Create tooltip element 
function createTooltip() {
  const el = document.createElement("div");
  el.id = "memora-highlight-tooltip";
  el.innerHTML = `
    <span class="memora-icon">◈</span>
    <span class="memora-label">Save highlight</span>
  `;
  el.style.cssText = `
    position: fixed;
    z-index: 999999;
    background: #1a1815;
    color: #ede9e3;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    transition: opacity 0.15s ease;
    user-select: none;
    pointer-events: auto;
  `;

  el.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await saveHighlight();
  });

  document.body.appendChild(el);
  return el;
}

// Show tooltip near selection
function showHighlightTooltip(text, x, y) {
  if (!tooltip) tooltip = createTooltip();

  selectedText = text;
  tooltip.style.display = "flex";
  tooltip.style.opacity = "1";

  const tooltipWidth = 140;
  const tooltipHeight = 36;

  // Position above selection, but flip below if too close to top
  const top =
    y - 44 < 10
      ? y + 16 // show below if near top of screen
      : y - 44; // show above normally

  const left = Math.min(
    Math.max(10, x - tooltipWidth / 2),
    window.innerWidth - tooltipWidth - 10,
  );

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

// Hide tooltip
function hideTooltip() {
  if (tooltip) {
    tooltip.style.opacity = "0";
    setTimeout(() => {
      if (tooltip) tooltip.style.display = "none";
    }, 150);
  }
}

// Save the highlight
async function saveHighlight() {
  if (!selectedText || !currentSaveId) {
    showFeedback("Save this page first in Memora", "error");
    hideTooltip();
    return;
  }

  try {
    // Change tooltip to loading state
    tooltip.innerHTML = `<span>Saving...</span>`;

    const res = await fetch(`${API_URL}/api/highlights/${currentSaveId}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ highlightedText: selectedText }),
    });

    if (res.status === 401) {
      showFeedback("Sign in to Memora first", "error"); 
      resetTooltip();
      return;
    }

    if (!res.ok) throw new Error("Failed");

    showFeedback("Highlight saved ✓", "success"); 
    resetTooltip();
  } catch (err) {
    showFeedback("Failed to save highlight", "error"); 
    resetTooltip();
  }
}

// Reset tooltip back to original state
function resetTooltip() {
  if (tooltip) {
    tooltip.innerHTML = `
      <span class="memora-icon">◈</span>
      <span class="memora-label">Save highlight</span>
    `;
    hideTooltip();
  }
}

// Feedback toast
function showFeedback(message, type) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 999999;
    background: ${type === "success" ? "#1a7a45" : "#c0392b"};
    color: #fff;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 500;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    animation: memora-fade-in 0.2s ease;
  `;

  // Inject keyframe
  if (!document.getElementById("memora-styles")) {
    const style = document.createElement("style");
    style.id = "memora-styles";
    style.textContent = `
      @keyframes memora-fade-in {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Listen for text selection
document.addEventListener("mouseup", (e) => {
  setTimeout(() => {
    const selected = window.getSelection().toString().trim();
    if (selected.length > 10) {
      showHighlightTooltip(selected, e.clientX, e.clientY);
    } else {
      hideTooltip();
    }
  }, 10); // slight delay so selection is complete
});

// Hide tooltip when clicking elsewhere
document.addEventListener("mousedown", (e) => {
  if (tooltip && !tooltip.contains(e.target)) {
    hideTooltip();
  }
});

// Init
checkIfSaved();
