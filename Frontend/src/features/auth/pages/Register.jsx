import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { actionLoading, handleRegister } = useAuth();

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const result = await handleRegister(form);
    if (result?.success) navigate("/verify-email");
  };

  return (
    <>
      <Link to={"/landing"} className="back-landing">
        <ArrowLeft className="back-landing-icon" /> Back to Landing Page
      </Link>
      <div className="auth-page">
        <div className="auth-page__bg">
          <div className="auth-page__orb auth-page__orb--1" />
          <div className="auth-page__orb auth-page__orb--2" />
          <div className="auth-page__grid" />
        </div>

        <div className="auth-card auth-card--register">
          <div className="auth-card__header">
            <span className="auth-card__logo">Memora</span>
            <p className="auth-card__tagline">
              Start building your second brain.
            </p>
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
              <label className="auth-card__label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="auth-card__input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-card__group" style={{ "--i": 2 }}>
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
                autoComplete="new-password"
                required
              />
            </div>

            <button
              type="submit"
              className="auth-card__btn"
              style={{ "--i": 3 }}
              disabled={actionLoading}
            >
              {actionLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-card__switch" style={{ "--i": 4 }}>
            Already have an account?{" "}
            <button
              className="auth-card__switch-link"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
