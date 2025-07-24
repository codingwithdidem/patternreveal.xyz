# BadRequestError

## Example Usage

```typescript
import { BadRequestError } from "patternreveal/models";

let value: BadRequestError = {
  code: "bad_request",
  message: "The requested resource was not found.",
  docUrl: "https://docs.patternreveal.xyz/errors#bad-request",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `code`                                                              | [models.BadRequestCode](../models/badrequestcode.md)                | :heavy_check_mark:                                                  | A short code indicating the error code returned.                    | bad_request                                                         |
| `message`                                                           | *string*                                                            | :heavy_check_mark:                                                  | A human readable explanation of what went wrong.                    | The requested resource was not found.                               |
| `docUrl`                                                            | *string*                                                            | :heavy_minus_sign:                                                  | A link to our documentation with more details about this error code | https://docs.patternreveal.xyz/errors#bad-request                   |