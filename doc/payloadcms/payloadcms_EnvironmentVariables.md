# Environment Variables in PayloadCMS

## Overview

Environment Variables are a way to securely store sensitive information that your application needs to function, such as API keys or Database credentials. Payload makes it easy to use Environment Variables within your configuration and application.

---

## Using Environment Variables in Next.js

### Setup

If you are using Next.js, simply create a `.env` file in the root of your project. No additional setup is required.

**Example project structure:**

```

project-name/
├─ .env
├─ package.json
├─ payload.config.ts

```

**Example `.env` file:**

```

SERVER_URL=localhost:3000
DATABASE_URI=mongodb://localhost:27017/my-database

```

### Accessing Environment Variables in Payload Config

You can access Environment Variables directly from `process.env` in your Payload Config:

```typescript
import { buildConfig } from 'payload'

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  // ...
})
```

---

## Client-side Environments

For security, **Environment Variables are not included in the Admin Panel's client-side bundle by default**. However, Next.js provides a way to expose Environment Variables to the client-side bundle when necessary by prefixing them with `NEXT_PUBLIC_`.

### Example

Add the following variable to your `.env` file:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXX
```

This variable will automatically be available on the client-side and can be accessed as follows:

```javascript
'use client'
import React from 'react'

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

const MyClientComponent = () => {
  // Use the key here
  return <div>My Client Component</div>
}
```

> **Important**: Be cautious when exposing variables to the client-side. Ensure that only non-sensitive data is made public.

For more details, see the [Next.js Documentation](https://nextjs.org/docs/basic-features/environment-variables).

---

## Using Environment Variables Outside of Next.js

If you're using Payload outside of Next.js, the `dotenv` package is recommended for managing Environment Variables.

### Setup

Install the `dotenv` package and import it at the top of your application:

```bash
npm install dotenv
```

```typescript
import dotenv from 'dotenv'
dotenv.config()

import { buildConfig } from 'payload'

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  // ...
})
```

### Tips

- By default, `dotenv` looks for a `.env` file in the root of your project.
- If your `.env` file is located elsewhere, specify its path in the config options:
  ```typescript
  dotenv.config({ path: './config/.env' })
  ```

---

## Best Practices

- Store sensitive information like API keys, database credentials, and secret tokens in Environment Variables.
- **Do not expose sensitive Environment Variables to the client-side.** Only prefix public variables with `NEXT_PUBLIC_` if absolutely necessary.
- Add `.env` to your `.gitignore` file to prevent committing sensitive data to version control.

This setup ensures your application remains secure and organized, regardless of whether you're using Next.js or another framework.

```

```
