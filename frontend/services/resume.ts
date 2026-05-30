import { apiRequest } from "@/lib/api";
import type { ResumeResult } from "@/types";

export async function uploadResume(token: string, file: File): Promise<ResumeResult> {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<ResumeResult>("/resumes/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}
