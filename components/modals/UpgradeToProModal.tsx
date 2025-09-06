"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useUpgradeToProModal } from "@/lib/stores/modal-store";
import PlanSelector from "@/app/app/(dashboard)/(onboarding)/onboarding/plan-selector";

export function UpgradeToProModal() {
  const { show, setShow } = useUpgradeToProModal();

  if (!show) {
    return null;
  }

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade to Pro</DialogTitle>
        </DialogHeader>
        <div className="mt-1">
          <PlanSelector />
        </div>
      </DialogContent>
    </Dialog>
  );
}
