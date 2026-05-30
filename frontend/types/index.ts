export type UserRole = "candidate" | "company";

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface ResumeResult {
  id: number;
  user_id: number;
  file_url: string;
  extracted_text: string;
  ai_summary: string | null;
  skills: string[] | null;
  recommended_roles: string[] | null;
  experience_level: string | null;
  strengths?: string[] | null;
  improvements?: string[] | null;
  created_at: string;
}
