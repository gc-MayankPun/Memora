import { useEffect, useState } from "react";
import { useCollection } from "../hooks/useCollection";
import CollectionCard from "../components/CollectionCard";
import CollectionModal from "../components/CollectionModal";
import { useNavigate } from "react-router";
import { IoAdd } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import "../styles/collections.scss";

export default function Collections() {
  const navigate = useNavigate();
  const {
    collections,
    loading,
    handleGetCollections,
    handleCreateCollection,
    handleDeleteCollection,
    handleUpdateCollection,
  } = useCollection();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);

  useEffect(() => {
    handleGetCollections();
  }, []);

  const onCreateOrUpdate = async (name, description) => {
    if (editingCollection) {
      await handleUpdateCollection(editingCollection._id, name, description);
    } else {
      await handleCreateCollection(name, description);
    }
    setModalOpen(false);
    setEditingCollection(null);
  };

  const onEdit = (collection) => {
    setEditingCollection(collection);
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
    setEditingCollection(null);
  };

  return (
    <div className="collections-page">
      {/* Topbar */}
      <div className="collections-page__topbar">
        <button
          className="collections-page__back"
          onClick={() => navigate("/")}
        >
          <IoArrowBack /> Back
        </button>
        <div className="collections-page__heading">
          <h1 className="collections-page__title">Collections</h1>
          {collections.length > 0 && (
            <span className="collections-page__count">
              {collections.length}
            </span>
          )}
        </div>
        <button
          className="collections-page__create-btn"
          onClick={() => setModalOpen(true)}
        >
          <IoAdd /> New
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="collections-page__loading">
          <div className="collections-page__loading-dots">
            <span />
            <span />
            <span />
          </div>
          <p>Loading collections</p>
        </div>
      ) : collections.length === 0 ? (
        <div className="collections-page__empty">
          <span className="collections-page__empty-icon">◈</span>
          <p className="collections-page__empty-title">No collections yet</p>
          <p className="collections-page__empty-sub">
            Group your saves into collections to keep things organized.
          </p>
          <button
            className="collections-page__empty-btn"
            onClick={() => setModalOpen(true)}
          >
            <IoAdd /> Create your first collection
          </button>
        </div>
      ) : (
        <div className="collections-page__grid">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection._id}
              collection={collection}
              index={index}
              onEdit={() => onEdit(collection)}
              onDelete={() => handleDeleteCollection(collection._id)}
              onClick={() => navigate(`/collections/${collection._id}`)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <CollectionModal
          collection={editingCollection}
          onSubmit={onCreateOrUpdate}
          onClose={onCloseModal}
          loading={loading}
        />
      )}
    </div>
  );
}
