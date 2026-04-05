export function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
  return `${Math.floor(seconds / 31536000)} years ago`;
}

export function emailHTML(username, emailVerificationToken) {
  return `
  <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:40px 0;">
    <div style="max-width:500px; margin:auto; background:#ffffff; border-radius:12px; padding:30px; text-align:center; box-shadow:0 4px 20px rgba(0,0,0,0.05);">

      <img src="https://res.cloudinary.com/dnc0kiyts/image/upload/f_auto,q_auto/logo_ecwnuw" 
           alt="Memora Logo" 
           width="120" 
           style="margin-bottom:20px; border-radius: 100%" />

      <h2 style="color:#111; margin-bottom:10px;">Welcome to Memora 🚀</h2>

      <p style="color:#555; font-size:14px;">
        Hi <strong>${username}</strong>,
      </p>

      <p style="color:#555; font-size:14px; line-height:1.6;">
        Thank you for joining <strong>Memora</strong>.  
        Click the button below to verify your email address.
      </p>

      <a href="${process.env.BACKEND_URL}/api/auth/verify-email?token=${emailVerificationToken}" 
         style="display:inline-block; margin:20px 0; padding:12px 24px; background:#003cb4; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">
         Verify Email
      </a>

      <p style="color:#999; font-size:12px;">
        If you didn't create this account, you can safely ignore this email.
      </p>

      <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:12px; color:#aaa;">
        © Memora • Your knowledge, organized
      </p>

    </div>
  </div>
`;
}

export function verifyEmailHTML() {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>Email Verified</title>
</head>
<body style="margin:0; font-family: Arial, sans-serif; background:#f6f6f6; display:flex; justify-content:center; align-items:center; height:100vh;">

  <div style="background:#fff; padding:40px; border-radius:12px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.08); max-width:400px;">
    
    <h1 style="color:#111;">✅ Email Verified</h1>

    <p style="color:#555; font-size:14px; line-height:1.6;">
      Your email has been successfully verified.  
      You can now log in to your account.
    </p> 

    <a href="${process.env.FRONTEND_URL}/"
       style="display:inline-block; margin-top:20px; padding:12px 24px; background:#003cb4; color:#fff; text-decoration:none; border-radius:8px; font-weight:600;">
       Go to Memora
    </a>

  </div>

</body>
</html>
`;
}
