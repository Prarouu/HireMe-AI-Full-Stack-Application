"use client";

import { useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { FileText, Upload, CheckCircle2, Loader2, Clock } from "lucide-react";

import { uploadResume } from "@/services/resume";
import type { ResumeResult } from "@/types";

type ResumeUploaderProps = {
  token: string;
  onComplete: (result: ResumeResult) => void;
};

export function ResumeUploader({ token, onComplete }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  function validateAndSet(f: File | null) {
    setError("");
    if (!f) { setFile(null); return; }
    if (f.type !== "application/pdf") {
      setFile(null);
      setError("Only PDF files are supported.");
      return;
    }
    setFile(f);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    validateAndSet(e.target.files?.[0] ?? null);
  }

  function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    validateAndSet(e.dataTransfer.files?.[0] ?? null);
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const result = await uploadResume(token, file);
      onComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-border p-4 md:p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl glass-blue flex items-center justify-center flex-shrink-0">
          <FileText size={17} color="#4DA2FF" strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="font-semibold text-white text-base">Upload Resume</h2>
          <p className="text-xs text-white/40">PDF format only · Max 10MB</p>
        </div>
      </div>

      {/* Drop zone */}
      <label
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-8 md:px-6 md:py-10 cursor-pointer transition-all duration-200
          ${dragging
            ? "border-[#4DA2FF]/60 bg-[#4DA2FF]/08"
            : file
            ? "border-[#4DA2FF]/30 bg-[#4DA2FF]/04"
            : "border-white/10 bg-white/02 hover:border-white/20 hover:bg-white/04"
          }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        {file ? (
          <>
            <div className="h-10 w-10 rounded-xl glass-blue flex items-center justify-center">
              <CheckCircle2 size={20} color="#4DA2FF" strokeWidth={1.8} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-white/40 mt-0.5">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
            </div>
            <span className="pill text-xs">PDF selected</span>
          </>
        ) : (
          <>
            <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/04 flex items-center justify-center">
              <Upload size={20} color="rgba(255,255,255,0.4)" strokeWidth={1.8} />
            </div>
            <div className="text-center">
              <p className="text-sm text-white/60">
                <span className="text-[#4DA2FF]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-white/30 mt-0.5">PDF files only</p>
            </div>
          </>
        )}
      </label>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/08 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        type="button"
        disabled={!file || loading}
        className="btn-primary w-full justify-center py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Analyzing with AI...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Clock size={16} strokeWidth={2} />
            {file ? "Analyze Resume" : "Select a PDF first"}
          </span>
        )}
      </button>
    </div>
  );
}
