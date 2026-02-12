# Asseco Dummy Backend

Minimal Node.js backend exposing two endpoints:

- `POST /login`: accepts `{ "username": "admin", "password": "admin" }` and returns `{ "token": "dummy-token" }`.
- `GET /dashboard`: requires `Authorization: Bearer dummy-token` header and responds with `{}`.

## Prerequisites

- Node.js 20+ (or Docker if you prefer containers)

## Local Development

```bash
npm install
npm start
```

Server listens on `http://localhost:3000`.

### Manual Test

```bash
curl -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"admin"}'

curl http://localhost:3000/dashboard \
  -H 'Authorization: Bearer dummy-token'
```
