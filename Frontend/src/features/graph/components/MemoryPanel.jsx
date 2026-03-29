import { useMemo } from "react";
import { useNavigate } from "react-router";
import { LuBrainCircuit } from "react-icons/lu";
import { timeAgo, getResurfaced, getResurfaceLabel } from "../utils/utils";
import "../styles/memory-panel.scss";

export default function MemoryPanel({ saves }) {
  const navigate = useNavigate();
  const resurfaced = useMemo(() => getResurfaced(saves), [saves]);

  if (!resurfaced.length)
    return (
      <div className="memory-panel">
        <div className="memory-panel__header">
          <LuBrainCircuit className="memory-panel__icon" />
          <span className="memory-panel__title">From your memory</span>
        </div>
        <div className="memory-panel__empty">
          <span className="memory-panel__empty-icon">🧠</span>
          <p className="memory-panel__empty-text">You've viewed everything.</p>
          <p className="memory-panel__empty-sub">
            No forgotten saves, you're built different fr 🔥
          </p>
        </div>
      </div>
    );

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
              <span className="memory-panel__card-label">
                {getResurfaceLabel(save.createdAt)}
              </span>
              <div className="memory-panel__card-inner">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
