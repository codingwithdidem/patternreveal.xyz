# InternalServerErrorError

## Example Usage

```typescript
import { InternalServerErrorError } from "patternreveal/models";

let value: InternalServerErrorError = {
  code: "internal_server_error",
  message: "The requested resource was not found.",
  docUrl: "https://docs.patternreveal.xyz/errors#internal-server_error",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `code`                                                                 | [models.InternalServerErrorCode](../models/internalservererrorcode.md) | :heavy_check_mark:                                                     | A short code indicating the error code returned.                       | internal_server_error                                                  |
| `message`                                                              | *string*                                                               | :heavy_check_mark:                                                     | A human readable explanation of what went wrong.                       | The requested resource was not found.                                  |
| `docUrl`                                                               | *string*                                                               | :heavy_minus_sign:                                                     | A link to our documentation with more details about this error code    | https://docs.patternreveal.xyz/errors#internal-server_error            |