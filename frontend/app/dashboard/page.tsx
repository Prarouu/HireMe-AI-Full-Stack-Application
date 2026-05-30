"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Zap, Target, TrendingUp } from "lucide-react";
import { AnalysisCard } from "@/components/analysis-card";
import { ResumeUploader } from "@/components/resume-uploader";
import type { ResumeResult } from "@/types";

export default function DashboardPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<ResumeResult | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("hirepilot_token");
    if (!savedToken) {
      router.push("/login");
      return;
    }
    setToken(savedToken);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("hirepilot_token");
    router.push("/login");
  }

  return (
    <div className="relative min-h-screen bg-[#0a0b0f] flex flex-col">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(77,162,255,0.4), transparent)" }}
      />

      {/* ── NAVBAR ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
        style={{
          background: "rgba(10,11,15,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#4DA2FF] to-[#3a8fe8] flex items-center justify-center text-xs font-bold text-white">
            H
          </div>
          <span className="font-semibold text-white tracking-tight">HirePilot AI</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="pill hidden sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4DA2FF] animate-pulse" />
            Phase 1
          </span>
          <button
            onClick={handleLogout}
            className="btn-secondary text-sm px-4 py-2"
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main className="flex-1 px-4 py-8 md:px-6 md:py-10 lg:px-10">
        <div className="mx-auto max-w-6xl flex flex-col gap-8">

          {/* Page header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-sm text-white/40">Upload a resume to get AI-powered recruitment insights.</p>
          </div>

          <div className="divider" />

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Left — uploader */}
            <ResumeUploader token={token} onComplete={setResult} />

            {/* Right — results or empty state */}
            {result ? (
              <AnalysisCard result={result} />
            ) : (
              <EmptyState />
            )}
          </div>

          {/* Bottom info strip */}
          {!result && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              {[
                { icon: Zap, title: "Instant analysis", desc: "Results in under 5 seconds via Gemini AI." },
                { icon: Target, title: "Role matching", desc: "Get recommended job roles based on your profile." },
                { icon: TrendingUp, title: "Growth insights", desc: "Identify strengths and areas to improve." },
              ].map((item) => (
                <div key={item.title} className="card-border px-4 py-4 flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg glass-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon size={15} color="#4DA2FF" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 md:px-10 py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <p className="text-xs text-white/20">© 2025 HirePilot AI</p>
          <Link href="/" className="text-xs text-white/25 hover:text-white/50 transition-colors">
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card-border p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[280px]">
      <div className="h-14 w-14 rounded-2xl border border-white/08 bg-white/03 flex items-center justify-center">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-white/50">No analysis yet</p>
        <p className="text-xs text-white/25 max-w-[200px] leading-relaxed">
          Upload a PDF resume on the left to see AI insights here.
        </p>
      </div>
      <div className="flex flex-col gap-1.5 w-full max-w-[220px]">
        {["Skills extraction", "Role recommendations", "Strengths & improvements"].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-white/25">
            <span className="h-1 w-1 rounded-full bg-white/15 flex-shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
