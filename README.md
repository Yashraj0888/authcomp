# Next Auth Social UI & Navigation Components

A comprehensive package for Next.js applications that provides customizable authentication UI with social login options and a flexible navigation bar component.

## Features

### Authentication Component
- ðŸ”’ Built-in support for Google, GitHub, and LinkedIn authentication
- ðŸŽ¨ Fully customizable with Tailwind CSS
- ðŸš€ CLI tool for automatic route setup
- ðŸ“¦ Easy to install and configure

### Navigation Bar Component
- ðŸš€ Compatible with both React and Next.js
- ðŸ“± Fully responsive with mobile menu
- ðŸ”½ Support for dropdown menus
- ðŸŽ¨ Customizable styling
- ðŸ”„ Active link highlighting
- ðŸ–¼ï¸  Logo and app name support

## Quick Start

```bash
# Run the setup wizard
npx authcomp
```

The setup wizard will guide you through the installation process and offer to install both the authentication component and the navigation bar component.

## Authentication Setup

### 1. Running the Setup Wizard

After installation, run the setup wizard to create the authentication route:

```bash
npx authcomp
```

This will:
- Create the NextAuth route at `app/api/auth/[...nextauth]/route.ts`
- Add necessary environment variables to your `.env` file
- Offer to install the navigation bar component

### 2. Configure Environment Variables

Update your `.env` file with your OAuth credentials:

```
# Authentication
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

### 3. Using the AuthLogin Component

```jsx
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

### AuthLogin Component Props

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


## Navigation Bar Setup

The navigation bar component is part of the `aganitha-nav-bar` package that can be installed during the setup wizard.

### Using the NavBar Component

## Usage

### With Next.js

```jsx
'use client'; // For Next.js App Router

import { NavBar } from 'aganitha-nav-bar';

export default function Layout() {
  const navItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Services', 
      path: '/services',
      dropdown: [
        { label: 'Web Development', path: '/services/web' },
        { label: 'App Development', path: '/services/app' }
      ]
    },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <div>
      <NavBar 
        appName="My App"
        logoUrl="/logo.png"
        navItems={navItems}
      />
      <main>{/* Your page content */}</main>
    </div>
  );
}
```

### With React

```jsx
import { NavBar } from 'aganitha-nav-bar';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const navItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Services', 
      path: '/services',
      dropdown: [
        { label: 'Web Development', path: '/services/web' },
        { label: 'App Development', path: '/services/app' }
      ]
    },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  // For React Router integration
  const handleNavigate = (path) => {
    // Custom navigation logic if needed
    console.log(`Navigating to ${path}`);
  };

  return (
    <Router>
      <div>
        <NavBar 
          appName="My App"
          logoUrl="/logo.png"
          navItems={navItems}
          onNavigate={handleNavigate}
        />
        {/* Your routes */}
      </div>
    </Router>
  );
}

export default App;
```

## Configuration

### NavBar Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `appName` | `string` | The name of your application | `undefined` |
| `logoUrl` | `string` | URL to your logo image | `undefined` |
| `navItems` | `NavItem[]` | Array of navigation items | `[]` (required) |
| `customStyles` | `React.CSSProperties` | Custom styles for the navbar | `undefined` |
| `onNavigate` | `(path: string) => void` | Callback function when navigation occurs | `undefined` |

### NavItem Type

```typescript
interface DropdownItem {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  path: string;
  icon?: string;
  dropdown?: DropdownItem[];
  type?: "link" | "auth-signin" | "auth-signout";
}
```

## Configuring with YAML (for Next.js)

You can also configure the navigation using a YAML file:

1. Create a `nav-config.yaml` file in your project root:

```yaml
appName: My Application
logoUrl: /logo.png
navigation:
  - label: Home
    path: /
  - label: Services
    path: /services
    dropdown:
      - label: Web Development
        path: /services/web
      - label: App Development
        path: /services/app
  - label: About
    path: /about
  - label: Contact
    path: /contact
```

2. Use the `getNavConfig` utility:

```jsx
// In your layout or page component
'use client';

// app/page.tsx
import { NavBar } from 'aganitha-nav-bar';
import { getNavConfig } from 'aganitha-nav-bar';

export default async function Home() {
  const navConfig = await getNavConfig();

  return (
      <NavBar 
        appName={navConfig.appName} 
        logoUrl={navConfig.logoUrl} 
        navItems={navConfig.navigation} 
      />
  );
}
```

## Styling

The component comes with default styling that you can customize in several ways:

### Using customStyles prop

```jsx
<NavBar
  navItems={navItems}
  customStyles={{
    background: '#f5f5f5',
    color: '#333',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}
/>
```

### Using CSS variables

The component uses these CSS variables that you can override in your global CSS:

```css
:root {
  --border: #e2e8f0;
  --primary: #0070f3;
  --primary-foreground: white;
}
```

### Tailwind CSS

The component is built with Tailwind CSS classes. If you're using Tailwind in your project, you can customize the appearance by configuring your theme in your `tailwind.config.js`.

## TypeScript Support

This package includes TypeScript definitions. Import types as needed:

```typescript
import { NavBar } from 'aganitha-nav-bar';
import type { NavItem, DropdownItem } from 'aganitha-nav-bar/types';

## Styling

### Theme Configuration

To use the Aganitha theme colors, add the following to your Tailwind configuration:

#### For Tailwind CSS 3.x (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        aganitha: {
          primary: "#000000",    // Black
          accent: "#323232",     // Dark Brown
          secondary: "#323232",  // Dark Brown
          background: "#DDD0C8", // Light Beige
          text: "#000000",       // Black
          button: "#323232",     // Dark Brown
        }
      }
    }
  }
}
```

#### For Tailwind CSS 4.x (global.css)

```css
@theme {
    --aganitha-primary: #000000;    /* Black */
    --aganitha-accent: #323232;     /* Dark Brown */
    --aganitha-secondary: #323232;  /* Dark Brown */
    --aganitha-background: #DDD0C8; /* Light Beige */
    --aganitha-text: #000000;       /* Black */
    --aganitha-button: #323232;     /* Dark Brown */
  }

```

### CSS Variables

The NavBar component uses these CSS variables that you can override in your global CSS:

```css
:root {
  --border: #e2e8f0;
  --primary: #0070f3;
  --primary-foreground: white;
}
```

## CLI Output Example

When you run `npx authcomp`, you'll see something like this:

```
npx authcomp

Ok to proceed? (y) y

Package Installation
Do you want to install the authcomp package? (y/N) y
Installing authcomp...
âœ“ Successfully installed authcomp

Do you want to install the aganitha-nav-bar package? (y/N) y
Installing aganitha-nav-bar...
âœ“ Successfully installed aganitha-nav-bar

Next Auth Social UI Setup
This will set up the authentication route and environment variables.
Do you want to set up authentication route? (y/N) y
âœ“ Authentication route created successfully!
âœ“ Environment variables added to .env file

Next steps:
1. Update your .env file with your OAuth credentials
2. Add AuthLogin component to your pages:

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

## Requirements

- Next.js 13+
- React 18+
- NextAuth.js 4+
- Tailwind CSS 3+

## License

MIT