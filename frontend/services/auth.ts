import { apiRequest } from "@/lib/api";
import type { LoginPayload, SignupPayload, TokenResponse } from "@/types";

export async function signup(payload: SignupPayload) {
  return apiRequest("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function login(payload: LoginPayload): Promise<TokenResponse> {
  return apiRequest<TokenResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function googleCallback(code: string, redirectUri: string): Promise<TokenResponse> {
  return apiRequest<TokenResponse>("/auth/google/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
  });
}

export async function appleCallback(code: string, redirectUri: string, idToken?: string): Promise<TokenResponse> {
  return apiRequest<TokenResponse>("/auth/apple/callback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, redirect_uri: redirectUri, id_token: idToken }),
  });
}

// ── OAuth redirect URL builders ──────────────────────────────────────────────

export function getGoogleOAuthUrl(): string {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  const redirectUri = `${window.location.origin}/auth/callback/google`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

