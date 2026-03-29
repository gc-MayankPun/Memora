import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineExternalLink } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "../styles/save-header.scss";

const TYPE_CONFIG = {
  article: { icon: <FaLink />, label: "Article", thumbVar: "--thumb-article" },
  tweet:   { icon: <FaXTwitter />, label: "Tweet", thumbVar: "--thumb-tweet" },
  youtube: { icon: <FaYoutube />, label: "YouTube", thumbVar: "--thumb-youtube" },
  pdf:     { icon: <FaFilePdf />, label: "PDF", thumbVar: "--thumb-pdf" },
  github:  { icon: <AiFillGithub />, label: "GitHub", thumbVar: "--thumb-github" },
  reddit:  { icon: <FaReddit />, label: "Reddit", thumbVar: "--thumb-reddit" },
};

export default function SaveHeader({ save, onBack, onDelete, onToggleFavorite }) {
  const { title, url, type, thumbnail, isFavorite, createdAt } = save;
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.article;

  const domain = (() => {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return ""; }
  })();

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="save-header">
      {/* Top bar */}
      <div className="save-header__topbar">
        <button className="save-header__back" onClick={onBack}>
          <IoArrowBack /> Back
        </button>

        <div className="save-header__actions">
          <button
            className="save-header__action-btn save-header__action-btn--open"
            onClick={() => window.open(url, "_blank")}
          >
            <HiOutlineExternalLink />
            <span>Open</span>
          </button>
          <button
            className="save-header__action-btn save-header__action-btn--delete"
            onClick={onDelete}
          >
            <RiDeleteBin6Line />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div
        className="save-header__hero"
        style={{ background: `var(${config.thumbVar})` }}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="save-header__hero-img"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        <div className="save-header__hero-overlay" />
      </div>

      {/* Meta */}
      <div className="save-header__meta">
        <div className="save-header__meta-top">
          <span className={`save-header__badge save-header__badge--${type || "article"}`}>
            <span className="save-header__badge-icon">{config.icon}</span>
            {config.label}
          </span>
          <button
            className={`save-header__fav ${isFavorite ? "save-header__fav--active" : ""}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? "Unfavorite" : "Favorite"}
          >
            {isFavorite ? <FaStar /> : <CiStar />}
          </button>
        </div>

        <h1 className="save-header__title">{title}</h1>

        <div className="save-header__info">
          <span className="save-header__domain">{domain}</span>
          <span className="save-header__dot">·</span>
          <span className="save-header__date">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}