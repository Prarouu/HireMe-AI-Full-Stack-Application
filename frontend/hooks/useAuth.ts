"use client";

import { useMemo } from "react";

const TOKEN_KEY = "hirepilot_token";

export function useAuth() {
  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  function setToken(value: string) {
    localStorage.setItem(TOKEN_KEY, value);
  }

  function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return { token, setToken, clearToken };
}
