Voici le texte formaté en Markdown (.md) pour une utilisation propre dans ton IDE :

````markdown
# Collection Configs

A **Collection** is a group of records, called **Documents**, that all share a common schema. You can define as many Collections as your application needs. Each Document in a Collection is stored in the Database based on the Fields that you define, and automatically generates a **Local API**, **REST API**, and **GraphQL API** used to manage your Documents.

Collections are also used to achieve **Authentication** in Payload. By defining a Collection with auth options, that Collection receives additional operations to support user authentication.

Collections are the primary way to structure recurring data in your application, such as users, products, pages, posts, and other types of content that you might want to manage. Each Collection can have its own unique **Access Control**, **Hooks**, **Admin Options**, and more.

## Defining a Collection Config

To define a Collection Config, use the `collection` property in your Payload Config:

```javascript
import { buildConfig } from 'payload'

export default buildConfig({
  // ...
  collections: [
    // Your Collections go here
  ],
})
```
````

**Tip**: If your Collection is only ever meant to contain a single Document, consider using a **Global** instead.

---

## Config Options

It's often best practice to write your Collections in separate files and then import them into the main Payload Config.

Here is what a simple Collection Config might look like:

```javascript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'title',
      type: 'text',
    }
  ]
}
```

**Reminder**: For more complex examples, see the Templates and Examples directories in the Payload repository.

### Available Options

- **`admin`**: The configuration options for the Admin Panel. [More details](#admin-options).
- **`access`**: Provide Access Control functions to define exactly who should be able to do what with Documents in this Collection.
- **`auth`**: Specify options if you would like this Collection to feature authentication. [More details](#authentication).
- **`custom`**: Extension point for adding custom data (e.g. for plugins).
- **`disableDuplicate`**: When true, do not show the "Duplicate" button while editing documents within this Collection.
- **`defaultSort`**: Pass a top-level field to sort by default in the Collection List View.
- **`dbName`**: Custom table or Collection name depending on the Database Adapter.
- **`endpoints`**: Add custom routes to the REST API. [More details](#custom-endpoints).
- **`fields`\***: Array of field types that will determine the structure and functionality of the data stored within this Collection.
- **`graphQL`**: An object with `singularName` and `pluralName` strings used in schema generation.
- **`hooks`**: Entry point for Hooks. [More details](#hooks).
- **`labels`**: Singular and plural labels for use in identifying this Collection throughout Payload.
- **`lockDocuments`**: Enables or disables document locking.
- **`slug`\***: Unique, URL-friendly string that will act as an identifier for this Collection.
- **`timestamps`**: Set to false to disable documents' automatically generated `createdAt` and `updatedAt` timestamps.
- **`typescript`**: An object with `property interface` as the text used in schema generation.
- **`upload`**: Specify options if you would like this Collection to support file uploads.
- **`versions`**: Set to true to enable default options, or configure with object properties.
- **`defaultPopulate`**: Specify which fields to select when this Collection is populated from another document.

---

---

2. **Aperçu dans Visual Studio Code** : Si vous utilisez VS Code, activez l'aperçu Markdown avec `Ctrl+Shift+V`. Si les tableaux ne s'affichent pas correctement, assurez-vous d’avoir une extension Markdown comme **Markdown All in One** ou **Markdown Preview Enhanced**.

3. **Éviter les tableaux si nécessaire** : Si votre éditeur ne prend pas en charge les tableaux, vous pouvez formater chaque option sous forme de liste comme suit :

````markdown
### Available Options

- **`admin`**: The configuration options for the Admin Panel. [More details](#admin-options).
- **`access`**: Provide Access Control functions to define exactly who should be able to do what with Documents in this Collection.
- **`auth`**: Specify options if you would like this Collection to feature authentication. [More details](#authentication).
- **`custom`**: Extension point for adding custom data (e.g. for plugins).
- **`disableDuplicate`**: When true, do not show the "Duplicate" button while editing documents within this Collection.
- **`defaultSort`**: Pass a top-level field to sort by default in the Collection List View.
- **`dbName`**: Custom table or Collection name depending on the Database Adapter.
- **`endpoints`**: Add custom routes to the REST API. [More details](#custom-endpoints).
- **`fields`\***: Array of field types that will determine the structure and functionality of the data stored within this Collection.
- **`graphQL`**: An object with `singularName` and `pluralName` strings used in schema generation.
- **`hooks`**: Entry point for Hooks. [More details](#hooks
  |

> **Note**: An asterisk (\*) denotes that a property is required.

---

## Fields

Fields define the schema of the Documents within a Collection. To learn more, go to the [Fields documentation](#fields).

---

## Access Control

Collection Access Control determines what a user can and cannot do with any given Document within a Collection. To learn more, go to the [Access Control documentation](#access-control).

---

## Hooks

Collection Hooks allow you to tie into the lifecycle of your Documents so you can execute your own logic during specific events. To learn more, go to the [Hooks documentation](#hooks).

---

## Admin Options

You can customize the way that the Admin Panel behaves on a Collection-by-Collection basis. To learn more, go to the [Admin Options documentation](#admin-options).

---

## TypeScript

You can import types from Payload to help make writing your Collection configs easier and type-safe. There are two main types that represent the Collection Config: `CollectionConfig` and `SanitizeCollectionConfig`.

- The `CollectionConfig` type represents a raw Collection Config in its full form, where only the bare minimum properties are marked as required.
- The `SanitizedCollectionConfig` type represents a Collection Config after it has been fully sanitized. Generally, this is only used internally by Payload.

```javascript
import type { CollectionConfig, SanitizedCollectionConfig } from 'payload'
```
````

```

```
