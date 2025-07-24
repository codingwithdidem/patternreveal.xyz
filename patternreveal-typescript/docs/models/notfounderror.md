# NotFoundError

## Example Usage

```typescript
import { NotFoundError } from "patternreveal/models";

let value: NotFoundError = {
  code: "not_found",
  message: "The requested resource was not found.",
  docUrl: "https://docs.patternreveal.xyz/errors#not-found",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `code`                                                              | [models.NotFoundCode](../models/notfoundcode.md)                    | :heavy_check_mark:                                                  | A short code indicating the error code returned.                    | not_found                                                           |
| `message`                                                           | *string*                                                            | :heavy_check_mark:                                                  | A human readable explanation of what went wrong.                    | The requested resource was not found.                               |
| `docUrl`                                                            | *string*                                                            | :heavy_minus_sign:                                                  | A link to our documentation with more details about this error code | https://docs.patternreveal.xyz/errors#not-found                     |