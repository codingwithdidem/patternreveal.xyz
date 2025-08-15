import { getPlanDetails } from "@/lib/constants";
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

export function UpgradeEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
  plan = "Business",
}: {
  name: string | null;
  email: string;
  plan: string;
}) {
  const planDetails = getPlanDetails(plan);
  return (
    <Html>
      <Head />
      <Preview>Thank you for upgrading to PatternReveal {plan}!</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-xl font-medium text-black">
              Thank you for upgrading to PatternReveal {plan}!
            </Heading>
            <Section className="my-8">
              <Img
                src={PATTERNREVEAL_WORDMARK}
                alt="PatternReveal Logo"
                className="max-w-[300px] mx-auto"
              />
            </Section>
            <Text className="text-sm leading-6 text-black">
              Hey{name && ` ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              I wanted to personally reach out to thank you for upgrading to{" "}
              <strong>PatternReveal {plan}</strong>! Your support means the
              world to us and helps us continue to build and improve
              PatternReveal.
            </Text>
            <Text className="text-sm leading-6 text-black">
              On the {plan} plan, you now have access to:
            </Text>
            {planDetails?.features?.map((feature) => (
              <Text
                key={feature.text}
                className="ml-1 text-sm leading-4 text-black"
              >
                ◆ {feature.text}
              </Text>
            ))}
            <Text className="text-sm leading-6 text-black">
              If you have any questions or feedback about Dub, please don't
              hesitate to reach out – I'm always happy to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-neutral-400">
              Steven from Dub
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default UpgradeEmail;
