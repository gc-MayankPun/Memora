import { useNavigate } from "react-router";
import { LuBrainCircuit } from "react-icons/lu";
import "../styles/memory-panel.scss";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export default function MemoryPanel({ saves }) {
  const navigate = useNavigate();

  // Oldest 3 saves
  const resurfaced = [...saves]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(0, 3);

  if (!resurfaced.length) return null;

  return (
    <div className="memory-panel">
      <div className="memory-panel__header">
        <LuBrainCircuit className="memory-panel__icon" />
        <span className="memory-panel__title">From your memory</span>
      </div>

      <div className="memory-panel__list">
        {resurfaced.map((save) => {
          const domain = (() => {
            try {
              return new URL(save.url).hostname.replace("www.", "");
            } catch {
              return "";
            }
          })();

          return (
            <div
              key={save._id}
              className="memory-panel__card"
              onClick={() => navigate(`/saves/${save._id}`)}
            >
              {save.thumbnail && (
                <div className="memory-panel__thumb">
                  <img
                    src={save.thumbnail}
                    alt={save.title}
                    onError={(e) => {
                      e.target.parentElement.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="memory-panel__card-body">
                <span className="memory-panel__card-title">{save.title}</span>
                <div className="memory-panel__card-meta">
                  <span className="memory-panel__card-domain">{domain}</span>
                  <span className="memory-panel__card-ago">
                    {timeAgo(save.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
