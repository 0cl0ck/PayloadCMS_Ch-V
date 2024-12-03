````markdown
# Lexical Overview

Payload aims to build the best rich text editor experience, combining the elegance of Medium's editor with the robust features of Notion's editor.

## Why Lexical?

Payload has transitioned from SlateJS to Lexical due to its advantages:

- **"/" Menu**: Quickly add new elements using the keyboard.
- **Hover Toolbar**: Pops up when text is selected.
- **Native Support for Payload Blocks**: Seamlessly integrates within the editor.
- **Custom Elements (Features)**: Easier to build compared to Slate.

## Installation

To get started with Lexical, install it:

```bash
npm install @payloadcms/richtext-lexical
```
````

Then, integrate it into your Payload config:

```ts
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  collections: [
    // your collections here
  ],
  editor: lexicalEditor({}),
})
```

You can also override Lexical settings on a per-field basis:

```ts
import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
    },
  ],
}
```

## Extending Lexical with Features

### Features: The Building Blocks

Features are the core extensibility mechanism in Lexical. You can:

- Use the default features.
- Remove all features for a blank editor.
- Add custom features tailored to your needs.

### Adding Custom Features

To integrate custom features, use the `features` property:

```ts
import {
  BlocksFeature,
  LinkFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../blocks/Banner'
import { CallToAction } from '../blocks/CallToAction'

const editor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    LinkFeature({
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
          admin: {
            description:
              'Defines the relationship between the linked resource and the current document.',
          },
        },
      ],
    }),
    UploadFeature({
      collections: {
        uploads: {
          fields: [
            {
              name: 'caption',
              type: 'richText',
              editor: lexicalEditor(),
            },
          ],
        },
      },
    }),
    BlocksFeature({
      blocks: [Banner, CallToAction],
    }),
  ],
})
```

### Features Overview

Lexical includes the following features:

- **Text Formatting**:
  - Bold
  - Italic
  - Underline
  - Strikethrough
  - Subscript
  - Superscript
  - Inline Code
- **Structural Elements**:
  - Paragraphs
  - Headings (customizable H1–H6)
  - Alignments (left, center, right)
  - Indentation
- **Lists**:
  - Unordered
  - Ordered
  - Checklists
- **Other Elements**:
  - Links (internal and external)
  - Block-level relationships
  - Block quotes
  - Upload nodes (e.g., images)
  - Horizontal rules (`<hr>`)
- **Toolbars**:
  - Inline Toolbar (appears on text selection)
  - Fixed Toolbar (pinned to the top)
- **Advanced Features**:
  - Blocks (reuse Payload blocks directly)
  - TreeView (debug editor state)
  - Tables (experimental)

### Custom Toolbars

Toolbars themselves are features, allowing complete customization or replacement if needed.

## TypeScript Integration

Lexical provides robust type safety for all editor data. Every node type is fully typed, and you can customize types for your specific needs.

### Typed Editor State

You can define the type of your editor's JSON state:

```ts
import type {
  SerializedAutoLinkNode,
  SerializedBlockNode,
  SerializedParagraphNode,
  TypedEditorState,
} from '@payloadcms/richtext-lexical'

const editorState: TypedEditorState<
  SerializedAutoLinkNode | SerializedBlockNode | SerializedParagraphNode
> = {
  root: {
    type: 'root',
    direction: 'ltr',
    children: [
      {
        children: [
          {
            text: 'Example text',
            type: 'text',
          },
        ],
        type: 'paragraph',
      },
    ],
  },
}
```

Alternatively, use `DefaultTypedEditorState` for default node types:

```ts
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

const editorState: DefaultTypedEditorState = {
  root: {
    type: 'root',
    direction: 'ltr',
    children: [
      {
        children: [
          {
            text: 'Example text',
            type: 'text',
          },
        ],
        type: 'paragraph',
      },
    ],
  },
}
```

### Notes on Types

- Use types exported from `@payloadcms/richtext-lexical` for compatibility.
- Lexical currently doesn't auto-generate richText field type definitions but will in the future.

## Conclusion

Lexical provides an extensible, type-safe, and feature-rich editor experience for Payload users. By leveraging its robust customization options, you can create tailored editing experiences that meet your exact needs.

```

```
