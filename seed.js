const fs = require('fs');
const path = require('path');
const db = require('./db');

async function seed() {
  try {
    const sqlPath = path.join(__dirname, 'database', 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log('Running init.sql on the database...');
    
    await db.query(sql);
    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
  } finally {
    process.exit(0);
  }
}

seed();
