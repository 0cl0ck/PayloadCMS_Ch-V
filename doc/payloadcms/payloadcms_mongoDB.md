# MongoDB Integration with PayloadCMS

## Overview

To use Payload with MongoDB, install the package `@payloadcms/db-mongodb`. This package includes everything required to store your Payload data in a MongoDB database.

---

## Setup

Install the MongoDB adapter:

```bash
npm install @payloadcms/db-mongodb
```

Then, configure the MongoDB adapter in your Payload configuration file:

```javascript
import { mongooseAdapter } from '@payloadcms/db-mongodb'

export default buildConfig({
  // Your Payload configuration
  collections: [
    // Define your collections here
  ],
  db: mongooseAdapter({
    // Required: Set the MongoDB connection URL
    url: process.env.DATABASE_URI,

    // Additional options can be set here
  }),
})
```

---

## Options

The MongoDB adapter supports the following options:

| Option               | Description                                                                                                                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoPluralization`  | Enables Mongoose's auto-pluralization for collection names if singular words are used as collection slugs.                                                                                                                                                             |
| `connectOptions`     | Customize MongoDB connection options. By default, Payload uses standard options, but you can override or extend these to include any Mongoose-specific options.                                                                                                        |
| `disableIndexHints`  | Set to `true` to disable index hints for MongoDB to use `id` as an index. This optimization speeds up counting documents for pagination but may cause issues with AWS DocumentDB. Defaults to `false`.                                                                 |
| `migrationDir`       | Customize the directory where migrations are stored.                                                                                                                                                                                                                   |
| `transactionOptions` | Pass an object with configuration properties for transactions, or set to `false` to disable transactions entirely.                                                                                                                                                     |
| `collation`          | Enable language-specific string comparisons with customizable options. Available on MongoDB 3.4+. Defaults to `{ locale: "en" }`. Example: `{ strength: 3 }`. See [MongoDB collation documentation](https://docs.mongodb.com/manual/reference/collation/) for details. |

---

## Access to Mongoose Models

After initializing Payload, the MongoDB adapter exposes all your Mongoose models, allowing you to work directly with them if needed.

### Accessing Models

- **Collection Models**: Accessed via `payload.db.collections[myCollectionSlug]`.
- **Globals Model**: Accessed via `payload.db.globals`.
- **Versions Model**: Accessed via `payload.db.versions[myEntitySlug]` (for both collections and globals).

Example:

```javascript
const postsModel = payload.db.collections['posts']
const globalSettings = payload.db.globals
const versionedPostModel = payload.db.versions['post']
```

---

For more detailed information about MongoDB or Mongoose, refer to the official documentation:

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

```

```
