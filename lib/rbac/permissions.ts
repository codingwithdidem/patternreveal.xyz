import { Role } from "../types";

export const ACTIONS = [
  "workspaces.read",
  "workspaces.write",
  "mood.read",
  "mood.write",
  "reflection.read",
  "reflection.write"
] as const;

export type PermissionAction = (typeof ACTIONS)[number];

export const ROLE_PERMISSIONS: {
  action: PermissionAction;
  description: string;
  roles: Role[];
}[] = [
  {
    action: "workspaces.read",
    description: "Read workspaces",
    roles: ["OWNER", "MEMBER"]
  },
  {
    action: "workspaces.write",
    description: "Write workspaces",
    roles: ["OWNER"]
  },
  {
    action: "mood.read",
    description: "Read moods",
    roles: ["OWNER", "MEMBER"]
  },
  {
    action: "mood.write",
    description: "Write moods",
    roles: ["OWNER"]
  },
  {
    action: "reflection.read",
    description: "Read reflections",
    roles: ["OWNER", "MEMBER"]
  },
  {
    action: "reflection.write",
    description: "Write reflections",
    roles: ["OWNER"]
  }
];

export const getPermissions = (role: Role) => {
  return ROLE_PERMISSIONS.filter((permission) =>
    permission.roles.includes(role)
  ).map((permission) => permission.action);
};
