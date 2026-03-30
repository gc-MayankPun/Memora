import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoFolderOutline } from "react-icons/io5";
import "../styles/collections.scss";

export default function CollectionCard({
  collection,
  index,
  onClick,
  onEdit,
  onDelete,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirmDelete) {
      onDelete();
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000); // reset after 3s
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div
      className="collection-card"
      onClick={onClick}
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <div className="collection-card__icon-wrap">
        <IoFolderOutline className="collection-card__icon" />
      </div>

      <div className="collection-card__body">
        <span className="collection-card__name">{collection.name}</span>
        {collection.description && (
          <span className="collection-card__description">
            {collection.description}
          </span>
        )}
        <span className="collection-card__count">
          {collection.saveCount ?? 0}{" "}
          {collection.saveCount === 1 ? "save" : "saves"}
        </span>
      </div>

      <div className="collection-card__actions">
        <button
          className="collection-card__action-btn"
          onClick={handleEdit}
          aria-label="Edit collection"
        >
          <FiEdit2 />
        </button>
        <button
          className={`collection-card__action-btn collection-card__action-btn--delete ${
            confirmDelete ? "collection-card__action-btn--confirm" : ""
          }`}
          onClick={handleDelete}
          aria-label="Delete collection"
        >
          <RiDeleteBin6Line />
          {confirmDelete && <span>Sure?</span>}
        </button>
      </div>
    </div>
  );
}
