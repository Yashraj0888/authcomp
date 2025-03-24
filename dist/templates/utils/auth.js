var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { db } from './db';
import { randomUUID } from 'crypto';
var secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'your-secret-key-min-32-chars-long!!!');
export function createSession(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new SignJWT({ userId: userId })
                        .setProtectedHeader({ alg: 'HS256' })
                        .setExpirationTime('7d')
                        .setIssuedAt()
                        .sign(secret)];
                case 1:
                    token = _a.sent();
                    console.log(token, "creating session token  ");
                    return [4 /*yield*/, (cookies().set('session', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            maxAge: 7 * 24 * 60 * 60, // 7 days
                        }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
}
export function getSession() {
    return __awaiter(this, void 0, void 0, function () {
        var cookieStore, token, verified, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    cookieStore = cookies();
                    return [4 /*yield*/, ((_b = cookieStore.get('session')) === null || _b === void 0 ? void 0 : _b.value)];
                case 1:
                    token = _c.sent();
                    if (!token)
                        return [2 /*return*/, null];
                    console.log(cookieStore, "cookieStore");
                    return [4 /*yield*/, jwtVerify(token, secret)];
                case 2:
                    verified = _c.sent();
                    return [2 /*return*/, verified.payload];
                case 3:
                    _a = _c.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function generateOTP(email) {
    return __awaiter(this, void 0, void 0, function () {
        var code, userId, stmt, user;
        return __generator(this, function (_a) {
            code = Math.floor(100000 + Math.random() * 900000).toString();
            userId = randomUUID();
            stmt = db.prepare("\n      INSERT INTO users (id, email)\n      VALUES (?, ?)\n      ON CONFLICT(email) DO UPDATE SET\n      email = excluded.email\n      RETURNING id\n    ");
            user = stmt.get(userId, email);
            console.log('User ID for OTP:', user.id);
            db.prepare("\n      INSERT INTO otp_codes (id, user_id, code, expires_at)\n      VALUES (?, ?, ?, datetime('now', '+10 minutes'))\n    ").run(randomUUID(), user.id, code);
            return [2 /*return*/, { code: code, userId: user.id }];
        });
    });
}
export function verifyOTP(userId, code) {
    console.log('Verifying OTP:', code, 'for userId:', userId);
    var result = db.prepare("\n      SELECT * FROM otp_codes\n      WHERE user_id = ?\n      AND code = ?\n      AND expires_at > datetime('now')\n      AND used = FALSE\n      LIMIT 1\n    ").get(userId, code);
    console.log('OTP query result:', result);
    if (result) {
        console.log('OTP is valid, marking as used');
        db.prepare("\n        UPDATE otp_codes\n        SET used = TRUE\n        WHERE id = ?\n      ").run(result.id);
        return true;
    }
    console.log('OTP is invalid or expired');
    return false;
}
export function isEmailAllowed(email) {
    var patterns = db.prepare("\n    SELECT pattern FROM allowed_emails\n  ").all();
    return patterns.some(function (_a) {
        var pattern = _a.pattern;
        var regex = new RegExp(pattern);
        return regex.test(email);
    });
}
