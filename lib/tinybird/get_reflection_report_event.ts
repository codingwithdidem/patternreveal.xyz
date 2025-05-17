import { z } from "zod";
import { tb } from "./client";

export const getReflectionReportEvent = tb.buildPipe({
  pipe: "get_reflection_report_event",
  parameters: z.object({
    reflection_id: z.string()
  }),
  data: z.object({
    user_id: z.string(),
    reflection_id: z.string(),
    abusive: z.boolean(),
    is_at_immediate_risk: z.boolean(),
    timestamp: z.string()
  })
});
