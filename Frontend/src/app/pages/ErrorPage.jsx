import { useNavigate, useRouteError } from "react-router";
import "./error-page.scss";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  const is404 =
    error?.status === 404 || error?.message?.includes("No route matches");

  return (
    <div className="error-page">
      <div className="error-page__bg">
        <div className="error-page__orb error-page__orb--1" />
        <div className="error-page__orb error-page__orb--2" />
        <div className="error-page__grid" />
      </div>

      <div className="error-page__content">
        <div className="error-page__code">{is404 ? "404" : "500"}</div>

        <div className="error-page__divider">◈</div>

        <h1 className="error-page__title">
          {is404 ? "This page doesn't exist" : "Something went wrong"}
        </h1>

        <p className="error-page__subtitle">
          {is404
            ? "The page you're looking for has been moved, deleted, or never existed."
            : "An unexpected error occurred. It's not you, it's us."}
        </p>

        {error?.message && !is404 && (
          <p className="error-page__error-msg">{error.message}</p>
        )}

        <div className="error-page__actions">
          <button
            className="error-page__btn error-page__btn--primary"
            onClick={() => navigate("/")}
          >
            Back to dashboard
          </button>
          <button
            className="error-page__btn error-page__btn--ghost"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
