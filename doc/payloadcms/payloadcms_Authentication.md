# Authentication Overview in PayloadCMS

## Overview

Payload provides secure and portable authentication to manage user accounts. It eliminates the need for third-party platforms by offering out-of-the-box solutions for both the Admin Panel and external applications.

### Common Use Cases

- **Customer accounts**: For e-commerce apps.
- **User accounts**: For SaaS products.
- **P2P or social apps**: Where users manage profiles.
- **Online games**: To track player progress.

When Authentication is enabled on a Collection:

- Payload supports account creation, login/logout, and password reset.
- It handles auth-related emails (e.g., verification, password reset).
- It provides UI components to manage users in the Admin Panel.

---

## Enabling Authentication

To enable Authentication for a Collection, set the `auth` property in the Collection Config:

```typescript
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  auth: true,
}
```

For advanced options:

```typescript
export const Admins: CollectionConfig = {
  auth: {
    tokenExpiration: 7200, // Keep users logged in for 7200 seconds (2 hours)
    verify: true, // Require email verification
    maxLoginAttempts: 5, // Lock users out after 5 failed attempts
    lockTime: 600 * 1000, // Lock users out for 10 minutes
  },
}
```

> **Tip**: For default behavior, set `auth: true`.

---

## Authentication Config Options

- **`cookies`**: Configure cookie settings (e.g., `secure`, `sameSite`, `domain`).
- **`depth`**: Set the depth of user population for JWT creation (default: `0`).
- **`disableLocalStrategy`**: Disable Payload’s built-in auth mechanism (use custom strategies instead).
- **`forgotPassword`**: Customize the password reset flow.
- **`lockTime`**: Time (in milliseconds) to lock a user after exceeding `maxLoginAttempts`.
- **`loginWithUsername`**: Allow username/password login. (See below for options.)
- **`maxLoginAttempts`**: Maximum failed login attempts before locking the user (default: `0` to disable).
- **`removeTokenFromResponses`**: Remove tokens from API responses (e.g., login, refresh).
- **`strategies`**: Add custom auth strategies.
- **`tokenExpiration`**: Duration (in seconds) for user sessions.
- **`useAPIKey`**: Enable API key authentication for the Collection.
- **`verify`**: Require email verification before login.

---

## Login with Username

You can enable username-based login using `loginWithUsername`.

### Example

```typescript
{
  auth: {
    loginWithUsername: true,
  },
}
```

For advanced configurations:

```typescript
{
  auth: {
    loginWithUsername: {
      allowEmailLogin: true, // Allow both email and username login
      requireEmail: false, // Email is not required
    },
  },
}
```

- **`allowEmailLogin`**: Permit login via email or username (`true` by default).
- **`requireEmail`**: Require an email address on user creation (`true` by default).

---

## Auto-Login (Development Only)

For testing and demos, you can enable auto-login to skip manual login:

```typescript
import { buildConfig } from 'payload'

export default buildConfig({
  autoLogin:
    process.env.NEXT_PUBLIC_ENABLE_AUTOLOGIN === 'true'
      ? {
          email: 'test@example.com',
          password: 'test',
          prefillOnly: true,
        }
      : false,
})
```

> **Warning**: Use an environment variable to ensure this feature is disabled in production.

Options:

- **`username`**: Username for login.
- **`email`**: Email for login.
- **`password`**: Password (only required if `prefillOnly` is `true`).
- **`prefillOnly`**: Prefill credentials but require clicking "Login."

---

## Authentication Operations

All auth-related operations (e.g., login, logout, password reset) are automatically added to your Collection and available via:

- REST API
- Local API
- GraphQL API

---

## Authentication Strategies

Payload supports multiple built-in strategies and allows custom strategies.

### Built-in Strategies

1. **HTTP-Only Cookies**: Secure method for storing session data, immune to XSS attacks.
2. **JSON Web Tokens (JWT)**: Tokens for login, refresh, and me operations.
3. **API Keys**: Useful for third-party service authentication.

### Custom Strategies

Extend Payload with custom strategies tailored to your needs. [Learn more](https://payloadcms.com/docs/auth).

---

## Example: API Key Authentication

Enable API keys for auth-enabled Collections:

```typescript
{
  auth: {
    useAPIKey: true,
  },
}
```

---

## Secure Implementation

Payload's built-in authentication ensures:

- Passwords are securely hashed and salted.
- HTTP-only cookies are used for sessions.
- JSON Web Tokens (JWTs) provide flexible, portable authentication.

For advanced security, you can integrate additional measures like rate limiting and IP whitelisting.

---

For more details, refer to the [official Payload Authentication documentation](https://payloadcms.com/docs/auth).

```

```
