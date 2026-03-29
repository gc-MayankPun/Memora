import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSaves } from "../hooks/useSaves";
import SaveHeader from "../components/SaveHeader";
import SaveContent from "../components/SaveContent";
import "../styles/saves.scss";

export default function Saves() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { save, loading, handleFetchSave, handleDeleteSave, handleToggleFavorite, handleUpdateTags } = useSaves();

  useEffect(() => {
    handleFetchSave(id);
  }, [id]);

  const onDelete = async () => {
    await handleDeleteSave(id);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="saves-page__loading">
        <div className="saves-page__loading-dots">
          <span /><span /><span />
        </div>
        <p>Loading save</p>
      </div>
    );
  }

  if (!save) {
    return (
      <div className="saves-page__error">
        <span className="saves-page__error-icon">◈</span>
        <p className="saves-page__error-title">Save not found</p>
        <button className="saves-page__back-btn" onClick={() => navigate("/")}>
          ← Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="saves-page">
      <SaveHeader
        save={save}
        onBack={() => navigate("/")}
        onDelete={onDelete}
        onToggleFavorite={() => handleToggleFavorite(id, save.isFavorite)}
      />
      <SaveContent
        save={save}
        onUpdateTags={(tags) => handleUpdateTags(id, tags)}
      />
    </div>
  );
}