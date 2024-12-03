# Querying Your Documents in PayloadCMS

## Overview

In Payload, "querying" refers to filtering or searching through Documents within a Collection. The querying language is simple and powerful, allowing precise filtering of Documents through an intuitive and standardized structure.

### APIs for Querying

Payload provides three common APIs for querying your data:

- **Local API**: Extremely fast, direct-to-database access.
- **REST API**: Standard HTTP endpoints for querying and mutating data.
- **GraphQL API**: A full GraphQL API with a GraphQL Playground.

These APIs share the same querying language, so you only need to learn it once to use it across all APIs.

---

## Query Syntax

You can send a query using operators within a request:

```javascript
const query = {
  color: {
    equals: 'blue',
  },
}
```

````

> **Tip**: Queries can also be used within Access Control functions.

---

## Operators

The following operators are available for building queries:

- **`equals`**: Matches documents where the value is exactly equal.
- **`not_equals`**: Matches documents where the value is not equal.
- **`greater_than`**: Matches numeric or date-based fields greater than the given value.
- **`greater_than_equal`**: Matches numeric or date-based fields greater than or equal to the given value.
- **`less_than`**: Matches numeric or date-based fields less than the given value.
- **`less_than_equal`**: Matches numeric or date-based fields less than or equal to the given value.
- **`like`**: Case-insensitive match where all words in a string are present, in any order.
- **`contains`**: Case-insensitive substring match.
- **`in`**: Matches documents where the value is in a provided list.
- **`not_in`**: Matches documents where the value is NOT in a provided list.
- **`all`**: Matches documents containing all values in a provided list.
- **`exists`**: Matches documents where the value exists (`true`) or does not exist (`false`).
- **`near`**: Matches Point Fields near a given location, specified as `<longitude>, <latitude>, <maxDistance>, <minDistance>`.
- **`within`**: Matches Point Fields inside a GeoJSON-defined area.
- **`intersects`**: Matches Point Fields intersecting with a GeoJSON-defined area.

> **Tip**: To optimize queries on frequently used fields, set `index: true` in the field configuration.

---

## AND / OR Logic

You can combine multiple queries using **AND** and **OR** logic, nesting them as needed for complex queries.

### Example Query

```javascript
const query = {
  or: [
    {
      color: {
        equals: 'mint',
      },
    },
    {
      and: [
        {
          color: {
            equals: 'white',
          },
        },
        {
          featured: {
            equals: false,
          },
        },
      ],
    },
  ],
}
```

**Plain English Translation**: Find posts where either the color is mint OR the color is white **AND** featured is false.

---

## Nested Properties

For relational fields or nested properties, use dot notation to access the nested property.

### Example

```javascript
const query = {
  'artists.featured': {
    exists: true,
  },
}
```

---

## Writing Queries Across APIs

### Local API

The Local API supports the `find` operation with a raw query object:

```javascript
const getPosts = async () => {
  const posts = await payload.find({
    collection: 'posts',
    where: {
      color: {
        equals: 'mint',
      },
    },
  })

  return posts
}
```

### GraphQL API

The GraphQL API uses the `where` argument to accept a raw query object:

```graphql
query {
  Posts(where: { color: { equals: "mint" } }) {
    docs {
      color
    }
    totalDocs
  }
}
```

### REST API

In the REST API, queries are written as query strings:

```
https://localhost:3000/api/posts?where[color][equals]=mint
```

For complex queries, use a library like `qs-esm` to stringify JSON into query strings.

### Example Using `qs-esm`

```javascript
import { stringify } from 'qs-esm'

const query = {
  color: {
    equals: 'mint',
  },
}

const getPosts = async () => {
  const stringifiedQuery = stringify(
    {
      where: query,
    },
    { addQueryPrefix: true },
  )

  const response = await fetch(`http://localhost:3000/api/posts${stringifiedQuery}`)
  // Handle the response...
}
```

---

## Additional Tips

### Optimize Queries

- Add `index: true` to frequently queried fields for faster lookups.

### Nested Querying

- Use dot notation for relational fields, e.g., `'authors.name': { equals: 'John Doe' }`.

---

Payload's querying language is consistent and flexible, making it easy to adapt across Local, REST, and GraphQL APIs.

````
