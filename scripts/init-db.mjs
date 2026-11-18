import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runInit() {
  console.log('--- Initializing ASTROVÈRA MySQL Database ---');
  const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  };

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL server successfully.');

    // 1. Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS `astro` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
    console.log('Database `astro` ensured.');

    await connection.changeUser({ database: 'astro' });

    // 2. Read and execute database.sql
    const schemaPath = path.join(__dirname, '..', 'database', 'database.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Executing database.sql schema...');
    await connection.query(schemaSql);
    console.log('Database tables created successfully.');

    // 3. Read and execute seed.sql
    const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    console.log('Executing seed.sql data...');
    await connection.query(seedSql);
    console.log('Seed data inserted successfully.');

    // 4. Verify tables
    const [tables] = await connection.query('SHOW TABLES;');
    console.log(`Verified ${tables.length} tables in astro database:`);
    for (const t of tables) {
      console.log(` - ${Object.values(t)[0]}`);
    }

    console.log('\n✅ Database initialization complete! ASTROVÈRA is ready.');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runInit();
