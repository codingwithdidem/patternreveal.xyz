# UnprocessableEntityError

## Example Usage

```typescript
import { UnprocessableEntityError } from "patternreveal/models";

let value: UnprocessableEntityError = {
  code: "unprocessable_entity",
  message: "The requested resource was not found.",
  docUrl: "https://docs.patternreveal.xyz/errors#unprocessable-entity",
};
```

## Fields

| Field                                                                  | Type                                                                   | Required                                                               | Description                                                            | Example                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `code`                                                                 | [models.UnprocessableEntityCode](../models/unprocessableentitycode.md) | :heavy_check_mark:                                                     | A short code indicating the error code returned.                       | unprocessable_entity                                                   |
| `message`                                                              | *string*                                                               | :heavy_check_mark:                                                     | A human readable explanation of what went wrong.                       | The requested resource was not found.                                  |
| `docUrl`                                                               | *string*                                                               | :heavy_minus_sign:                                                     | A link to our documentation with more details about this error code    | https://docs.patternreveal.xyz/errors#unprocessable-entity             |