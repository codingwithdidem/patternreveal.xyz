<!-- Start SDK Example Usage [usage] -->
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
<!-- End SDK Example Usage [usage] -->