import { NextResponse } from "next/server";
import { withWorkspace } from "@/lib/auth/withWorkspace";
import { tb } from "@/lib/tinybird/client";
import { z } from "zod";

const analyticsQuerySchema = z.object({
  type: z
    .enum([
      "trends",
      "users",
      "summary",
      "emotional_intelligence",
      "relationship_health",
      "predictive",
      "behavioral_patterns",
    ])
    .default("trends"),
  days_filter: z.enum(["30", "60", "90"]).optional(),
  user_id: z.string().optional(),
  granularity: z.enum(["day", "week", "hour"]).default("day"),
});

// Define the analytics pipes
const reflectionTrendsPipe = tb.buildPipe({
  pipe: "reflection_trends",
  parameters: z.object({
    workspace_id: z.string(),
    user_id: z.string().optional(),
    days_filter: z.string().optional(),
    granularity: z.string().optional(),
  }),
  data: z.any(),
});

const userAnalyticsPipe = tb.buildPipe({
  pipe: "user_analytics",
  parameters: z.object({
    workspace_id: z.string(),
    user_id: z.string().optional(),
    days_filter: z.string().optional(),
  }),
  data: z.any(),
});

const workspaceSummaryPipe = tb.buildPipe({
  pipe: "workspace_summary",
  parameters: z.object({
    workspace_id: z.string(),
    days_filter: z.string().optional(),
  }),
  data: z.any(),
});

const emotionalIntelligencePipe = tb.buildPipe({
  pipe: "emotional_intelligence_insights",
  parameters: z.object({
    workspace_id: z.string(),
    user_id: z.string().optional(),
    days_filter: z.string().optional(),
  }),
  data: z.any(),
});

const relationshipHealthPipe = tb.buildPipe({
  pipe: "relationship_health_insights",
  parameters: z.object({
    workspace_id: z.string(),
    user_id: z.string().optional(),
    days_filter: z.string().optional(),
  }),
  data: z.any(),
});

const predictiveInsightsPipe = tb.buildPipe({
  pipe: "predictive_insights",
  parameters: z.object({
    workspace_id: z.string(),
    user_id: z.string().optional(),
    days_filter: z.string().optional(),
  }),
  data: z.any(),
});

const behavioralPatternsPipe = tb.buildPipe({
  pipe: "behavioral_patterns",
  parameters: z.object({
    workspace_id: z.string(),
    user_id: z.string().optional(),
    days_filter: z.string().optional(),
  }),
  data: z.any(),
});

export const GET = withWorkspace(
  async ({ searchParams, workspace, session }) => {
    try {
      const query = analyticsQuerySchema.parse(searchParams);

      console.log("query", {
        workspaceId: workspace.id,
        user_id: query.user_id,
        days_filter: query.days_filter,
        granularity: query.granularity,
      });

      const params = {
        workspace_id: workspace.id,
        ...(query.user_id && { user_id: query.user_id }),
        ...(query.days_filter && { days_filter: query.days_filter }),
        ...(query.granularity && { granularity: query.granularity }),
      };

      let response: {
        data?: unknown[];
        meta?: unknown[];
        rows?: number;
        statistics?: unknown;
      };

      switch (query.type) {
        case "trends":
          response = await reflectionTrendsPipe(params);
          break;
        case "users":
          response = await userAnalyticsPipe(params);
          break;
        case "summary":
          response = await workspaceSummaryPipe(params);
          break;
        case "emotional_intelligence":
          response = await emotionalIntelligencePipe(params);
          break;
        case "relationship_health":
          response = await relationshipHealthPipe(params);
          break;
        case "predictive":
          response = await predictiveInsightsPipe(params);
          break;
        case "behavioral_patterns":
          response = await behavioralPatternsPipe(params);
          break;
        default:
          response = await reflectionTrendsPipe(params);
      }

      console.log(response);

      // Extract the data from the response - Tinybird returns { data: [...], meta: [...], rows: number, statistics: {...} }
      const data = response?.data || [];

      return NextResponse.json({
        success: true,
        data: data,
        meta: {
          type: query.type,
          filters: {
            days: query.days_filter || "30",
            user_id: query.user_id,
            granularity: query.granularity,
          },
          workspace_id: workspace.id,
        },
      });
    } catch (error) {
      console.error("Analytics API error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch analytics data",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  },
  {
    requiredPermissions: ["reflection.read"],
  }
);
