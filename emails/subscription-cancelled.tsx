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

export function SubscriptionCancelledEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
  plan = "Pro",
  effectiveDate,
  cancellationEffectiveAt,
}: {
  name: string | null;
  email: string;
  plan: string;
  effectiveDate?: string;
  cancellationEffectiveAt?: string | Date;
}) {
  const formattedCancellationEffectiveAt = (() => {
    if (cancellationEffectiveAt) {
      const date =
        typeof cancellationEffectiveAt === "string"
          ? new Date(cancellationEffectiveAt)
          : cancellationEffectiveAt;

      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat(undefined, {
          dateStyle: "long",
          timeStyle: "short",
        }).format(date);
      }
    }

    if (effectiveDate) {
      return effectiveDate;
    }

    return null;
  })();

  return (
    <Html>
      <Head />
      <Preview>
        Your PatternReveal {plan} subscription has been cancelled
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-xl font-medium text-black">
              Your PatternReveal {plan} subscription has been cancelled
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
              This message is to confirm that the{" "}
              <strong>PatternReveal {plan}</strong> subscription associated with{" "}
              <Link href={`mailto:${email}`}>{email}</Link> has been cancelled.
            </Text>
            {formattedCancellationEffectiveAt ? (
              <Text className="text-sm leading-6 text-black">
                Your current access will remain active until{" "}
                <strong>{formattedCancellationEffectiveAt}</strong>. After that
                point, you will move to the free plan and any paid-only features
                will stop working.
              </Text>
            ) : null}
            <Text className="text-sm leading-6 text-black">
              If you cancelled by mistake or would like to restart your
              subscription, you can upgrade again at any time from your
              workspace billing settings.
            </Text>
            <Text className="text-sm leading-6 text-black">
              Have any questions or feedback? Just reply to this email—we&apos;d
              love to help.
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

export default SubscriptionCancelledEmail;
