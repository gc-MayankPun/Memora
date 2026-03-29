import { useState } from "react";
import { useNavigate } from "react-router";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import "../styles/auth.scss";
import { useAuth } from "../hooks/useAuth";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { loading, handleResendVerification } = useAuth();
  const email = localStorage.getItem("pendingEmail");

  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleResend = async () => {
    if (cooldown) return;
    const result = await handleResendVerification({ email });

    if (result?.success) {
      setResent(true);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 30000); // 30s cooldown
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg">
        <div className="auth-page__orb auth-page__orb--1" />
        <div className="auth-page__orb auth-page__orb--2" />
        <div className="auth-page__grid" />
      </div>

      <div className="auth-card verify-card">
        {/* Icon */}
        <div className="verify-card__icon-wrap">
          <MdOutlineMarkEmailUnread className="verify-card__icon" />
          <div className="verify-card__icon-pulse" />
        </div>

        {/* Text */}
        <div className="verify-card__text">
          <h1 className="verify-card__title">Check your inbox</h1>
          <p className="verify-card__body">
            We sent a verification link to your email. Click it to activate your
            Memora account.
          </p>
          <p className="verify-card__hint">
            Can't find it? Check your spam folder.
          </p>
        </div>

        {/* Actions */}
        <div className="verify-card__actions">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noreferrer"
            className="auth-card__btn verify-card__gmail-btn"
          >
            <HiOutlineExternalLink />
            Open Gmail
          </a>

          <button
            className="verify-card__resend-btn"
            onClick={handleResend}
            disabled={cooldown || loading}
          >
            {loading
              ? "Sending..."
              : resent && cooldown
                ? "Email sent — wait 30s to resend"
                : "Resend verification email"}
          </button>
        </div>

        {/* Footer */}
        <p className="auth-card__switch verify-card__footer">
          Wrong account?{" "}
          <button
            className="auth-card__switch-link"
            onClick={() => navigate("/register")}
          >
            Sign up again
          </button>
        </p>
      </div>
    </div>
  );
}
