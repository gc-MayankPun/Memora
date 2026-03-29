import { useNavigate } from "react-router";
import { ThemeContext } from "../../../app/theme.context";
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useContext } from "react";
import "../styles/navbar.scss";

export default function Navbar({ onSearch, totalCount }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <span className="navbar__logo">Memora</span>

      <div className="navbar__search-wrapper">
        <span className="navbar__search-icon">
          <svg viewBox="0 0 16 16" fill="none">
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M11 11l3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by title or tag…"
          className="navbar__search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="navbar__right">
        {totalCount > 0 && (
          <span className="navbar__count">{totalCount} Saves</span>
        )}
        <button
          className="navbar__theme-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <IoSunnySharp /> : <FaMoon />}
        </button>
        <button
          className="navbar__graph-btn"
          onClick={() => navigate("/graph")}
        >
          ◈ <span>Graph</span>
        </button>
      </div>
    </nav>
  );
}
