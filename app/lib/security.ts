import { randomBytes } from "crypto";

export function generateStateToken(redirectUrl: string | null): string {
  const randomString = randomBytes(32).toString("hex");
  const payload = {
    redirectUrl: redirectUrl || "/folkekraft",
    timestamp: Date.now(),
    nonce: randomString,
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function validateStateToken(token: string): {
  isValid: boolean;
  redirectUrl: string | null;
} {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    const isExpired = Date.now() - payload.timestamp > 1000 * 60 * 5; // 5 minutes

    return {
      isValid: !isExpired,
      redirectUrl: payload.redirectUrl,
    };
  } catch {
    return { isValid: false, redirectUrl: null };
  }
}
