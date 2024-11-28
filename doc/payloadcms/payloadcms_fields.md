# Fields Overview

Fields are the building blocks of Payload. They define the schema of the Documents that will be stored in the Database, as well as automatically generate the corresponding UI within the Admin Panel.

There are many Field Types to choose from, ranging anywhere from simple text strings to nested arrays and blocks. Most fields save data to the database, while others are strictly presentational. Fields can have Custom Validations, Conditional Logic, Access Control, Hooks, and so much more.

To configure fields, use the `fields` property in your Collection or Global config:

```javascript
import type { CollectionConfig } from 'payload'

export const Page: CollectionConfig = {
  // ...
  fields: [
    // ...
  ]
}
```

You can fully customize the appearance and behavior of all fields within the Admin Panel. [More details](#field-options).

---

## Field Types

Payload provides a wide variety of built-in Field Types, each with its own unique properties and behaviors that determine which values it can accept, how it is presented in the API, and how it will be rendered in the Admin Panel.

### Example Configuration

```javascript
import type { CollectionConfig } from 'payload'

export const Page: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'field',
      type: 'text',
    }
  ]
}
```

**Reminder**: Each field is an object with at least the `type` property. This matches the field to its corresponding Field Type. [More details](#field-types).

There are two main categories of fields in Payload:

1. **Data Fields**
2. **Presentational Fields**

To begin writing fields, first determine which Field Type best supports your application. Then author your field accordingly using the Field Options for your chosen field type.

---

### Data Fields

Data Fields are used to store data in the Database. All Data Fields have a `name` property, which is the key used to store the field's value.

**Available Data Fields:**

- **Array**: For repeating content, supports nested fields.
- **Blocks**: For block-based content, supports nested fields.
- **Checkbox**: Saves boolean `true`/`false` values.
- **Code**: Renders a code editor interface that saves a string.
- **Date**: Renders a date picker and saves a timestamp.
- **Email**: Ensures the value is a properly formatted email address.
- **Group**: Nests fields within a keyed object.
- **JSON**: Renders a JSON editor interface that saves a JSON object.
- **Number**: Saves numeric values.
- **Point**: For location data, saves geometric coordinates.
- **Radio**: Renders a radio button group that allows only one value to be selected.
- **Relationship**: Assigns relationships to other collections.
- **Rich Text**: Renders a fully extensible rich text editor.
- **Select**: Renders a dropdown/picklist style value selector.
- **Tabs (Named)**: Similar to group, but renders nested fields within a tabbed layout.
- **Text**: Simple text input that saves a string.
- **Textarea**: Similar to text, but allows for multi-line input.
- **Upload**: Allows local file and image upload.

---

### Presentational Fields

Presentational Fields do not store data in the database. Instead, they are used to organize and present other fields in the Admin Panel or to add custom UI components.

**Available Presentational Fields:**

- **Collapsible**: Nests fields within a collapsible component.
- **Join**: Achieves two-way data binding between fields.
- **Row**: Aligns fields horizontally.
- **Tabs (Unnamed)**: Nests fields within a tabbed layout.
- **UI**: Blank field for custom UI components.

**Tip**: Don't see a Field Type that fits your needs? You can build your own using a **Custom Field Component**.

---

## Field Options

All fields require at least the `type` property. This matches the field to its corresponding Field Type to determine its appearance and behavior within the Admin Panel. Each Field Type has its own unique set of options.

### Example Configuration

```javascript
import type { Field } from 'payload'

export const MyField: Field = {
  type: 'text',
  name: 'myField',
}
```

For a full list of configuration options, see the documentation for each Field Type.

---

## Field Names

All Data Fields require a `name` property. This is the key used to store and retrieve the field's value in the database. This property must be unique amongst this field's siblings.

**Example Configuration:**

```javascript
import type { Field } from 'payload'

export const MyField: Field = {
  type: 'text',
  name: 'myField',
}
```

**Forbidden Field Names:**

- `__v`
- `salt`
- `hash`
- `file`

Using reserved field names will result in your field being sanitized from the config.

---

## Field-level Hooks

To define Field-level Hooks, use the `hooks` property in your Field Config:

```javascript
import type { Field } from 'payload'

export const MyField: Field = {
  type: 'text',
  name: 'myField',
  hooks: {
    // ...
  }
}
```

For full details, see the [Field Hooks documentation](#field-level-hooks).

---

## Field-level Access Control

To define granular permissions field-by-field, use the `access` property:

```javascript
import type { Field } from 'payload'

export const MyField: Field = {
  type: 'text',
  name: 'myField',
  access: {
    // ...
  }
}
```

---

## Default Values

Fields can be optionally prefilled with initial values using the `defaultValue` property:

```javascript
import type { Field } from 'payload'

export const MyField: Field = {
  type: 'text',
  name: 'myField',
  defaultValue: 'Hello, World!',
}
```

Default values can also be functions that return a value, like so:

```javascript
import type { Field } from 'payload'

const translation = {
  en: 'Written by',
  es: 'Escrito por',
}

export const myField: Field = {
  name: 'attribution',
  type: 'text',
  defaultValue: ({ user, locale }) =>
    `${translation[locale]} ${user.name}`,
}
```

---

## Validation

Fields are automatically validated based on their Field Type and Field Options. You can customize validations using the `validate` property:

```javascript
import type { Field } from 'payload'

export const MyField: Field = {
  type: 'text',
  name: 'myField',
  validate: value => Boolean(value) || 'This field is required'
}
```

---

## Async Field Validations

Custom validation functions can also be asynchronous:

```javascript
import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    {
      name: 'customerNumber',
      type: 'text',
      validate: async (val, { operation }) => {
        if (operation !== 'create') return true
        const response = await fetch(`https://your-api.com/customers/${val}`)
        if (response.ok) return true
        return 'The customer number provided does not match any customers within our records.'
      },
    },
  ],
}
```

---

## Admin Options

You can use the `admin` key to specify properties that affect how fields are rendered within the Admin Panel:

```javascript
import type { Field } from 'payload'

export const MyField: Field = {
  type: 'text',
  name: 'myField',
  admin: {
    // ...
  }
}
```

For more details, see the [Admin Options documentation](#admin-options).

---

## Custom ID Fields

To define a custom ID field, add a top-level field with the name `id`:

```javascript
import type { CollectionConfig } from 'payload'

export const MyCollection: CollectionConfig = {
  // ...
  fields: [
    {
      name: 'id',
      required: true,
      type: 'number',
    },
  ],
}
```

Reminder: Custom ID fields can only be of type **Number** or **Text**, and text IDs must not contain `/` or `.` characters.

---

## TypeScript

You can import the Payload Field type as well as other common types from the `payload` package:

```javascript
import type { Field } from 'payload'
```
