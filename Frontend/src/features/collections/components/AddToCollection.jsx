import { useState, useRef, useEffect } from "react";
import { useCollection } from "../hooks/useCollection";
import { IoAdd } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { IoFolderOutline } from "react-icons/io5";
import "../styles/collections.scss";

export default function AddToCollection({ saveId }) {
  const {
    collections,
    handleGetCollections,
    handleAddSaveToCollection,
    handleRemoveSaveFromCollection,
  } = useCollection();
  const [open, setOpen] = useState(false);
  const [addedCollections, setAddedCollections] = useState(new Set());
  const dropdownRef = useRef(null);

  useEffect(() => {
    handleGetCollections();
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = async (collectionId) => {
    if (addedCollections.has(collectionId)) {
      await handleRemoveSaveFromCollection(collectionId, saveId);
      setAddedCollections((prev) => {
        const next = new Set(prev);
        next.delete(collectionId);
        return next;
      });
    } else {
      await handleAddSaveToCollection(collectionId, saveId);
      setAddedCollections((prev) => new Set([...prev, collectionId]));
    }
  };

  return (
    <div className="add-to-collection" ref={dropdownRef}>
      <button
        className="add-to-collection__trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <IoFolderOutline />
        <span>Add to collection</span>
        <IoAdd className="add-to-collection__trigger-plus" />
      </button>

      {open && (
        <div className="add-to-collection__dropdown">
          {collections.length === 0 ? (
            <p className="add-to-collection__empty">
              No collections yet. Create one first.
            </p>
          ) : (
            collections.map((collection) => {
              const isAdded = addedCollections.has(collection._id);
              return (
                <button
                  key={collection._id}
                  className={`add-to-collection__item ${isAdded ? "add-to-collection__item--added" : ""}`}
                  onClick={() => handleToggle(collection._id)}
                >
                  <IoFolderOutline className="add-to-collection__item-icon" />
                  <span className="add-to-collection__item-name">
                    {collection.name}
                  </span>
                  <span className="add-to-collection__item-count">
                    {collection.saveCount ?? 0}
                  </span>
                  {isAdded && (
                    <IoCheckmark className="add-to-collection__item-check" />
                  )}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
