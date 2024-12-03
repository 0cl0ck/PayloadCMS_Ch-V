# REST API in PayloadCMS

## Overview

A fully functional REST API is automatically generated from your Collection and Global configurations.

The REST API supports:

- Full CRUD operations.
- Automatic pagination, depth, and sorting.
- Routes prefixed by the `routes.api` URL segment (default: `/api`).

---

## REST Query Parameters

The following query parameters can be used in REST API requests:

- `depth`: Automatically populates relationships and uploads.
- `locale`: Retrieves document(s) in a specific locale.
- `fallback-locale`: Specifies a fallback locale if no value exists in the current locale.
- `select`: Specifies which fields to include in the result.
- `populate`: Specifies which fields to include from populated documents.

---

## Collections

Each collection is mounted using its `slug`. For example, if a collection's slug is `users`, its routes will be available at `/api/users`.

> **Note**: Collection slugs must be formatted in kebab-case.

### CRUD Operations

The following operations are available for collections:

- **Find**: `GET /api/{collection-slug}`
- **Find By ID**: `GET /api/{collection-slug}/{id}`
- **Count**: `GET /api/{collection-slug}/count`
- **Create**: `POST /api/{collection-slug}`
- **Update**: `PATCH /api/{collection-slug}`
- **Update By ID**: `PATCH /api/{collection-slug}/{id}`
- **Delete**: `DELETE /api/{collection-slug}`
- **Delete By ID**: `DELETE /api/{collection-slug}/{id}`

---

## Auth Operations

For auth-enabled collections, additional endpoints are provided:

- **Login**: `POST /api/{user-collection}/login`
- **Logout**: `POST /api/{user-collection}/logout`
- **Unlock**: `POST /api/{user-collection}/unlock`
- **Refresh Token**: `POST /api/{user-collection}/refresh-token`
- **Verify User**: `POST /api/{user-collection}/verify/{token}`
- **Current User**: `GET /api/{user-collection}/me`
- **Forgot Password**: `POST /api/{user-collection}/forgot-password`
- **Reset Password**: `POST /api/{user-collection}/reset-password`

---

## Globals

Globals cannot be created or deleted. Only the following operations are available:

- **Get Global**: `GET /api/globals/{global-slug}`
- **Update Global**: `POST /api/globals/{global-slug}`

---

## Preferences

The REST API also provides endpoints to manage admin user preferences:

- **Get Preference**: `GET /api/payload-preferences/{key}`
- **Create Preference**: `POST /api/payload-preferences/{key}`
- **Delete Preference**: `DELETE /api/payload-preferences/{key}`

---

## Custom Endpoints

You can add custom REST API endpoints to collections, globals, or at the top level of the Payload configuration. Custom endpoints allow you to add middleware or build custom functionality.

### Endpoint Properties

Each custom endpoint requires the following properties:

- `path`: A string defining the endpoint route after the collection or global slug.
- `method`: The HTTP verb to use (e.g., `get`, `post`, `put`, `delete`).
- `handler`: A function or array of functions to handle the request, with access to `req`, `res`, and `next`.
- `root` (optional): When `true`, defines the endpoint at the root of the Next.js app, bypassing Payload handlers. Note: This applies only to top-level endpoints in the Payload configuration.
- `custom` (optional): Additional data for extensions or plugins.

### Example: Custom Endpoint in a Collection

```javascript
import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    /* Collection fields */
  ],
  endpoints: [
    {
      path: '/:id/tracking',
      method: 'get',
      handler: async (req) => {
        const tracking = await getTrackingInfo(req.routeParams.id);

        if (!tracking) {
          return Response.json({ error: 'not found' }, { status: 404 });
        }

        return Response.json({
          message: `Hello ${req.routeParams.name} @ ${req.routeParams.group}`,
        });
      },
    },
    {
      path: '/:id/tracking',
      method: 'post',
      handler: async (req) => {
        const data = await req.json();
        await req.payload.update({
          collection: 'tracking',
          data: {
            // Update data
          },
        });
        return Response.json({ message: 'successfully updated tracking info' });
      },
    },
    {
      path: '/:id/forbidden',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'forbidden' }, { status: 403 });
        }

        return Response.json({ message: 'Access granted' });
      },
    },
  ],
};
```

---

## Helpful Tips

### `req.data`

Data is not automatically appended to the request body. Use `await req.json()` to access it or use a helper function:

```javascript
import { addDataAndFileToRequest } from '@payloadcms/next/utilities';

{
  path: '/:id/tracking',
  method: 'post',
  handler: async (req) => {
    await addDataAndFileToRequest(req);
    await req.payload.update({
      collection: 'tracking',
      data: {
        // Update data
      },
    });
    return Response.json({ message: 'successfully updated tracking info' });
  },
}
```

### `req.locale` and `req.fallbackLocale`

These are not automatically appended to custom requests. Use a helper function to include them:

```javascript
import { addLocalesToRequestFromData } from '@payloadcms/next/utilities';

{
  path: '/:id/tracking',
  method: 'post',
  handler: async (req) => {
    await addLocalesToRequestFromData(req);
    return Response.json({ message: 'success' });
  },
}
```

---

## Method Override for GET Requests

Payload supports a method override feature to allow sending `GET` requests using the `POST` method. This is useful for cases where a query string in a `GET` request may be too long.

### How to Use

Include the `X-HTTP-Method-Override` header set to `GET` in your `POST` request. Send the parameters in the body with `Content-Type` set to `application/x-www-form-urlencoded`.

#### Example: Using Method Override (POST)

```javascript
const res = await fetch(`${api}/${collectionSlug}`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Accept-Language': i18n.language,
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-HTTP-Method-Override': 'GET',
  },
  body: qs.stringify({
    depth: 1,
    locale: 'en',
  }),
})
```

#### Equivalent Regular GET Request

```javascript
const res = await fetch(`${api}/${collectionSlug}?depth=1&locale=en`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Accept-Language': i18n.language,
  },
})
```
