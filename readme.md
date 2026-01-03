# Node Final Exam — Task & User Management Dashboard

Brief project summary
- A simple Node.js + Express web application used as a task-management dashboard for managers and employees. It supports user signup/login, role-based access (Admin/Manager/Employee), profile management, task creation and assignment, and basic dashboard analytics.

Key features
- Authentication: session-based login with role information used for conditional UI and access control.
- Role-based UI: admin-only menu items (Add Task, View Employees, View Tasks) are shown conditionally in the sidebar.
- User profiles: upload and serve profile images stored in `/uploads`.
- Task management: create, view, and assign tasks (views under `views/pages`).
- Server-side rendering: EJS templates in the `views/` folder render the dashboard and pages.
- Database: MongoDB connection configured under `configs/db.js` (connection string in `.env`).
- File upload middleware: custom `upload.js` middleware in `middlewares/` handles image uploads.

Project structure (high level)
- `index.js` — app entry point, Express setup and route mounting.
- `controller/` — route handlers (e.g., `clientctl.js`, `userctl.js`, `adminctl.js`, `taskctl.js`).
- `router/` — route definitions (`clientrout.js`, `adminrout.js`).
- `models/` — Mongoose models (`usermodel.js`, `taskmodel.js`).
- `views/` — EJS templates and partials (`partials/header.ejs`, `index.ejs`, pages/...).
- `public/` — static assets (CSS, JS, libs, images).
- `configs/` — DB and dotenv setup.
- `middlewares/` — authentication and upload middlewares.

How the role bug arises (note)
- Using assignment (`=`) instead of comparison (`===`) in EJS conditionals will overwrite `user.role` and make all users appear as Admin. Ensure EJS checks use `===`.

How to run
1. Copy `.env` with your MongoDB URL (or use the provided `.env` if present).
2. Install dependencies:
```
npm install
```
3. Start in development:
```
npm run dev
```

Where to look next
- Views: `views/partials/header.ejs` (role-based sidebar), `views/index.ejs` (dashboard).
- Controllers: `controller/clientctl.js` and `controller/adminctl.js` for route handlers that call `res.render(...)`.

If you want, I can:
- Run the app and verify the dashboard rendering.
- Add a small test page that prints the current `user` object for debugging.

---
Generated on 2026-01-03.

Live Link

[https://node-final-exam.vercel.app/login](https://node-final-exam-cq2n6wbe3-yash-bhaktas-projects.vercel.app/login)
