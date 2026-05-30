"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { AuthForm } from "@/components/auth-form";
import { login } from "@/services/auth";

const oauthErrors: Record<string, string> = {
  google_no_code: "Google sign-in was cancelled or failed. Please try again.",
  google_failed: "Google sign-in failed. Please try again or use email.",
  apple_no_code: "Apple sign-in was cancelled or failed. Please try again.",
  apple_failed: "Apple sign-in failed. Please try again or use email.",
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorKey = searchParams.get("error") ?? "";
  const errorMsg = oauthErrors[errorKey] ?? "";

  return (
    <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col gap-4">
        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/08 px-4 py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
            <p className="text-sm text-red-300">{errorMsg}</p>
          </div>
        )}
        <AuthForm
          mode="login"
          onSubmit={async ({ email, password }) => {
            const token = await login({ email, password });
            localStorage.setItem("hirepilot_token", token.access_token);
            router.push("/dashboard");
          }}
        />
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0b0f] bg-grid flex flex-col">
      <div className="orb w-[500px] h-[400px] bg-[#4DA2FF] opacity-[0.07] top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(77,162,255,0.12) 0%, transparent 70%)" }}
      />

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#4DA2FF] to-[#3a8fe8] flex items-center justify-center text-xs font-bold text-white">H</div>
          <span className="font-semibold text-white tracking-tight">HirePilot AI</span>
        </Link>
        <Link href="/signup" className="btn-secondary text-sm px-4 py-2">Create account</Link>
      </nav>

      <Suspense fallback={null}>
        <LoginContent />
      </Suspense>

      <footer className="relative z-10 py-5 text-center">
        <p className="text-xs text-white/20">© 2025 HirePilot AI</p>
      </footer>
    </div>
  );
}
