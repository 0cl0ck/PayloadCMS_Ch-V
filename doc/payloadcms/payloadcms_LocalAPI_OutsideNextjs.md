````markdown
# Using Payload Outside Next.js

Payload can be used completely outside of Next.js, which is helpful in cases like:

- Running scripts
- Using Payload in a separate backend service
- Using Payload's Local API to fetch your data directly from your database in other frontend frameworks like **SvelteKit**, **Remix**, **Nuxt**, and similar.

## Note

Payload and all of its official packages are fully **ESM**. If you want to use Payload within your own projects:

- Make sure you are writing your scripts in **ESM format**.
- Alternatively, dynamically import the Payload Config.

---

## Importing the Payload Config Outside of Next.js

Payload provides a convenient way to run standalone scripts, useful for tasks like:

- Seeding your database
- Performing one-off operations

In standalone scripts, you can:

1. Import the Payload Config and use it directly.
2. Use the `getPayload` function for an initialized copy of Payload.

Example script:

```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const seed = async () => {
  // Get a local copy of Payload by passing your config
  const payload = await getPayload({ config })

  const user = await payload.create({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      password: 'some-password',
    },
  })

  const page = await payload.create({
    collection: 'pages',
    data: {
      title: 'My Homepage',
      // other data to seed here
    },
  })
}

// Call the function here to run your seed script
await seed()
```
````

### Running the Script

You can execute the script using the `payload run` command. For example, if your script is saved as `src/seed.ts`, run:

```bash
payload run src/seed.ts
```

### What `payload run` Does:

1. **Loads environment variables** the same way Next.js does, eliminating the need for additional dependencies like `dotenv`.

   > Note: The usage of `dotenv` is not recommended, as Next.js handles environment variables differently.  
   > By using `payload run`, you ensure consistent environment variable handling across your Payload and Next.js setup.

2. **Initializes `tsx`**, allowing direct execution of TypeScript files without manually installing tools like `tsx` or `ts-node`.

---

## Troubleshooting

If you encounter import-related errors, you have two options:

### Option 1: Enable SWC Mode

Enable **SWC mode** by appending `--use-swc` to the `payload` command:

```bash
payload run src/seed.ts --use-swc
```

> Note: Install `@swc-node/register` in your project first.  
> **SWC mode** is faster than the default `tsx` mode but might break for some imports.

### Option 2: Use an Alternative Runtime like Bun

You can use alternative runtimes like **Bun**. Disable Payload's transpilation by appending the `--disable-transpilation` flag to the command:

```bash
bunx --bun payload run src/seed.ts --disable-transpile
```

> Note: You will need **Bun** installed on your system for this to work.

```

```
