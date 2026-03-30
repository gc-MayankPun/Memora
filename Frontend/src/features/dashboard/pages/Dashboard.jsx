import { useEffect, useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import SaveCard from "../components/SaveCard";
import "../styles/dashboard.scss";
import { Link } from "react-router";

export default function Dashboard() {
  const {
    handleFetchAllSaves,
    handleLogout,
    handleDeleteAccount,
    saves,
    loading,
  } = useDashboard();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleFetchAllSaves();
  }, []);

  const filteredByType =
    activeFilter === "All"
      ? saves
      : activeFilter === "Favorites"
        ? saves.filter((s) => s.isFavorite)
        : saves.filter((s) => s.type === activeFilter.toLowerCase());

  const filteredSaves = searchQuery
    ? filteredByType.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tags?.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : filteredByType;

  const isFiltered = searchQuery !== "" || activeFilter !== "All";

  return (
    <div className="dashboard">
      <Navbar
        onSearch={setSearchQuery}
        totalCount={saves.length}
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
            {isFiltered ? "No matches found" : "Nothing saved yet"}
          </p>
          <p className="dashboard__empty-subtitle">
            {isFiltered
              ? "Try a different search term or filter."
              : "Use the Memora extension to save articles, tweets, videos and more from the web."}
          </p>
          <p className="dashboard__empty-link">
            <a
              href="https://github.com/gc-MayankPun/Memora"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here
            </a>{" "}
            to setup the extension
          </p>
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
