import React from "react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
var inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
var poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});
export var metadata = {
    title: "Aganitha Cognitive Solutions",
    description: "AI-powered solutions for pharmaceutical research and development",
    metadataBase: new URL("https://aganitha.ai"),
    icons: {
        icon: "/aganitha-logo.png", // Use the PNG directly
    },
    openGraph: {
        title: "Aganitha Cognitive Solutions",
        description: "AI-powered solutions for pharmaceutical research and development",
        url: "https://aganitha.ai",
        siteName: "Aganitha",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aganitha Cognitive Solutions",
        description: "AI-powered solutions for pharmaceutical research and development",
    },
};
export default function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en", className: "".concat(inter.variable, " ").concat(poppins.variable) },
        React.createElement("body", { suppressHydrationWarning: true, className: "font-sans" }, children)));
}
