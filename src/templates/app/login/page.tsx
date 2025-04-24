"use client"
import React from "react";
import { AuthLogin } from "@aganitha/authentication-component";

export default function LoginPage() {
  return (
    <AuthLogin
      redirectUrl="/dashboard"
      logoUrl="https://www.aganitha.ai/wp-content/uploads/2023/07/logo-crop.svg"
      title="Welcome To Aganitha"
      subtitle="Sign in to your account"
      showGoogle={true}
      showGithub={true}
      showLinkedin={true}
      showOTP={true}
      showLDAP={true}
    />
  );
}
