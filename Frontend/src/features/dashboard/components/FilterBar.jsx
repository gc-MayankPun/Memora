import "../styles/filterbar.scss";

const FILTERS = [
  "All",
  "Article",
  "Tweet",
  "YouTube",
  "PDF",
  "GitHub",
  "Reddit",
];

export default function FilterBar({ active, onFilter }) {
  return (
    <div className="filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`filter-bar__btn ${active === filter ? "filter-bar__btn--active" : ""}`}
          onClick={() => onFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
