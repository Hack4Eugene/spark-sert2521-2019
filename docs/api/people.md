# /api/people

## GET /api/people

Get all `People`.

Example response:

```json
{
    "response": [
        {
            "bio": "I used to make TV shows.",
            "name": "Bill Nye",
            "slug": "ScienceGuy",
            "id": 1
        }
    ],
    "success": true
}
```

## POST /api/people

Create a new `Person`.

Request body:

```
{
    "name": String,
    "bio": String,
    "slug": String
}
```

Example response:

```json
{
  "response": {
    "bio": "I used to make TV shows.",
    "name": "Bill Nye",
    "slug": "ScienceGuy",
    "id": 1
  },
  "success": true
}
```

## GET /api/people/{slug}

Get a specific `Person` given their `slug`.

Example response:

```json
{
  "response": {
    "bio": "I used to make TV shows.",
    "name": "Bill Nye",
    "slug": "ScienceGuy",
    "id": 1
  },
  "success": true
}
```

## PATCH /api/people/{slug}

Update a specific `Person` given their `slug`. All request parameters are optional.

Request body:

```
{
    "name": String?,
    "bio": String?,
    "slug": String?
}
```

Example response:

```json
{
  "response": {
    "bio": "I used to make TV shows.",
    "name": "Bill Nye",
    "slug": "ScienceGuy",
    "id": 1
  },
  "success": true
}
```
