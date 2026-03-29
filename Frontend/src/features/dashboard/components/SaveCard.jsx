import { useNavigate } from "react-router";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import "../styles/save-card.scss";
import { AiFillGithub } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";

const TYPE_CONFIG = {
  article: {
    icon: <FaLink />,
    label: "Article",
    thumbVar: "--thumb-article",
  },
  tweet: { icon: <FaXTwitter />, label: "Tweet", thumbVar: "--thumb-tweet" },
  youtube: {
    icon: <FaYoutube />,
    label: "YouTube",
    thumbVar: "--thumb-youtube",
  },
  pdf: { icon: <FaFilePdf />, label: "PDF", thumbVar: "--thumb-pdf" },
  github: {
    icon: <AiFillGithub />,
    label: "GitHub",
    thumbVar: "--thumb-github",
  },
  reddit: { icon: <FaReddit />, label: "Reddit", thumbVar: "--thumb-reddit" },
};

export default function SaveCard({ save, index = 0 }) {
  const navigate = useNavigate();
  const {
    _id,
    title,
    url,
    type,
    tags,
    thumbnail,
    favicon,
    isFavorite,
    createdAt,
  } = save;
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.article;

  const domain = (() => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "";
    }
  })();

  return (
    <div
      className="save-card"
      onClick={() => navigate(`/saves/${_id}`)}
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <div
        className="save-card__thumbnail"
        style={{ background: `var(${config.thumbVar})` }}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            onError={(e) => {
              e.target.src = favicon; 
            }}
          />
        )}
        <div
          className="save-card__placeholder"
          style={{ display: thumbnail ? "none" : "flex" }}
        >
          <span className="save-card__placeholder-icon">{config.icon}</span>
          <span className="save-card__placeholder-domain">{domain}</span>
        </div>
      </div>

      <div className="save-card__body">
        <div className="save-card__top">
          <span className="save-card__title">{title}</span>
          <button
            className={`save-card__fav ${isFavorite ? "save-card__fav--active" : ""}`}
            onClick={(e) => e.stopPropagation()}
            aria-label={isFavorite ? "Unfavorite" : "Favorite"}
          >
            {isFavorite ? <FaStar /> : <CiStar />}
          </button>
        </div>

        <div className="save-card__meta">
          <span
            className={`save-card__badge save-card__badge--${type || "article"}`}
          >
            <span className="save-card__icon">{config.icon}</span>
            {config.label}
          </span>
        </div>

        {tags?.length > 0 && (
          <div className="save-card__tags">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="save-card__tag">
                # {tag}
              </span>
            ))}
          </div>
        )}

        <div className="save-card__footer">
          <span className="save-card__date">
            {new Date(createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="save-card__domain">{domain}</span>
        </div>
      </div>
    </div>
  );
}
