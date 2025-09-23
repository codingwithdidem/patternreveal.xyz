import type React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
    borderBottom: "2 solid #E5E7EB",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: "#6B7280",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 15,
    borderLeft: "4 solid #3B82F6",
    paddingLeft: 15,
  },
  healthScore: {
    backgroundColor: "#F0F9FF",
    border: "2 solid #0EA5E9",
    borderRadius: 25,
    padding: "15 25",
    fontSize: 16,
    fontWeight: "bold",
    color: "#0C4A6E",
    textAlign: "center",
    marginBottom: 20,
  },
  summary: {
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 8,
    borderLeft: "4 solid #10B981",
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#374151",
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 11,
    marginBottom: 6,
    paddingLeft: 15,
    lineHeight: 1.5,
  },
  patternItem: {
    backgroundColor: "#F8FAFC",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    border: "1 solid #E5E7EB",
  },
  patternName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  patternQuote: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#6B7280",
    marginBottom: 8,
    paddingLeft: 10,
  },
  patternImpact: {
    fontSize: 10,
    color: "#374151",
    paddingLeft: 10,
  },
  severity: {
    fontSize: 10,
    fontWeight: "bold",
    padding: "2 8",
    borderRadius: 12,
    marginLeft: 10,
  },
  severityMild: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },
  severityModerate: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },
  severitySevere: {
    backgroundColor: "#FECACA",
    color: "#991B1B",
  },
  severityExtreme: {
    backgroundColor: "#FCA5A5",
    color: "#7F1D1D",
  },
});

interface AnalysisReportPDFProps {
  title: string;
  createdAt: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysisReport: any;
}

const AnalysisReportPDF: React.FC<AnalysisReportPDFProps> = ({
  title,
  createdAt,
  analysisReport,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const analysisData = analysisReport?.report;
  const overall = analysisData?.overallAssessment;

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "mild":
        return styles.severityMild;
      case "moderate":
        return styles.severityModerate;
      case "severe":
        return styles.severitySevere;
      case "extreme":
        return styles.severityExtreme;
      default:
        return styles.severityMild;
    }
  };

  const formatPatternName = (pattern: any) => {
    const patternStr = String(pattern || "");
    return (
      patternStr
        .replace(/_/g, " ")
        .replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Pattern"
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>
            Analysis Report - {new Date(createdAt).toLocaleDateString()}
          </Text>
        </View>

        {/* Overall Assessment */}
        {overall && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overall Assessment</Text>

            {overall.healthScore && (
              <View style={styles.healthScore}>
                <Text>Health Score: {overall.healthScore}/10</Text>
              </View>
            )}

            {overall.summary && (
              <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Summary:</Text>
                <Text style={styles.summaryText}>{overall.summary}</Text>
              </View>
            )}

            {overall.keyInsights && overall.keyInsights.length > 0 && (
              <View>
                <Text style={styles.listTitle}>Key Insights:</Text>
                {overall.keyInsights.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (insight: any, index: number) => (
                    <Text
                      key={`insight-${index}-${String(insight).slice(0, 20)}`}
                      style={styles.listItem}
                    >
                      • {String(insight)}
                    </Text>
                  )
                )}
              </View>
            )}

            {overall.warningFlags && overall.warningFlags.length > 0 && (
              <View>
                <Text style={styles.listTitle}>Warning Flags:</Text>
                {overall.warningFlags.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (warning: any, index: number) => (
                    <Text
                      key={`warning-${index}-${String(warning).slice(0, 20)}`}
                      style={styles.listItem}
                    >
                      • {String(warning)}
                    </Text>
                  )
                )}
              </View>
            )}

            {overall.positiveHighlights &&
              overall.positiveHighlights.length > 0 && (
                <View>
                  <Text style={styles.listTitle}>Positive Highlights:</Text>
                  {overall.positiveHighlights.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (highlight: any, index: number) => (
                      <Text
                        key={`highlight-${index}-${String(highlight).slice(
                          0,
                          20
                        )}`}
                        style={styles.listItem}
                      >
                        • {String(highlight)}
                      </Text>
                    )
                  )}
                </View>
              )}
          </View>
        )}
      </Page>

      {/* Emotional Patterns */}
      {analysisData?.emotionalPatterns?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Emotional Patterns</Text>
          {analysisData.emotionalPatterns.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`emotional-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Communication Patterns */}
      {analysisData?.communicationPatterns?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Communication Patterns</Text>
          {analysisData.communicationPatterns.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`communication-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Behavioral Patterns */}
      {analysisData?.behaviorPatterns?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Behavioral Patterns</Text>
          {analysisData.behaviorPatterns.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`behavioral-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Relationship Dynamics */}
      {analysisData?.relationshipDynamics?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Relationship Dynamics</Text>
          {analysisData.relationshipDynamics.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`relationship-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Context Factors */}
      {analysisData?.contextFactors?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Context Factors</Text>
          {analysisData.contextFactors.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`context-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Actionable Insights */}
      {analysisData?.actionableInsights && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Actionable Insights</Text>

          {analysisData.actionableInsights.immediateActions &&
            analysisData.actionableInsights.immediateActions.length > 0 && (
              <View>
                <Text style={styles.listTitle}>Immediate Actions:</Text>
                {analysisData.actionableInsights.immediateActions.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (action: any, index: number) => (
                    <Text
                      key={`immediate-${index}-${String(
                        action.action || action
                      ).slice(0, 20)}`}
                      style={styles.listItem}
                    >
                      • {String(action.action || action)}
                    </Text>
                  )
                )}
              </View>
            )}

          {analysisData.actionableInsights.longTermGoals &&
            analysisData.actionableInsights.longTermGoals.length > 0 && (
              <View>
                <Text style={styles.listTitle}>Long-term Goals:</Text>
                {analysisData.actionableInsights.longTermGoals.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (goal: any, index: number) => (
                    <Text
                      key={`goal-${index}-${String(goal).slice(0, 20)}`}
                      style={styles.listItem}
                    >
                      • {String(goal)}
                    </Text>
                  )
                )}
              </View>
            )}

          {analysisData.actionableInsights.warningSigns &&
            analysisData.actionableInsights.warningSigns.length > 0 && (
              <View>
                <Text style={styles.listTitle}>Warning Signs:</Text>
                {analysisData.actionableInsights.warningSigns.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (warning: any, index: number) => (
                    <View
                      key={`warning-${index}-${
                        String(warning.sign || "").slice(0, 20) || "warning"
                      }`}
                      style={styles.patternItem}
                    >
                      <Text style={styles.patternName}>
                        {String(warning.sign || "")}
                      </Text>
                      {warning.support && (
                        <Text style={styles.patternImpact}>
                          {String(warning.support)}
                        </Text>
                      )}
                    </View>
                  )
                )}
              </View>
            )}
        </Page>
      )}

      {/* Attachment Patterns */}
      {analysisData?.attachmentPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Attachment Patterns</Text>

          {analysisData.attachmentPatterns.yourAttachmentStyle && (
            <View style={styles.patternItem}>
              <Text style={styles.patternName}>Your Attachment Style</Text>
              <Text style={styles.patternImpact}>
                {String(analysisData.attachmentPatterns.yourAttachmentStyle)}
              </Text>
            </View>
          )}

          {analysisData.attachmentPatterns.theirAttachmentStyle && (
            <View style={styles.patternItem}>
              <Text style={styles.patternName}>Their Attachment Style</Text>
              <Text style={styles.patternImpact}>
                {String(analysisData.attachmentPatterns.theirAttachmentStyle)}
              </Text>
            </View>
          )}

          {analysisData.attachmentPatterns.detectedPatterns &&
            analysisData.attachmentPatterns.detectedPatterns.length > 0 && (
              <View>
                <Text style={styles.listTitle}>Detected Patterns:</Text>
                {analysisData.attachmentPatterns.detectedPatterns.map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (pattern: any, index: number) => (
                    <View
                      key={`attachment-pattern-${index}-${
                        pattern.pattern || "pattern"
                      }`}
                      style={styles.patternItem}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 5,
                        }}
                      >
                        <Text style={styles.patternName}>
                          {formatPatternName(pattern.pattern)}
                        </Text>
                        {pattern.severity && (
                          <Text
                            style={[
                              styles.severity,
                              getSeverityStyle(pattern.severity),
                            ]}
                          >
                            {pattern.severity}
                          </Text>
                        )}
                      </View>
                      {pattern.quote && (
                        <Text style={styles.patternQuote}>
                          "{pattern.quote}"
                        </Text>
                      )}
                      {pattern.impact && (
                        <Text style={styles.patternImpact}>
                          {pattern.impact}
                        </Text>
                      )}
                    </View>
                  )
                )}
              </View>
            )}
        </Page>
      )}

      {/* Trauma Responses */}
      {analysisData?.traumaResponses?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Trauma Responses</Text>
          {analysisData.traumaResponses.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`trauma-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Connection Patterns */}
      {analysisData?.connectionPatterns?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Connection Patterns</Text>
          {analysisData.connectionPatterns.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`connection-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Cognitive Patterns */}
      {analysisData?.cognitivePatterns?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Cognitive Patterns</Text>
          {analysisData.cognitivePatterns.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`cognitive-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}

      {/* Abuse Detection */}
      {analysisData?.abuseDetection?.detectedPatterns && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Abuse Detection</Text>
          {analysisData.abuseDetection.detectedPatterns.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (pattern: any, index: number) => (
              <View
                key={`abuse-${index}-${pattern.pattern || "pattern"}`}
                style={styles.patternItem}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text style={styles.patternName}>
                    {formatPatternName(pattern.pattern)}
                  </Text>
                  {pattern.severity && (
                    <Text
                      style={[
                        styles.severity,
                        getSeverityStyle(pattern.severity),
                      ]}
                    >
                      {pattern.severity}
                    </Text>
                  )}
                </View>
                {pattern.quote && (
                  <Text style={styles.patternQuote}>
                    "{String(pattern.quote)}"
                  </Text>
                )}
                {pattern.impact && (
                  <Text style={styles.patternImpact}>
                    {String(pattern.impact)}
                  </Text>
                )}
              </View>
            )
          )}
        </Page>
      )}
    </Document>
  );
};

export default AnalysisReportPDF;
