export const ACTIONS = [
  "mood.read",
  "mood.write",
  "reflection.read",
  "reflection.write"
] as const;

export type PermissionAction = (typeof ACTIONS)[number];
