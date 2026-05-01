import { useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { useAuth } from "../../auth/hooks/useAuth";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import SaveCard from "../components/SaveCard";
import "../styles/dashboard.scss";
import DownloadExtension from "../../../app/components/DownloadExtension";

export default function Dashboard() {
  const { handleFetchAllSaves, handleQuerySearch, saves, loading } =
    useDashboard();
  const { user, handleLogout, handleDeleteAccount } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!user) return;
    handleFetchAllSaves();
  }, []);

  const filteredSaves =
    activeFilter === "All"
      ? saves
      : activeFilter === "Favorites"
        ? saves.filter((s) => s.isFavorite)
        : saves.filter((s) => s.type === activeFilter.toLowerCase());

  const handleSearch = (query) => {
    setIsSearching(!!query?.trim());
    handleQuerySearch(query);
  };

  const handleClear = () => {
    setIsSearching(false);
    handleFetchAllSaves();
  };

  return (
    <div className="dashboard">
      <Navbar
        fetchQuerySearch={handleSearch}
        handleFetchAllSaves={handleClear}
        totalCount={saves.length}
        user={user}
        handleLogout={handleLogout}
        handleDeleteAccount={handleDeleteAccount}
      />
      <FilterBar active={activeFilter} onFilter={setActiveFilter} />

      {loading ? (
        <div className="dashboard__loading">
          <div className="dashboard__loading-dots">
            <span />
            <span />
            <span />
          </div>
          <p>Loading your saves</p>
        </div>
      ) : filteredSaves.length === 0 ? (
        <div className="dashboard__empty">
          <div className="dashboard__empty-icon">◈</div>

          <p className="dashboard__empty-title">
            {isSearching ? "No matches found" : "Nothing saved yet"}
          </p>

          <p className="dashboard__empty-subtitle">
            {isSearching
              ? "Try different words."
              : "Save anything from the web — articles, videos, tweets, and more."}
          </p>

          {isSearching && (
            <button className="dashboard__empty-cta" onClick={handleClear}>
              ← Back to all saves
            </button>
          )}

          {!isSearching && <DownloadExtension />}
        </div>
      ) : (
        <div className="dashboard__grid">
          {filteredSaves.map((save, index) => (
            <SaveCard key={save._id} save={save} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
