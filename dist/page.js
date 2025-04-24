"use client";
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
import { NavBar } from "@aganitha/nav-bar";
import { signOut } from 'next-auth/react';
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronDown, Zap, Mail, Phone, MapPin, Linkedin, Twitter, HomeIcon, InfoIcon, ZapIcon, Contact2Icon, BellDotIcon, } from "lucide-react";
import Link from "next/link";
import React from "react";
var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, signOut({ callbackUrl: '/logout' })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Hardcoded nav config data
var navConfigData = {
    appName: "Aganitha",
    logoUrl: "https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png",
    navigation: [
        { label: "Home", path: "#hero", icon: HomeIcon },
        { label: "About", path: "#about", icon: InfoIcon },
        { label: "Features", path: "#features", icon: ZapIcon },
        { label: "Contact", path: "#contact", icon: Contact2Icon },
        { id: "notification", path: "/login", icon: BellDotIcon }
    ],
};
// Utility function to simulate getNavConfig
var getNavConfig = function (data) {
    return {
        appName: data.appName,
        logoUrl: data.logoUrl,
        navigation: data.navigation,
    };
};
// Custom Button Component
var Button = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? "primary" : _b, _c = _a.className, className = _c === void 0 ? "" : _c, onClick = _a.onClick;
    return (React.createElement("button", { onClick: onClick, className: "\n        px-6 py-3 rounded-full font-medium transition-all duration-500 inline-flex items-center justify-center text-sm relative overflow-hidden group cursor-pointer\n        ".concat(variant === "primary"
            ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg hover:bg-[var(--primary)]/90"
            : "", "\n        ").concat(variant === "outline"
            ? "border border-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/70"
            : "", "\n        ").concat(className, "\n      "), style: {
            animation: "button-pulse 2s infinite ease-in-out",
        } },
        React.createElement("span", { className: "relative z-10 flex items-center" }, children),
        React.createElement("style", { jsx: true }, "\n        @keyframes button-pulse {\n          0% {\n            transform: scale(1);\n            box-shadow: 0 0 10px var(--ring);\n          }\n          50% {\n            transform: scale(1.05);\n            box-shadow: 0 0 20px var(--ring);\n          }\n          100% {\n            transform: scale(1);\n            box-shadow: 0 0 10px var(--ring);\n          }\n        }\n      ")));
};
// Navigation Dots Component
var NavDots = function (_a) {
    var onNavigate = _a.onNavigate;
    var _b = useState(false), isMounted = _b[0], setIsMounted = _b[1];
    var sections = [
        { id: "hero", label: "Home" },
        { id: "about", label: "About" },
        { id: "themes", label: "Themes" },
        { id: "features", label: "Features" },
        { id: "contact", label: "Contact" },
    ];
    useEffect(function () {
        setIsMounted(true);
    }, []);
    if (!isMounted)
        return null;
    var handleThemesClick = function (path) {
        if (path === "#themes") {
            // Special handling for themes - scroll to the theming section in about
            var themingSection = document.querySelector("#about .theming-section");
            if (themingSection) {
                themingSection.scrollIntoView({ behavior: "smooth" });
            }
            else {
                // Fallback to about section if theming section not found
                onNavigate("#about");
            }
        }
        else {
            onNavigate(path);
        }
    };
    return (React.createElement("div", { className: "fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4" }, sections.map(function (section) { return (React.createElement("div", { key: section.id, className: "group relative" },
        React.createElement("button", { onClick: function () { return handleThemesClick("#".concat(section.id)); }, className: "w-3 h-3 bg-[var(--primary)]/50 rounded-full hover:bg-[var(--primary)] transition-all duration-300" }),
        React.createElement("span", { className: "absolute right-6 top-1/2 -translate-y-1/2 bg-[var(--card)] text-[var(--foreground)] px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" }, section.id === "themes"
            ? "".concat(section.label, " - Customize at tweakcn.com")
            : section.label))); })));
};
// Solutions AI Animation Component
var SolutionsAIAnimation = function (_a) {
    var inView = _a.inView;
    return (React.createElement("div", { className: "relative h-[400px] rounded-2xl overflow-hidden ".concat(inView ? "animate-slide-up-scale" : ""), style: { animationDelay: "0.3s" } },
        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 flex items-center justify-center" },
            React.createElement("div", { className: "relative w-full h-full flex items-center justify-center" },
                React.createElement("div", { className: "absolute inset-0 flex items-center justify-center overflow-hidden" },
                    React.createElement("div", { className: "w-40 h-40 animate-rotate-y" }, Array.from({ length: 20 }).map(function (_, i) { return (React.createElement("div", { key: i, className: "absolute w-full h-full", style: {
                            transform: "rotateY(".concat(i * 18, "deg) translateZ(60px)"),
                            transformStyle: "preserve-3d",
                        } },
                        React.createElement("div", { className: "absolute left-1/2 top-0 w-1 h-full bg-[var(--primary)] origin-center -translate-x-1/2 animate-scale-pulse", style: { animationDelay: "".concat((i * 0.1) % 2, "s") } }))); }))),
                React.createElement("div", { className: "absolute w-72 h-72 rounded-full border-2 border-dashed border-[var(--primary)]/30 animate-spin-slow" }),
                React.createElement("div", { className: "absolute w-56 h-56 rounded-full border-2 border-dashed border-[var(--secondary)]/40 animate-spin-reverse" }),
                React.createElement("div", { className: "relative z-10 text-center p-8 backdrop-blur-sm bg-[var(--card)]/10 rounded-xl" },
                    React.createElement("div", { className: "animate-fade-in", style: { animationDelay: "0.5s" } },
                        React.createElement("div", { className: "flex items-center justify-center mb-4" },
                            React.createElement("div", { className: "relative animate-pulse-scale" },
                                React.createElement(Zap, { className: "h-10 w-10 text-[var(--primary)]" }),
                                React.createElement("div", { className: "absolute inset-0 rounded-full animate-pulse-shadow" }))),
                        React.createElement("h3", { className: "text-2xl font-bold mb-4 text-[var(--foreground)]" }, "Powered by AuthComp"),
                        React.createElement("p", { className: "text-[var(--muted-foreground)]" }, "Our platform provides a seamless authentication solution for Next.js applications."),
                        React.createElement("div", { className: "mt-4 flex justify-center space-x-1" }, Array.from({ length: 10 }).map(function (_, i) { return (React.createElement("div", { suppressHydrationWarning: true, key: i, className: "w-1 bg-[var(--primary)] animate-height-change", style: {
                                height: "".concat(Math.random() * 20 + 5, "px"),
                                animationDelay: "".concat(i * 0.1, "s"),
                            } })); })))))),
        React.createElement("style", { jsx: true }, "\n        @keyframes slide-up-scale {\n          0% {\n            opacity: 0;\n            transform: translateY(50px) scale(0.9);\n          }\n          100% {\n            opacity: 1;\n            transform: translateY(0) scale(1);\n          }\n        }\n        .animate-slide-up-scale {\n          animation: slide-up-scale 0.8s ease-out forwards;\n        }\n        @keyframes rotate-y {\n          0% {\n            transform: rotateY(0deg);\n          }\n          100% {\n            transform: rotateY(360deg);\n          }\n        }\n        .animate-rotate-y {\n          animation: rotate-y 20s infinite linear;\n        }\n        @keyframes scale-pulse {\n          0%,\n          100% {\n            transform: scaleY(1);\n          }\n          50% {\n            transform: scaleY(0.8);\n          }\n        }\n        .animate-scale-pulse {\n          animation: scale-pulse 2s infinite ease-in-out;\n        }\n        @keyframes spin-slow {\n          0% {\n            transform: rotate(0deg);\n          }\n          100% {\n            transform: rotate(360deg);\n          }\n        }\n        .animate-spin-slow {\n          animation: spin-slow 15s infinite linear;\n        }\n        @keyframes spin-reverse {\n          0% {\n            transform: rotate(0deg);\n          }\n          100% {\n            transform: rotate(-360deg);\n          }\n        }\n        .animate-spin-reverse {\n          animation: spin-reverse 12s infinite linear;\n        }\n        @keyframes pulse-scale {\n          0%,\n          100% {\n            transform: scale(1);\n          }\n          50% {\n            transform: scale(1.2);\n          }\n        }\n        .animate-pulse-scale {\n          animation: pulse-scale 2s infinite ease-in-out;\n        }\n        @keyframes pulse-shadow {\n          0%,\n          100% {\n            box-shadow: 0 0 10px var(--ring);\n          }\n          50% {\n            box-shadow: 0 0 20px var(--ring);\n          }\n        }\n        .animate-pulse-shadow {\n          animation: pulse-shadow 2s infinite ease-in-out;\n        }\n        @keyframes height-change {\n          0%,\n          100% {\n            height: 5px;\n          }\n          50% {\n            height: 25px;\n          }\n        }\n        .animate-height-change {\n          animation: height-change 1.5s infinite ease-in-out;\n        }\n        @keyframes fade-in {\n          0% {\n            opacity: 0;\n          }\n          100% {\n            opacity: 1;\n          }\n        }\n        .animate-fade-in {\n          animation: fade-in 0.5s ease-out forwards;\n        }\n      ")));
};
export default function Home() {
    var heroRef = useRef(null);
    var aboutRef = useRef(null);
    var featuresRef = useRef(null);
    var contactRef = useRef(null);
    var footerRef = useRef(null);
    var _a = useState(false), heroInView = _a[0], setHeroInView = _a[1];
    var _b = useState(false), aboutInView = _b[0], setAboutInView = _b[1];
    var _c = useState(false), featuresInView = _c[0], setFeaturesInView = _c[1];
    var _d = useState(false), contactInView = _d[0], setContactInView = _d[1];
    var _e = useState(false), footerInView = _e[0], setFooterInView = _e[1];
    useEffect(function () {
        var sectionIds = ["hero", "about", "features", "contact", "footer"];
        var observers = sectionIds
            .map(function (id) {
            var element = document.getElementById(id);
            if (!element)
                return null;
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        switch (id) {
                            case "hero":
                                setHeroInView(true);
                                break;
                            case "about":
                                setAboutInView(true);
                                break;
                            case "features":
                                setFeaturesInView(true);
                                break;
                            case "contact":
                                setContactInView(true);
                                break;
                            case "footer":
                                setFooterInView(true);
                                break;
                        }
                    }
                });
            }, { threshold: 0.01 });
            observer.observe(element);
            return { id: id, observer: observer, element: element };
        })
            .filter(Boolean);
        return function () {
            observers.forEach(function (item) {
                if (item && item.observer && item.element)
                    item.observer.unobserve(item.element);
            });
        };
    }, []);
    var handleNavigate = function (path) {
        var sectionId = path.replace("#", "");
        var sectionRefs = {
            hero: heroRef,
            about: aboutRef,
            features: featuresRef,
            contact: contactRef,
            footer: footerRef,
        };
        var ref = sectionRefs[sectionId];
        if (ref === null || ref === void 0 ? void 0 : ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    var handleGetStarted = function () {
        var _a;
        (_a = aboutRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    return (React.createElement("div", { className: "min-h-screen overflow-x-hidden" },
        React.createElement(NavDots, { onNavigate: handleNavigate }),
        React.createElement("div", { className: "absolute inset-0 pointer-events-none" },
            React.createElement("div", { className: "absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--primary)]/20 rounded-full blur-3xl -z-10 animate-float-blob opacity-30" }),
            React.createElement("div", { className: "absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--secondary)]/20 rounded-full blur-3xl -z-10 animate-float-blob opacity-40", style: { animationDelay: "1s" } }),
            React.createElement("div", { className: "absolute top-1/2 right-1/3 w-40 h-40 bg-[var(--primary)]/20 rounded-full blur-3xl -z-10 animate-float-blob opacity-30", style: { animationDelay: "2s" } })),
        React.createElement(NavBar, { logoUrl: navConfigData.logoUrl, navItems: navConfigData.navigation, button: {
                label: "Login",
                onClick: handleLogout
            }, onNavigate: handleNavigate, appName: "" }),
        React.createElement("section", { id: "hero", ref: heroRef, className: "min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden" },
            React.createElement("div", { className: "container mx-auto px-4 z-10" },
                React.createElement("div", { className: "text-center ".concat(heroInView ? "animate-hero-slide-in" : "") },
                    React.createElement("h1", { className: "text-4xl md:text-6xl font-bold mb-6 leading-tight" },
                        "The Starter Template of",
                        " ",
                        React.createElement("span", { className: "text-[var(--primary)] animate-text-glow" }, "Aganitha"),
                        ", Enriching Fullstack via Typesafe Next.js"),
                    React.createElement("p", { className: "text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto ".concat(heroInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.5s" } }, "A robust foundation for building modern web applications with Next.js and TypeScript."),
                    React.createElement("div", { className: "mt-8 flex flex-wrap justify-center gap-4 ".concat(heroInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.8s" } },
                        React.createElement(Button, { variant: "primary", className: "group", onClick: handleGetStarted },
                            "Get Started",
                            React.createElement(ArrowRight, { className: "ml-2 h-4 w-4" })),
                        React.createElement(Link, { href: "https://github.com/RohanB-acog/Aganitha-Starter-app/blob/main/README.md", target: "_blank", rel: "noopener noreferrer" },
                            React.createElement(Button, { variant: "outline" }, "Learn More"))))),
            React.createElement("div", { className: "absolute bottom-10 left-1/2 -translate-x-1/2" },
                React.createElement(ChevronDown, { className: "h-6 w-6 text-[var(--primary)] animate-scroll-bounce" })),
            React.createElement("style", { jsx: true }, "\n          @keyframes hero-slide-in {\n            0% {\n              opacity: 0;\n              transform: translateY(50px) scale(0.95);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0) scale(1);\n            }\n          }\n          .animate-hero-slide-in {\n            animation: hero-slide-in 1s ease-out forwards;\n          }\n          @keyframes text-glow {\n            0%,\n            100% {\n              text-shadow: 0 0 5px var(--ring);\n            }\n            50% {\n              text-shadow: 0 0 15px var(--ring);\n            }\n          }\n          .animate-text-glow {\n            animation: text-glow 2s infinite ease-in-out;\n          }\n          @keyframes fade-in-delay {\n            0% {\n              opacity: 0;\n              transform: translateY(20px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          .animate-fade-in-delay {\n            animation: fade-in-delay 0.8s ease-out forwards;\n          }\n          @keyframes float-blob {\n            0%,\n            100% {\n              transform: translateY(0) scale(1);\n              opacity: 0.3;\n            }\n            50% {\n              transform: translateY(-20px) scale(1.1);\n              opacity: 0.5;\n            }\n          }\n          .animate-float-blob {\n            animation: float-blob 6s infinite ease-in-out;\n          }\n        ")),
        React.createElement("section", { id: "about", ref: aboutRef, className: "py-20 px-4 md:px-8 bg-gradient-to-b from-[var(--background)] to-[var(--muted)]" },
            React.createElement("div", { className: "max-w-4xl mx-auto" },
                React.createElement("div", { className: "text-center mb-16" },
                    React.createElement("div", { className: "inline-block mb-4 px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium ".concat(aboutInView ? "animate-badge-pop" : "") }, "About AuthComp"),
                    React.createElement("h2", { className: "text-3xl md:text-4xl font-bold mb-4 ".concat(aboutInView ? "animate-section-reveal" : "") }, "Next.js Authentication Component"),
                    React.createElement("p", { className: "text-lg text-[var(--muted-foreground)] ".concat(aboutInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.2s" } }, "A comprehensive authentication solution for Next.js applications.")),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-up" : "") },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Introduction"),
                    React.createElement("p", { className: "text-[var(--muted-foreground)] text-center max-w-2xl mx-auto" }, "A comprehensive authentication solution for Next.js applications that provides customizable authentication UI with social login options, email OTP authentication, and middleware for protected routes.")),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-up" : ""), style: { animationDelay: "0.1s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Aganitha Nav Bar"),
                    React.createElement("p", { className: "text-[var(--muted-foreground)] text-center max-w-2xl mx-auto mb-4" }, "A lightweight, customizable navigation bar component for Next.js applications, built with TypeScript and Tailwind CSS. It provides a modern, responsive design with dropdown support, while enforcing a consistent style and allowing color theming via CSS variables."),
                    React.createElement("div", { className: "flex justify-center gap-4 mb-4" },
                        React.createElement("span", { className: "inline-block px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium" }, "npm version"),
                        React.createElement("span", { className: "inline-block px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium" }, "license")),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "Features"),
                    React.createElement("ul", { className: "list-disc pl-6 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null, "Responsive navigation bar with mobile menu support"),
                        React.createElement("li", null, "Dropdown menu support for nested navigation items"),
                        React.createElement("li", null, "Fixed styling to ensure a consistent look across projects"),
                        React.createElement("li", null, "Color theming via CSS variables (background, foreground, primary, primary-foreground)"),
                        React.createElement("li", null, "TypeScript support for type-safe props"),
                        React.createElement("li", null, "Scroll-aware behavior (hides on scroll down, shows on scroll up)")),
                    React.createElement("h4", { className: "text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center" }, "Installation"),
                    React.createElement("p", { className: "text-[var(--muted-foreground)] text-center mb-2" }, "Install the package via npm:"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto" },
                        React.createElement("code", null, "npm install aganitha-nav-bar")),
                    React.createElement("p", { className: "text-[var(--muted-foreground)] text-center mt-2" },
                        "Ensure you have the following dependencies installed in your Next.js project:",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "next"),
                        ",",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "react"),
                        ", and",
                        " ",
                        React.createElement("code", { className: "bg-[var(---muted)] px-1 rounded" }, "lucide-react"),
                        " ",
                        "(for icons)."),
                    React.createElement("h4", { className: "text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center" }, "Usage"),
                    React.createElement("p", { className: "text-[var(--muted-foreground)] text-center mb-2" }, "Import and use the NavBar component in your Next.js page:"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-2xl mx-auto" },
                        React.createElement("code", null, "\"use client\";\n\nimport { NavBar } from 'aganitha-nav-bar';\nimport Link from 'next/link';\nimport { ArrowRight } from 'lucide-react';\n\n// Navigation configuration\nconst navItems = [\n  { label: \"Home\", path: \"#hero\" },\n  {\n    label: \"About\",\n    path: \"#about\",\n    dropdown: [\n      { label: \"Our Team\", path: \"#team\" },\n      { label: \"Our Mission\", path: \"#mission\" },\n    ],\n  },\n  { label: \"Features\", path: \"#features\" },\n  { label: \"Contact\", path: \"#contact\" },\n];\n\nexport default function Home() {\n  const handleNavigate = (path: string) => {\n    const section = document.querySelector(path);\n    section?.scrollIntoView({ behavior: \"smooth\" });\n  };\n\n  return (\n    <NavBar\n      logoUrl=\"https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png\"\n      appName=\"Aganitha\"\n      navItems={navItems}\n      onNavigate={handleNavigate}\n      button={{ label: \"Login\", href: \"/login\" }}\n    />\n  );\n}")),
                    React.createElement("h4", { className: "text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center" }, "Props"),
                    React.createElement("div", { className: "overflow-x-auto max-w-4xl mx-auto" },
                        React.createElement("table", { className: "w-full text-left border-collapse" },
                            React.createElement("thead", null,
                                React.createElement("tr", { className: "bg-[var(--primary)]/10" },
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Prop"),
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Type"),
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Description"),
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Default"))),
                            React.createElement("tbody", null, [
                                {
                                    prop: "appName",
                                    type: "string",
                                    desc: "The name of the application to display next to the logo.",
                                    default: "undefined",
                                },
                                {
                                    prop: "logoUrl",
                                    type: "string",
                                    desc: "URL of the logo image to display. Supports both external and local URLs.",
                                    default: "undefined",
                                },
                                {
                                    prop: "navItems",
                                    type: "NavItem[]",
                                    desc: "Array of navigation items. Supports dropdowns.",
                                    default: "[]",
                                },
                                {
                                    prop: "onNavigate",
                                    type: "(path: string) => void",
                                    desc: "Callback function triggered on navigation item click.",
                                    default: "undefined",
                                },
                                {
                                    prop: "button",
                                    type: "React.ReactNode",
                                    desc: "Custom button to display on the right side of the nav bar.",
                                    default: "undefined",
                                },
                            ].map(function (row, index) { return (React.createElement("tr", { key: index, className: "border-b border-[var(--border)] ".concat(aboutInView ? "animate-table-row" : ""), style: { animationDelay: "".concat(0.05 * index + 0.1, "s") } },
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.prop),
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.type),
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.desc),
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.default))); })))),
                    React.createElement("h4", { className: "text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center" }, "NavItem Type"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto" },
                        React.createElement("code", null, "interface NavItem {\n  label: string;\n  path?: string;\n  dropdown?: DropdownItem[];\n  type?: string;\n  hidden?: boolean;\n}\n\ninterface DropdownItem {\n  label: string;\n  path: string;\n}")),
                    React.createElement("h4", { id: "theming-section", className: "text-xl font-medium mt-6 mb-2 text-[var(--foreground)] text-center theming-section" }, "Theming"),
                    React.createElement("p", { className: "text-[var(--muted-foreground)] text-center mb-2" },
                        "To customize the colors, visit",
                        " ",
                        React.createElement("a", { href: "https://tweakcn.com/editor/theme", target: "_blank", rel: "noopener noreferrer", className: "text-[var(--primary)] hover:underline" }, "tweakcn.com/editor/theme"),
                        " ",
                        "to generate your theme template. Copy the generated CSS code and paste it into your",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "globals.css"),
                        " ",
                        "file to apply it to your project.")),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-left" : ""), style: { animationDelay: "0.2s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Features"),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "Authentication Component"),
                    React.createElement("ul", { className: "list-disc pl-6 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null, "\uD83D\uDD10 Built-in support for Google, GitHub, and LinkedIn authentication"),
                        React.createElement("li", null, "\uD83D\uDCE7 Email OTP authentication for passwordless login"),
                        React.createElement("li", null, "\uD83C\uDFA8 Fully customizable with Tailwind CSS"),
                        React.createElement("li", null, "\uD83D\uDE80 CLI tool for automatic setup and configuration"),
                        React.createElement("li", null, "\uD83D\uDCE6 Easy to install and integrate"))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-right" : ""), style: { animationDelay: "0.3s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Quick Start Guide"),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "Option 1: Create a New Next.js Project"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" },
                        "Running",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "npx authcomp"),
                        " ",
                        "without an existing Next.js project will:"),
                    React.createElement("ol", { className: "list-decimal pl-6 mb-4 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null, "Create a new Next.js application"),
                        React.createElement("li", null, "Install and configure authentication components"),
                        React.createElement("li", null, "Set up necessary files and environment variables")),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto" },
                        React.createElement("code", null, "npx authcomp")),
                    React.createElement("p", { className: "mt-2 text-[var(--muted-foreground)] text-center" }, "The setup wizard will guide you through the installation process."),
                    React.createElement("h4", { className: "text-xl font-medium mt-4 mb-2 text-[var(--foreground)] text-center" }, "Option 2: Add to Existing Project"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto" },
                        React.createElement("code", null, "# Navigate to your project\ncd your-nextjs-project\n\n# Run the setup wizard\nnpx authcomp"))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-scale-in" : ""), style: { animationDelay: "0.4s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "What the Setup Wizard Does"),
                    React.createElement("ol", { className: "list-decimal pl-6 text-[var(--muted-foreground)] max-w-2xl mx-auto" },
                        React.createElement("li", null,
                            React.createElement("strong", null, "Creates Authentication Routes"),
                            ":",
                            React.createElement("ul", { className: "list-disc pl-6" },
                                React.createElement("li", null,
                                    "Sets up NextAuth route at",
                                    " ",
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "app/api/auth/[...nextauth]/route.ts")),
                                React.createElement("li", null,
                                    "Creates OTP authentication endpoints:",
                                    React.createElement("ul", { className: "list-disc pl-6" },
                                        React.createElement("li", null,
                                            React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "/api/auth/request-otp")),
                                        React.createElement("li", null,
                                            React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "/api/auth/verify-otp")))))),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Adds Middleware"),
                            ":",
                            React.createElement("ul", { className: "list-disc pl-6" },
                                React.createElement("li", null,
                                    "Creates a",
                                    " ",
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "middleware.ts"),
                                    " ",
                                    "file for route protection"),
                                React.createElement("li", null, "Configures protected routes and authentication redirects"))),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Sets Up Utility Files"),
                            ":",
                            React.createElement("ul", { className: "list-disc pl-6" },
                                React.createElement("li", null,
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "utils/auth.ts"),
                                    " ",
                                    "- Authentication helper functions"),
                                React.createElement("li", null,
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "utils/db.ts"),
                                    " ",
                                    "- Database utilities for OTP storage"),
                                React.createElement("li", null,
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "utils/email.ts"),
                                    " ",
                                    "- Email sending functionality for OTP"))),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Configures Environment Variables"),
                            ":",
                            React.createElement("ul", { className: "list-disc pl-6" },
                                React.createElement("li", null,
                                    "Creates or updates",
                                    " ",
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, ".env"),
                                    " ",
                                    "file with necessary configuration"))),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Handles File Conflicts"),
                            ":",
                            React.createElement("ul", { className: "list-disc pl-6" },
                                React.createElement("li", null,
                                    "If files already exist, they are renamed to",
                                    " ",
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "{filename}",
                                        ".old.", "{extension}")),
                                React.createElement("li", null, "Preserves your existing code while adding new functionality"))))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-up" : ""), style: { animationDelay: "0.5s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Authentication Methods"),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "Social Authentication"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" }, "AuthComp supports the following social authentication providers:"),
                    React.createElement("ul", { className: "list-disc pl-6 mb-4 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null,
                            React.createElement("strong", null, "Google"),
                            " - OAuth 2.0 authentication with Google accounts"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "GitHub"),
                            " - OAuth authentication with GitHub accounts"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "LinkedIn"),
                            " - OAuth authentication with LinkedIn accounts")),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "Email OTP Authentication"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" }, "Passwordless authentication using one-time passwords sent via email:"),
                    React.createElement("ol", { className: "list-decimal pl-6 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null, "User enters their email address"),
                        React.createElement("li", null, "A one-time code is sent to their email"),
                        React.createElement("li", null, "User enters the code to authenticate"),
                        React.createElement("li", null, "A session is created upon successful verification"))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-up-scale" : ""), style: { animationDelay: "0.6s" } },
                    React.createElement(SolutionsAIAnimation, { inView: aboutInView })),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-left" : ""), style: { animationDelay: "0.7s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Using the AuthLogin Component"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-2xl mx-auto" },
                        React.createElement("code", null, "\"use client\"\n\nimport { AuthLogin } from 'authcomp';\n\nexport default function LoginPage() {\n  return (\n    <AuthLogin\n      redirectUrl=\"/dashboard\"\n      logoUrl=\"/your-logo.svg\"\n      title=\"Welcome Back\"\n      subtitle=\"Sign in to continue\"\n      showGoogle={true}\n      showGithub={true}\n      showLinkedin={true}\n      showOTP={true}\n      showLDAP={true}\n      buttonClassName=\"custom-button-class\"\n      containerClassName=\"custom-container-class\"\n    />\n  );\n}"))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-right" : ""), style: { animationDelay: "0.8s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "AuthLogin Component Props"),
                    React.createElement("div", { className: "overflow-x-auto max-w-4xl mx-auto" },
                        React.createElement("table", { className: "w-full text-left border-collapse" },
                            React.createElement("thead", null,
                                React.createElement("tr", { className: "bg-[var(--primary)]/10" },
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Prop"),
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Type"),
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Default"),
                                    React.createElement("th", { className: "p-3 font-semibold text-[var(--foreground)]" }, "Description"))),
                            React.createElement("tbody", null, [
                                {
                                    prop: "className",
                                    type: "string",
                                    default: '""',
                                    desc: "Additional CSS classes for the root element",
                                },
                                {
                                    prop: "redirectUrl",
                                    type: "string",
                                    default: '"/"',
                                    desc: "URL to redirect after successful login",
                                },
                                {
                                    prop: "title",
                                    type: "string",
                                    default: '"Welcome to Aganitha"',
                                    desc: "Main title text",
                                },
                                {
                                    prop: "subtitle",
                                    type: "string",
                                    default: '"You can sign in using your preferred login method"',
                                    desc: "Subtitle text",
                                },
                                {
                                    prop: "showGoogle",
                                    type: "boolean",
                                    default: "true",
                                    desc: "Toggle Google login button",
                                },
                                {
                                    prop: "showGithub",
                                    type: "boolean",
                                    default: "true",
                                    desc: "Toggle GitHub login button",
                                },
                                {
                                    prop: "showLinkedin",
                                    type: "boolean",
                                    default: "true",
                                    desc: "Toggle LinkedIn login button",
                                },
                                {
                                    prop: "showOTP",
                                    type: "boolean",
                                    default: "true",
                                    desc: "Toggle Email OTP authentication",
                                },
                                {
                                    prop: "showLDAP",
                                    type: "boolean",
                                    default: "true",
                                    desc: "Toggle Aganitha's LDAP authentication",
                                },
                                {
                                    prop: "buttonClassName",
                                    type: "string",
                                    default: '""',
                                    desc: "Additional CSS classes for buttons",
                                },
                                {
                                    prop: "containerClassName",
                                    type: "string",
                                    default: '""',
                                    desc: "Additional CSS classes for container",
                                },
                                {
                                    prop: "termsUrl",
                                    type: "string",
                                    default: '"#"',
                                    desc: "URL to terms of service",
                                },
                                {
                                    prop: "privacyUrl",
                                    type: "string",
                                    default: '"#"',
                                    desc: "URL to privacy policy",
                                },
                                {
                                    prop: "logoUrl",
                                    type: "string",
                                    default: '"https://www.aganitha.ai/wp-content/uploads/2023/07/logo-crop.svg"',
                                    desc: "URL to your logo",
                                },
                                {
                                    prop: "logoClassName",
                                    type: "string",
                                    default: '""',
                                    desc: "Additional CSS classes for logo",
                                },
                            ].map(function (row, index) { return (React.createElement("tr", { key: index, className: "border-b border-[var(--border)] ".concat(aboutInView ? "animate-table-row" : ""), style: { animationDelay: "".concat(0.05 * index, "s") } },
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.prop),
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.type),
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.default),
                                React.createElement("td", { className: "p-3 text-[var(--muted-foreground)]" }, row.desc))); }))))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-scale-in" : ""), style: { animationDelay: "0.9s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Route Protection with Middleware"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" }, "AuthComp includes a middleware configuration that protects routes based on authentication status:"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto" },
                        React.createElement("code", null, "// middleware.ts (automatically created by setup wizard)\nexport const config = {\n  matcher: ['/', '/dashboard/:path*', '/profile/:path*']\n};")),
                    React.createElement("p", { className: "mt-2 text-[var(--muted-foreground)] text-center" },
                        "You can customize the protected routes by modifying the",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "matcher"),
                        " ",
                        "array.")),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-up" : ""), style: { animationDelay: "1s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Environment Configuration"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" },
                        "Update your",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, ".env"),
                        " file with your OAuth credentials:"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-2xl mx-auto" },
                        React.createElement("code", null, "# Authentication\nNEXTAUTH_URL=http://localhost:3000\nNEXTAUTH_SECRET=your-secret-key-here\n\n# Google OAuth\nGOOGLE_ID=your-google-client-id\nGOOGLE_SECRET=your-google-client-secret\n\n# GitHub OAuth\nGITHUB_ID=your-github-client-id\nGITHUB_SECRET=your-github-client-secret\n\n# LinkedIn OAuth\nLINKEDIN_CLIENT_ID=your-linkedin-client-id\nLINKEDIN_CLIENT_SECRET=your-linkedin-client-secret\n\n# Email (for OTP)\nEMAIL_SERVER=smtp://username:password@smtp.example.com:587\nEMAIL_FROM=noreply@example.com\n\n# LDAP \nLDAP_URI=ldap://ldap.example.com\nLDAP_USER_DN=ou=people=,dc=example,dc=com"))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-left" : ""), style: { animationDelay: "1.1s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Advanced Usage"),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "Custom Email Templates"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" },
                        "You can customize the OTP email template by modifying the",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "utils/email.ts"),
                        " ",
                        "file:"),
                    React.createElement("pre", { className: "bg-[var(--muted)] p-4 rounded-md text-[var(--foreground)] overflow-x-auto max-w-md mx-auto" },
                        React.createElement("code", null, "// Customize the email content and styling\nconst html = `\n  <div style=\"...\">\n    <h1>Your Authentication Code</h1>\n    <p>Your one-time password is: <strong>${otp}</strong></p>\n    <p>This code will expire in 10 minutes.</p>\n  </div>\n`;")),
                    React.createElement("h4", { className: "text-xl font-medium mt-4 mb-2 text-[var(--foreground)] text-center" }, "Database Integration"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" },
                        "By default, AuthComp uses a SQLite database for OTP storage. You can customize the database configuration in",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "utils/db.ts"),
                        "."),
                    React.createElement("h4", { className: "text-xl font-medium mt-4 mb-2 text-[var(--foreground)] text-center" }, "Styling Customization"),
                    React.createElement("ul", { className: "list-disc pl-6 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null,
                            "Use the",
                            " ",
                            React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "className"),
                            ",",
                            " ",
                            React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "buttonClassName"),
                            ", and",
                            " ",
                            React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "containerClassName"),
                            " ",
                            "props to add custom styles"),
                        React.createElement("li", null, "The component uses a modern, responsive design that adapts to different screen sizes"),
                        React.createElement("li", null, "Animation effects are included for a polished user experience"))),
                React.createElement("div", { className: "mb-16 ".concat(aboutInView ? "animate-slide-right" : ""), style: { animationDelay: "1.2s" } },
                    React.createElement("h3", { className: "text-2xl font-semibold mb-4 text-[var(--foreground)] text-center" }, "Troubleshooting"),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "File Conflicts"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" },
                        "If you encounter file conflicts during setup, AuthComp will rename existing files to",
                        " ",
                        React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "{filename}",
                            ".old.", "{extension}"),
                        " ",
                        "and create new ones. You can:"),
                    React.createElement("ol", { className: "list-decimal pl-6 mb-4 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null, "Compare the old and new files to merge your changes"),
                        React.createElement("li", null,
                            "Delete the",
                            " ",
                            React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, ".old"),
                            " ",
                            "files once you've verified everything works")),
                    React.createElement("h4", { className: "text-xl font-medium mb-2 text-[var(--foreground)] text-center" }, "OAuth Configuration"),
                    React.createElement("p", { className: "mb-2 text-[var(--muted-foreground)] text-center" }, "For social login to work correctly:"),
                    React.createElement("ol", { className: "list-decimal pl-6 text-[var(--muted-foreground)] max-w-md mx-auto" },
                        React.createElement("li", null, "Create OAuth applications with the respective providers"),
                        React.createElement("li", null,
                            "Configure the correct redirect URIs:",
                            React.createElement("ul", { className: "list-disc pl-6" },
                                React.createElement("li", null,
                                    "Google:",
                                    " ",
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "https://your-domain.com/api/auth/callback/google")),
                                React.createElement("li", null,
                                    "GitHub:",
                                    " ",
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "https://your-domain.com/api/auth/callback/github")),
                                React.createElement("li", null,
                                    "LinkedIn:",
                                    " ",
                                    React.createElement("code", { className: "bg-[var(--muted)] px-1 rounded" }, "https://your-domain.com/api/auth/callback/linkedin"))))))),
            React.createElement("style", { jsx: true }, "\n          @keyframes section-reveal {\n            0% {\n              opacity: 0;\n              transform: scale(0.95);\n            }\n            100% {\n              opacity: 1;\n              transform: scale(1);\n            }\n          }\n          .animate-section-reveal {\n            animation: section-reveal 0.8s ease-out forwards;\n          }\n          @keyframes badge-pop {\n            0% {\n              transform: scale(0);\n              opacity: 0;\n            }\n            70% {\n              transform: scale(1.2);\n              opacity: 1;\n            }\n            100% {\n              transform: scale(1);\n              opacity: 1;\n            }\n          }\n          .animate-badge-pop {\n            animation: badge-pop 0.5s ease-out forwards;\n          }\n          @keyframes slide-up {\n            0% {\n              opacity: 0;\n              transform: translateY(50px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          .animate-slide-up {\n            animation: slide-up 0.8s ease-out forwards;\n          }\n          @keyframes slide-left {\n            0% {\n              opacity: 0;\n              transform: translateX(-50px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateX(0);\n            }\n          }\n          .animate-slide-left {\n            animation: slide-left 0.8s ease-out forwards;\n          }\n          @keyframes slide-right {\n            0% {\n              opacity: 0;\n              transform: translateX(50px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateX(0);\n            }\n          }\n          .animate-slide-right {\n            animation: slide-right 0.8s ease-out forwards;\n          }\n          @keyframes scale-in {\n            0% {\n              opacity: 0;\n              transform: scale(0.9);\n            }\n            100% {\n              opacity: 1;\n              transform: scale(1);\n            }\n          }\n          .animate-scale-in {\n            animation: scale-in 0.8s ease-out forwards;\n          }\n          @keyframes table-row {\n            0% {\n              opacity: 0;\n              transform: translateY(10px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          .animate-table-row {\n            animation: table-row 0.5s ease-out forwards;\n          }\n          @keyframes fade-in-delay {\n            0% {\n              opacity: 0;\n              transform: translateY(20px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          .animate-fade-in-delay {\n            animation: fade-in-delay 0.8s ease-out forwards;\n          }\n          @keyframes slide-up-scale {\n            0% {\n              opacity: 0;\n              transform: translateY(50px) scale(0.9);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0) scale(1);\n            }\n          }\n          .animate-slide-up-scale {\n            animation: slide-up-scale 0.8s ease-out forwards;\n          }\n        ")),
        React.createElement("section", { id: "features", ref: featuresRef, className: "py-20 px-4 md:px-8 bg-[var(--muted)]" },
            React.createElement("div", { className: "max-w-4xl mx-auto" },
                React.createElement("div", { className: "text-center mb-12" },
                    React.createElement("div", { className: "inline-block mb-4 px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium ".concat(featuresInView ? "animate-badge-pop" : "") }, "Key Features"),
                    React.createElement("h2", { className: "text-3xl md:text-4xl font-bold mb-4 ".concat(featuresInView ? "animate-section-reveal" : "") }, "The Best of the Full Stack TypeScript Ecosystem"),
                    React.createElement("p", { className: "text-lg text-[var(--muted-foreground)] ".concat(featuresInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.2s" } }, "...but ONLY the parts you need")),
                React.createElement("div", { className: "grid md:grid-cols-2 gap-6" }, [
                    {
                        title: "Next.js",
                        desc: "Powerful framework for server-rendered React applications",
                    },
                    {
                        title: "React",
                        desc: "Build dynamic UIs with the leading JavaScript library",
                    },
                    {
                        title: "Theming Variables",
                        desc: "Customizable CSS variables for consistent theming",
                    },
                    {
                        title: "Tailwind CSS",
                        desc: "Utility-first CSS framework for rapid styling",
                    },
                ].map(function (feature, index) { return (React.createElement("div", { key: index, className: "bg-[var(--card)] rounded-xl p-6 shadow-md transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl group ".concat(featuresInView ? "animate-feature-card" : ""), style: { animationDelay: "".concat(0.2 * index, "s") } },
                    React.createElement("h3", { className: "text-xl font-semibold mb-2 text-[var(--foreground)]" }, feature.title),
                    React.createElement("p", { className: "text-[var(--muted-foreground)]" }, feature.desc),
                    React.createElement("div", { className: "h-0.5 bg-[var(--primary)] mt-4 transition-all duration-500 w-0 group-hover:w-full" }))); }))),
            React.createElement("style", { jsx: true }, "\n          @keyframes feature-card {\n            0% {\n              opacity: 0;\n              transform: translateY(30px) rotateX(-10deg);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0) rotateX(0deg);\n            }\n          }\n          .animate-feature-card {\n            animation: feature-card 0.8s ease-out forwards;\n          }\n        ")),
        React.createElement("section", { id: "contact", ref: contactRef, className: "py-20 px-4 md:px-8 bg-gradient-to-b from-[var(--muted)] to-[var(--background)]" },
            React.createElement("div", { className: "max-w-4xl mx-auto text-center" },
                React.createElement("div", null,
                    React.createElement("div", { className: "inline-block mb-4 px-3 py-1 bg-[var(--primary)]/20 rounded-full text-[var(--primary)] text-sm font-medium ".concat(contactInView ? "animate-badge-pop" : "") }, "Contact Us"),
                    React.createElement("h2", { className: "text-3xl md:text-4xl font-bold mb-6 ".concat(contactInView ? "animate-section-reveal" : "") }, "Get in Touch"),
                    React.createElement("p", { className: "text-lg text-[var(--muted-foreground)] mb-8 ".concat(contactInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.2s" } }, "Reach out for more information or support."),
                    React.createElement("p", { className: "text-[var(--foreground)] ".concat(contactInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.3s" } },
                        "Email:",
                        " ",
                        React.createElement("a", { href: "mailto:info@aganitha.ai", className: "text-[var(--primary)] hover:underline transition-colors duration-300" }, "info@aganitha.ai"),
                        React.createElement("br", null),
                        "Website:",
                        " ",
                        React.createElement("a", { href: "https://www.aganitha.ai", className: "text-[var(--primary)] hover:underline transition-colors duration-300" }, "www.aganitha.ai")),
                    React.createElement("div", { className: "mt-8 flex justify-center gap-4 ".concat(contactInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.5s" } },
                        React.createElement(Link, { href: "https://www.aganitha.ai/company/contact/", target: "_blank" },
                            React.createElement(Button, { variant: "primary" }, "Contact Now")),
                        React.createElement(Link, { href: "https://www.aganitha.ai/", target: "_blank", rel: "noopener noreferrer" },
                            React.createElement(Button, { variant: "outline" }, "Visit Website")))))),
        React.createElement("footer", { id: "footer", ref: footerRef, className: "py-12 px-4 md:px-8 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--border)]" },
            React.createElement("div", { className: "max-w-6xl mx-auto" },
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" },
                    React.createElement("div", { className: "flex flex-col items-center md:items-start ".concat(footerInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.2s" } },
                        React.createElement("img", { src: "https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png", alt: "Aganitha Logo", className: "h-10 mb-4" }),
                        React.createElement("p", { className: "text-sm text-[var(--muted-foreground)] text-center md:text-left" }, "Empowering innovation through AI and technology.")),
                    React.createElement("div", { className: "flex flex-col items-center md:items-start ".concat(footerInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.4s" } },
                        React.createElement("h3", { className: "text-lg font-semibold mb-4 text-[var(--foreground)]" }, "Contact Us"),
                        React.createElement("ul", { className: "space-y-2 text-[var(--muted-foreground)]" },
                            React.createElement("li", { className: "flex items-center" },
                                React.createElement(Mail, { className: "h-5 w-5 mr-2 text-[var(--primary)]" }),
                                React.createElement("a", { href: "mailto:info@aganitha.ai", className: "hover:text-[var(--primary)] transition-colors duration-300" }, "info@aganitha.ai")),
                            React.createElement("li", { className: "flex items-center" },
                                React.createElement(Phone, { className: "h-5 w-5 mr-2 text-[var(--primary)]" }),
                                React.createElement("span", null, "+91-123-456-7890")),
                            React.createElement("li", { className: "flex items-center" },
                                React.createElement(MapPin, { className: "h-5 w-5 mr-2 text-[var(--primary)]" }),
                                React.createElement("span", null, "Hyderabad, Telangana, India")))),
                    React.createElement("div", { className: "flex flex-col items-center md:items-start ".concat(footerInView ? "animate-fade-in-delay" : ""), style: { animationDelay: "0.6s" } },
                        React.createElement("h3", { className: "text-lg font-semibold mb-4 text-[var(--foreground)]" }, "Follow Us"),
                        React.createElement("div", { className: "flex space-x-4" },
                            React.createElement("a", { href: "https://www.linkedin.com/company/aganitha", target: "_blank", rel: "noopener noreferrer", className: "text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300" },
                                React.createElement(Linkedin, { className: "h-6 w-6" })),
                            React.createElement("a", { href: "https://x.com/AganithaAI", target: "_blank", rel: "noopener noreferrer", className: "text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300" },
                                React.createElement(Twitter, { className: "h-6 w-6" }))))),
                React.createElement("div", { className: "mt-8 border-t border-[var(--border)] pt-6 text-center text-[var(--muted-foreground)] text-sm" },
                    React.createElement("p", null,
                        "\u00A9 ",
                        new Date().getFullYear(),
                        " Aganitha. All rights reserved."))))));
}
