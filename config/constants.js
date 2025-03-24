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
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# LDAP Configuration
LDAP_URI=ldap://your-ldap-server.com
LDAP_USER_DN=ou=people,dc=example,dc=com
LDAP_EMAIL_DOMAIN=example.com`;

module.exports = {
  envContent
};
