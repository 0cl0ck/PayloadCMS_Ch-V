# Transactions in PayloadCMS

## Overview

Database transactions allow your application to make a series of database changes in an **all-or-nothing commit**.

For example, consider an HTTP request that:

1. Creates a new `Order`.
2. Has an `afterChange` hook to update the stock count of related `Items`.

If an error occurs when updating an `Item`, the `Order` should **not be persisted**, and no changes should be applied to any other items. This type of interaction is seamlessly handled with transactions.

By default, Payload uses transactions for all **data-changing operations**, provided they are supported by the configured database. If transactions are **not supported**, Payload operates without them while ensuring consistent behavior.

> **Note**: MongoDB requires a connection to a **replicaset** to utilize transactions.

---

## How Transactions Work

### Default Behavior

- Transactions begin with the initial request made to Payload.
- A new transaction is attached to `req.transactionID`.
- Any errors will result in all changes being **rolled back** without being committed.

---

## Using Transactions in Hooks

If you use a hook that interacts with the database, you can **opt-in to the transaction** by passing the `req` object. For example:

```javascript
const afterChange: CollectionAfterChangeHook = async ({ req }) => {
  // 'my-slug' will only persist if the entire request is successful
  await req.payload.create({
    req, // Pass the request to join the transaction
    collection: 'my-slug',
    data: {
      some: 'data',
    },
  });
};
```

````

---

### Async Hooks and Transactions

Since hooks can be asynchronous, you should avoid **not awaiting** a result if using a shared transaction. Otherwise, a success response might be returned even if the transaction is rolled back.

```javascript
const afterChange: CollectionAfterChangeHook = async ({ req }) => {
  // DANGEROUS: This call is made asynchronously and not awaited
  const dangerouslyIgnoreAsync = req.payload.create({
    req,
    collection: 'my-slug',
    data: {
      some: 'other data',
    },
  });

  // SAFE: This call does not use the shared transaction
  const safelyIgnoredAsync = req.payload.create({
    collection: 'my-slug',
    data: {
      some: 'other data',
    },
  });
};
```

---

## Direct Transaction Access

For custom scripts or endpoints, you can directly manage transactions using the following functions:

- `payload.db.beginTransaction`: Starts a session and returns a `transactionID`.
- `payload.db.commitTransaction`: Finalizes changes for a transaction.
- `payload.db.rollbackTransaction`: Discards changes for a transaction.

Example:

```javascript
import payload from 'payload'
import config from './payload.config'

const standalonePayloadScript = async () => {
  // Initialize Payload
  await payload.init({ config })

  const transactionID = await payload.db.beginTransaction()

  try {
    // Make an update using the local API
    await payload.update({
      collection: 'posts',
      data: {
        some: 'data',
      },
      where: {
        slug: { equals: 'my-slug' },
      },
      req: { transactionID }, // Use the transaction ID
    })

    // Commit the transaction
    await payload.db.commitTransaction(transactionID)
  } catch (error) {
    // Rollback the transaction
    await payload.db.rollbackTransaction(transactionID)
  }
}

standalonePayloadScript()
```

---

## Disabling Transactions

### Adapter-Level

Transactions can be disabled at the adapter level by setting `transactionOptions` to `false` in your database adapter configuration.

### Per API Call

You can also prevent Payload from using a transaction for a specific API call by adding `disableTransaction: true` to the arguments:

```javascript
await payload.update({
  collection: 'posts',
  data: {
    some: 'data',
  },
  where: {
    slug: { equals: 'my-slug' },
  },
  disableTransaction: true, // Disable transactions for this call
})
```
````
