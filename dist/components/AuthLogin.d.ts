import React from 'react';
export interface AuthLoginProps {
    className?: string;
    redirectUrl?: string;
    children?: React.ReactNode;
    title?: string;
    subtitle?: string;
    showGoogle?: boolean;
    showGithub?: boolean;
    showLinkedin?: boolean;
    showOTP?: boolean;
    showLDAP?: boolean;
    buttonClassName?: string;
    containerClassName?: string;
    termsUrl?: string;
    privacyUrl?: string;
    logoUrl?: string;
    logoClassName?: string;
    ldapDomain?: string;
}
export declare const AuthLogin: ({ className, redirectUrl, title, subtitle, showGoogle, showGithub, showLinkedin, showOTP, showLDAP, buttonClassName, containerClassName, termsUrl, privacyUrl, logoUrl, logoClassName, ldapDomain }: AuthLoginProps) => React.JSX.Element;
