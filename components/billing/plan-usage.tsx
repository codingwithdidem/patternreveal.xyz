'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/constants";
import { Calendar, Crown, Users, Brain, FileText, Check, TrendingUp, FileText as FileTextIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CurrentPlanCardProps {
  plan: string;
  billingCycleStart?: number | null;
  reflectionsUsage: number;
  reflectionsLimit: number;
  aiUsage: number;
  aiLimit: number;
  usersLimit: number;
  totalUsers: number;
  workspaceSlug?: string;
}

export default function CurrentPlanCard({
  plan,
  billingCycleStart,
  reflectionsUsage,
  reflectionsLimit,
  aiUsage,
  aiLimit,
  usersLimit,
  totalUsers,
  workspaceSlug
}: CurrentPlanCardProps) {
  const currentPlan = PLANS.find(p => p.name.toLowerCase() === plan.toLowerCase());
  const isPro = plan.toLowerCase() === 'pro';
  
  // Calculate billing cycle dates
  const now = new Date();
  const currentDay = now.getDate();
  const cycleStartDay = billingCycleStart || 1;
  
  let cycleStartDate: Date;
  let cycleEndDate: Date;
  
  if (currentDay >= cycleStartDay) {
    cycleStartDate = new Date(now.getFullYear(), now.getMonth(), cycleStartDay);
    cycleEndDate = new Date(now.getFullYear(), now.getMonth() + 1, cycleStartDay);
  } else {
    cycleStartDate = new Date(now.getFullYear(), now.getMonth() - 1, cycleStartDay);
    cycleEndDate = new Date(now.getFullYear(), now.getMonth(), cycleStartDay);
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getUsagePercentage = (usage: number, limit: number) => {
    return Math.min((usage / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              {isPro && <Crown className="h-6 w-6 text-yellow-500" />}
              {currentPlan?.name || 'Free'} Plan
              <Badge variant="outline" className="text-xs px-2 py-1 text-green-600 border-green-200 bg-green-50">
                Active
              </Badge>
            </CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              {isPro ? (
                <div className="text-2xl font-bold text-gray-900">
                  ${isPro ? (currentPlan?.price.yearly || currentPlan?.price.monthly) : 0}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month{isPro && currentPlan?.price.yearly ? ' billed yearly' : ''}
                  </span>
                </div>
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  $0<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Billing Cycle */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Calendar className="h-5 w-5" />
              Next Billing Date
            </div>
            <div className="text-lg font-medium">
              {formatDate(cycleEndDate)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Calendar className="h-5 w-5" />
              Billing Cycle
            </div>
            <div className="text-lg font-medium">
              {isPro ? 'Yearly' : 'Monthly'}
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
            <TrendingUp className="h-5 w-5" />
            Usage
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Reflections Usage */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-medium">
                  <FileText className="h-5 w-5" />
                  Reflections
                </div>
                <span className={cn(
                  "text-base font-medium",
                  getUsageColor(getUsagePercentage(reflectionsUsage, reflectionsLimit))
                )}>
                  {reflectionsUsage} / {reflectionsLimit}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-300",
                    getUsagePercentage(reflectionsUsage, reflectionsLimit) >= 90 ? "bg-red-500" :
                    getUsagePercentage(reflectionsUsage, reflectionsLimit) >= 75 ? "bg-yellow-500" : "bg-green-500"
                  )}
                  style={{ width: `${getUsagePercentage(reflectionsUsage, reflectionsLimit)}%` }}
                />
              </div>
            </div>

            {/* AI Usage */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-medium">
                  <Brain className="h-5 w-5" />
                  AI Analysis
                </div>
                <span className={cn(
                  "text-base font-medium",
                  getUsageColor(getUsagePercentage(aiUsage, aiLimit))
                )}>
                  {aiUsage} / {aiLimit}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-300",
                    getUsagePercentage(aiUsage, aiLimit) >= 90 ? "bg-red-500" :
                    getUsagePercentage(aiUsage, aiLimit) >= 75 ? "bg-yellow-500" : "bg-green-500"
                  )}
                  style={{ width: `${getUsagePercentage(aiUsage, aiLimit)}%` }}
                />
              </div>
            </div>

            {/* Users */}
            <div className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-medium">
                  <Users className="h-5 w-5" />
                  Team Members
                </div>
                <span className="text-base font-medium text-muted-foreground">
                  {totalUsers} / {usersLimit}
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${getUsagePercentage(totalUsers, usersLimit)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Plan Features */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
            <Check className="h-5 w-5" />
            Active Plan Features
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {currentPlan?.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 