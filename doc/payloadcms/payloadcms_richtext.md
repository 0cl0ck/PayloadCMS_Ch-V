Voici le texte formaté en Markdown pour un fichier `.md` :

````markdown
# Overview: Rich Text Editors

Payload currently supports two official rich text editors. You can choose either one depending on your needs:

1. **SlateJS**
   - Stable
   - Backwards-compatible with Payload 1.0
2. **Lexical** _(recommended)_
   - More modern
   - Greater feature set

---

## Choosing an Editor

These editors are built on an "adapter pattern," meaning you will need to install the editor you'd like to use. Check the documentation for the respective editor for detailed installation instructions:

- [SlateJS Documentation](https://docs.slatejs.org/)
- [Lexical Documentation](https://lexical.dev/)

---

## TL;DR

- **SlateJS**: Used in past projects, still supported for existing projects.
- **Lexical**: Recommended for new projects, offering advanced features and functionality.

If you're building something new and you're feeling adventurous, you should give Lexical a shot. While Slate has a lot of great features, Lexical offers much more.

---

## Setting Up the Editor

To use an editor, you must install it at the top level of your Payload config under the `config.editor` property. This configuration will cascade across all of your rich text fields.

### Example: Configuring the Editor

```javascript
// payload.config.ts
{
  editor: 'lexical', // or 'slate'
  // Other config options...
}
```
````

---

## Field-Specific Overrides

You also have the option to override the editor on a field-by-field basis. For example:

```javascript
{
  name: 'content',
  type: 'richText',
  editor: 'slate', // Overrides the global setting
  // Other field options...
}
```

---

Choose the editor that best fits your project's requirements and enjoy a rich text editing experience tailored to your needs.
Voici le texte correctement formaté en Markdown pour un fichier `.md` :

````markdown
# Slate Rich Text

The Slate editor has been supported by Payload since its initial beta release. It's battle-tested and will continue to be supported in the future. If you are migrating a Payload project from version 1.x or earlier, you can continue using the Slate editor as long as you'd like.

---

## Installation

To use the Slate editor, you first need to install it:

```bash
npm install --save @payloadcms/richtext-slate
```
````

---

## Configuring Slate Editor

### Top-Level Configuration

Pass the Slate editor to your top-level Payload Config:

```typescript
import { buildConfig } from 'payload'
import { slateEditor } from '@payloadcms/richtext-slate'

export default buildConfig({
  collections: [
    // your collections here
  ],
  editor: slateEditor({}), // Pass the Slate editor to the root config
})
```

### Field-Level Configuration

You can also install the Slate editor on a field-by-field basis while customizing its options:

```typescript
import type { CollectionConfig } from 'payload'
import { slateEditor } from '@payloadcms/richtext-slate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: [
            // customize elements allowed in Slate editor here
          ],
          leaves: [
            // customize leaves allowed in Slate editor here
          ],
        },
      }),
    },
  ],
}
```

---

## Admin Options

### Elements

The `elements` property is used to specify which built-in or custom SlateJS elements should be available within the Admin Panel.

**Default Elements:**

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- `blockquote`
- `link`
- `ol`, `ul`
- `textAlign`
- `indent`
- `relationship`
- `upload`

### Leaves

The `leaves` property specifies which built-in or custom SlateJS leaves should be enabled within the Admin Panel.

**Default Leaves:**

- `bold`
- `code`
- `italic`
- `strikethrough`
- `underline`

### Link Fields

You can define additional fields for links in your Rich Text editor. These fields will appear in a modal when editing a link.

```typescript
link: {
  fields: [
    {
      name: 'rel',
      label: 'Rel Attribute',
      type: 'select',
      hasMany: true,
      options: ['noopener', 'noreferrer', 'nofollow'],
    },
  ],
}
```

### Upload Collections

Define metadata fields for upload elements directly within the Rich Text Editor. These fields will also render in a modal when editing the upload.

---

## Built-In Elements

### Relationship Element

The built-in relationship element allows you to reference other documents directly within your Rich Text editor.

### Upload Element

The upload element is used to reference upload-enabled collections, like media/image uploads, directly within the editor.

---

## Customizing Rich Text Elements

You can design and build your own SlateJS elements and leaves to extend the editor's functionality. Refer to the [SlateJS documentation](https://docs.slatejs.org/) for guidance on building custom elements and leaves.

### Example: Custom Elements and Leaves

```typescript
{
  name: 'cta',
  Button: CustomCallToActionButton,
  Element: CustomCallToActionElement,
  plugins: [
    // Add any plugins required for this element
  ],
},
{
  name: 'highlight',
  Button: CustomHighlightButton,
  Leaf: CustomHighlightLeaf,
  plugins: [
    // Add any plugins required for this leaf
  ],
}
```

### Specifying Elements and Leaves

Define arrays to specify the default elements and leaves allowed for a field, or pass custom objects with corresponding properties.

---

## Rendering Rich Text Content

The Rich Text field saves its content in JSON format, which needs to be rendered as HTML or JSX. Here's an example:

### Example: Rendering Rich Text to JSX

```typescript
import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";

const serialize = (children) =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }
      if (node.code) {
        text = <code key={i}>{text}</code>;
      }
      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return <h1 key={i}>{serialize(node.children)}</h1>;
      case "blockquote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case "ul":
        return <ul key={i}>{serialize(node.children)}</ul>;
      case "link":
        return (
          <a href={escapeHTML(node.url)} key={i}>
            {serialize(node.children)}
          </a>
        );
      default:
        return <p key={i}>{serialize(node.children)}</p>;
    }
  });
```

> **Note:** For rendering plain HTML, simply return strings instead of JSX elements.

---

## Built-In Plugins

Payload includes built-in SlateJS plugins, such as `shouldBreakOutOnEnter`. This plugin allows elements like headings to break out into paragraphs when pressing "Enter."

---

## TypeScript

If you are building custom Rich Text elements or leaves, you can import the following types:

```typescript
import type { RichTextCustomElement, RichTextCustomLeaf } from '@payloadcms/richtext-slate'
```
