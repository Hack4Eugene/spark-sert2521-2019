# Item
### Fields
**name** - The name of the item, obviously. For example,
a sleeping bag item would have the name `"Sleeping Bag"`.
This should be a unique field, though it is not the
identifier.

**image** - This is a blob which represents an image or icon.
This will represent the item visually on the frontend.

**price** - This is the price of the item, in dollars. In other words,
this is how much a donor would need to spend to fulfill exactly 1 (one)
of these items.

**inventory** - This is currently unused, but it tracks the amount of items
the organization currently has of this item type.

### API interactions
TODO

### Model interactions
This model does not depend on any other models. It is used, however, by the Request model. 