import { z } from "zod";

export const inviteTeammatesSchema = z.object({
  teammates: z
    .array(
      z.object({
        email: z.string().email(),
        role: z.enum(["OWNER", "MEMBER"]).default("MEMBER")
      })
    )
    .describe("The email addresses of the teamates to invite")
});

export type Invite = z.infer<typeof inviteTeammatesSchema>["teammates"][number];
