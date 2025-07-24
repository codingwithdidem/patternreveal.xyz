# RateLimitExceededError

## Example Usage

```typescript
import { RateLimitExceededError } from "patternreveal/models";

let value: RateLimitExceededError = {
  code: "rate_limit_exceeded",
  message: "The requested resource was not found.",
  docUrl: "https://docs.patternreveal.xyz/errors#rate-limit_exceeded",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `code`                                                              | [models.RateLimitExceededCode](../models/ratelimitexceededcode.md)  | :heavy_check_mark:                                                  | A short code indicating the error code returned.                    | rate_limit_exceeded                                                 |
| `message`                                                           | *string*                                                            | :heavy_check_mark:                                                  | A human readable explanation of what went wrong.                    | The requested resource was not found.                               |
| `docUrl`                                                            | *string*                                                            | :heavy_minus_sign:                                                  | A link to our documentation with more details about this error code | https://docs.patternreveal.xyz/errors#rate-limit_exceeded           |