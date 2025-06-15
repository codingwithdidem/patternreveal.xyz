"use client";

import EmailForm from "@/components/settings/EmailForm";
import NameForm from "@/components/settings/NameForm";

export default function SettingsPage() {
  return (
    <div className="p-4 h-full w-full font-[family-name:var(--font-satoshi)]">
      <h1 className="text-2xl font-semibold mb-5">Settings</h1>
      <div className="flex flex-col divide-y divide-gray-100">
        <NameForm />
        <EmailForm />
      </div>
    </div>
  );
}
