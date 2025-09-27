import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Calendar,
  Activity,
  AlertTriangle,
  User,
  Users,
  Zap,
  Shield,
  Target,
} from "lucide-react";
import type { Analysis as AnalysisType } from "@/lib/zod/schemas/analysis";

interface ContextFactorsProps {
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

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "low":
      return "bg-green-100 text-green-800";
    case "moderate":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "severe":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getWhoAffectedIcon = (who: string) => {
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

const getQualityColor = (quality: string) => {
  switch (quality) {
    case "optimal":
      return "bg-green-100 text-green-800";
    case "good":
      return "bg-blue-100 text-blue-800";
    case "poor":
      return "bg-orange-100 text-orange-800";
    case "terrible":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
