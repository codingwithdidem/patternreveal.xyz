import { PLANS } from "@/lib/constants";
import { STAGGER_CHILD_VARIANTS } from "@/lib/constants/framer-motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tooltip } from "../ui/tooltip";
import { Check } from "lucide-react";

export default function PlanFeatures({
  plan,
  className
}: {
  plan: string;
  className?: string;
}) {
  const selectedPlan = PLANS.find(
    (p) => p.name.toLowerCase() === plan.toLowerCase()
  );

  return (
    <motion.div
      variants={{
        show: {
          transition: {
            staggerChildren: 0.08
          }
        }
      }}
      initial="hidden"
      animate="show"
      className={cn("flex flex-col gap-2", className)}
    >
      {selectedPlan?.featureTitle && (
        <motion.div
          key="business-plan-feature"
          variants={STAGGER_CHILD_VARIANTS}
          className="text-sm text-neutral-500"
        >
          {selectedPlan.featureTitle}
        </motion.div>
      )}
      {selectedPlan?.features?.map(({ id, text }, i) => {
        const Icon = Check;

        return (
          <motion.div
            key={i}
            variants={STAGGER_CHILD_VARIANTS}
            className="flex items-center space-x-2 text-sm text-neutral-500"
          >
            <Icon className="size-4" />
            <p className="text-neutral-600">{text}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
