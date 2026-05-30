"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { AuthForm } from "@/components/auth-form";
import { signup } from "@/services/auth";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#0a0b0f] bg-grid flex flex-col">
      {/* Glow orbs */}
      <div className="orb w-[500px] h-[400px] bg-[#4DA2FF] opacity-[0.07] top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 pointer-events-none" />

      {/* Top gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(77,162,255,0.12) 0%, transparent 70%)" }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#4DA2FF] to-[#3a8fe8] flex items-center justify-center text-xs font-bold text-white">
            H
          </div>
          <span className="font-semibold text-white tracking-tight">HirePilot AI</span>
        </Link>
        <Link href="/login" className="btn-secondary text-sm px-4 py-2">
          Sign in
        </Link>
      </nav>

      {/* Form */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        <AuthForm
          mode="signup"
          onSubmit={async ({ name, email, password }) => {
            await signup({ name: name || "", email, password, role: "candidate" });
            router.push("/login");
          }}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-5 text-center">
        <p className="text-xs text-white/20">© 2025 HirePilot AI</p>
      </footer>
    </div>
  );
}
