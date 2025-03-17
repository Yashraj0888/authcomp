#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Ensure line endings are correct for the current platform
const EOL = require('os').EOL;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const authRouteContent = `import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider, { LinkedInProfile } from "next-auth/providers/linkedin";

const handler = NextAuth({
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
      profile: (profile: LinkedInProfile) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      wellKnown:
        "https://www.linkedin.com/oauth/.well-known/openid-configuration",
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile) {
        return false;
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

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
        // Add provider-specific URLs if available

        if ('githubUrl' in user) {
          token.githubUrl = user.githubUrl;
        }
        if ('linkedinUrl' in user) {
          token.linkedinUrl = user.linkedinUrl;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.userId as string;
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
      return session;
    },  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
});
export { handler as GET, handler as POST };`;

const envContent = `# Authentication
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
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret`;

async function setupAuth() {
  try {
    // Create the auth route directory
    const routePath = path.join(process.cwd(), 'app', 'api', 'auth', '[...nextauth]');
    fs.mkdirSync(routePath, { recursive: true });

    // Create the route.ts file
    fs.writeFileSync(path.join(routePath, 'route.ts'), authRouteContent.replace(/\n/g, EOL));

    // Create or append to .env file
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, envContent);
    } else {
      fs.appendFileSync(envPath, '\n\n' + envContent);
    }

    console.log('\x1b[32m%s\x1b[0m', '✓ Authentication route created successfully!');
    console.log('\x1b[32m%s\x1b[0m', '✓ Environment variables added to .env file');
    
    console.log('\n\x1b[33mNext steps:\x1b[0m');
    console.log('1. Update your .env file with your OAuth credentials');
    console.log('2. Add AuthLogin component to your pages:');
    console.log('\x1b[36m%s\x1b[0m', `
import { AuthLogin } from 'next-auth-social-ui';

export default function LoginPage() {
  return (
    <AuthLogin 
      callbackUrl="/dashboard"
      // Customize with additional props as needed
    />
  );
}`);

  } catch (error) {
    console.error('\x1b[31mError setting up authentication:\x1b[0m', error);
    process.exit(1);
  }
}

console.log('\x1b[36m%s\x1b[0m', 'Next Auth Social UI Setup');
console.log('This will set up the authentication route and environment variables.');

rl.question('Do you want to set up authentication? (y/N) ', (answer) => {
  if (answer.toLowerCase() === 'y') {
    setupAuth();
  } else {
    console.log('Setup cancelled.');
  }
  rl.close();
});
