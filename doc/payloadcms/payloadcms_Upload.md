# Uploads in PayloadCMS

## Overview

Payload provides built-in functionality for file upload, storage, and management directly on your server, with robust file access control.

### Common Use Cases

- **Media Library**: Store and manage images for your site or app.
- **Gated Content**: Provide downloadable assets (e.g., PDFs, whitepapers) behind sign-ups.
- **Public Assets**: Host publicly available files (e.g., ZIP files, MP4s).

By enabling uploads on a Collection:

- Fields such as `filename`, `mimeType`, and `filesize` are automatically added.
- Optional resized image sizes can be generated with an `imageSizes` array.
- The Admin Panel adapts to display file thumbnails and an upload interface.
- CRUD operations support file upload, re-upload, and deletion.

---

## Enabling Uploads

Uploads can be enabled on any Collection by setting the `upload` property in its configuration.

### Example: Media Collection with Uploads

```typescript
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined, // Retain original aspect ratio
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
```

---

## Collection Upload Options

Below are the available options for configuring uploads in a Collection:

- **`adminThumbnail`**: Customize how thumbnails are displayed in the Admin Panel.
- **`bulkUpload`**: Allow bulk uploads from the list view (default: `true`).
- **`crop`**: Enable or disable the cropping tool (default: `true`).
- **`disableLocalStorage`**: Prevent local file storage when using external storage solutions.
- **`displayPreview`**: Enable file previews in related upload fields.
- **`externalFileHeaderFilter`**: Modify headers for external file requests.
- **`filesRequiredOnCreate`**: Require file data on creation (default: `true`).
- **`filenameCompoundIndex`**: Define compound index fields for filenames.
- **`focalPoint`**: Enable or disable focal point selection for images.
- **`formatOptions`**: Pass formatting options to the Sharp image library.
- **`handlers`**: Custom request handlers for file retrieval.
- **`imageSizes`**: Define automatic resizing options for uploaded images.
- **`mimeTypes`**: Restrict allowed file types.
- **`resizeOptions`**: Additional resizing options for Sharp.
- **`staticDir`**: Directory to store media (default: collection slug).
- **`trimOptions`**: Options for trimming uploaded images.
- **`withMetadata`**: Include metadata in the output image file.

---

## Payload-wide Upload Options

Global upload options can be set in the Payload config:

### Example: Increase File Size Limit

```typescript
import { buildConfig } from 'payload'

export default buildConfig({
  collections: [
    {
      slug: 'media',
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
      upload: true,
    },
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB in bytes
    },
  },
})
```

---

## Custom Filename via Hooks

You can customize filenames before upload using the `beforeOperation` hook:

```typescript
beforeOperation: [
  ({ req, operation }) => {
    if ((operation === 'create' || operation === 'update') && req.file) {
      req.file.name = 'custom-filename.jpg'
    }
  },
]
```

The `req.file` object contains file details like `mimeType` and `extension`.

---

## Image Sizes

When `imageSizes` is specified, Payload automatically resizes and crops uploads to the specified dimensions.

### Example: Custom File Name per Size

```typescript
{
  name: 'thumbnail',
  width: 400,
  height: 300,
  generateImageName: ({ height, sizeName, extension, width }) => {
    return `custom-${sizeName}-${height}-${width}.${extension}`;
  },
}
```

#### Handling Small Images

Use the `withoutEnlargement` property to control behavior:

- `undefined` (default): Return `null` if the image is smaller than the size.
- `false`: Always enlarge images.
- `true`: Return the original image if smaller than the size.

---

## Disabling Local Storage

To disable local storage (e.g., for external storage solutions like S3), set `disableLocalStorage: true` in the upload config.

> **Note**: If local storage is disabled, admin thumbnails must be managed externally.

---

## Admin Thumbnails

Customize Admin Panel thumbnails using:

- **A string**: Reference an image size name.
- **A function**: Generate a custom thumbnail URL.

### Example

```typescript
upload: {
  adminThumbnail: ({ doc }) => `https://example.com/files/${doc.filename}`,
},
```

---

## MIME Types

Restrict allowed file types using the `mimeTypes` property:

```typescript
upload: {
  mimeTypes: ['image/*', 'application/pdf'],
},
```

---

## Uploading Files

File uploads are supported via the REST and Local APIs. Use the `create` endpoint and send a `multipart/form-data` request.

### Example

```javascript
const fileInput = document.querySelector('#your-file-input')
const formData = new FormData()

formData.append('file', fileInput.files[0])

fetch('/api/:upload-slug', {
  method: 'POST',
  body: formData,
})
```

---

## Access Control

Files inherit the `read` Access Control function from their Collection, allowing granular control over who can view uploaded files.

---

For more details, refer to the [Payload Documentation](https://payloadcms.com/docs).

```

```
