import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "HirePilot AI — AI-Powered Recruitment Intelligence",
  description: "Upload resumes, get AI-powered insights, and build the future of recruitment with HirePilot AI.",
  keywords: ["AI", "recruitment", "resume analysis", "hiring", "Gemini", "FastAPI", "Next.js"],
  authors: [{ name: "HirePilot AI" }],
  openGraph: {
    title: "HirePilot AI",
    description: "AI-native recruitment intelligence platform",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
