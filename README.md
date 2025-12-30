## Pastebin Lite

A lightweight Pastebin-like application built as a full-stack assignment.
It allows users to create text pastes that automatically expire based on time (TTL) or number of views.

---
## Features

- Create text pastes via REST API
- View pastes using a shareable URL
- Automatic expiration using:
  - Time-To-Live (TTL)
  - Maximum view count
- Redis-backed persistence
- Clean RESTful API design
- Simple frontend for viewing pastes
  
---
## Tech Stack

- **Framework:** Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database:** Redis (Vercel Redis)
- **Language:** JavaScript
- **Deployment:** Vercel

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
### Live Demo
https://pastebin-lite-vercel-nine.vercel.app

--- 
### API Endpoints
**- Create Paste**
POST /api/pastes

-Request Body:
(json)
{
  "content": "Hello world",
  "ttl_seconds": 300,
  "max_views": 5
} 
-Response:
{
  "id": "a7c64e76",
  "url": "http://localhost:3000/p/a7c64e76"
}

**Get Paste**
GET  /api/pastes/:id

Response (success):
{
  "id": "a7c64e76",
  "content": "Hello world",
  "view_count": 1
}
Response (expired / exceeded):
{
  "error": "Paste not found"
}

---
## Frontend Usage

Open the paste in a browser using: 
http://localhost:3000/p/<paste-id>

The page displays:
  - Paste content
  - Paste ID
  - Current view count

---
## Expiration Rules

A paste is automatically deleted when:
 - TTL expires, or
 - Maximum view count is exceeded
After deletion:
 - API returns 404 / 410
 - UI shows “Paste not found”

---
## Local Development

1️⃣ Install dependencies
npm install

2️⃣ Set environment variables
vercel link
vercel env pull

3️⃣ Run the app
npm run dev

**App runs at:**
http://localhost:3000

---
## Design Decisions

 - Redis is used for fast access and TTL support
 - Paste IDs are short and URL-friendly
 - Business logic ensures:
   - Atomic view counting
   - Safe deletion on expiry
 - Proper HTTP status codes are returned

---
## Author
Anjani Dhobale
