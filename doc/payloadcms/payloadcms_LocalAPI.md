# Local API

The Payload Local API gives you the ability to execute the same operations that are available through REST and GraphQL within Node, directly on your server. Here, you don't need to deal with server latency or network speed whatsoever and can interact directly with your database.

> **Tip**:  
> The Local API is incredibly powerful when used in React Server Components and other similar server-side contexts. With other headless CMS, you need to request your data from third-party servers via an HTTP layer, which can add significant loading time to your server-rendered pages. With Payload, you don't have to leave your server to gather the data you need. It can be incredibly fast and is definitely a game changer.

---

## Common Use Cases

Here are some common examples of how you can use the Local API:

- Fetching Payload data within React Server Components.
- Seeding data via Node seed scripts that you write and maintain.
- Opening custom Next.js route handlers which feature additional functionality but still rely on Payload.
- Within Access Control and Hooks.

---

## Accessing Payload

You can gain access to the currently running payload object in two ways:

### 1. Accessing from `args` or `req`

In most places within Payload itself, you can access `payload` directly from the arguments of Hooks, Access Control, Validation functions, and similar. Most config functions take the `req` (Request) object, which has Payload bound to it (`req.payload`).

**Example:**

```javascript
const afterChangeHook: CollectionAfterChangeHook = async ({ req: { payload } }) => {
  const posts = await payload.find({
    collection: 'posts',
  })
}
```

---

### 2. Importing it

If you want to import Payload in places where you don't have the option to access it from function arguments or `req`, you can import and initialize it.

**Example:**

```javascript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
```

> **Note:** In production, `getPayload` disables all HMR functionality automatically.

---

## Local Options

Here are the options available in the Local API:

- **`collection`**: Required for Collection operations. Specifies the Collection slug to operate against.
- **`data`**: The data to use within the operation. Required for create and update operations.
- **`depth`**: Controls auto-population of nested relationship and upload fields.
- **`locale`**: Specifies the locale for any returned documents.
- **`select`**: Specifies which fields to include in the result.
- **`populate`**: Specifies which fields to include in the result from populated documents.
- **`fallbackLocale`**: Specifies a fallback locale to use for any returned documents.
- **`overrideAccess`**: Skips access control. Default: `true`.
- **`overrideLock`**: By default, document locks are ignored (`true`). Set to `false` to enforce locks.
- **`user`**: If `overrideAccess` is `false`, you can pass a user for access control checks.
- **`showHiddenFields`**: Opt-in to receiving hidden fields. By default, hidden fields are excluded.
- **`pagination`**: Set to `false` to return all documents and avoid querying for document counts.
- **`context`**: Adds custom context that is passed to `req.context` and hooks. Useful for extra options like disabling certain hooks.
- **`disableErrors`**: When set to `true`, errors will not be thrown. Instead, operations like `findByID` will return `null`.
- **`disableTransaction`**: When set to `true`, disables database transactions.

---

## Transactions

When your database uses transactions, you need to pass the `req` object through to all local operations. Postgres uses transactions, and MongoDB uses them when you are using replica sets.

**Example:**

```javascript
const post = await payload.find({
  collection: 'posts',
  req, // passing req is recommended
})
```

> **Note:** By default, all access control checks are disabled in the Local API, but you can re-enable them if you'd like, as well as pass a specific user to run the operation.

---

## Collection Operations

Here are the Collection operations available through the Local API:

### Create

Creates a new document in the specified collection.

```javascript
const post = await payload.create({
  collection: 'posts', // required
  data: {
    title: 'Example title',
    description: 'Example description',
  },
  locale: 'en',
  user: dummyUserDoc,
  overrideAccess: true,
})
```

---

### Find

Finds documents in the specified collection.

```javascript
const result = await payload.find({
  collection: 'posts', // required
  depth: 2,
  page: 1,
  limit: 10,
  where: {}, // pass a `where` query here
  sort: '-title',
})
```

---

### Find by ID

Finds a document by its ID.

```javascript
const result = await payload.findByID({
  collection: 'posts', // required
  id: '507f1f77bcf86cd799439011', // required
  depth: 2,
})
```

---

### Count

Counts the number of documents in the collection.

```javascript
const result = await payload.count({
  collection: 'posts', // required
  where: {}, // pass a `where` query here
})
```

---

### Update by ID

Updates a document by its ID.

```javascript
const result = await payload.update({
  collection: 'posts', // required
  id: '507f1f77bcf86cd799439011', // required
  data: {
    title: 'Updated title',
    description: 'Updated description',
  },
})
```

---

### Delete by ID

Deletes a document by its ID.

```javascript
const result = await payload.delete({
  collection: 'posts', // required
  id: '507f1f77bcf86cd799439011', // required
})
```

---

## Auth Operations

If a collection has Authentication enabled, additional Local API operations will be available:

### Login

Logs in a user.

```javascript
const result = await payload.login({
  collection: 'users', // required
  data: {
    email: 'user@example.com',
    password: 'password123',
  },
})
```

---

### Forgot Password

Generates a token to reset a user's password.

```javascript
const token = await payload.forgotPassword({
  collection: 'users', // required
  data: {
    email: 'user@example.com',
  },
})
```

---

### Reset Password

Resets a user's password using a token.

```javascript
const result = await payload.resetPassword({
  collection: 'users', // required
  data: {
    password: 'newPassword123', // the new password
    token: 'resetToken123', // the token from forgotPassword
  },
})
```

---

### Verify Email

Verifies a user's email address using a token.

```javascript
const result = await payload.verifyEmail({
  collection: 'users', // required
  token: 'verifyToken123',
})
```

---

## Globals Operations

The following operations are available for Globals:

### Find

Finds a Global document.

```javascript
const result = await payload.findGlobal({
  slug: 'header', // required
  depth: 2,
})
```

---

### Update

Updates a Global document.

```javascript
const result = await payload.updateGlobal({
  slug: 'header', // required
  data: {
    nav: [{ url: 'https://example.com' }, { url: 'https://another.com' }],
  },
})
```

---

## TypeScript

Local API calls will automatically infer your generated types.

**Example:**

```javascript
const post = await payload.create({
  collection: 'posts',
  data: {
    title: 'My Title',
    description: 'My Description',
  },
})
```
