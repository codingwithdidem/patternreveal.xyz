import { Tinybird } from "@chronark/zod-bird";

// Force local Tinybird for development, regardless of environment variables
const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined;

export const tb = new Tinybird({
  token: isDevelopment
    ? "p.eyJ1IjogIjFjZTYwYWU0LWY1NDAtNDk5Yi05ZGIxLTRhOTA0ZDk0OGMxNCIsICJpZCI6ICI1ODdmZTU2Zi00NzE3LTQzODctYmExZi05NGIyN2UyNDU5YWIiLCAiaG9zdCI6ICJsb2NhbCJ9.U2HNFSHF0IQralzjCg65WQSRB3blrNJdbvxHBXgFKNE" // Local admin token
    : (process.env.TINYBIRD_API_KEY as string),
  baseUrl: isDevelopment
    ? "http://localhost:7181" // Local Tinybird URL
    : (process.env.TINYBIRD_API_URL as string),
});
