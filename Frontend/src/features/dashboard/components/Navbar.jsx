import { useNavigate } from "react-router";
import { ThemeContext } from "../../../app/theme.context";
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useContext, useRef, useState, useEffect } from "react";
import "../styles/navbar.scss";

export default function Navbar({
  onSearch,
  totalCount,
  user,
  handleLogout,
  handleDeleteAccount,
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirm, setConfirm] = useState(null); // "logout" | "delete" | null
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSettingsOpen(false);
        setConfirm(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutMenu = async () => {
    setConfirm(null);
    setSettingsOpen(false);
    const result = await handleLogout();
    if (result?.success) navigate("/login");
  };

  const handleDeleteMenu = async () => {
    setConfirm(null);
    setSettingsOpen(false);
    const result = await handleDeleteAccount();
    if (result?.success) navigate("/login");
  };

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
          placeholder="Search by title or tag..."
          className="navbar__search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="navbar__right">
        {totalCount > 0 && (
          <span className="navbar__count">{totalCount} Saves</span>
        )}

        <button
          className="navbar__graph-btn"
          onClick={() => navigate("/collections")}
        >
          ◫ <span>Collections</span>
        </button>

        <button
          className="navbar__graph-btn"
          onClick={() => navigate("/graph")}
        >
          ◈ <span>Graph</span>
        </button>

        <div className="navbar__settings-wrap" ref={dropdownRef}>
          <button
            className={`navbar__settings-btn ${settingsOpen ? "navbar__settings-btn--active" : ""}`}
            onClick={() => {
              setSettingsOpen((prev) => !prev);
              setConfirm(null);
            }}
            aria-label="Settings"
          >
            <IoSettingsOutline />
          </button>

          {settingsOpen && (
            <div className="navbar__dropdown">
              {/* ── Confirm state ── */}
              {confirm === "logout" && (
                <div className="navbar__dropdown-confirm">
                  <p className="navbar__dropdown-confirm-text">
                    Sure you want to log out?
                  </p>
                  <div className="navbar__dropdown-confirm-actions">
                    <button
                      className="navbar__dropdown-confirm-btn navbar__dropdown-confirm-btn--cancel"
                      onClick={() => setConfirm(null)}
                    >
                      <IoClose /> Cancel
                    </button>
                    <button
                      className="navbar__dropdown-confirm-btn navbar__dropdown-confirm-btn--ok"
                      onClick={handleLogoutMenu}
                    >
                      <LuLogOut /> Log out
                    </button>
                  </div>
                </div>
              )}

              {confirm === "delete" && (
                <div className="navbar__dropdown-confirm">
                  <p className="navbar__dropdown-confirm-text">
                    This will delete your account and all your saves
                    permanently.
                  </p>
                  <div className="navbar__dropdown-confirm-actions">
                    <button
                      className="navbar__dropdown-confirm-btn navbar__dropdown-confirm-btn--cancel"
                      onClick={() => setConfirm(null)}
                    >
                      <IoClose /> Cancel
                    </button>
                    <button
                      className="navbar__dropdown-confirm-btn navbar__dropdown-confirm-btn--danger"
                      onClick={handleDeleteMenu}
                    >
                      <RiDeleteBin6Line /> Delete
                    </button>
                  </div>
                </div>
              )}

              {/* ── Normal menu ── */}
              {!confirm && (
                <>
                  <div className="navbar__dropdown-user">
                    <span className="navbar__dropdown-username">
                      {user?.username || "User"}
                    </span>
                    <span className="navbar__dropdown-email">
                      {user?.email || ""}
                    </span>
                  </div>

                  <div className="navbar__dropdown-divider" />

                  <button
                    className="navbar__dropdown-item"
                    onClick={() => {
                      toggleTheme();
                      setSettingsOpen(false);
                    }}
                  >
                    {theme === "dark" ? (
                      <>
                        <IoSunnySharp className="navbar__dropdown-icon" /> Light
                        mode
                      </>
                    ) : (
                      <>
                        <FaMoon className="navbar__dropdown-icon" /> Dark mode
                      </>
                    )}
                  </button>

                  <div className="navbar__dropdown-divider" />

                  <button
                    className="navbar__dropdown-item"
                    onClick={() => setConfirm("logout")}
                  >
                    <LuLogOut className="navbar__dropdown-icon" />
                    Log out
                  </button>

                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    onClick={() => setConfirm("delete")}
                  >
                    <RiDeleteBin6Line className="navbar__dropdown-icon" />
                    Delete account
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
