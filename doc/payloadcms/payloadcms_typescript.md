Voici le texte formaté en Markdown pour un fichier `.md` :

````markdown
# TypeScript - Overview

Payload supports TypeScript natively, and not only that, the entirety of the CMS is built with TypeScript. To get started developing with Payload and TypeScript, you can use one of Payload's built-in boilerplates in one line via `create-payload-app`:

```bash
npx create-payload-app@latest
```
````

Pick a TypeScript project type to get started easily.

---

## Setting up from Scratch

It's also possible to set up a TypeScript project from scratch. A guide for this process is planned, so keep an eye out for updates.

---

## Using Payload's Exported Types

Payload exports a number of types that you may find useful while writing your own custom functionality like:

- Plugins
- Hooks
- Access Control functions
- Custom Views
- GraphQL queries/mutations
- Anything else related to your project

---

### Config Types

Here are the main configuration types exported by Payload:

- **Base Config**
- **Collections**
- **Globals**
- **Fields**

---

### Hook Types

Payload also provides types for hooks, including:

- **Collection Hooks**
- **Global Hooks**
- **Field Hooks**

````

Voici le texte formaté en Markdown pour un fichier `.md` :

```markdown
# Generating TypeScript Interfaces

While building your own custom functionality into Payload (like Plugins, Hooks, Access Control functions, Custom Views, GraphQL queries/mutations, etc.), you can dynamically generate TypeScript types from your Payload Config itself.

---

## Types Generation Script

Run the following command in a Payload project to generate types based on your Payload Config:

```bash
payload generate:types
````

You can run this command whenever you need to regenerate your types, and then use these types in your Payload code directly.

---

## Disable `declare` Statement

By default, `generate:types` will add a `declare` statement to your types file, which automatically enables type inference within Payload.

If you are using your `payload-types.ts` file in other repositories, it might be better to disable this `declare` statement to avoid TypeScript errors in projects that use your Payload types but do not have Payload installed.

To disable the `declare` statement, update your Payload Config:

```typescript
// payload.config.ts
{
  // ...
  typescript: {
    declare: false, // defaults to true if not set
  },
}
```

If you disable the `declare` pattern, you'll need to manually add a `declare` statement in your code. Here's an example:

```typescript
import { Config } from './payload-types'

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
```

---

## Custom Output File Path

You can specify a custom location for the generated types file by updating your Payload Config:

```typescript
// payload.config.ts
{
  // ...
  typescript: {
    outputFile: path.resolve(__dirname, './generated-types.ts'),
  },
}
```

The above example places your types in a file named `generated-types.ts` next to your Payload Config.

---

## Custom Generated Types

Payload generates types based on a JSON schema. You can extend this schema by passing a function to `typescript.schema` in your Payload Config:

```typescript
// payload.config.ts
{
  // ...
  typescript: {
    schema: [
      ({ jsonSchema }) => {
        // Modify the JSON schema here
        jsonSchema.definitions.Test = {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
          },
          required: ['title', 'content'],
        }
        return jsonSchema
      },
    ]
  }
}
```

This configuration generates the following TypeScript interface:

```typescript
export interface Test {
  title: string
  content: string
  [k: string]: unknown
}
```

---

## Example Usage

Here’s an example Payload Config and the generated types:

### Config

```typescript
import type { Config } from 'payload'

const config: Config = {
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'posts',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
    },
  ],
}
```

### Generated Types

```typescript
export interface User {
  id: string
  name: string
  email?: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
}

export interface Post {
  id: string
  title?: string
  author?: string | User
}
```

---

## Custom Field Interfaces

For fields like `array`, `block`, `group`, and `named tab`, you can generate reusable interfaces by adding an `interfaceName` property in the field configuration:

### Config Example

```typescript
{
  type: 'group',
  name: 'meta',
  interfaceName: 'SharedMeta', // Custom reusable interface name
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
}
```

### Generated Interface

```typescript
export interface SharedMeta {
  title?: string
  description?: string
}

// Example usage inside collection interface
export interface Collection1 {
  meta?: SharedMeta
}
```

**Note:** Be cautious of naming collisions. It’s recommended to scope your interfaces, e.g., `MetaGroup`.

---

## Using Your Types

Once your types are generated, Payload's Local API will now be typed. For frontend codebases, you can copy the generated types file into your frontend project for type safety.

---

## Adding an NPM Script

**Important**:  
Payload needs to locate your config file to generate types. If your config is in a `/src` directory or elsewhere, you must specify its location using an environment variable.

Here’s how to add an NPM script for type generation:

1. Open your `package.json`.
2. Add the following script:

```json
{
  "scripts": {
    "generate:types": "PAYLOAD_CONFIG_PATH=src/payload.config.ts payload generate:types"
  }
}
```

Now, you can run the following command to generate your types:

```bash
yarn generate:types
```

```

```
