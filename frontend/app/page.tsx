import Link from "next/link";
import {
  Zap,
  Target,
  ShieldCheck,
  Brain,
  BarChart3,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant AI Analysis",
    description:
      "Upload any resume and get structured insights in seconds — skills, experience level, strengths, and improvement areas.",
  },
  {
    icon: Target,
    title: "Role Matching",
    description:
      "AI recommends the most relevant job roles based on the candidate's actual experience and skill profile.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description:
      "JWT-protected endpoints, PBKDF2 password hashing, and isolated candidate data — security is not an afterthought.",
  },
  {
    icon: Brain,
    title: "Built for Agents",
    description:
      "The AI module is architected to evolve into multi-agent orchestration with CrewAI and LangChain in Phase 3.",
  },
  {
    icon: BarChart3,
    title: "Structured Insights",
    description:
      "Every analysis returns a strict JSON contract — summary, skills, roles, strengths, and improvements — validated by Pydantic.",
  },
  {
    icon: Rocket,
    title: "Semantic Matching (Phase 2)",
    description:
      "Embeddings + ChromaDB will power semantic resume-to-job matching, enabling recruiters to find the right candidate instantly.",
  },
];

const steps = [
  { step: "01", title: "Sign Up", description: "Create your candidate account in seconds." },
  { step: "02", title: "Upload Resume", description: "Drop your PDF resume into the dashboard." },
  { step: "03", title: "AI Analyzes", description: "Gemini processes your resume with a strict JSON contract." },
  { step: "04", title: "Get Insights", description: "View skills, roles, strengths, and improvements instantly." },
];

const stats = [
  { value: "< 5s", label: "Average analysis time" },
  { value: "6", label: "Insight dimensions per resume" },
  { value: "4", label: "Phases of intelligence" },
  { value: "100%", label: "AI-native architecture" },
];

const roadmap = [
  {
    phase: "Phase 1", label: "Current", title: "Foundation",
    items: ["Auth + JWT", "Resume upload + PDF extraction", "Gemini AI analysis", "Candidate dashboard"],
    active: true,
  },
  {
    phase: "Phase 2", label: "Next", title: "Semantic Matching",
    items: ["Job posting CRUD", "Embeddings + ChromaDB", "Resume ↔ Job matching", "Recruiter search UI"],
    active: false,
  },
  {
    phase: "Phase 3", label: "Upcoming", title: "Agentic Workflows",
    items: ["Multi-agent orchestration", "Interview question agents", "Career roadmap agents", "Recruiter report pipelines"],
    active: false,
  },
  {
    phase: "Phase 4", label: "Future", title: "Intelligence at Scale",
    items: ["RAG + long-term memory", "Pinecone migration", "Observability + guardrails", "Horizontal scaling"],
    active: false,
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0b0f]">

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-12 md:py-4"
        style={{ background: "rgba(10,11,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#4DA2FF] to-[#3a8fe8] flex items-center justify-center text-xs font-bold text-white">H</div>
          <span className="font-semibold text-white tracking-tight text-sm md:text-base">HirePilot AI</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm text-white/50">
          <a href="#features" className="hover:text-white/90 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white/90 transition-colors">How it works</a>
          <a href="#roadmap" className="hover:text-white/90 transition-colors">Roadmap</a>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/login" className="btn-secondary text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2">Login</Link>
          <Link href="/signup" className="btn-primary text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2">
            Get started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 md:pt-40 md:pb-32 bg-grid">
        <div className="orb w-[700px] h-[400px] bg-[#4DA2FF] opacity-[0.07] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4" />
        <div className="orb w-[400px] h-[300px] bg-[#6fbcf0] opacity-[0.05] top-20 left-1/4" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(77,162,255,0.15) 0%, transparent 70%)" }} />

        <div className="pill mb-6 relative z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4DA2FF] animate-pulse" />
          Phase 1 — Now Live
        </div>

        <h1 className="relative z-10 max-w-4xl text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] md:leading-[1.08] tracking-tight mb-6">
          <span className="text-gradient">Recruitment intelligence,</span>
          <br />
          <span className="text-white/90">powered by AI.</span>
        </h1>

        <p className="relative z-10 max-w-xl text-sm sm:text-base md:text-lg text-white/50 leading-relaxed mb-8 md:mb-10 px-4">
          HirePilot AI analyzes resumes, surfaces structured insights, and lays the foundation for
          fully agentic recruitment workflows — built to scale from MVP to enterprise.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/signup" className="btn-primary text-base px-7 py-3">
            Start for free
            <ArrowRight size={16} />
          </Link>
          <Link href="/login" className="btn-secondary text-base px-7 py-3">
            View dashboard
          </Link>
        </div>

        {/* Hero card preview */}
        <div className="relative z-10 mt-12 md:mt-20 w-full max-w-3xl mx-auto px-4">
          <div className="card-border p-4 md:p-6 lg:p-8 shadow-glow">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-white/30 font-mono">resume-analysis.json</span>
            </div>
            <pre className="text-left text-[10px] sm:text-xs md:text-sm font-mono text-white/70 leading-relaxed overflow-x-auto">
{`{
  "summary": "Experienced full-stack engineer with 4 years building
              scalable web applications and distributed systems.",
  "skills": ["Python", "React", "FastAPI", "PostgreSQL", "Docker"],
  "recommended_roles": ["Backend Engineer", "Full-Stack Developer"],
  "experience_level": "Mid-Level",
  "strengths": ["Strong system design", "API architecture"],
  "improvements": ["Add cloud certifications", "Contribute to OSS"]
}`}
            </pre>
          </div>
        </div>
      </section>

      <div className="divider mx-6 md:mx-24" />

      {/* ── STATS ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-1">
              <span className="text-3xl md:text-4xl font-bold text-gradient-blue">{s.value}</span>
              <span className="text-sm text-white/40">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="divider mx-6 md:mx-24" />

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 px-6 md:px-12 relative">
        <div className="orb w-[500px] h-[300px] bg-[#4DA2FF] opacity-[0.05] top-1/2 right-0 translate-x-1/3" />
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="pill mb-4">Core capabilities</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Everything you need</span>
              <br />
              <span className="text-white/80">to hire smarter.</span>
            </h2>
            <p className="max-w-lg text-white/45 text-base leading-relaxed">
              From instant resume parsing to agentic orchestration — HirePilot AI is built to grow with your recruitment needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card-border p-6 flex flex-col gap-3">
                <div className="h-10 w-10 rounded-xl glass-blue flex items-center justify-center">
                  <f.icon size={18} color="#4DA2FF" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-white text-base">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-6 md:mx-24" />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 px-6 md:px-12 bg-grid relative">
        <div className="orb w-[400px] h-[300px] bg-[#4DA2FF] opacity-[0.06] bottom-0 left-0 -translate-x-1/3" />
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="pill mb-4">Workflow</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="text-white/90">From upload to insight</span>
              <br />
              <span className="text-gradient">in four steps.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={s.step} className="relative card-border p-6 flex flex-col gap-3">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 h-px bg-[#4DA2FF]/30 z-10" />
                )}
                <span className="text-xs font-mono text-[#4DA2FF]/60 font-semibold">{s.step}</span>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-6 md:mx-24" />

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="py-28 px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="pill mb-4">Roadmap</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <span className="text-gradient">Built for the future</span>
              <br />
              <span className="text-white/80">of recruitment.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {roadmap.map((p) => (
              <div key={p.phase} className={`card-border p-6 flex flex-col gap-4 ${p.active ? "border-[#4DA2FF]/30 bg-[#4DA2FF]/[0.03]" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#4DA2FF]/70 font-semibold">{p.phase}</span>
                  <span className={`pill text-xs ${p.active ? "bg-[#4DA2FF]/15 border-[#4DA2FF]/40 text-[#6fbcf0]" : "opacity-50"}`}>
                    {p.label}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-lg">{p.title}</h3>
                <ul className="flex flex-col gap-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/50">
                      {p.active
                        ? <CheckCircle2 size={13} className="text-[#4DA2FF] flex-shrink-0" strokeWidth={2} />
                        : <Circle size={13} className="text-white/20 flex-shrink-0" strokeWidth={2} />
                      }
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-6 md:mx-24" />

      {/* ── CTA ── */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="orb w-[600px] h-[400px] bg-[#4DA2FF] opacity-[0.08] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <div className="pill">Get started today</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="text-gradient">Hire smarter.</span>
            <br />
            <span className="text-white/80">Start now.</span>
          </h2>
          <p className="text-white/45 text-base max-w-md leading-relaxed">
            Join HirePilot AI and experience the next generation of AI-powered recruitment intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/signup" className="btn-primary text-base px-8 py-3">
              Create free account
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn-secondary text-base px-8 py-3">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-12 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#4DA2FF] to-[#3a8fe8] flex items-center justify-center text-xs font-bold text-white">H</div>
            <span className="text-sm font-medium text-white/60">HirePilot AI</span>
          </div>
          <p className="text-xs text-white/25">© 2025 HirePilot AI. Built with FastAPI + Next.js.</p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#features" className="hover:text-white/60 transition-colors">Features</a>
            <a href="#roadmap" className="hover:text-white/60 transition-colors">Roadmap</a>
            <Link href="/signup" className="hover:text-white/60 transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
