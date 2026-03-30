import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useCollection } from "../hooks/useCollection";
import { IoArrowBack } from "react-icons/io5";
import { IoFolderOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaLink, FaYoutube, FaReddit, FaFilePdf } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillGithub } from "react-icons/ai";
import CollectionModal from "../components/CollectionModal";
import "../styles/collection-detail.scss";

const TYPE_CONFIG = {
  article: { icon: <FaLink />, label: "Article", thumbVar: "--thumb-article" },
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

export default function CollectionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    collections,
    handleGetCollections,
    handleUpdateCollection,
    handleDeleteCollection,
    handleGetSavesInCollection,
    handleRemoveSaveFromCollection,
  } = useCollection();

  const [saves, setSaves] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Derive the current collection from context instead of a separate fetch
  const collection = collections.find((c) => c._id === id) ?? null;

  // Fetch collections if not yet loaded, then fetch saves for this collection
  useEffect(() => {
    if (collections.length === 0) {
      handleGetCollections();
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    handleGetSavesInCollection(id).then((data) => {
      if (data) setSaves(data.saves || []);
    });
  }, [id]);

  // Reset confirm-delete state when user clicks away
  useEffect(() => {
    if (!confirmDelete) return;
    const timer = setTimeout(() => setConfirmDelete(false), 3000);
    return () => clearTimeout(timer);
  }, [confirmDelete]);

  async function onDeleteCollection() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await handleDeleteCollection(id);
    navigate("/collections");
  }

  async function onUpdateCollection(name, description) {
    await handleUpdateCollection(id, name, description);
    setEditModalOpen(false);
  }

  async function onRemoveSave(saveId) {
    await handleRemoveSaveFromCollection(id, saveId);
    setSaves((prev) => prev.filter((s) => s._id !== saveId));
  }

  if (loading && !collection) {
    return (
      <div className="collection-detail__loading">
        <div className="collection-detail__loading-dots">
          <span />
          <span />
          <span />
        </div>
        <p>Loading collection</p>
      </div>
    );
  }

  return (
    <div className="collection-detail">
      {/* Topbar */}
      <div className="collection-detail__topbar">
        <button
          className="collection-detail__back"
          onClick={() => navigate("/collections")}
        >
          <IoArrowBack /> Collections
        </button>

        <div className="collection-detail__actions">
          <button
            className="collection-detail__action-btn"
            onClick={() => setEditModalOpen(true)}
          >
            <FiEdit2 />
            <span>Edit</span>
          </button>
          <button
            className={`collection-detail__action-btn collection-detail__action-btn--delete ${
              confirmDelete ? "collection-detail__action-btn--confirm" : ""
            }`}
            onClick={onDeleteCollection}
          >
            <RiDeleteBin6Line />
            <span>{confirmDelete ? "Sure?" : "Delete"}</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="collection-detail__header">
        <div className="collection-detail__header-icon">
          <IoFolderOutline />
        </div>
        <div className="collection-detail__header-text">
          <h1 className="collection-detail__name">{collection?.name}</h1>
          {collection?.description && (
            <p className="collection-detail__description">
              {collection.description}
            </p>
          )}
          <span className="collection-detail__meta">
            {saves.length} {saves.length === 1 ? "save" : "saves"}
          </span>
        </div>
      </div>

      {/* Saves grid */}
      {saves.length === 0 ? (
        <div className="collection-detail__empty">
          <span className="collection-detail__empty-icon">◈</span>
          <p className="collection-detail__empty-title">No saves yet</p>
          <p className="collection-detail__empty-sub">
            Add saves to this collection from the save detail page.
          </p>
        </div>
      ) : (
        <div className="collection-detail__grid">
          {saves.map((save, index) => (
            <SaveItem
              key={save._id}
              save={save}
              index={index}
              onOpen={() => navigate(`/saves/${save._id}`)}
              onRemove={() => onRemoveSave(save._id)}
            />
          ))}
        </div>
      )}

      {editModalOpen && (
        <CollectionModal
          collection={collection}
          onSubmit={onUpdateCollection}
          onClose={() => setEditModalOpen(false)}
          loading={loading}
        />
      )}
    </div>
  );
}

function SaveItem({ save, index, onOpen, onRemove }) {
  const config = TYPE_CONFIG[save.type] || TYPE_CONFIG.article;
  const domain = (() => {
    try {
      return new URL(save.url).hostname.replace("www.", "");
    } catch {
      return "";
    }
  })();

  return (
    <div
      className="collection-save-card"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <div
        className="collection-save-card__thumb"
        style={{ background: `var(${config.thumbVar})` }}
        onClick={onOpen}
      >
        {save.thumbnail && (
          <img
            src={save.thumbnail}
            alt={save.title}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        {!save.thumbnail && (
          <span className="collection-save-card__thumb-icon">
            {config.icon}
          </span>
        )}
      </div>

      <div className="collection-save-card__body" onClick={onOpen}>
        <span className="collection-save-card__title">{save.title}</span>
        <div className="collection-save-card__meta">
          <span
            className={`collection-save-card__badge collection-save-card__badge--${save.type || "article"}`}
          >
            {config.icon} {config.label}
          </span>
          <span className="collection-save-card__domain">{domain}</span>
        </div>
        {save.tags?.length > 0 && (
          <div className="collection-save-card__tags">
            {save.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="collection-save-card__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        className="collection-save-card__remove"
        onClick={onRemove}
        aria-label="Remove from collection"
        title="Remove from collection"
      >
        <RiDeleteBin6Line />
      </button>
    </div>
  );
}
