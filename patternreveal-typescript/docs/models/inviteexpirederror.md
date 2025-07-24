# InviteExpiredError

## Example Usage

```typescript
import { InviteExpiredError } from "patternreveal/models";

let value: InviteExpiredError = {
  code: "invite_expired",
  message: "The requested resource was not found.",
  docUrl: "https://docs.patternreveal.xyz/errors#invite-expired",
};
```

## Fields

| Field                                                               | Type                                                                | Required                                                            | Description                                                         | Example                                                             |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `code`                                                              | [models.InviteExpiredCode](../models/inviteexpiredcode.md)          | :heavy_check_mark:                                                  | A short code indicating the error code returned.                    | invite_expired                                                      |
| `message`                                                           | *string*                                                            | :heavy_check_mark:                                                  | A human readable explanation of what went wrong.                    | The requested resource was not found.                               |
| `docUrl`                                                            | *string*                                                            | :heavy_minus_sign:                                                  | A link to our documentation with more details about this error code | https://docs.patternreveal.xyz/errors#invite-expired                |