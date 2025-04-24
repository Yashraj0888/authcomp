import { verbose } from 'sqlite3';
import { join } from 'path';
var sqlite3 = verbose();
// Initialize the database
export var db = new sqlite3.Database(join(process.cwd(), 'company.db'));
// Helper functions for asynchronous database operations
export function dbGet(sql, params) {
    return new Promise(function (resolve, reject) {
        db.get(sql, params, function (err, row) {
            if (err) {
                reject(err);
            }
            else {
                resolve(row);
            }
        });
    });
}
export function dbRun(sql, params) {
    return new Promise(function (resolve, reject) {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
export function dbAll(sql, params) {
    return new Promise(function (resolve, reject) {
        db.all(sql, params, function (err, rows) {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}
// Initialize database schema
db.serialize(function () {
    db.run("\n    CREATE TABLE IF NOT EXISTS users (\n      id TEXT PRIMARY KEY,\n      email TEXT UNIQUE NOT NULL,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    )\n  ");
    db.run("\n    CREATE TABLE IF NOT EXISTS otp_codes (\n      id TEXT PRIMARY KEY,\n      user_id TEXT,\n      code TEXT NOT NULL,\n      expires_at DATETIME NOT NULL,\n      used BOOLEAN DEFAULT FALSE,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n      FOREIGN KEY (user_id) REFERENCES users(id)\n    )\n  ");
    db.run("\n    CREATE TABLE IF NOT EXISTS allowed_emails (\n      id TEXT PRIMARY KEY,\n      pattern TEXT NOT NULL UNIQUE,\n      created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n    )\n  ");
    db.run("\n    INSERT OR IGNORE INTO allowed_emails (id, pattern)\n    VALUES ('default', '@aganitha\\.ai$')\n  ");
});
// Log database errors
db.on('error', function (err) {
    console.error('Database error:', err);
});
