import { constructMetadata } from "@/utils/functions/construct-metadata";

export const metadata = constructMetadata({
  title: "Refund Policy | PatternReveal",
  description:
    "PatternReveal Refund Policy - Our 30-day money-back guarantee and refund terms",
});

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            At PatternReveal, we want you to be completely satisfied with your
            subscription. We offer a comprehensive refund policy to ensure your
            peace of mind.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            15-Day Money-Back Guarantee
          </h2>
          <p className="mb-6">
            We offer a 15-day money-back guarantee for new subscriptions only.
            If you're not completely satisfied with PatternReveal Pro, you can
            request a full refund within 15 days of your initial purchase.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            How to Request a Refund
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Contact us at{" "}
              <a
                href="mailto:support@patternreveal.xyz"
                className="text-blue-600"
              >
                support@patternreveal.xyz
              </a>{" "}
              with your account details
            </li>
            <li>
              Or cancel your subscription through your account settings and
              contact us for a refund
            </li>
            <li>
              Refunds are processed automatically through Paddle within 5-10
              business days
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            No Refunds After 15 Days
          </h2>
          <p className="mb-6">
            Refunds are not available after the 15-day period or for existing
            subscriptions that have been active beyond the initial 15 days. We
            do not offer pro-rated refunds for partial subscription periods.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            What Happens After a Refund
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Your account will be immediately downgraded to the free plan
            </li>
            <li>
              You'll retain access to your journal entries and basic features
            </li>
            <li>Pro features will be disabled until you subscribe again</li>
            <li>
              Your data remains secure and private as outlined in our Privacy
              Policy
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Exceptions</h2>
          <p className="mb-6">Refunds may not be available in cases of:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Violation of our Terms of Service</li>
            <li>Fraudulent activity or abuse of the refund policy</li>
            <li>Refunds requested after 15 days from initial purchase</li>
            <li>Existing subscriptions that have been active beyond 15 days</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Questions?</h2>
          <p className="mb-6">
            If you have any questions about our refund policy, please don't
            hesitate to contact us at{" "}
            <a
              href="mailto:support@patternreveal.xyz"
              className="text-blue-600"
            >
              support@patternreveal.xyz
            </a>
            . We're here to help!
          </p>

          <p className="text-sm text-gray-600 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
