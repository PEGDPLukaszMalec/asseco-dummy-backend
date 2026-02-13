# Asseco Dummy Backend

Minimal Node.js backend exposing demo auth + dashboard endpoints.

## Endpoints

| Method | Path           | Auth Required | Description |
| ------ | -------------- | ------------- | ----------- |
| POST   | `/login`       | No            | Validates `{ "username": "admin", "password": "admin" }` and returns `{ "token": "dummy-token" }`. |
| GET    | `/profile`     | Bearer token  | Returns static operator info (first/last name, email, role). |
| GET    | `/dashboard`   | Bearer token  | Returns mocked uptime, user count, SLA, incident stats, and per-service health entries. |

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

curl http://localhost:3000/profile \
  -H 'Authorization: Bearer dummy-token'

curl http://localhost:3000/dashboard \
  -H 'Authorization: Bearer dummy-token'
```
