# Next Auth Social UI

A customizable Next.js social authentication UI component with built-in support for Google, GitHub, and LinkedIn authentication.

## Features

- 🎨 Fully customizable with Tailwind CSS
- 🔒 Built-in support for Google, GitHub, and LinkedIn authentication
- 📦 Easy to install and set up
- 🚀 CLI tool for automatic route setup
- 🎯 TypeScript support

## Quick Start

```bash
# Install the package
npm install authcomp

# Run the setup wizard
npx authcomp
```

## Usage

1. After installation, run the setup wizard to create the authentication route:

```bash
npx authcomp
```

This will:
- Create the NextAuth route at `app/api/auth/[...nextauth]/route.ts`
- Add necessary environment variables to your `.env` file

2. Update your `.env` file with your OAuth credentials:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
```

3. Use the AuthLogin component in your pages:

```tsx
import { AuthLogin } from 'next-auth-social-ui';

export default function LoginPage() {
  return (
    <AuthLogin 
      callbackUrl="/dashboard"
      // Additional customization props
      title="Welcome Back"
      subtitle="Sign in to continue"
      showGoogle={true}
      showGithub={true}
      showLinkedin={true}
      buttonClassName="custom-button-class"
      containerClassName="custom-container-class"
    />
  );
}
```

## Customization Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | "" | Additional CSS classes for the root element |
| `callbackUrl` | string | "/" | URL to redirect after successful login |
| `title` | string | "Welcome back" | Main title text |
| `subtitle` | string | "Continue with..." | Subtitle text |
| `showGoogle` | boolean | true | Toggle Google login button |
| `showGithub` | boolean | true | Toggle GitHub login button |
| `showLinkedin` | boolean | true | Toggle LinkedIn login button |
| `buttonClassName` | string | "" | Additional CSS classes for buttons |
| `containerClassName` | string | "" | Additional CSS classes for container |
| `termsUrl` | string | "#" | URL for Terms of Service |
| `privacyUrl` | string | "#" | URL for Privacy Policy |

## Requirements

- Next.js 13+
- React 18+
- NextAuth.js 4+
- Tailwind CSS 3+

## License

MIT
