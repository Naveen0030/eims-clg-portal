# EIMS Portal – Interview Q&A (Cheat Sheet)

## 1) Architecture & Overview
- Q: What’s the tech stack?
  - A: MERN: React (Vite) + Node/Express + MongoDB/Mongoose, JWT auth, OTP email, Tailwind UI.
- Q: How is the repo organized?
  - A: `frontend/` (React app), `backend/` (Express API). Shared conventions via constants and envs.
- Q: How do frontend and backend communicate?
  - A: REST over HTTPS. Centralized base URL via `frontend/src/utils/constants.js` and `backend/config.js`.

## 2) Centralized URLs (Single place to change)
- Q: Where do you change API URLs for deployment?
  - A: Frontend: `frontend/src/utils/constants.js` (`BASE_URL`). Backend: `backend/config.js` (`API_BASE_URL`, `FRONTEND_URL`). Components import from constants.
- Q: Why centralize URLs?
  - A: Avoid drift, easier deployment (change once, updates everywhere), fewer prod bugs.

## 3) Authentication & Authorization
- Q: How does authentication work?
  - A: Login returns JWT; stored in `localStorage`. Requests include `Authorization: Bearer <token>` via `axiosInstance` or `fetch` headers.
- Q: Where is the token attached?
  - A: `frontend/src/utils/axiosinstance.js` interceptor; in some views using `fetch`, token is added manually.
- Q: How are protected routes enforced on the frontend?
  - A: `frontend/src/Components/AuthenticatedRoute.jsx` checks token/role, redirects unauth users.
- Q: How are roles enforced?
  - A: Role stored in JWT and user record; UI gating on frontend; server validates roles per route in `backend/index.js`.
- Q: How do you handle token expiration?
  - A: Server returns 401; interceptor or route guards redirect to login. (Refresh tokens can be added as future improvement.)

## 4) OTP & Email Flow
- Q: How is OTP verification implemented?
  - A: Backend generates OTP (see `backend/modals/otp.modal.js`), emails via Nodemailer, validates OTP before activating user.
- Q: Why OTP?
  - A: Prevent fake signups, verify ownership of email.

## 5) Data Modeling
- Q: What are the core models?
  - A: Users (`backend/modals/user.modal.js`), Courses (`backend/modals/course.modal.js`), Faculty Advisor (`backend/modals/fa.modal.js`), OTPs (`backend/modals/otp.modal.js`).
- Q: Notable fields?
  - A: User: name, email, password hash, role (admin/instructor/student/fa). Course: title, credits, instructor, enrollment state. FA: advisor assignments/validations.

## 6) Key User Flows
- Q: Student course enrollment flow?
  - A: Browse → enroll (`EnrollCourse.jsx`) → success screen → visible in `EnrolledCourses.jsx`. Server validates prerequisites/cap.
- Q: Instructor course offering/management?
  - A: Create via `AddCourse.jsx`, view/manage via dashboard pages, `Mycourses.jsx` fetches instructor courses.
- Q: Faculty Advisor validation?
  - A: FA views pending validations (`faValidation.jsx`, `CourseValidation.jsx`), approves/rejects, backend updates course-user relationship.
- Q: Admin user management?
  - A: `AdminDashboard.jsx`, `Admin/AllUsers.jsx`, `Admin/AddUsers.jsx`, `Admin/ViewUser.jsx` manage roles, onboarding.

## 7) Frontend Implementation
- Q: How is API access abstracted?
  - A: `axiosInstance` with base URL and interceptors; and centralized constants for `BASE_URL`.
- Q: How is layout handled?
  - A: `Components/DashboardLayout.jsx` for shared shell; role dashboards render nested routes.
- Q: How are tables/forms built?
  - A: Reusable `Components/Table.jsx` and page-level forms; controlled inputs; form validation on submit.

## 8) Backend Implementation
- Q: How are routes structured?
  - A: Single `backend/index.js` with grouped endpoints (auth, users, courses, FA). Middleware for JWT and role checks.
- Q: Where are utilities?
  - A: `backend/utilities.js` (helpers like hashing, token handling, email helpers).
- Q: How is CORS configured?
  - A: Uses `FRONTEND_URL` from `backend/config.js` to allow the deployed frontend origin.

## 9) Error Handling & Observability
- Q: How are errors handled on the client?
  - A: Try/catch around `fetch`/`axios`; display toasts or inline errors; 401 redirects.
- Q: How are server errors handled?
  - A: `try/catch` around controllers, send structured JSON `{ success:false, message }`, consistent status codes.
- Q: Logging?
  - A: Console logs in dev; can add winston/pino with request IDs as improvement.

## 10) Security Practices
- Q: Password security?
  - A: Hashing (bcrypt) before saving. Never store plain text.
- Q: JWT security?
  - A: Signed tokens; short lifetime recommended; send over HTTPS; validate on each request.
- Q: CORS and CSRF?
  - A: CORS restricted to `FRONTEND_URL`. CSRF risks minimized as tokens are in headers (not cookies).
- Q: Input validation?
  - A: Validate payloads server-side (presence, types). Add `zod/joi` as a future improvement for stricter contracts.

## 11) Performance & UX
- Q: How did you keep the UI responsive?
  - A: Optimistic UI for simple updates, loading states, minimal over-fetching, debounced actions where relevant.
- Q: Backend performance considerations?
  - A: Indexed queries on frequent lookups (e.g., user email, course code). Pagination for large tables (future: server-side pagination).

## 12) Deployment & Environments
- Q: How do you prepare for Render/Vercel/Netlify?
  - A: Centralized URLs; environment variables (`frontend/env.example`, `backend/env.example`), documented in `DEPLOYMENT.md`.
- Q: Common deployment pitfalls?
  - A: Mismatched `BASE_URL`, missing envs, CORS origin not set, Node version mismatch. Use `CENTRALIZED_URLS_SUMMARY.md` and `DEPLOYMENT.md`.

## 13) Testing & QA
- Q: What’s tested manually?
  - A: Auth (signup/login, OTP), role gating, enrollment flows, FA approvals, admin CRUD.
- Q: What would you automate next?
  - A: Unit tests for utilities, integration tests for auth and enrollment, component tests for forms/tables.

## 14) Challenges (Real) & Resolutions
- Q: Mixed localhost URLs across files caused 404s after deploy. How did you fix?
  - A: Centralized URLs in `frontend/src/utils/constants.js` and `backend/config.js`; updated components to import constants.
- Q: 401 Unauthorized due to missing token on some requests. Fix?
  - A: Introduced `axiosInstance` with interceptor; audited `fetch` calls to always add `Authorization` header.
- Q: CORS blocked requests in prod. Fix?
  - A: Set `FRONTEND_URL` in backend, used it in CORS config; verified with browser network panel.
- Q: OTP emails not sending reliably. Fix?
  - A: Verified SMTP creds; added retry/logging; ensured async handling and error surfaces to client.
- Q: Role-based screens visible via direct URL. Fix?
  - A: Strengthened `AuthenticatedRoute.jsx` checks; server-side role checks on sensitive endpoints.
- Q: Inconsistent enrollment state after network errors. Fix?
  - A: Added loading/disabled states, server truth reconciliation on next fetch; surfaced error messages.

## 15) Trade-offs & Alternatives
- Q: Why JWT over sessions?
  - A: Simpler horizontal scaling, stateless APIs. Trade-off: token revocation complexity.
- Q: Single-file routes vs modular controllers?
  - A: Faster iteration early; trade-off: maintainability → roadmap to split controllers/routes.
- Q: LocalStorage for tokens vs cookies?
  - A: Simplicity and easy headers; trade-off: XSS risk → mitigate via sanitization and strict content policies.

## 16) Future Improvements
- Q: Top 6 improvements you’d plan?
  - A: Refresh tokens + rotation, RBAC middleware per route file, server-side pagination, form schema validation, structured logging/metrics, E2E test suite.

## 17) “Show me in the code” (pointers)
- Frontend base URL: `frontend/src/utils/constants.js` (exports `BASE_URL`)
- Backend base URL: `backend/config.js` (exports `API_BASE_URL`, `FRONTEND_URL`)
- Auth guard: `frontend/src/Components/AuthenticatedRoute.jsx`
- Axios JWT attach: `frontend/src/utils/axiosinstance.js`
- Enrollment flow screens: `frontend/src/pages/Dashboard/Courses/`
- Instructor courses: `frontend/src/pages/Dashboard/Work/Mycourses.jsx`
- FA validation: `frontend/src/pages/Dashboard/Work/faValidation.jsx`, `CourseValidation.jsx`
- Models: `backend/modals/*.modal.js`
- Core API: `backend/index.js`
- Deployment notes: `DEPLOYMENT.md`, `CENTRALIZED_URLS_SUMMARY.md`
