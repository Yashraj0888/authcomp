import Database from 'better-sqlite3';
import { join } from 'path';
var db;
try {
    db = new Database(join(process.cwd(), 'company.db'));
    // Initialize database with required tables
    db.exec("\n    CREATE TABLE IF NOT EXISTS users (\n      id TEXT PRIMARY KEY,\n      email TEXT UNIQUE NOT NULL,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    );\n\n    CREATE TABLE IF NOT EXISTS otp_codes (\n      id TEXT PRIMARY KEY,\n      user_id TEXT,\n      code TEXT NOT NULL,\n      expires_at DATETIME NOT NULL,\n      used BOOLEAN DEFAULT FALSE,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n      FOREIGN KEY (user_id) REFERENCES users(id)\n    );\n\n    CREATE TABLE IF NOT EXISTS allowed_emails (\n      id TEXT PRIMARY KEY,\n      pattern TEXT NOT NULL UNIQUE,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    );\n\n    INSERT OR IGNORE INTO allowed_emails (id, pattern)\n    VALUES ('default', '@aganitha\\.ai$');\n  ");
}
catch (error) {
    console.error('Database initialization error:', error);
    db = new Database(':memory:');
}
export { db };
