"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { googleCallback } from "@/services/auth";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get("code");
    if (!code) {
      router.replace("/login?error=google_no_code");
      return;
    }

    const redirectUri = `${window.location.origin}/auth/callback/google`;
    googleCallback(code, redirectUri)
      .then((token) => {
        localStorage.setItem("hirepilot_token", token.access_token);
        router.replace("/dashboard");
      })
      .catch(() => {
        router.replace("/login?error=google_failed");
      });
  }, [router, searchParams]);

  return null;
}

const Spinner = () => (
  <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <svg className="animate-spin h-8 w-8 text-[#4DA2FF]" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      <p className="text-sm text-white/40">Signing you in with Google...</p>
    </div>
  </div>
);

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <GoogleCallbackContent />
      <Spinner />
    </Suspense>
  );
}
