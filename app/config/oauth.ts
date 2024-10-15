// /config/oauth.ts
export const oauthConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
  },
  vipps: {
    clientId: process.env.VIPPS_CLIENT_ID!,
    clientSecret: process.env.VIPPS_CLIENT_SECRET!,
    tokenUrl: "https://api.vipps.no/accessToken",
    userInfoUrl: "https://api.vipps.no/userinfo",
    redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/vipps`,
  },
  // Add other providers similarly...
};
