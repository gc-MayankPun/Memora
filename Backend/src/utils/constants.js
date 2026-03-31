export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const verificationExpirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 min
