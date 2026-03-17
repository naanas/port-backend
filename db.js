const { Pool } = require('pg');
require('dotenv').config();

// Connect to PostgreSQL database.
// Config for Railway or local
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  : {
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'portfolio',
      password: process.env.DB_PASSWORD || 'postgres',
      port: process.env.DB_PORT || 5432,
    };

const pool = new Pool(poolConfig);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  checkConnection: async () => {
    try {
      const res = await pool.query('SELECT NOW()');
      console.log('Database connection successful:', res.rows[0]);
      return true;
    } catch (err) {
      console.error('Database connection failed. Please ensure PostgreSQL is running and credentials match your .env file.', err.message);
      return false;
    }
  }
};
