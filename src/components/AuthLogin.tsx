import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export interface AuthLoginProps {
  className?: string;
  callbackUrl?: string;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  showGoogle?: boolean;
  showGithub?: boolean;
  showLinkedin?: boolean;
  buttonClassName?: string;
  containerClassName?: string;
  termsUrl?: string;
  privacyUrl?: string;
}

export const AuthLogin = ({ 
  className = "",
  callbackUrl = "/",
  title = "Welcome back",
  subtitle = "Continue with your preferred login method",
  showGoogle = true,
  showGithub = true,
  showLinkedin = true,
  buttonClassName = "",
  containerClassName = "",
  termsUrl = "#",
  privacyUrl = "#"
}: AuthLoginProps) => {
  const [error, setError] = useState('');

  const handleSocialSignIn = (provider: string) => {
    setError('');
    signIn(provider, { callbackUrl });
  };

  const defaultButtonClass = "flex items-center justify-center gap-3 p-3 w-full border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700";
  const defaultContainerClass = "flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto";

  return (
    <div className={`${defaultContainerClass} ${containerClassName} ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-2">{subtitle}</p>
      </div>

      {error && (
        <div className="p-4 text-sm font-medium text-red-600 bg-red-50 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {showGoogle && (
          <button
            onClick={() => handleSocialSignIn("google")}
            className={`${defaultButtonClass} ${buttonClassName}`}
          >
            <FcGoogle className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
        )}

        {showGithub && (
          <button
            onClick={() => handleSocialSignIn("github")}
            className={`${defaultButtonClass} ${buttonClassName}`}
          >
            <FaGithub className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>
        )}

        {showLinkedin && (
          <button
            onClick={() => handleSocialSignIn("linkedin")}
            className={`${defaultButtonClass} ${buttonClassName}`}
          >
            <FaLinkedin className="w-5 h-5 text-[#0077b5]" />
            <span>Continue with LinkedIn</span>
          </button>
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        By continuing, you agree to our 
        <a href={termsUrl} className="text-blue-600 hover:underline mx-1">Terms of Service</a>
        and
        <a href={privacyUrl} className="text-blue-600 hover:underline mx-1">Privacy Policy</a>
      </div>
    </div>
  );
};
