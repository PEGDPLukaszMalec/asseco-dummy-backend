const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'admin';
const DEMO_TOKEN = 'dummy-token';

app.use(express.json());

// Allow local frontend (port 4200) to call this API without CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  const isValidUser = username === DEMO_USERNAME && password === DEMO_PASSWORD;
  if (!isValidUser) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ token: DEMO_TOKEN });
});

// Minimal bearer guard for demo-only dashboard access
function requireBearerToken(req, res, next) {
  const authorization = req.header('authorization') || '';
  const [scheme, token] = authorization.split(' ');

  if (scheme !== 'Bearer' || token !== DEMO_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

app.get('/profile', requireBearerToken, (_req, res) => {
  res.json({
    firstName: 'Ada',
    lastName: 'Byrne',
    email: 'ada@example.com',
    role: 'admin',
  });
});

app.listen(PORT, () => {
  console.log(`Dummy backend listening on port ${PORT}`);
});
