const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Check DB Connection on startup.
// It will print a warning if not connected but still allow the server to boot.
db.checkConnection();

// Example Dummy Data (Used if database queries fail / DB not set up)
const DUMMY_PROFILE = {
  name: 'John Doe',
  title: 'Fullstack Developer & Designer',
  bio: 'I build minimal, modern, and performant web experiences. (Showing Offline Data)',
  social_links: { github: '#', linkedin: '#' }
};
const DUMMY_PROJECTS = [
  { id: 1, title: 'Minimalist Portfolio', description: 'This very site, built with Next.js and Express.', tech_stack: ['Next.js', 'Express', 'Postgres'] }
];
const DUMMY_SKILLS = [
  { id: 1, name: 'Next.js', category: 'Frontend', proficiency: 90 },
  { id: 2, name: 'Node.js', category: 'Backend', proficiency: 85 }
];

// --- Routes --- //

// GET Profile
app.get('/api/profile', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM profile LIMIT 1');
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.json(DUMMY_PROFILE);
    }
  } catch (error) {
    console.error('Database query failed for profile. Falling back to dummy data.', error.message);
    res.json(DUMMY_PROFILE);
  }
});

// GET Projects
app.get('/api/projects', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Database query failed for projects. Falling back to dummy data.', error.message);
    res.json(DUMMY_PROJECTS);
  }
});

// GET Skills
app.get('/api/skills', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM skills ORDER BY category, proficiency DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Database query failed for skills. Falling back to dummy data.', error.message);
    res.json(DUMMY_SKILLS);
  }
});

// GET Experience

app.get('/api/experience', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM experience ORDER BY start_date DESC');
    res.json(result.rows.length > 0 ? result.rows : DUMMY_EXPERIENCE);
  } catch (error) {
    console.error('Experience table not found. Falling back to dummy data.', error.message);
    res.json(DUMMY_EXPERIENCE);
  }
});

// Standard health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running successfully.' });
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
  console.log('You do not strictly NEED the database running, it will automatically fallback to dummy data if not configured correctly!');
});
