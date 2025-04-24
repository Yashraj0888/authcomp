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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbGet, dbRun } from "../../../../utils/db";
var ldap = require("ldapjs");
var handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID || '',
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
            client: { token_endpoint_auth_method: "client_secret_post" },
            issuer: "https://www.linkedin.com",
            profile: function (profile) { return ({
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            }); },
            wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
        CredentialsProvider({
            id: 'verify-otp',
            name: 'OTP',
            credentials: {
                email: { label: 'Email', type: 'email' },
                otp: { label: 'OTP', type: 'text' },
                userId: { label: 'User ID', type: 'text' },
            },
            authorize: function (credentials) {
                return __awaiter(this, void 0, void 0, function () {
                    var sqlOtp, result, updateSql, sqlUser, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(credentials === null || credentials === void 0 ? void 0 : credentials.email) || !(credentials === null || credentials === void 0 ? void 0 : credentials.otp) || !(credentials === null || credentials === void 0 ? void 0 : credentials.userId)) {
                                    console.log('Missing credentials');
                                    throw new Error('Missing OTP credentials');
                                }
                                sqlOtp = "\n          SELECT * FROM otp_codes\n          WHERE user_id = ?\n          AND code = ?\n          AND expires_at > datetime('now')\n          AND used = FALSE\n          LIMIT 1\n        ";
                                return [4 /*yield*/, dbGet(sqlOtp, [
                                        credentials.userId,
                                        credentials.otp,
                                    ])];
                            case 1:
                                result = _a.sent();
                                console.log('OTP query result:', result);
                                if (!result) {
                                    console.log('Invalid OTP or expired');
                                    throw new Error('Invalid or expired OTP');
                                }
                                updateSql = "\n          UPDATE otp_codes\n          SET used = TRUE\n          WHERE id = ?\n        ";
                                return [4 /*yield*/, dbRun(updateSql, [result.id])];
                            case 2:
                                _a.sent();
                                sqlUser = 'SELECT * FROM users WHERE id = ?';
                                return [4 /*yield*/, dbGet(sqlUser, [credentials.userId])];
                            case 3:
                                user = _a.sent();
                                console.log('User query result:', user);
                                if (!user) {
                                    console.log('User not found');
                                    throw new Error('User not found');
                                }
                                return [2 /*return*/, {
                                        id: user.id,
                                        email: user.email,
                                    }];
                        }
                    });
                });
            },
        }),
        CredentialsProvider({
            id: "ldap",
            name: "LDAP",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
                redirect: { label: "Redirect", type: "text" },
                callbackUrl: { label: "Callback URL", type: "text" }
            },
            authorize: function (credentials) {
                return __awaiter(this, void 0, void 0, function () {
                    var ldapUrl, userDn, client, clientError, error_1, errorMessage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // console.log("Authorizing with LDAP credentials:", credentials);
                                if (!(credentials === null || credentials === void 0 ? void 0 : credentials.username) || !(credentials === null || credentials === void 0 ? void 0 : credentials.password)) {
                                    console.log("Missing LDAP credentials");
                                    throw new Error("Missing LDAP credentials");
                                }
                                ldapUrl = process.env.LDAP_URI || "ldap://ldap.example.com";
                                userDn = "uid=".concat(credentials.username, ",").concat(process.env.LDAP_USER_DN || "ou=people,dc=example,dc=ai");
                                client = ldap.createClient({
                                    url: ldapUrl,
                                    timeout: 30000,
                                    connectTimeout: 30000,
                                    reconnect: {
                                        initialDelay: 1000,
                                        maxDelay: 10000,
                                        failAfter: 10 // fail after 10 retries
                                    }
                                });
                                clientError = null;
                                client.on('error', function (err) {
                                    console.error('LDAP client error:', err);
                                    clientError = err;
                                });
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        // Set a timeout for the entire operation
                                        var timeoutId = setTimeout(function () {
                                            console.error("LDAP authentication operation timed out");
                                            client.destroy();
                                            reject(new Error("LDAP authentication timed out after 45 seconds"));
                                        }, 45000);
                                        // Check if we already have a client error before attempting to bind
                                        if (clientError) {
                                            clearTimeout(timeoutId);
                                            console.error("LDAP client error before bind:", clientError);
                                            reject(new Error("LDAP connection error: ".concat(clientError.message)));
                                            return;
                                        }
                                        client.bind(userDn, credentials.password, function (error) {
                                            clearTimeout(timeoutId);
                                            if (error) {
                                                console.error("LDAP authentication failed:", error);
                                                // Create the error message before destroying the client
                                                var errorMessage = "LDAP authentication failed: ".concat(error.message);
                                                // Reject with the error message
                                                reject(new Error(errorMessage));
                                                // Then destroy the client
                                                client.destroy();
                                            }
                                            else {
                                                console.log("LDAP authentication successful");
                                                client.unbind(function (err) {
                                                    if (err) {
                                                        console.error("Error unbinding LDAP client:", err);
                                                    }
                                                    client.destroy();
                                                });
                                                // Return user object with email if available
                                                var email = process.env.LDAP_EMAIL_DOMAIN
                                                    ? "".concat(credentials.username, "@").concat(process.env.LDAP_EMAIL_DOMAIN)
                                                    : "";
                                                resolve({
                                                    id: credentials.username,
                                                    email: email,
                                                    name: credentials.username
                                                });
                                            }
                                        });
                                    })];
                            case 2: return [2 /*return*/, _a.sent()];
                            case 3:
                                error_1 = _a.sent();
                                console.error("LDAP authentication error:", error_1);
                                errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                                throw new Error("LDAP authentication error: ".concat(errorMessage));
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
        }),
    ],
    callbacks: {
        signIn: function (_a) {
            var user = _a.user, account = _a.account, profile = _a.profile;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    if ((account === null || account === void 0 ? void 0 : account.provider) === "verify-otp" || (account === null || account === void 0 ? void 0 : account.provider) === "ldap") {
                        console.log("".concat(account.provider, " provider detected; proceeding without profile check."));
                        return [2 /*return*/, true];
                    }
                    if (!account || !profile) {
                        return [2 /*return*/, false];
                    }
                    // Add custom profile data to the user object
                    if (profile.email) {
                        user.email = profile.email;
                    }
                    if (profile.name) {
                        user.name = profile.name;
                    }
                    // Add provider-specific profile data
                    if (account.provider === 'github') {
                        //@ts-expect-error
                        user.githubUrl = profile.html_url;
                    }
                    if (account.provider === 'linkedin') {
                        //@ts-expect-error
                        user.linkedinUrl = profile.publicProfileUrl;
                    }
                    return [2 /*return*/, true];
                });
            });
        },
        jwt: function (_a) {
            var token = _a.token, user = _a.user, account = _a.account;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    console.log("JWT callback invoked");
                    console.log("Initial token:", token);
                    if (user) {
                        token.userId = user.id;
                        // Add provider-specific URLs if available
                        if (user.githubUrl) {
                            token.githubUrl = user.githubUrl;
                        }
                        if (user.linkedinUrl) {
                            token.linkedinUrl = user.linkedinUrl;
                        }
                    }
                    return [2 /*return*/, token];
                });
            });
        },
        session: function (_a) {
            var session = _a.session, token = _a.token;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    console.log("Session callback invoked");
                    console.log("Token in session callback:", token);
                    if (token && session.user) {
                        session.user.id = token.userId;
                        // Add provider URLs to session if available
                        if (token.githubUrl) {
                            //@ts-expect-error
                            session.user.githubUrl = token.githubUrl;
                        }
                        if (token.linkedinUrl) {
                            //@ts-expect-error
                            session.user.linkedinUrl = token.linkedinUrl;
                        }
                    }
                    return [2 /*return*/, session];
                });
            });
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
        newUser: '/dashboard'
    },
    debug: process.env.NODE_ENV === 'development',
});
export { handler as GET, handler as POST };
