import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { actionLoading, handleLogin } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const result = await handleLogin(form);
    if (result?.success) navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <div className="auth-page__orb auth-page__orb--1" />
        <div className="auth-page__orb auth-page__orb--2" />
        <div className="auth-page__grid" />
      </div>

      <div className="auth-card" style={{ "--delay": "0ms" }}>
        <div className="auth-card__header">
          <span className="auth-card__logo">Memora</span>
          <p className="auth-card__tagline">Your knowledge, organized.</p>
        </div>

        <form className="auth-card__form" onSubmit={submitForm}>
          <div className="auth-card__group" style={{ "--i": 0 }}>
            <label className="auth-card__label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="auth-card__input"
              placeholder="yourname"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="auth-card__group" style={{ "--i": 1 }}>
            <label className="auth-card__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-card__input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="auth-card__btn"
            style={{ "--i": 3 }}
            disabled={actionLoading}
          >
            {actionLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth-card__switch" style={{ "--i": 3 }}>
          Don't have an account?{" "}
          <button
            className="auth-card__switch-link"
            onClick={() => navigate("/register")}
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
