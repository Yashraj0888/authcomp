import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { db, dbGet, dbRun, dbAll } from './db';
import { randomUUID } from 'crypto';

// Secret for JWT signing
const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-chars-long!!!'
);

// Define interfaces for type safety
interface OTPCode {
  id: string;
  user_id: string;
  code: string;
  expires_at: string;
  used: boolean;
}

interface User {
  id: string;
  email: string;
}

// Session management functions (unchanged)
export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(secret);

  console.log(token, 'creating session token');
  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return token;
}

export async function getSession() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get('session')?.value;
    if (!token) return null;
    console.log(cookieStore, 'cookieStore');
    const verified = await jwtVerify(token, secret);
    return verified.payload as { userId: string };
  } catch {
    return null;
  }
}

// Updated OTP generation
export async function generateOTP(email: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const userId = randomUUID();

  const sql = `
    INSERT INTO users (id, email)
    VALUES (?, ?)
    ON CONFLICT(email) DO UPDATE SET
    email = excluded.email
    RETURNING id
  `;

  const user = await dbGet<{ id: string }>(sql, [userId, email]);
  if (!user) {
    throw new Error('Failed to insert or retrieve user');
  }

  console.log('User ID for OTP:', user.id);

  const otpSql = `
    INSERT INTO otp_codes (id, user_id, code, expires_at)
    VALUES (?, ?, ?, datetime('now', '+10 minutes'))
  `;

  await dbRun(otpSql, [randomUUID(), user.id, code]);

  return { code, userId: user.id };
}

// Updated OTP verification
export async function verifyOTP(userId: string, code: string) {
  console.log('Verifying OTP:', code, 'for userId:', userId);

  const sql = `
    SELECT * FROM otp_codes
    WHERE user_id = ?
    AND code = ?
    AND expires_at > datetime('now')
    AND used = FALSE
    LIMIT 1
  `;

  const result = await dbGet<OTPCode>(sql, [userId, code]);
  console.log('OTP query result:', result);

  if (result) {
    console.log('OTP is valid, marking as used');
    const updateSql = `
      UPDATE otp_codes
      SET used = TRUE
      WHERE id = ?
    `;
    await dbRun(updateSql, [result.id]);
    return true;
  }

  console.log('OTP is invalid or expired');
  return false;
}

// Updated email allowance check
export async function isEmailAllowed(email: string) {
  const sql = `
    SELECT pattern FROM allowed_emails
  `;

  const patterns = await dbAll<{ pattern: string }>(sql, []);
  return patterns.some(({ pattern }) => {
    const regex = new RegExp(pattern);
    return regex.test(email);
  });
}