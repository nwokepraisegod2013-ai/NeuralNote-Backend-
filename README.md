# NeuralNote2 Backend

A Node.js + Express + MongoDB backend for the NeuralNote2 note-taking platform.

## Features

- User registration and login with JWT
- CRUD for notes
- AI-powered note summary endpoint
- MongoDB persistence via Mongoose
- Production-ready security and rate limiting
- Health check endpoint
- Docker packaging

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update values

3. Run locally
   ```bash
   npm run dev
   ```

4. Run production server
   ```bash
   npm start
   ```

## Docker

Build and run the container:

```bash
docker build -t neuralnote2-backend .
docker run -p 4000:4000 --env-file .env neuralnote2-backend
```

## Environment variables

- `NODE_ENV` - `production` or `development`
- `PORT` - HTTP port (default `4000`)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `ALLOWED_ORIGINS` - Comma-separated allowed CORS origins
- `OPENAI_API_KEY` - Optional API key for AI summary generation

## API Endpoints

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/notes`
- `POST /api/notes`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`
- `POST /api/notes/:id/summary`

## Notes

- Use `Authorization: Bearer <token>` for protected routes.
- If `OPENAI_API_KEY` is not configured, summary endpoint returns a placeholder response.
