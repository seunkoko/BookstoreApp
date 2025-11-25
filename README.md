# BookstoreApp

## 📚 Bookstore Frontend (React + Vite)

A modern, scalable frontend built with React, Vite, TypeScript, and React Query, designed to connect to the Bookstore API backend.
This project follows senior-level frontend architecture, including modular components, API abstraction layers, state management, caching, advanced routing, and robust testing.

### 🚀 Features

- 🔐 Authentication UI: Login, Register, Persisted Auth State

- 📚 Books Listing with pagination, search, and filters

- 📝 Book Details + Reviews & Review Submission

- 🛠️ Admin Dashboard for managing books

- ♻️ React Query for caching & background revalidation

- 🎨 ShadCN / Tailwind UI components

- 🧩 Atomic folder structure (components, hooks, services)

- 🧪 Vitest + React Testing Library with high coverage

- 🧬 Zod validation

- 🔥 Error boundaries & skeleton loaders

- 🧱 Docker-ready

### 🧱 Tech Stack

- React 18

- Vite

- TypeScript

- React Query

- Zod

- React Router

- TailwindCSS + ShadCN

- Axios

- Vitest + RTL

### Folder Structure

```
src/
│── api/
│   └── xxx.ts
│── components/
│   └── common/
│   └── xxx/
│── hooks/
│── layouts/
│── pages/
│   └── xxx/
│── providers/
│── router/
│── store/
│── types/
│── utils/

```

### 🧪 Testing Strategy (Senior Level)

- Unit tests for:

    - components

    - hooks

    - utils

- Integration tests for:

    - API calls (mocked)

    - React Query interactions

    - Routing

- E2E tests:

    - Cypress

### 🚀 Getting Started
1. Install
  ```
  npm install
  ```
2. Start Dev Server
  ```
  npm run dev
  ```
3. Run Tests
  ```
  npm run test
  ```
4. Build
  ```
  npm run build
  ```

### 🐳 Docker Setup
```
docker build -t bookstoreApp .
docker run -p 5173:80 bookstoreApp
```

### 🧩 API Integration

All backend requests are centralized in:

```
src/api/
```

Using:

- Axios instance

- Interceptors for auth tokens

- Zod schemas for validation

- React Query for caching


