# The Admin Panel in PayloadCMS

## Overview

The Admin Panel is a dynamic, type-safe interface to manage users and data, offering:

- **High performance**: Supports 100+ fields with ease.
- **Multi-language support**: Translated into over 30 languages.
- **White-label branding**: Fully customizable with your own components.
- **React-based**: Built with TypeScript and React using the Next.js App Router.

Features include content management, live preview, version diffing, and much more. The Admin Panel is minimal, extensible, and designed for easy customization.

---

## Project Structure

Payload integrates with your Next.js application, creating the following directory structure upon installation:

```
app/
├─ (payload)/
├── admin/
├─── [[...segments]]/
├──── page.tsx
├──── not-found.tsx
├── api/
├─── [...slug]/
├──── route.ts
├── graphql/
├──── route.ts
├── graphql-playground/
├──── route.ts
├── custom.scss
├── layout.tsx
```

### Key Components

- **`(payload)/admin/`**: Contains pages for the Admin interface.
- **`api/` and `graphql/`**: Contain routes for REST and GraphQL APIs.
- **`custom.scss`**: Custom styles for the Admin Panel.
- **`layout.tsx`**: Configures document-level settings (e.g., `<html lang="en">`).

> **Note**: If you don't use the REST or GraphQL API, you can safely delete their corresponding files.

---

## Admin Panel Options

Admin Panel options are defined in your Payload Config under the `admin` property:

```typescript
import { buildConfig } from 'payload'

const config = buildConfig({
  admin: {
    // Options go here
  },
})
```

### Available Options

- **`avatar`**: Set the profile picture (options: `gravatar`, `default`, or a custom React component).
- **`autoLogin`**: Enable automated login for development/demo purposes.
- **`buildPath`**: Specify where the built Admin bundle is stored (default: `build`).
- **`components`**: Override components across the Admin Panel.
- **`custom`**: Pass custom properties to the Admin Panel.
- **`dateFormat`**: Set the date format (uses `date-fns` format patterns).
- **`disable`**: Disable the Admin Panel entirely.
- **`livePreview`**: Enable real-time editing for live feedback.
- **`meta`**: Base metadata for the Admin Panel.
- **`routes`**: Customize or replace built-in routes.
- **`theme`**: Restrict the Admin Panel to a specific theme (default: all).
- **`user`**: Define which Collection has access to the Admin Panel.

---

## The Admin User Collection

To allow a Collection access to the Admin Panel, set the `admin.user` property to the slug of an auth-enabled Collection:

```typescript
import { buildConfig } from 'payload'

const config = buildConfig({
  admin: {
    user: 'admins',
  },
})
```

### Important Notes

- Only one auth-enabled Collection can access the Admin Panel.
- By default, Payload provides a `users` Collection for Admin access. You can customize or override this by creating a Collection with the slug `users`.

### Example Use Case

- **`admins`**: Full Admin Panel access with higher permissions.
- **`customers`**: Limited access, no Admin Panel login.

To allow only `admins` access:

```typescript
admin: {
  user: 'admins'
}
```

---

## Role-based Access Control (RBAC)

For multiple user roles in the Admin Panel:

1. Add a `roles` field to your auth-enabled Collection.
2. Use `access.admin` to grant or deny access based on roles.

### Example

- **`super-admin`**: Full access.
- **`editor`**: Limited content management.

> See the [Auth Example](https://payloadcms.com/docs/auth) for a working implementation.

---

## Customizing Routes

Payload allows customization of both root-level and admin-level routes.

### Root-level Routes

Configure routes for the Admin Panel, REST API, and GraphQL API using the `routes` property:

```typescript
routes: {
  admin: '/custom-admin-route',
  api: '/custom-api',
  graphQL: '/custom-graphql',
};
```

Default Routes:

- **Admin Panel**: `/admin`
- **REST API**: `/api`
- **GraphQL API**: `/graphql`
- **GraphQL Playground**: `/graphql-playground`

> **Tip**: Add new routes with [Custom Endpoints](https://payloadcms.com/docs/custom-endpoints) or [Custom Views](https://payloadcms.com/docs/custom-views).

---

## Admin-level Routes

Customize routes specific to the Admin Panel:

```typescript
admin: {
  routes: {
    account: '/my-account',
    login: '/custom-login',
    unauthorized: '/access-denied',
  },
};
```

Default Admin Routes:

- **Account Page**: `/account`
- **Login Page**: `/login`
- **Logout Page**: `/logout`
- **Forgot Password**: `/forgot`
- **Unauthorized**: `/unauthorized`

---

## Customization

### Custom Styles

Use `custom.scss` to modify globally-oriented styles such as color palettes.

### Custom Components

Swap out or override Admin Panel components using the `components` property in your config. See the [Custom Components Documentation](https://payloadcms.com/docs/custom-components) for more details.

---

## Features

### I18n

- Translated into 30+ languages.
- Defaults to the user's browser language or falls back to English.

### Light and Dark Modes

- Users can toggle between light and dark modes.
- Theme preference is persisted across sessions and devices.

### Live Preview

Enable live editing to preview changes in real-time. Use the `livePreview` property in your config for instant feedback.

---

## Deployment

- The Admin Panel is built and bundled during production deployment.
- Use the `buildPath` property to specify where the bundle is stored.

For more details, refer to the [PayloadCMS Documentation](https://payloadcms.com/docs/admin-panel).

```

```
