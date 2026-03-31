import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const createLimiter = ({ windowMs, max, message }) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, message },
    standardHeaders: true,
    legacyHeaders: false,

    keyGenerator: (req) => {
      const ip = ipKeyGenerator(req);
      return req.user ? `${req.user.id}-${ip}` : ip;
    },

    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message,
        retryAfter: req.rateLimit?.resetTime
          ? Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000)
          : null,
      });
    },
  });

/* =========================
   🌍 GLOBAL LIMIT
========================= */
export const globalLimiter = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 200,
  message: "Too many requests from this IP",
});

/* =========================
   🔐 AUTH LIMITERS
========================= */
export const registerLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 5,
  message: "Too many accounts created, try later",
});

export const loginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: "Too many login attempts",
});

export const resendVerificationLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 3,
  message: "Too many verification emails sent",
});

export const verifyEmailLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 10,
  message: "Too many verification attempts",
});

export const logoutLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 20,
  message: "Too many logout requests",
});

export const deleteAccountLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 5,
  message: "Too many delete account attempts",
});

/* =========================
   💾 SAVES LIMITERS
========================= */
export const createSaveLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 30,
  message: "Too many saves created",
});

export const readSavesLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 60,
  message: "Too many requests",
});

export const updateSaveLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 60,
  message: "Too many updates",
});

export const deleteSaveLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 30,
  message: "Too many deletions",
});

/* =========================
   📂 COLLECTIONS LIMITERS
========================= */
export const createCollectionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 20,
  message: "Too many collections created",
});

export const readCollectionsLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 60,
  message: "Too many requests",
});

export const updateCollectionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 30,
  message: "Too many updates",
});

export const deleteCollectionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 20,
  message: "Too many deletions",
});

export const addSaveToCollectionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 60,
  message: "Too many operations",
});

export const removeSaveFromCollectionLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 60,
  message: "Too many operations",
});

/* =========================
   ✨ HIGHLIGHTS LIMITERS
========================= */
export const createHighlightLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 60,
  message: "Too many highlights created",
});

export const readHighlightsLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 60,
  message: "Too many requests",
});

export const deleteHighlightLimiter = createLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  max: 30,
  message: "Too many deletions",
});
