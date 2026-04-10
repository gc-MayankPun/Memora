import { useMemo } from "react";
import { useNavigate } from "react-router";
import { FaLink, FaYoutube, FaReddit, FaFilePdf } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillGithub } from "react-icons/ai";
import { TbArrowsShuffle } from "react-icons/tb";
import "../styles/related-saves.scss";

const TYPE_ICONS = {
  article: <FaLink />,
  tweet: <FaXTwitter />,
  youtube: <FaYoutube />,
  pdf: <FaFilePdf />,
  github: <AiFillGithub />,
  reddit: <FaReddit />,
};

const TYPE_COLORS = {
  article: "var(--badge-article-color)",
  tweet: "var(--badge-tweet-color)",
  youtube: "var(--badge-youtube-color)",
  pdf: "var(--badge-pdf-color)",
  github: "var(--badge-github-color)",
  reddit: "var(--badge-reddit-color)",
};

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

function getRelated(currentSave, allSaves, limit = 3) {
  // fallback to topics if embeddings not available yet
  if (!currentSave?.embedding?.length || !allSaves?.length) {
    return allSaves
      .filter((s) => s._id !== currentSave._id)
      .map((s) => ({
        ...s,
        overlap: (s.topics || []).filter((t) => currentSave.topics?.includes(t))
          .length,
        sharedTopics: (s.topics || []).filter((t) =>
          currentSave.topics?.includes(t),
        ),
      }))
      .filter((s) => s.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, limit);
  }

  return allSaves
    .filter((s) => s._id !== currentSave._id && s.embedding?.length)
    .map((s) => ({
      ...s,
      score: cosineSimilarity(currentSave.embedding, s.embedding),
      sharedTopics: (s.topics || []).filter((t) =>
        currentSave.topics?.includes(t),
      ),
    }))
    .filter((s) => s.score > 0.75)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export default function RelatedSaves({ currentSave, allSaves }) {
  const navigate = useNavigate();
  const related = useMemo(
    () => getRelated(currentSave, allSaves),
    [currentSave, allSaves],
  );

  return (
    <div className="related-saves">
      <div className="related-saves__header">
        <TbArrowsShuffle className="related-saves__icon" />
        <span className="related-saves__title">Related Saves</span>
        <span className="related-saves__count">{related.length || 0}</span>
      </div>

      <div className="related-saves__list">
        {!related.length ? (
          <div className="related-saves__empty">
            <p className="related-saves__title" style={{ textAlign: "center" }}>
              No related saves found.
            </p>
          </div>
        ) : (
          related.map((save, index) => {
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
                className="related-saves__card"
                onClick={() => navigate(`/saves/${save._id}`)}
                style={{ "--i": index }}
              >
                {/* Thumbnail strip */}
                <div
                  className="related-saves__card-thumb"
                  style={{
                    background: save.thumbnail
                      ? `url(${save.thumbnail}) center/cover`
                      : `var(--thumb-${save.type || "article"})`,
                  }}
                >
                  {!save.thumbnail && (
                    <span
                      className="related-saves__card-type-icon"
                      style={{
                        color: TYPE_COLORS[save.type] || TYPE_COLORS.article,
                      }}
                    >
                      {TYPE_ICONS[save.type] || TYPE_ICONS.article}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="related-saves__card-body">
                  <span className="related-saves__card-title">
                    {save.title}
                  </span>

                  <div className="related-saves__card-meta">
                    <span className="related-saves__card-domain">{domain}</span>
                    {save.sharedTopics.slice(0, 2).map((topic) => (
                      <span key={topic} className="related-saves__card-topic">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
