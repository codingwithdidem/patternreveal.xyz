# ConflictError

## Example Usage

```typescript
import { ConflictError } from "patternreveal/models";

let value: ConflictError = {
  code: "conflict",
  message: "The requested resource was not found.",
  docUrl: "https://docs.patternreveal.xyz/errors#conflict",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `code`                                                              | [models.ConflictCode](../models/conflictcode.md)                    | :heavy_check_mark:                                                  | A short code indicating the error code returned.                    | conflict                                                            |
| `message`                                                           | *string*                                                            | :heavy_check_mark:                                                  | A human readable explanation of what went wrong.                    | The requested resource was not found.                               |
| `docUrl`                                                            | *string*                                                            | :heavy_minus_sign:                                                  | A link to our documentation with more details about this error code | https://docs.patternreveal.xyz/errors#conflict                      |