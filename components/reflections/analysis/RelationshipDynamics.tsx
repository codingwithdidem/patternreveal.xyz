import { Badge } from "@/components/ui/badge";
import {
  Users,
  AlertTriangle,
  User,
  Heart,
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  Zap,
  MessageCircle,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface RelationshipDynamicsProps {
  analysisReport: AnalysisType;
}

// Helper functions for styling
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild":
      return "bg-blue-100 text-blue-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "severe":
      return "bg-orange-100 text-orange-800";
    case "extreme":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getHealthColor = (health: string) => {
  switch (health) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "fair":
      return "bg-yellow-100 text-yellow-800";
    case "poor":
      return "bg-orange-100 text-orange-800";
    case "toxic":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStabilityColor = (stability: string) => {
  switch (stability) {
    case "very_stable":
      return "bg-green-100 text-green-800";
    case "stable":
      return "bg-blue-100 text-blue-800";
    case "somewhat_unstable":
      return "bg-yellow-100 text-yellow-800";
    case "very_unstable":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getIntimacyColor = (intimacy: string) => {
  switch (intimacy) {
    case "very_close":
      return "bg-green-100 text-green-800";
    case "close":
      return "bg-blue-100 text-blue-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "distant":
      return "bg-orange-100 text-orange-800";
    case "very_distant":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTrustColor = (trust: string) => {
  switch (trust) {
    case "high":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-blue-100 text-blue-800";
    case "low":
      return "bg-orange-100 text-orange-800";
    case "broken":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getBalanceColor = (balance: string) => {
  switch (balance) {
    case "balanced":
      return "bg-green-100 text-green-800";
    case "you_more":
      return "bg-blue-100 text-blue-800";
    case "them_more":
      return "bg-orange-100 text-orange-800";
    case "both_low":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getInvestmentColor = (investment: string) => {
  switch (investment) {
    case "high":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-blue-100 text-blue-800";
    case "low":
      return "bg-orange-100 text-orange-800";
    case "minimal":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getFrequencyColor = (frequency: string) => {
  switch (frequency) {
    case "rare":
      return "bg-green-100 text-green-800";
    case "occasional":
      return "bg-blue-100 text-blue-800";
    case "frequent":
      return "bg-orange-100 text-orange-800";
    case "constant":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getResolutionColor = (resolution: string) => {
  switch (resolution) {
    case "excellent":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "fair":
      return "bg-yellow-100 text-yellow-800";
    case "poor":
      return "bg-orange-100 text-orange-800";
    case "none":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getGrowthColor = (growth: string) => {
  switch (growth) {
    case "growing":
      return "bg-green-100 text-green-800";
    case "stable":
      return "bg-blue-100 text-blue-800";
    case "stagnant":
      return "bg-yellow-100 text-yellow-800";
    case "declining":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getSupportColor = (support: string) => {
  switch (support) {
    case "mutual":
      return "bg-green-100 text-green-800";
    case "one_sided":
      return "bg-orange-100 text-orange-800";
    case "competitive":
      return "bg-red-100 text-red-800";
    case "none":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getWhoExhibitedIcon = (who: string) => {
  switch (who) {
    case "you":
      return <User className="w-4 h-4" />;
    case "them":
      return <User className="w-4 h-4" />;
    case "both":
      return <Users className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

const getSatisfactionColor = (satisfaction: number) => {
  if (satisfaction >= 8) return "bg-green-100 text-green-800";
  if (satisfaction >= 6) return "bg-blue-100 text-blue-800";
  if (satisfaction >= 4) return "bg-yellow-100 text-yellow-800";
  if (satisfaction >= 2) return "bg-orange-100 text-orange-800";
  return "bg-red-100 text-red-800";
};

export default function RelationshipDynamics({
  analysisReport,
}: RelationshipDynamicsProps) {
  const relationshipDynamics = analysisReport.relationshipDynamics;

  if (!relationshipDynamics) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Relationship dynamics analysis not available for this reflection.
          <br />
          Re-analyze this reflection to get relationship insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Relationship Dynamics</h3>
      </div>

      {/* Detected Patterns */}
      {relationshipDynamics.detectedPatterns?.length &&
        relationshipDynamics.detectedPatterns.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-700">
              Detected Relationship Patterns
            </h4>
            <div className="space-y-4">
              {relationshipDynamics.detectedPatterns.map((pattern, index) => (
                <div
                  key={`pattern-${index}-${pattern.pattern?.slice(0, 20)}`}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getWhoExhibitedIcon(pattern.who_exhibited || "unknown")}
                      <span className="font-medium capitalize">
                        {pattern.pattern?.replace(/_/g, " ") ||
                          "Unknown pattern"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className={getSeverityColor(pattern.severity || "mild")}
                      >
                        {pattern.severity?.replace(/_/g, " ") || "Unknown"}
                      </Badge>
                    </div>
                  </div>

                  {pattern.quote && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                      <blockquote className="text-sm italic text-blue-900">
                        &quot;{pattern.quote}&quot;
                      </blockquote>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pattern.impact && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Impact:
                        </span>
                        <p className="text-sm text-gray-800">
                          {pattern.impact}
                        </p>
                      </div>
                    )}
                    {pattern.trigger && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Trigger:
                        </span>
                        <p className="text-sm text-gray-800">
                          {pattern.trigger}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pattern.unsustainableBehavior && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Unsustainable Behavior:
                        </span>
                        <p className="text-sm text-red-800">
                          {pattern.unsustainableBehavior}
                        </p>
                      </div>
                    )}
                    {pattern.suggestedBehavior && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">
                          Suggested Behavior:
                        </span>
                        <p className="text-sm text-green-800">
                          {pattern.suggestedBehavior}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Relationship Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-600" />
            Relationship Health
          </h4>
          <div className="space-y-2">
            {relationshipDynamics.relationshipHealth && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Health:</span>
                <Badge
                  className={getHealthColor(
                    relationshipDynamics.relationshipHealth
                  )}
                >
                  {relationshipDynamics.relationshipHealth.replace(/_/g, " ")}
                </Badge>
              </div>
            )}
            {relationshipDynamics.relationshipSatisfaction && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Satisfaction:</span>
                <Badge
                  className={getSatisfactionColor(
                    relationshipDynamics.relationshipSatisfaction
                  )}
                >
                  {relationshipDynamics.relationshipSatisfaction}/10
                </Badge>
              </div>
            )}
            {relationshipDynamics.relationshipStability && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stability:</span>
                <Badge
                  className={getStabilityColor(
                    relationshipDynamics.relationshipStability
                  )}
                >
                  {relationshipDynamics.relationshipStability.replace(
                    /_/g,
                    " "
                  )}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Connection & Trust
          </h4>
          <div className="space-y-2">
            {relationshipDynamics.intimacyLevel && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Intimacy:</span>
                <Badge
                  className={getIntimacyColor(
                    relationshipDynamics.intimacyLevel
                  )}
                >
                  {relationshipDynamics.intimacyLevel.replace(/_/g, " ")}
                </Badge>
              </div>
            )}
            {relationshipDynamics.trustLevel && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Trust:</span>
                <Badge
                  className={getTrustColor(relationshipDynamics.trustLevel)}
                >
                  {relationshipDynamics.trustLevel}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" />
            Effort & Investment
          </h4>
          <div className="space-y-2">
            {relationshipDynamics.effortBalance && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Effort:</span>
                <Badge
                  className={getBalanceColor(
                    relationshipDynamics.effortBalance
                  )}
                >
                  {relationshipDynamics.effortBalance.replace(/_/g, " ")}
                </Badge>
              </div>
            )}
            {relationshipDynamics.investmentLevel && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Investment:</span>
                <Badge
                  className={getInvestmentColor(
                    relationshipDynamics.investmentLevel
                  )}
                >
                  {relationshipDynamics.investmentLevel}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conflict & Growth */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            Conflict Management
          </h4>
          <div className="space-y-2">
            {relationshipDynamics.conflictFrequency && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Frequency:</span>
                <Badge
                  className={getFrequencyColor(
                    relationshipDynamics.conflictFrequency
                  )}
                >
                  {relationshipDynamics.conflictFrequency}
                </Badge>
              </div>
            )}
            {relationshipDynamics.conflictResolution && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resolution:</span>
                <Badge
                  className={getResolutionColor(
                    relationshipDynamics.conflictResolution
                  )}
                >
                  {relationshipDynamics.conflictResolution}
                </Badge>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Growth & Development
          </h4>
          <div className="space-y-2">
            {relationshipDynamics.relationshipGrowth && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Growth:</span>
                <Badge
                  className={getGrowthColor(
                    relationshipDynamics.relationshipGrowth
                  )}
                >
                  {relationshipDynamics.relationshipGrowth}
                </Badge>
              </div>
            )}
            {relationshipDynamics.personalGrowthSupport && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Support:</span>
                <Badge
                  className={getSupportColor(
                    relationshipDynamics.personalGrowthSupport
                  )}
                >
                  {relationshipDynamics.personalGrowthSupport.replace(
                    /_/g,
                    " "
                  )}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Relationship Insights */}
      {relationshipDynamics.relationshipInsights?.length &&
        relationshipDynamics.relationshipInsights.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" />
              Relationship Insights
            </h4>
            <div className="space-y-2">
              {relationshipDynamics.relationshipInsights.map(
                (insight, index) => (
                  <div
                    key={`insight-${index}-${insight.slice(0, 20)}`}
                    className="flex gap-2"
                  >
                    <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{insight}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

      {/* Improvement Areas */}
      {relationshipDynamics.improvementAreas?.length &&
        relationshipDynamics.improvementAreas.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Target className="w-4 h-4 text-orange-600" />
              Improvement Areas
            </h4>
            <div className="space-y-2">
              {relationshipDynamics.improvementAreas.map((area, index) => (
                <div
                  key={`improvement-${index}-${area.slice(0, 20)}`}
                  className="flex gap-2"
                >
                  <Target className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Strengths Identified */}
      {relationshipDynamics.strengthsIdentified?.length &&
        relationshipDynamics.strengthsIdentified.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Strengths Identified
            </h4>
            <div className="space-y-2">
              {relationshipDynamics.strengthsIdentified.map(
                (strength, index) => (
                  <div
                    key={`strength-${index}-${strength.slice(0, 20)}`}
                    className="flex gap-2"
                  >
                    <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
}
