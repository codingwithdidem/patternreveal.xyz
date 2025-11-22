import { PATTERNREVEAL_WORDMARK } from "@/utils/constants";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export function SubscriptionPaymentFailedEmail({
  name = "Brendon Urie",
  plan = "Pro",
  amount = "$49",
  currency = "USD",
  retryDate,
  billingPortalUrl = "https://patternreveal.xyz/app/settings/workspace/billing",
}: {
  name: string | null;
  plan: string;
  amount?: string;
  currency?: string;
  retryDate?: string | Date;
  billingPortalUrl?: string;
}) {
  const formattedRetryDate = (() => {
    if (!retryDate) {
      return null;
    }

    const date =
      typeof retryDate === "string" ? new Date(retryDate) : retryDate;

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  })();

  return (
    <Html>
      <Head />
      <Preview>
        We couldn&apos;t process your latest PatternReveal {plan} subscription
        payment
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-xl font-medium text-black">
              We couldn&apos;t process your PatternReveal {plan} payment
            </Heading>
            <Section className="my-8">
              <Img
                src={PATTERNREVEAL_WORDMARK}
                alt="PatternReveal Logo"
                className="max-w-[240px] mx-auto"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              Hi{name && ` ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              We attempted to charge <strong>{amount}</strong> ({currency}) for
              your <strong>PatternReveal {plan}</strong> subscription, but the
              payment didn&apos;t go through.
            </Text>
            {formattedRetryDate ? (
              <Text className="text-sm leading-6 text-black">
                We&apos;ll automatically retry the payment on{" "}
                <strong>{formattedRetryDate}</strong>. To avoid any disruption,
                please update your payment method before then.
              </Text>
            ) : (
              <Text className="text-sm leading-6 text-black">
                Please update your payment method as soon as possible to avoid
                any disruption to your workspace and paid features.
              </Text>
            )}
            <Text className="text-sm leading-6 text-black">
              You can manage your billing information any time from your
              workspace billing settings.
            </Text>
            <Section className="my-6 text-center">
              <Link
                href={billingPortalUrl}
                className="inline-block rounded-md bg-black px-5 py-2 text-sm font-semibold text-white no-underline"
              >
                Update payment details
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              If you need help or have questions, just reply to this
              email—we&apos;re happy to assist.
            </Text>
            <Text className="text-sm font-light leading-6 text-neutral-400">
              The PatternReveal Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default SubscriptionPaymentFailedEmail;
