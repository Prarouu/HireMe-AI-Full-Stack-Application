import { Lightbulb, TrendingUp, TrendingDown, CheckCircle2 } from "lucide-react";
import type { ResumeResult } from "@/types";

const levelColors: Record<string, string> = {
  "Entry-Level": "border-green-500/25 bg-green-500/08 text-green-300",
  "Mid-Level": "border-[#4DA2FF]/25 bg-[#4DA2FF]/08 text-[#6fbcf0]",
  "Senior-Level": "border-purple-500/25 bg-purple-500/08 text-purple-300",
  "Lead/Principal": "border-yellow-500/25 bg-yellow-500/08 text-yellow-300",
};

export function AnalysisCard({ result }: { result: ResumeResult }) {
  const levelClass =
    levelColors[result.experience_level ?? ""] ??
    "border-white/15 bg-white/05 text-white/60";

  return (
    <div className="card-border p-4 md:p-6 flex flex-col gap-5 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl glass-blue flex items-center justify-center flex-shrink-0">
            <Lightbulb size={17} color="#4DA2FF" strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="font-semibold text-white text-base">AI Resume Insights</h2>
            <p className="text-xs text-white/40">Powered by Gemini</p>
          </div>
        </div>
        {result.experience_level && (
          <span className={`pill text-xs border ${levelClass}`}>
            {result.experience_level}
          </span>
        )}
      </div>

      {/* Summary */}
      {result.ai_summary && (
        <div className="rounded-xl border border-white/06 bg-white/02 px-4 py-3">
          <p className="text-sm text-white/65 leading-relaxed">{result.ai_summary}</p>
        </div>
      )}

      {/* Skills */}
      {result.skills && result.skills.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Skills</span>
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border border-[#4DA2FF]/20 bg-[#4DA2FF]/06 text-[#6fbcf0]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Roles */}
      {result.recommended_roles && result.recommended_roles.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Recommended Roles</span>
          <div className="flex flex-wrap gap-2">
            {result.recommended_roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10 bg-white/04 text-white/60"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      )}

      {(result.strengths?.length || result.improvements?.length) && (
        <div className="divider" />
      )}

      {/* Strengths */}
      {result.strengths && result.strengths.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-green-400/70" strokeWidth={2} />
            <span className="text-xs font-semibold text-green-400/70 uppercase tracking-wider">Strengths</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {result.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-white/55">
                <CheckCircle2 size={13} className="mt-0.5 text-green-400/60 flex-shrink-0" strokeWidth={2} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {result.improvements && result.improvements.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <TrendingDown size={13} className="text-yellow-400/70" strokeWidth={2} />
            <span className="text-xs font-semibold text-yellow-400/70 uppercase tracking-wider">Areas to Improve</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {result.improvements.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-white/55">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow-400/60 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
