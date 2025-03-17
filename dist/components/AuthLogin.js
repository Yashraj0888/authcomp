import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";
export var AuthLogin = function (_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.callbackUrl, callbackUrl = _c === void 0 ? "/" : _c, _d = _a.title, title = _d === void 0 ? "Welcome back" : _d, _e = _a.subtitle, subtitle = _e === void 0 ? "Continue with your preferred login method" : _e, _f = _a.showGoogle, showGoogle = _f === void 0 ? true : _f, _g = _a.showGithub, showGithub = _g === void 0 ? true : _g, _h = _a.showLinkedin, showLinkedin = _h === void 0 ? true : _h, _j = _a.buttonClassName, buttonClassName = _j === void 0 ? "" : _j, _k = _a.containerClassName, containerClassName = _k === void 0 ? "" : _k, _l = _a.termsUrl, termsUrl = _l === void 0 ? "#" : _l, _m = _a.privacyUrl, privacyUrl = _m === void 0 ? "#" : _m;
    var _o = useState(''), error = _o[0], setError = _o[1];
    var handleSocialSignIn = function (provider) {
        setError('');
        signIn(provider, { callbackUrl: callbackUrl });
    };
    var defaultButtonClass = "flex items-center justify-center gap-3 p-3 w-full border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700";
    var defaultContainerClass = "flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto";
    return (React.createElement("div", { className: "".concat(defaultContainerClass, " ").concat(containerClassName, " ").concat(className) },
        React.createElement("div", { className: "text-center" },
            React.createElement("h2", { className: "text-2xl font-bold text-gray-800" }, title),
            React.createElement("p", { className: "text-gray-500 mt-2" }, subtitle)),
        error && (React.createElement("div", { className: "p-4 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100" }, error)),
        React.createElement("div", { className: "flex flex-col gap-4" },
            showGoogle && (React.createElement("button", { onClick: function () { return handleSocialSignIn("google"); }, className: "".concat(defaultButtonClass, " ").concat(buttonClassName) },
                React.createElement(FcGoogle, { className: "w-5 h-5" }),
                React.createElement("span", null, "Continue with Google"))),
            showGithub && (React.createElement("button", { onClick: function () { return handleSocialSignIn("github"); }, className: "".concat(defaultButtonClass, " ").concat(buttonClassName) },
                React.createElement(FaGithub, { className: "w-5 h-5" }),
                React.createElement("span", null, "Continue with GitHub"))),
            showLinkedin && (React.createElement("button", { onClick: function () { return handleSocialSignIn("linkedin"); }, className: "".concat(defaultButtonClass, " ").concat(buttonClassName) },
                React.createElement(FaLinkedin, { className: "w-5 h-5 text-[#0077b5]" }),
                React.createElement("span", null, "Continue with LinkedIn")))),
        React.createElement("div", { className: "text-center text-sm text-gray-500" },
            "By continuing, you agree to our",
            React.createElement("a", { href: termsUrl, className: "text-blue-600 hover:underline mx-1" }, "Terms of Service"),
            "and",
            React.createElement("a", { href: privacyUrl, className: "text-blue-600 hover:underline mx-1" }, "Privacy Policy"))));
};
