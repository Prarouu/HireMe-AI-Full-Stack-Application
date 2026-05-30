# HirePilot AI — Phase 1 Foundation

> **AI-native recruitment intelligence platform** built with scalable, modular architecture from day one.

HirePilot AI analyzes resumes using Google Gemini, surfaces structured insights, and lays the foundation for fully agentic recruitment workflows — designed to scale from MVP to enterprise.

![Phase](https://img.shields.io/badge/Phase-1%20Foundation-blue)
![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 What's in Phase 1

- ✅ **Authentication** — Email/password signup + JWT + Google OAuth2
- ✅ **Resume Upload** — PDF parsing with `pypdf`
- ✅ **AI Analysis** — Google Gemini extracts skills, roles, experience level, strengths, improvements
- ✅ **Candidate Dashboard** — View AI insights in a clean, modern UI
- ✅ **Scalable Architecture** — Monorepo with isolated frontend/backend, layered services, dedicated AI module

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | FastAPI, SQLAlchemy, PostgreSQL, Pydantic |
| **AI** | Google Gemini (`gemini-2.5-flash`) |
| **Auth** | JWT (HS256) + Google OAuth2 |
| **Infrastructure** | Docker (PostgreSQL), Vercel (frontend), Render (backend) |

### Design Principles

- **Monorepo split by responsibility** — `frontend/` and `backend/` are isolated to reduce coupling and enable independent deployments
- **Layered backend** — `routers → services → models/schemas → ai/utils` keeps API handlers thin and business logic reusable
- **AI as a dedicated module** — All model prompts and analysis logic live under `app/ai/`, making future transition to multi-agent orchestration straightforward
- **App Router frontend** — Next.js App Router for modern route grouping, server/client component boundaries, and future streaming UX
- **Phase-ready data model** — `users`, `resumes`, `jobs` align with MVP needs but also support upcoming semantic matching and recruiter workflows

---

## 📂 Project Structure

```
Hirepilot AI/
├── backend/
│   └── app/
│       ├── ai/                  # Gemini resume analysis
│       │   └── resume_analyzer.py
│       ├── core/                # App settings
│       │   └── config.py
│       ├── database/            # SQLAlchemy engine + session
│       │   └── session.py
│       ├── middleware/          # JWT auth guard
│       │   └── auth.py
│       ├── models/              # SQLAlchemy ORM models
│       │   ├── user.py
│       │   ├── resume.py
│       │   └── job.py
│       ├── routers/             # API route handlers
│       │   ├── auth.py
│       │   └── resumes.py
│       ├── schemas/             # Pydantic request/response contracts
│       │   ├── auth.py
│       │   └── resume.py
│       ├── services/            # Business logic
│       │   ├── auth_service.py
│       │   └── resume_service.py
│       ├── utils/               # Password hashing, PDF parsing
│       │   ├── security.py
│       │   └── pdf.py
│       └── main.py              # FastAPI app entry
├── frontend/
│   ├── app/
│   │   ├── (auth)/              # Login + Signup pages
│   │   ├── auth/callback/       # OAuth callback handlers
│   │   ├── dashboard/           # Candidate dashboard
│   │   └── page.tsx             # Landing page
│   ├── components/              # Reusable UI components
│   │   ├── auth-form.tsx
│   │   ├── resume-uploader.tsx
│   │   └── analysis-card.tsx
│   ├── hooks/                   # React hooks
│   │   └── useAuth.ts
│   ├── lib/                     # API client
│   │   └── api.ts
│   ├── services/                # API service functions
│   │   ├── auth.ts
│   │   └── resume.ts
│   └── types/                   # TypeScript types
│       └── index.ts
└── docker-compose.yml           # PostgreSQL container
```

---

## 🗄️ Database Schema

### `users`
| Column | Type | Description |
|---|---|---|
| `id` | `integer` | Primary key |
| `name` | `varchar(120)` | User's full name |
| `email` | `varchar(180)` | Unique email (used for login) |
| `password_hash` | `varchar(255)` | PBKDF2-SHA256 hash (nullable for OAuth users) |
| `role` | `enum` | `candidate` or `company` |
| `oauth_provider` | `varchar(32)` | `google` or `null` |
| `oauth_id` | `varchar(255)` | Provider's user ID |
| `created_at` | `timestamp` | Account creation time |

### `resumes`
| Column | Type | Description |
|---|---|---|
| `id` | `integer` | Primary key |
| `user_id` | `integer` | Foreign key → `users.id` |
| `file_url` | `varchar(255)` | Local path to uploaded PDF |
| `extracted_text` | `text` | Raw text extracted from PDF |
| `ai_summary` | `text` | Gemini-generated summary |
| `skills` | `varchar[]` | Array of extracted skills |
| `recommended_roles` | `varchar[]` | Array of job role suggestions |
| `experience_level` | `varchar(120)` | Entry/Mid/Senior/Lead |
| `created_at` | `timestamp` | Upload time |

### `jobs` *(scaffolded for Phase 2)*
| Column | Type | Description |
|---|---|---|
| `id` | `integer` | Primary key |
| `company_id` | `integer` | Foreign key → `users.id` |
| `title` | `varchar(180)` | Job title |
| `description` | `text` | Job description |
| `skills` | `varchar[]` | Required skills |
| `created_at` | `timestamp` | Posting time |

---

## 🔐 Authentication Flow

### Email/Password
1. User signs up → password hashed with PBKDF2-SHA256 (390,000 iterations)
2. User logs in → password verified → JWT issued (HS256, 120min expiry)
3. Protected routes require `Authorization: Bearer <token>` header

### Google OAuth2
1. User clicks "Sign in with Google" → redirected to Google consent screen
2. Google redirects back to `/auth/callback/google?code=...`
3. Frontend exchanges `code` for access token via backend
4. Backend fetches user info from Google → finds or creates user → issues JWT
5. User redirected to dashboard with token stored in `localStorage`

---

## 🤖 AI Resume Analysis Pipeline

```
POST /api/v1/resumes/upload
  ↓
1. Validate PDF content type
  ↓
2. Extract text using pypdf
  ↓
3. Send to Gemini with strict JSON prompt
  ↓
4. Validate response with Pydantic schema
  ↓
5. Persist to database
  ↓
6. Return structured insights to frontend
```

### Gemini Output Contract
```json
{
  "summary": "Experienced full-stack engineer with 4 years...",
  "skills": ["Python", "React", "FastAPI", "PostgreSQL"],
  "recommended_roles": ["Backend Engineer", "Full-Stack Developer"],
  "experience_level": "Mid-Level",
  "strengths": ["Strong system design", "API architecture"],
  "improvements": ["Add cloud certifications", "Contribute to OSS"]
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.11+**
- **Node 20+**
- **Docker** (for PostgreSQL)
- **Google Cloud account** (for OAuth — optional)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/hirepilot-ai.git
cd hirepilot-ai
```

### 2. Start PostgreSQL
```bash
docker compose up -d postgres
```

### 3. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`  
API docs at `http://localhost:8000/docs`

### 4. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local if needed (default points to localhost:8000)
npm run dev
```

Frontend will be available at `http://localhost:3000`

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```bash
# Database
DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/hirepilot

# JWT
JWT_SECRET=your_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=120

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 📡 API Endpoints

### Auth — `/api/v1/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ❌ | Register with email + password |
| `POST` | `/login` | ❌ | Login, returns JWT |
| `POST` | `/google/callback` | ❌ | Exchange Google OAuth code for JWT |

### Resumes — `/api/v1/resumes`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/upload` | ✅ JWT | Upload PDF, extract text, run AI analysis |

---

## 🎨 Design Language

The UI is inspired by [sui.io](https://www.sui.io/) with:
- Deep near-black background (`#0a0b0f`)
- Electric blue accent (`#4DA2FF`)
- Subtle grid/dot background texture
- Glowing orb effects
- Frosted glass cards (glassmorphism)
- Clean pill-shaped badges
- Generous whitespace

---

## 🗺️ Roadmap

| Phase | Status | Features |
|---|---|---|
| **Phase 1** | ✅ **Current** | Auth, resume upload, Gemini analysis, dashboard |
| **Phase 2** | 🔜 Next | Job posting CRUD, embeddings, ChromaDB, semantic resume ↔ job matching |
| **Phase 3** | 📅 Planned | Multi-agent orchestration (CrewAI/LangChain), interview question agents, career roadmap agents |
| **Phase 4** | 📅 Future | RAG + long-term memory, Pinecone migration, observability, horizontal scaling |

---

## 🧪 Testing

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

---

## 📦 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Render)
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repo
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables from `.env.example`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** for AI-powered resume analysis
- **FastAPI** for the blazing-fast backend framework
- **Next.js** for the modern React framework
- **sui.io** for design inspiration

---

## 📧 Contact

**Praroop** — [@yourhandle](https://twitter.com/yourhandle)

Project Link: [https://github.com/yourusername/hirepilot-ai](https://github.com/yourusername/hirepilot-ai)

---

<div align="center">
  <strong>Built with ❤️ for the future of recruitment</strong>
</div>
# HireMe-AI-Full-Stack-Application
