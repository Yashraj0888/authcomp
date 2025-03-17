import React from 'react';
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
export declare const AuthLogin: ({ className, callbackUrl, title, subtitle, showGoogle, showGithub, showLinkedin, buttonClassName, containerClassName, termsUrl, privacyUrl }: AuthLoginProps) => React.JSX.Element;
