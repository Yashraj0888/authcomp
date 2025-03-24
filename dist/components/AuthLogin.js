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
import React, { useState, useRef } from 'react';
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin, FaLock, FaUser } from "react-icons/fa";
export var AuthLogin = function (_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.redirectUrl, redirectUrl = _c === void 0 ? "/" : _c, _d = _a.title, title = _d === void 0 ? "Welcome to Aganitha" : _d, _e = _a.subtitle, subtitle = _e === void 0 ? "You can sign in using your preferred login method" : _e, _f = _a.showGoogle, showGoogle = _f === void 0 ? true : _f, _g = _a.showGithub, showGithub = _g === void 0 ? true : _g, _h = _a.showLinkedin, showLinkedin = _h === void 0 ? true : _h, _j = _a.showOTP, showOTP = _j === void 0 ? true : _j, _k = _a.showLDAP, showLDAP = _k === void 0 ? true : _k, _l = _a.buttonClassName, buttonClassName = _l === void 0 ? "" : _l, _m = _a.containerClassName, containerClassName = _m === void 0 ? "" : _m, _o = _a.termsUrl, termsUrl = _o === void 0 ? "#" : _o, _p = _a.privacyUrl, privacyUrl = _p === void 0 ? "#" : _p, _q = _a.logoUrl, logoUrl = _q === void 0 ? "https://www.aganitha.ai/wp-content/uploads/2023/07/logo-crop.svg" : _q, _r = _a.logoClassName, logoClassName = _r === void 0 ? "" : _r, _s = _a.ldapDomain, ldapDomain = _s === void 0 ? "" : _s;
    var _t = useState(''), error = _t[0], setError = _t[1];
    var _u = useState(''), success = _u[0], setSuccess = _u[1];
    var _v = useState(null), isHovered = _v[0], setIsHovered = _v[1];
    var _w = useState(''), email = _w[0], setEmail = _w[1];
    var _x = useState(false), otpSent = _x[0], setOtpSent = _x[1];
    var _y = useState(''), otp = _y[0], setOtp = _y[1];
    var _z = useState(''), userId = _z[0], setUserId = _z[1];
    var _0 = useState(false), loading = _0[0], setLoading = _0[1];
    var _1 = useState(null), authMethod = _1[0], setAuthMethod = _1[1];
    var _2 = useState(''), username = _2[0], setUsername = _2[1];
    var _3 = useState(''), password = _3[0], setPassword = _3[1];
    var inputRefs = useRef([]);
    var handleSocialSignIn = function (provider) {
        setError('');
        signIn(provider, { redirectUrl: redirectUrl });
    };
    var handleRequestOTP = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError('');
                    setSuccess('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/auth/request-otp', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: email })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to send OTP');
                    }
                    setUserId(data.userId);
                    setOtpSent(true);
                    setSuccess('OTP sent successfully! Please check your email.');
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    setError(err_1.message || 'Failed to send OTP');
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleVerifyOTP = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError('');
                    setSuccess('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, fetch('/api/auth/verify-otp', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId: userId, otp: otp, email: email }) // Include email for session creation
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        throw new Error(data.error || 'Failed to verify OTP');
                    }
                    // If verification is successful, show success message
                    setSuccess('OTP verified successfully! Redirecting...');
                    return [4 /*yield*/, signIn('verify-otp', {
                            email: email,
                            otp: otp,
                            userId: userId,
                            redirect: false,
                        })];
                case 4:
                    result = _a.sent();
                    if (result === null || result === void 0 ? void 0 : result.error) {
                        throw new Error(result.error);
                    }
                    // Wait for a moment to show the success message
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 5:
                    // Wait for a moment to show the success message
                    _a.sent();
                    // Then redirect
                    window.location.href = redirectUrl;
                    return [3 /*break*/, 8];
                case 6:
                    err_2 = _a.sent();
                    setError(err_2.message || 'Failed to verify OTP');
                    console.error('Error verifying OTP:', err_2);
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleLDAPLogin = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError('');
                    setSuccess('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, signIn('ldap', {
                            username: username,
                            password: password,
                            redirect: false,
                            callbackUrl: redirectUrl || '/dashboard'
                        })];
                case 2:
                    result = _a.sent();
                    if (result === null || result === void 0 ? void 0 : result.error) {
                        throw new Error(result.error);
                    }
                    setSuccess('Login successful! Redirecting...');
                    // Wait for a moment to show the success message
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 3:
                    // Wait for a moment to show the success message
                    _a.sent();
                    // Then redirect
                    if (result === null || result === void 0 ? void 0 : result.url) {
                        window.location.href = result.url;
                    }
                    else {
                        window.location.href = redirectUrl || '/dashboard';
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_3 = _a.sent();
                    setError(err_3.message || 'LDAP authentication failed');
                    console.error('Error during LDAP login:', err_3);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Base styles
    var defaultContainerClass = "\n    flex flex-col gap-8 p-8 bg-gradient-to-br from-white to-gray-50 \n    rounded-3xl shadow-2xl max-w-md mx-auto \n    transform transition-all duration-500 ease-out\n    animate-fadeIn\n  ";
    var defaultButtonClass = "\n    flex items-center justify-center gap-4 p-4 w-full \n    border border-gray-200 rounded-xl \n    bg-white hover:shadow-lg hover:-translate-y-1 \n    transition-all duration-300 ease-in-out \n    font-semibold text-gray-700 text-lg\n    relative overflow-hidden\n  ";
    var defaultLogoClass = "\n    w-22 h-auto mx-auto mb-6 \n    transform transition-transform duration-500 \n    hover:scale-105\n  ";
    // CSS Keyframes as inline styles
    var styles = "\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(20px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n    @keyframes pulse {\n      0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }\n      70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }\n      100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }\n    }\n    .animate-fadeIn {\n      animation: fadeIn 0.8s ease-out forwards;\n    }\n    .animate-pulse {\n      animation: pulse 2s infinite;\n    }\n  ";
    return (React.createElement(React.Fragment, null,
        React.createElement("style", null, styles),
        React.createElement("div", { className: "min-h-screen flex items-center justify-center" },
            React.createElement("div", { className: "".concat(defaultContainerClass, " ").concat(containerClassName, " ").concat(className) },
                React.createElement("img", { src: logoUrl, alt: "Logo", className: "".concat(defaultLogoClass, " ").concat(logoClassName) }),
                React.createElement("div", { className: "text-center transform transition-all duration-500" },
                    React.createElement("h2", { className: "text-3xl font-extrabold text-gray-800 bg-gradient-to-r bg-clip-text" }, title),
                    React.createElement("p", { className: "text-gray-600 mt-3 text-lg font-light animate-fadeIn", style: { animationDelay: '0.2s' } }, subtitle)),
                error && (React.createElement("div", { className: "p-4 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100 animate-fadeIn", style: { animationDelay: '0.3s' } }, error)),
                success && (React.createElement("div", { className: "p-4 text-sm font-medium text-green-600 bg-green-50 rounded-xl border border-green-100 animate-fadeIn", style: { animationDelay: '0.3s' } }, success)),
                (showOTP || showLDAP) && !authMethod && (React.createElement("div", { className: "space-y-4 mb-6" },
                    React.createElement("div", { className: "flex flex-col gap-4" },
                        showOTP && (React.createElement("button", { onClick: function () { return setAuthMethod('otp'); }, className: "w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" }, "Login with Email OTP")),
                        showLDAP && (React.createElement("button", { onClick: function () { return setAuthMethod('ldap'); }, className: "w-full py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" },
                            "Login with LDAP ",
                            ldapDomain ? "(".concat(ldapDomain, ")") : ''))))),
                showOTP && authMethod === 'otp' && (React.createElement("div", { className: "space-y-4 mb-6" }, !otpSent ? (React.createElement("form", { onSubmit: handleRequestOTP },
                    React.createElement("input", { type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: "Enter your email", className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true }),
                    React.createElement("div", { className: "flex gap-4 mt-4" },
                        React.createElement("button", { type: "submit", disabled: loading, className: "flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ".concat(buttonClassName) }, loading ? 'Sending...' : 'Send OTP'),
                        React.createElement("button", { type: "button", onClick: function () { return setAuthMethod(null); }, className: "py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" }, "Back")))) : (React.createElement("div", { className: "space-y-4" },
                    React.createElement("form", { onSubmit: handleVerifyOTP },
                        React.createElement("input", { type: "text", value: otp, onChange: function (e) { return setOtp(e.target.value); }, placeholder: "Enter OTP", className: "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true }),
                        React.createElement("div", { className: "flex gap-4 mt-4" },
                            React.createElement("button", { type: "submit", disabled: loading, className: "flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ".concat(buttonClassName) }, loading ? 'Verifying...' : 'Verify OTP'),
                            React.createElement("button", { type: "button", onClick: function () {
                                    setOtpSent(false);
                                    setOtp('');
                                    setUserId('');
                                    setError('');
                                    setSuccess('');
                                }, className: "flex-1 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ".concat(buttonClassName) }, "Change Email"))))))),
                showLDAP && authMethod === 'ldap' && (React.createElement("div", { className: "space-y-4 mb-6" },
                    React.createElement("form", { onSubmit: handleLDAPLogin },
                        React.createElement("div", { className: "mb-4" },
                            React.createElement("div", { className: "flex items-center border rounded-md overflow-hidden" },
                                React.createElement("div", { className: "px-3 py-2 bg-gray-100" },
                                    React.createElement(FaUser, { className: "text-gray-500" })),
                                React.createElement("input", { type: "text", value: username, onChange: function (e) { return setUsername(e.target.value); }, placeholder: "Username", className: "flex-1 px-4 py-2 focus:outline-none", required: true }))),
                        React.createElement("div", { className: "mb-4" },
                            React.createElement("div", { className: "flex items-center border rounded-md overflow-hidden" },
                                React.createElement("div", { className: "px-3 py-2 bg-gray-100" },
                                    React.createElement(FaLock, { className: "text-gray-500" })),
                                React.createElement("input", { type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, placeholder: "Password", className: "flex-1 px-4 py-2 focus:outline-none", required: true }))),
                        React.createElement("div", { className: "flex gap-4 mt-4" },
                            React.createElement("button", { type: "submit", disabled: loading, className: "flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ".concat(buttonClassName) }, loading ? 'Logging in...' : 'Login'),
                            React.createElement("button", { type: "button", onClick: function () {
                                    setAuthMethod(null);
                                    setUsername('');
                                    setPassword('');
                                    setError('');
                                    setSuccess('');
                                }, className: "py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" }, "Back"))))),
                !authMethod && (React.createElement("div", { className: "flex flex-col gap-5" },
                    showGoogle && (React.createElement("button", { onClick: function () { return handleSocialSignIn("google"); }, onMouseEnter: function () { return setIsHovered("google"); }, onMouseLeave: function () { return setIsHovered(null); }, className: "".concat(defaultButtonClass, " ").concat(buttonClassName, " ").concat(isHovered === "google" ? "animate-pulse" : "") },
                        React.createElement(FcGoogle, { className: "w-6 h-6" }),
                        React.createElement("span", null, "Continue with Google"),
                        React.createElement("div", { className: "absolute inset-0 bg-blue-50 opacity-0 hover:opacity-20 transition-opacity duration-300" }))),
                    showGithub && (React.createElement("button", { onClick: function () { return handleSocialSignIn("github"); }, onMouseEnter: function () { return setIsHovered("github"); }, onMouseLeave: function () { return setIsHovered(null); }, className: "".concat(defaultButtonClass, " ").concat(buttonClassName, " ").concat(isHovered === "github" ? "animate-pulse" : "") },
                        React.createElement(FaGithub, { className: "w-6 h-6 text-gray-800" }),
                        React.createElement("span", null, "Continue with GitHub"),
                        React.createElement("div", { className: "absolute inset-0 bg-gray-50 opacity-0 hover:opacity-20 transition-opacity duration-300" }))),
                    showLinkedin && (React.createElement("button", { onClick: function () { return handleSocialSignIn("linkedin"); }, onMouseEnter: function () { return setIsHovered("linkedin"); }, onMouseLeave: function () { return setIsHovered(null); }, className: "".concat(defaultButtonClass, " ").concat(buttonClassName, " ").concat(isHovered === "linkedin" ? "animate-pulse" : "") },
                        React.createElement(FaLinkedin, { className: "w-6 h-6 text-[#0077b5]" }),
                        React.createElement("span", null, "Continue with LinkedIn"),
                        React.createElement("div", { className: "absolute inset-0 bg-blue-50 opacity-0 hover:opacity-20 transition-opacity duration-300" }))))),
                React.createElement("div", { className: "text-center text-sm text-gray-600 animate-fadeIn", style: { animationDelay: '0.4s' } },
                    "By continuing, you agree to our",
                    React.createElement("a", { href: termsUrl, className: "text-blue-600 hover:underline font-medium mx-1 transition-colors duration-200" }, "Terms of Service"),
                    "and",
                    React.createElement("a", { href: privacyUrl, className: "text-blue-600 hover:underline font-medium mx-1 transition-colors duration-200" }, "Privacy Policy"))))));
};
