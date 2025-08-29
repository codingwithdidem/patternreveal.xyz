import { getNextPlan } from "@/lib/constants";
import type { WorkspaceWithUsers } from "@/lib/types";
import { PATTERNREVEAL_WORDMARK } from "@/utils/constants";
import { capitalizeFirstChar } from "@/utils/functions/capitalize-first-char";
import { nFormatter } from "@/utils/functions/nformatter";
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

export default function ReflectionsExceeded({
  email = "codingwithdidem@gmail.com",
  workspace = {
    id: "ckqf1q3xw0000gk5u2q1q2q1q",
    name: "PatternReveal",
    slug: "patternreveal",
    reflectionsUsage: 2410,
    reflectionsLimit: 1000,
    plan: "pro",
  },
  type = "firstUsageLimitEmail",
}: {
  email: string;
  workspace: Partial<WorkspaceWithUsers>;
  type: "firstUsageLimitEmail" | "secondUsageLimitEmail";
}) {
  const { slug, name, reflectionsUsage, reflectionsLimit, plan } = workspace;
  const nextPlan = getNextPlan(plan as string);

  return (
    <Html>
      <Head />
      <Preview>
        Your PatternReveal workspace, {name || ""} has exceeded the{" "}
        {capitalizeFirstChar(plan || "") || ""} Plan limit of{" "}
        {nFormatter(reflectionsLimit)} reflections/month.
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={PATTERNREVEAL_WORDMARK}
                height="32"
                alt="PatternReveal"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-lg font-medium text-black">
              Reflections Limit Exceeded
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Your PatternReveal workspace,{" "}
              <Link
                href={`https://patternreveal.xyz/${slug}`}
                className="text-black underline"
              >
                <strong>{name}</strong>
              </Link>{" "}
              has exceeded the
              <strong> {capitalizeFirstChar(plan || "")} Plan </strong>
              limit of{" "}
              <strong>{nFormatter(reflectionsLimit)} reflections/month</strong>.
              You have used{" "}
              <strong>
                {nFormatter(reflectionsUsage, { digits: 2 })} reflections
              </strong>{" "}
              across all your reflections in your current billing cycle.
            </Text>
            <Text className="text-sm leading-6 text-black">
              All your existing reflections will continue to work, and we are
              still collecting data on them, but you'll need to upgrade to the{" "}
              <Link
                href={nextPlan?.link}
                className="font-medium text-blue-600 no-underline"
              >
                {nextPlan?.name} plan
              </Link>{" "}
              to view their stats.
            </Text>
            <Section className="my-8">
              <Link
                className="rounded-lg bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://patternreveal.xyz/${slug}/upgrade`}
              >
                Upgrade my plan
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              To respect your inbox,{" "}
              {type === "firstUsageLimitEmail"
                ? "we will only send you one more email about this in 3 days"
                : "this will be the last time we'll email you about this for the current billing cycle"}
              . Feel free to ignore this email if you don't plan on upgrading,
              or reply to let us know if you have any questions!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
