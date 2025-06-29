# API Reference

## Authentication

### Register User
`POST /api/auth/register`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "string",
  "created_at": "timestamp"
}
```

## Document Generation

### Generate Resume
`POST /api/generate/resume`

**Request Body:**
```json
{
  "prompt": "string",
  "name": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "resume": {
    "sections": [
      {
        "type": "string",
        "content": "string"
      }
    ]
  }
}
```

## Analysis

### Analyze Resume
`POST /api/analyze/resume`

**Request Body:**
```json
{
  "file": "file",
  "jobDescription": "string"
}
```

**Response:**
```json
{
  "score": "number",
  "feedback": [
    {
      "section": "string",
      "message": "string"
    }
  ]
}
```

## Payments

### Create Checkout Session
`POST /api/stripe/create-checkout`

**Response:**
```json
{
  "url": "string"
}
```

### Webhook
`POST /api/stripe/webhook`

**Request Body:**
```json
{
  "type": "string",
  "data": {
    "object": "object"
  }
}