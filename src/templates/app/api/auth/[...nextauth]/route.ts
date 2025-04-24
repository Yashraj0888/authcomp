import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import LinkedInProvider, { LinkedInProfile } from "next-auth/providers/linkedin";
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbGet, dbRun } from "../../../../utils/db";
const ldap = require("ldapjs")

// Define interfaces for database query results
interface OTPCode {
  id: string;
  user_id: string;
  code: string;
  expires_at: string;
  used: boolean;
  created_at: string;
}

interface User {
  id: string;
  email: string;
  created_at: string;
}

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
    CredentialsProvider({
      id: 'verify-otp',
      name: 'OTP',
      credentials: {
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' },
        userId: { label: 'User ID', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp || !credentials?.userId) {
          console.log('Missing credentials');
          throw new Error('Missing OTP credentials');
        }
  
        const sqlOtp = `
          SELECT * FROM otp_codes
          WHERE user_id = ?
          AND code = ?
          AND expires_at > datetime('now')
          AND used = FALSE
          LIMIT 1
        `;
  
        const result = await dbGet<OTPCode>(sqlOtp, [
          credentials.userId,
          credentials.otp,
        ]);
        console.log('OTP query result:', result);
  
        if (!result) {
          console.log('Invalid OTP or expired');
          throw new Error('Invalid or expired OTP');
        }
  
        const updateSql = `
          UPDATE otp_codes
          SET used = TRUE
          WHERE id = ?
        `;
        await dbRun(updateSql, [result.id]);
  
        const sqlUser = 'SELECT * FROM users WHERE id = ?';
        const user = await dbGet<User>(sqlUser, [credentials.userId]);
        console.log('User query result:', user);
  
        if (!user) {
          console.log('User not found');
          throw new Error('User not found');
        }
  
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
    CredentialsProvider({
      id: "ldap",
      name: "LDAP",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        redirect: { label: "Redirect", type: "text" },
        callbackUrl: { label: "Callback URL", type: "text" }
      },
      async authorize(credentials) {
        // console.log("Authorizing with LDAP credentials:", credentials);
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing LDAP credentials");
          throw new Error("Missing LDAP credentials");
        }
    
        const ldapUrl = process.env.LDAP_URI || "ldap://ldap.example.com";
        // Construct the user DN using the provided username and the base DN from env.
        const userDn = `uid=${credentials.username},${process.env.LDAP_USER_DN || "ou=people,dc=example,dc=ai"}`;
    
        // Configure LDAP client with timeout and reconnect options
        const client = ldap.createClient({ 
          url: ldapUrl,
          timeout: 30000, // 30 seconds timeout
          connectTimeout: 30000, // 30 seconds connect timeout
          reconnect: {
            initialDelay: 1000, // 1 second initial delay
            maxDelay: 10000, // 10 seconds maximum delay
            failAfter: 10 // fail after 10 retries
          }
        });
        
        // Set up error handler for the client
        let clientError: Error | null = null;
        client.on('error', (err: Error) => {
          console.error('LDAP client error:', err);
          clientError = err;
        });

        try {
          return await new Promise((resolve, reject) => {
            // Set a timeout for the entire operation
            const timeoutId = setTimeout(() => {
              console.error("LDAP authentication operation timed out");
              client.destroy();
              reject(new Error("LDAP authentication timed out after 45 seconds"));
            }, 45000);
            
            // Check if we already have a client error before attempting to bind
            if (clientError) {
              clearTimeout(timeoutId);
              console.error("LDAP client error before bind:", clientError);
              reject(new Error(`LDAP connection error: ${clientError.message}`));
              return;
            }
            
            client.bind(userDn, credentials.password, (error: Error | null) => {
              clearTimeout(timeoutId);
              
              if (error) {
                console.error("LDAP authentication failed:", error);
                // Create the error message before destroying the client
                const errorMessage = `LDAP authentication failed: ${error.message}`;
                // Reject with the error message
                reject(new Error(errorMessage));
                // Then destroy the client
                client.destroy();
              } else {
                console.log("LDAP authentication successful");
                client.unbind((err: Error | null) => {
                  if (err) {
                    console.error("Error unbinding LDAP client:", err);
                  }
                  client.destroy();
                });
                
                // Return user object with email if available
                const email = process.env.LDAP_EMAIL_DOMAIN 
                  ? `${credentials.username}@${process.env.LDAP_EMAIL_DOMAIN}` 
                  : "";
                
                resolve({ 
                  id: credentials.username, 
                  email: email,
                  name: credentials.username
                });
              }
            });
          });
        } catch (error: unknown) {
          console.error("LDAP authentication error:", error);
          const errorMessage = error instanceof Error ? error.message : String(error);
          throw new Error(`LDAP authentication error: ${errorMessage}`);
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {

      if (account?.provider === "verify-otp" || account?.provider === "ldap") {
        console.log(`${account.provider} provider detected; proceeding without profile check.`);
        return true;
      }

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
      console.log("JWT callback invoked");
      console.log("Initial token:", token);
      if (user) {
        token.userId = user.id;
        // Add provider-specific URLs if available

        if (user.githubUrl) {
          token.githubUrl = user.githubUrl;
        }
        if (user.linkedinUrl) {
          token.linkedinUrl = user.linkedinUrl;
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback invoked");
      console.log("Token in session callback:", token);
      if (token && session.user) {
        session.user.id = token.userId as string;
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
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    newUser: '/dashboard'
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };