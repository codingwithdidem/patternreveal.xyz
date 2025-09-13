import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "5 daily reflections",
      "Basic pattern analysis",
      "Email support",
      "Mobile app access",
    ],
    cta: "Get Started",
    popular: false,
    href: "/app/register",
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For individuals serious about growth",
    features: [
      "Unlimited reflections",
      "Advanced AI insights",
      "Relationship health tracking",
      "Priority support",
      "Custom insights",
      "Export reports",
    ],
    cta: "Start Free Trial",
    popular: true,
    href: "/app/register",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Simple, transparent pricing
          </h2>
          <h3 className="text-2xl font-semibold text-black mb-8">
            Choose the plan that works for you
          </h3>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade when you're ready. No hidden fees, no
            surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg"
                  : "bg-white border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-black ml-2">/{plan.period}</span>
                </div>
                <p className="text-black">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-black">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90"
                      : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
                  } transition-all duration-300`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-black mb-4">
            Start with our free plan. Upgrade anytime when you're ready.
          </p>
          <p className="text-sm text-black">
            Need a custom plan?{" "}
            <Link
              href="mailto:info@patternreveal.xyz"
              className="text-purple-600 hover:text-purple-700"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
