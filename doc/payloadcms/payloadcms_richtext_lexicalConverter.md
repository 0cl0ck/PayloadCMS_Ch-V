````markdown
# Lexical Converters

Lexical saves data in JSON, offering flexibility and enabling easy conversion to formats like JSX, HTML, or Markdown.

## Lexical => JSX

If you have a React-based frontend, converting Lexical to JSX is the recommended way to render rich text content. Use the `RichText` component from `@payloadcms/richtext-lexical/react`:

```jsx
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const MyComponent = ({ lexicalData }) => {
  return <RichText data={lexicalData} />
}
```
````

### Converting Lexical Blocks to JSX

For custom blocks or inline blocks, pass the converter for your block to the `RichText` component:

```jsx
import React from 'react';
import {
  type JSXConvertersFunction,
  RichText,
} from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    myTextBlock: ({ node }) => (
      <div style={{ backgroundColor: 'red' }}>{node.fields.text}</div>
    ),
  },
});

export const MyComponent = ({ lexicalData }) => {
  return (
    <RichText
      converters={jsxConverters}
      data={lexicalData.lexicalWithBlocks as SerializedEditorState}
    />
  );
};
```

## Lexical => HTML

If your frontend isn't React-based, or you need to send content to a third-party service, convert Lexical to HTML. This can be done by:

1. **Outputting HTML from the Collection**: Converts JSON content to HTML directly within the collection.
2. **Generating HTML on any server**: Converts JSON to HTML on-demand on the server.

### Outputting HTML from the Collection

Add HTML generation directly within the collection:

```ts
import type { CollectionConfig } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'nameOfYourRichTextField',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('nameOfYourRichTextField', {
      name: 'nameOfYourRichTextField_html',
    }),
  ],
}
```

### Generating HTML on the Server

Convert JSON to HTML using `convertLexicalToHTML`:

```ts
import { consolidateHTMLConverters, convertLexicalToHTML } from '@payloadcms/richtext-lexical'

await convertLexicalToHTML({
  converters: consolidateHTMLConverters({ editorConfig }),
  data: editorData,
  req,
})
```

### Example: Generating HTML with `afterRead` Hook

```ts
import type { FieldHook } from 'payload'
import {
  HTMLConverterFeature,
  consolidateHTMLConverters,
  convertLexicalToHTML,
  defaultEditorConfig,
  defaultEditorFeatures,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical'

const hook: FieldHook = async ({ req, siblingData }) => {
  const editorConfig = defaultEditorConfig

  editorConfig.features = [...defaultEditorFeatures, HTMLConverterFeature({})]

  const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, req.payload.config)

  const html = await convertLexicalToHTML({
    converters: consolidateHTMLConverters({
      editorConfig: sanitizedEditorConfig,
    }),
    data: siblingData.lexicalSimple,
    req,
  })
  return html
}
```

### Styling HTML Output

Payload's HTML converter adds classes to the generated HTML. Use the following base CSS to ensure proper rendering of nested lists:

```css
.nestedListItem,
.list-check {
  list-style-type: none;
}
```

## Creating a Custom HTML Converter

Example of an HTML converter for an Upload node:

```ts
import type { HTMLConverter } from '@payloadcms/richtext-lexical'

const UploadHTMLConverter: HTMLConverter<SerializedUploadNode> = {
  converter: async ({ node, req }) => {
    const uploadDocument: { value?: any } = {}
    if (req) {
      await populate({
        id,
        collectionSlug: node.relationTo,
        currentDepth: 0,
        data: uploadDocument,
        depth: 1,
        req,
      })
    }
    const url = `${req?.payload?.config?.serverURL || ''}${uploadDocument?.value?.url}`

    if (!(uploadDocument?.value?.mimeType as string)?.startsWith('image')) {
      return ''
    }

    return `<img src="${url}" alt="${uploadDocument?.value?.filename}" width="${uploadDocument?.value?.width}" height="${uploadDocument?.value?.height}" />`
  },
  nodeTypes: [UploadNode.getType()],
}
```

## Headless Editor

Use the headless editor to convert between formats like HTML, Markdown, and Lexical JSON.

### Example: HTML => Lexical

```ts
import { $generateNodesFromDOM } from '@payloadcms/richtext-lexical/lexical/html'
import { $getRoot } from '@payloadcms/richtext-lexical/lexical'
import { JSDOM } from 'jsdom'

headlessEditor.update(() => {
  const dom = new JSDOM(htmlString)
  const nodes = $generateNodesFromDOM(headlessEditor, dom.window.document)

  $getRoot().select().insertNodes(nodes)
})

const editorJSON = headlessEditor.getEditorState().toJSON()
```

### Example: Markdown => Lexical

```ts
import { $convertFromMarkdownString } from '@payloadcms/richtext-lexical'

headlessEditor.update(() => {
  $convertFromMarkdownString(markdown, sanitizedEditorConfig.features.markdownTransformers)
})
```

### Example: Lexical => Markdown

```ts
import { $convertToMarkdownString } from '@payloadcms/richtext-lexical/lexical/markdown'

headlessEditor.getEditorState().read(() => {
  markdown = $convertToMarkdownString(sanitizedEditorConfig.features.markdownTransformers)
})
```

### Example: Lexical => Plain Text

```ts
import { $getRoot } from '@payloadcms/richtext-lexical/lexical'

const plainTextContent =
  headlessEditor.getEditorState().read(() => {
    return $getRoot().getTextContent()
  }) || ''
```

```

```
