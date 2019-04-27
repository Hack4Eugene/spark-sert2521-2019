# Person
### Fields
**name** - The name of the Person.

**image** - A blob that represents an image of the Person.

**bio** - A text entry which contains the contents of the Person's biography.

**slug** - A unique string identifier for this Person.

**funds** - Amount (in dollars) of 'general' donations that have been
made to this Person.

### API interactions
`/api/people` is the general endpoint for creating and reading Person models.

### Model interactions
The Request model references Person, but does not read from it.