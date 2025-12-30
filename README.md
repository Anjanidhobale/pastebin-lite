# Pastebin Lite

A lightweight Pastebin-like web application that allows users to create text pastes and share them via a unique URL. Pastes can optionally expire based on time (TTL) or number of views.

This project was built as a take-home assignment and is optimized for automated evaluation.

---

## Features

- Create a paste with arbitrary text
- Receive a shareable link
- View paste content via API or browser
- Optional expiration:
  - Time-based (TTL)
  - View-count based
- Deterministic time testing support
- Serverless-safe persistence

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Runtime:** Node.js
- **Persistence:** Redis (Vercel Redis / Upstash-compatible)
- **Hosting:** Vercel

---

## Persistence Layer

The application uses **Redis** as a persistence layer.

Reasoning:
- Works reliably in serverless environments
- Data survives across requests and instances
- Supports atomic operations needed for view counting
- Fast enough for automated testing

Redis connection details are provided via environment variables and are **not committed** to the repository.

---

## API Endpoints

### Health Check
