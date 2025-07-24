# WorkspaceSchema

## Example Usage

```typescript
import { WorkspaceSchema } from "patternreveal/models";

let value: WorkspaceSchema = {
  id: "<id>",
  name: "<value>",
  slug: "<value>",
  inviteCode: "<value>",
  billingCycleStart: 4910.61,
  plan: "free",
  totalReflections: 2517.94,
  usage: 9533.76,
  usageLimit: 7616.46,
  reflectionsUsage: 6570.99,
  reflectionsLimit: 6683.07,
  aiUsage: 3677.82,
  aiLimit: 7444.29,
  usersLimit: 2305.7,
  store: {
    "key": "<value>",
  },
  users: [
    {
      role: "MEMBER",
    },
  ],
  createdAt: "1704834601669",
  updatedAt: "1735683510233",
  paddleCustomerId: "<id>",
};
```

## Fields

| Field                              | Type                               | Required                           | Description                        |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| `id`                               | *string*                           | :heavy_check_mark:                 | N/A                                |
| `name`                             | *string*                           | :heavy_check_mark:                 | N/A                                |
| `slug`                             | *string*                           | :heavy_check_mark:                 | N/A                                |
| `logo`                             | *string*                           | :heavy_minus_sign:                 | N/A                                |
| `inviteCode`                       | *string*                           | :heavy_check_mark:                 | N/A                                |
| `billingCycleStart`                | *number*                           | :heavy_check_mark:                 | N/A                                |
| `plan`                             | [models.Plan](../models/plan.md)   | :heavy_check_mark:                 | N/A                                |
| `totalReflections`                 | *number*                           | :heavy_check_mark:                 | N/A                                |
| `usage`                            | *number*                           | :heavy_check_mark:                 | N/A                                |
| `usageLimit`                       | *number*                           | :heavy_check_mark:                 | N/A                                |
| `reflectionsUsage`                 | *number*                           | :heavy_check_mark:                 | N/A                                |
| `reflectionsLimit`                 | *number*                           | :heavy_check_mark:                 | N/A                                |
| `aiUsage`                          | *number*                           | :heavy_check_mark:                 | N/A                                |
| `aiLimit`                          | *number*                           | :heavy_check_mark:                 | N/A                                |
| `usersLimit`                       | *number*                           | :heavy_check_mark:                 | N/A                                |
| `store`                            | Record<string, *any*>              | :heavy_check_mark:                 | N/A                                |
| `users`                            | [models.User](../models/user.md)[] | :heavy_check_mark:                 | N/A                                |
| `createdAt`                        | *string*                           | :heavy_check_mark:                 | N/A                                |
| `updatedAt`                        | *string*                           | :heavy_check_mark:                 | N/A                                |
| `paddleCustomerId`                 | *string*                           | :heavy_check_mark:                 | N/A                                |