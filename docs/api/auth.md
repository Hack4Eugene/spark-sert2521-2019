# /api/auth

## Authorizing Other Endpoints

Add the following header to all requests you'd like to authenticate:

```
Authorization: Bearer <token>
```

Where `<token>` is the JWT token received from `/api/auth/login`.

## POST /api/auth/login

Create a new JWT using a user's `identifier` (username or email) and `password`. The response includes the JWT `token`
to use for future requests.

Request body:

```
{
    "identifier": String,
    "password": String
}
```

Example response:

```json
{
    "response": {
        "token": "eyJ0eXAiOidnmqwdmhjhqrjqGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImquwidsiInBheWl0Zm9yd2FyZC5jb20iLCJpZCI6MSwiZXhwIjoxNTU2NzY3NTE2fQ.sDQzqOlgSofjJSSQgBBUGxm2BMN6W1du24SIfFJro0FBhfsdkjhfkjsda2Am4HVmDXPmWTiblZeN6t58w"
    },
    "success": true
}
```
