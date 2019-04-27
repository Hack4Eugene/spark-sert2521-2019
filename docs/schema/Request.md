# Request

### Fields

**person** - A reference to the person making the request as an ID.

**item** - A reference to the type of item being requested as an ID.

**quantity** - How many of the item the person is requesting.

**funds** - The amount of money (in dollars) that have been donated to this request.

**ordered** - How many of the items requested have been ordered by an admin.

**delivered** - How many of the items requested have been delivered and processed.

**complete** - A calculated boolean which is true if the funds are equal to the calculated
total price of the request.

**totalPrice** - The total amount needed (in dollars) to fulfill the entire request. References
the associated item's price.

**person** - The associated Person for this Request.

**item** - The associated Item for this Request.

### API interactions

`/api/requests` is the general endpoint for creating and reading Requests.

### Model interactions

Requests currently interact with the Item model through the `totalPrice` and `complete` fields, both
of which use `item.price` to calculate themselves.
