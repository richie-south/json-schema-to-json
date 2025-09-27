# json-schema-to-json

Work in progress, basic support

https://json-schema.org/specification

### How to use

### Example

```typescript
import {getJsonStructure} from 'json-schema-to-json'

const result = getJsonStructure(schema)
```

Takes this schema:

```JSON
{
  "title": "Product",
  "type": "object",
  "properties": {
    "user": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "personalNumber": { "type": "string" },
        "firstName": { "type": "string" },
        "lastName": { "type": "string" },
        "email": { "type": "string" },
        "phoneNumber": { "type": "string" },
        "address": { "type": "string" },
        "city": { "type": "string" },
        "zipCode": { "type": "string" },
        "country": { "type": "string" },
        "dateOfBirth": { "type": "string" },
        "username": { "type": "string" }
      }
    },
    "list": { "type": "array", "items": { "type": "string" } },
    "orders": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "createdAt": { "type": "string" },
          "status": { "type": "string" },
          "items": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "productId": { "type": "string" },
                "name": { "type": "string" },
                "price": { "type": "number" },
                "quantity": { "type": "number" }
              },
              "required": []
            }
          },
          "price": { "type": "string" },
          "currency": { "type": "string" },
          "shippingAddress": { "type": "string" },
          "trackingNumber": { "type": "string" },
          "paymentMethod": { "type": "string" }
        },
        "required": []
      }
    }
  }
}
```

And turns it into this object

```JSON
{
  "user": {
    "id": "string",
    "personalNumber": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phoneNumber": "string",
    "address": "string",
    "city": "string",
    "zipCode": "string",
    "country": "string",
    "dateOfBirth": "string",
    "username": "string"
  },
  "list": [
    "string"
  ],
  "orders": [
    {
      "id": "string",
      "createdAt": "string",
      "status": "string",
      "items": [
        {
          "productId": "string",
          "name": "string",
          "price": "number",
          "quantity": "number"
        }
      ],
      "price": "string",
      "currency": "string",
      "shippingAddress": "string",
      "trackingNumber": "string",
      "paymentMethod": "string"
    }
  ]
}
```

**Posible future:**

- default props
- generic typings
- ref support
- newer drafts
