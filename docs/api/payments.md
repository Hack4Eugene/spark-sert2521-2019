# /api/payments

## GET /api/payments/return

This will not be called directly,
this is where PayPal redirects
after a transaction has been
submitted. In other words,
don't submit this manually.
This will return
a redirect to `/payment/success`
after attempting to process the
payment.

### Query Parameters:

**paymentId** - A token
that represents a transaction.

**payerId** - A token
that represents the payer.

## POST /api/payments/people/{slug}

This will submit a payment
request for a person (in
other words, a general donation).

### Request body:

```
{
  "amount": Double
}
```

### Example response:

```json
{
  "link": "<link to PayPal confirm transaction page>"
}
```

## POST /api/requests/{id}

This will submit a payment
which will contribute
to a specified request.

### Request body

```
{
  "amount": Double
}
```

### Example Response

```json
{
  "link": "<link to PayPal confirm transaction page>"
}
```
