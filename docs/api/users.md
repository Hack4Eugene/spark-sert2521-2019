# /api/users

## GET /api/users

Get a full list of users in the system.

### Example Response

```json
{
    "response": [
        {
            "name": "John Smith",
            "username": "jsmith",
            "id": 1
        },
        {
            "name": "Test",
            "username": "test",
            "id": 2
        }
    ],
    "success": true
}
```

## POST /api/users

'Sign up' a new user to the system.
This will return an auth token upon successful
creation of the user.

### Request Body

```
{
	"username": String,
	"name": String,
	"email": String,
	"password": String
}
```

### Example Response

```json
{
    "response": {
        "user": {
            "name": "Test",
            "username": "test",
            "id": 1
        },
        "token": "eyJ0eXAiOiJKV1QiLCJQbGcioiJIUzUyMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6InBheWl0Zm9yd2FyZC5jb20iLCJpZCI6OSwiZXhwIjoxNTU2ODI1NTY0fQ.16Nvln04EOUfP-FL390-zrMWsH8-H6OLDTuzCKG5IBnUrr-_4n4-OfDpOBZDQUBSB9MThKqnJSbPDIkImkg5zg"
    },
    "success": true
}
```

## GET /api/{username}

Return information about a specific user.
Will provide additional information if you are logged in as
that user.

### Example Response

If not logged in as that user:
```json
{
    "response": {
        "name": "Test",
        "username": "test",
        "id": 1
    },
    "success": true
}
```

If logged in as that user:
```json
{
    "response": {
        "authLevel": "USER",
        "email": "test@test.net",
        "name": "Test",
        "username": "test",
        "id": 9
    },
    "success": true
}
```

## PATCH /api/{username}

Update a user with a specific username. Requires you to be logged in
as that user or be an admin.

### Request body

```
{
	"username": String,
	"name": String,
	"email": String,
	"password": String
}
```

### Example Response

```json
{
    "response": {
        "authLevel": "USER",
        "email": "test@test.net",
        "name": "Test",
        "username": "test",
        "id": 1
    },
    "success": true
}
```

## GET /api/{username}/payments

Get a list of payments made by a user. Requires you to be logged in
as that user or be an admin.

### Example Response

```json
{
    "response": [
        {
            "amount": 0.72,
            "paymentId": "PAYID-LTCAMMI95D65772MJ884682R",
            "personId": 1,
            "status": "COMPLETE",
            "type": "PERSON",
            "userId": 1,
            "id": 2
        },
        {
            "amount": 5.28,
            "paymentId": "PAYID-LTCANDA5RR81810GJ972511S",
            "personId": 1,
            "status": "COMPLETE",
            "type": "PERSON",
            "userId": 1,
            "id": 3
        },
        {
            "amount": 10.55,
            "paymentId": "PAYID-LTCAOJY1YJ55349XC1106722",
            "personId": 1,
            "status": "COMPLETE",
            "type": "PERSON",
            "userId": 1,
            "id": 4
        },
        {
            "amount": 1.32,
            "paymentId": "PAYID-LTCAO6Y1GA94608ME2540135",
            "requestId": 1,
            "status": "COMPLETE",
            "type": "PERSON",
            "userId": 1,
            "id": 5
        }
    ],
    "success": true
}
```