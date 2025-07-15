// import { tb } from "./client";
// import type { Analysis as AnalysisReportType } from "@/lib/zod/schemas/analysis";
// import { z } from "zod";

// export const recordReflectionTB = tb.buildIngestEndpoint({
//   datasource: "analyzed_reflection_reports",
//   event: z.object({
//     user_id: z.string(),
//     reflection_id: z.string(),
//     abusive: z.boolean(),
//     is_at_immediate_risk: z.boolean(),
//     timestamp: z.string()
//   }),
//   wait: true
// });
// export const record_reflection_report = async (payload: {
//   id: string;
//   userId: string;
//   report: AnalysisReportType;
// }) => {
//   const { id, userId, report } = payload;
//   const analysisReport = report as AnalysisReportType;

//   if (!analysisReport || !userId || !id) {
//     return;
//   }

//   return await recordReflectionTB({
//     user_id: userId,
//     reflection_id: id,
//     abusive: analysisReport.isAbusive,
//     is_at_immediate_risk: analysisReport.isAtImmediateRisk,
//     timestamp: new Date().toISOString()
//   });
// };
