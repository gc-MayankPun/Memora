import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import "../styles/collections.scss";

export default function CollectionModal({
  collection,
  onSubmit,
  onClose,
  loading,
}) {
  const [name, setName] = useState(collection?.name || "");
  const [description, setDescription] = useState(collection?.description || "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), description.trim());
  };

  const isEditing = !!collection;

  return (
    <div className="collection-modal__overlay" onClick={onClose}>
      <div className="collection-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="collection-modal__header">
          <span className="collection-modal__title">
            {isEditing ? "Edit collection" : "New collection"}
          </span>
          <button
            className="collection-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <IoClose />
          </button>
        </div>

        {/* Form */}
        <form className="collection-modal__form" onSubmit={handleSubmit}>
          <div className="collection-modal__group">
            <label className="collection-modal__label">Name</label>
            <input
              ref={inputRef}
              type="text"
              className="collection-modal__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. React Resources"
              maxLength={40}
              required
            />
          </div>

          <div className="collection-modal__group">
            <label className="collection-modal__label">
              Description{" "}
              <span className="collection-modal__optional">(optional)</span>
            </label>
            <input
              type="text"
              className="collection-modal__input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this collection about?"
              maxLength={100}
            />
          </div>

          <button
            type="submit"
            className="collection-modal__submit"
            disabled={loading || !name.trim()}
          >
            {loading
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
                ? "Save changes"
                : "Create collection"}
          </button>
        </form>
      </div>
    </div>
  );
}
