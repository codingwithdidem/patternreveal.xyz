# Workspaces
(*workspaces*)

## Overview

### Available Operations

* [get](#get) - Retrieve a workspace
* [update](#update) - Update a workspace

## get

Retrieve a workspace for the authenticated user.

### Example Usage

```typescript
import { Patternreveal } from "patternreveal";

const patternreveal = new Patternreveal({
  token: "PATTERN_REVEAL_API_KEY",
});

async function run() {
  const result = await patternreveal.workspaces.get({
    idOrSlug: "<value>",
  });

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { PatternrevealCore } from "patternreveal/core.js";
import { workspacesGet } from "patternreveal/funcs/workspacesGet.js";

// Use `PatternrevealCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const patternreveal = new PatternrevealCore({
  token: "PATTERN_REVEAL_API_KEY",
});

async function run() {
  const res = await workspacesGet(patternreveal, {
    idOrSlug: "<value>",
  });
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("workspacesGet failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `request`                                                                                                                                                                      | [operations.GetWorkspaceRequest](../../models/operations/getworkspacerequest.md)                                                                                               | :heavy_check_mark:                                                                                                                                                             | The request object to use for the request.                                                                                                                                     |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.WorkspaceSchema](../../models/workspaceschema.md)\>**

### Errors

| Error Type                       | Status Code                      | Content Type                     |
| -------------------------------- | -------------------------------- | -------------------------------- |
| errors.BadRequestError           | 400                              | application/json                 |
| errors.UnauthorizedError         | 401                              | application/json                 |
| errors.ForbiddenError            | 403                              | application/json                 |
| errors.NotFoundError             | 404                              | application/json                 |
| errors.ConflictError             | 409                              | application/json                 |
| errors.InviteExpiredError        | 410                              | application/json                 |
| errors.UnprocessableEntityError  | 422                              | application/json                 |
| errors.RateLimitExceededError    | 429                              | application/json                 |
| errors.InternalServerError       | 500                              | application/json                 |
| errors.PatternrevealDefaultError | 4XX, 5XX                         | \*/\*                            |

## update

Update a workspace by ID or slug.

### Example Usage

```typescript
import { Patternreveal } from "patternreveal";

const patternreveal = new Patternreveal({
  token: "PATTERN_REVEAL_API_KEY",
});

async function run() {
  const result = await patternreveal.workspaces.update("<value>");

  console.log(result);
}

run();
```

### Standalone function

The standalone function version of this method:

```typescript
import { PatternrevealCore } from "patternreveal/core.js";
import { workspacesUpdate } from "patternreveal/funcs/workspacesUpdate.js";

// Use `PatternrevealCore` for best tree-shaking performance.
// You can create one instance of it to use across an application.
const patternreveal = new PatternrevealCore({
  token: "PATTERN_REVEAL_API_KEY",
});

async function run() {
  const res = await workspacesUpdate(patternreveal, "<value>");
  if (res.ok) {
    const { value: result } = res;
    console.log(result);
  } else {
    console.log("workspacesUpdate failed:", res.error);
  }
}

run();
```

### Parameters

| Parameter                                                                                                                                                                      | Type                                                                                                                                                                           | Required                                                                                                                                                                       | Description                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `idOrSlug`                                                                                                                                                                     | *string*                                                                                                                                                                       | :heavy_check_mark:                                                                                                                                                             | The ID or slug of the workspace to update.                                                                                                                                     |
| `requestBody`                                                                                                                                                                  | [operations.UpdateWorkspaceRequestBody](../../models/operations/updateworkspacerequestbody.md)                                                                                 | :heavy_minus_sign:                                                                                                                                                             | N/A                                                                                                                                                                            |
| `options`                                                                                                                                                                      | RequestOptions                                                                                                                                                                 | :heavy_minus_sign:                                                                                                                                                             | Used to set various options for making HTTP requests.                                                                                                                          |
| `options.fetchOptions`                                                                                                                                                         | [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#options)                                                                                        | :heavy_minus_sign:                                                                                                                                                             | Options that are passed to the underlying HTTP request. This can be used to inject extra headers for examples. All `Request` options, except `method` and `body`, are allowed. |
| `options.retries`                                                                                                                                                              | [RetryConfig](../../lib/utils/retryconfig.md)                                                                                                                                  | :heavy_minus_sign:                                                                                                                                                             | Enables retrying HTTP requests under certain failure conditions.                                                                                                               |

### Response

**Promise\<[models.WorkspaceSchema](../../models/workspaceschema.md)\>**

### Errors

| Error Type                       | Status Code                      | Content Type                     |
| -------------------------------- | -------------------------------- | -------------------------------- |
| errors.BadRequestError           | 400                              | application/json                 |
| errors.UnauthorizedError         | 401                              | application/json                 |
| errors.ForbiddenError            | 403                              | application/json                 |
| errors.NotFoundError             | 404                              | application/json                 |
| errors.ConflictError             | 409                              | application/json                 |
| errors.InviteExpiredError        | 410                              | application/json                 |
| errors.UnprocessableEntityError  | 422                              | application/json                 |
| errors.RateLimitExceededError    | 429                              | application/json                 |
| errors.InternalServerError       | 500                              | application/json                 |
| errors.PatternrevealDefaultError | 4XX, 5XX                         | \*/\*                            |