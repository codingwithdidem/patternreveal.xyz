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

export default function ReflectionsLimitAlert({
  email = "codingwithdidem@gmail.com",
  workspace = {
    id: "ckqf1q3xw0000gk5u2q1q2q1q",
    name: "PatternReveal",
    slug: "patternreveal",
    reflectionsUsage: 800,
    reflectionsLimit: 1000,
    plan: "pro",
  },
}: {
  email: string;
  workspace: Partial<WorkspaceWithUsers>;
}) {
  const { slug, name, reflectionsUsage, reflectionsLimit, plan } =
    workspace as {
      slug: string;
      name: string;
      reflectionsUsage: number;
      reflectionsLimit: number;
      plan: string;
    };
  const percentage = Math.round((reflectionsUsage / reflectionsLimit) * 100);
  const nextPlan = getNextPlan(plan as string);

  return (
    <Html>
      <Head />
      <Preview>
        Your PatternReveal workspace, {name} has used {percentage.toString()}%
        of its reflections limit for the month.
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
              Reflections Limit Alert
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Your PatternReveal workspace,{" "}
              <Link
                href={`https://patternreveal.xyz/${slug}`}
                className="text-black underline"
              >
                <strong>{name}</strong>
              </Link>{" "}
              has used <strong>{percentage.toString()}%</strong> of the monthly
              reflections limit included in the {capitalizeFirstChar(plan)}{" "}
              plan. You have created a total of{" "}
              <strong>
                {nFormatter(reflectionsUsage, { full: true })} reflections
              </strong>{" "}
              (out of a maximum of{" "}
              {nFormatter(reflectionsLimit, { full: true })} reflections) in
              your current billing cycle.
            </Text>

            {percentage === 100 ? (
              <Text className="text-sm leading-6 text-black">
                You&apos;ve reached your limit. You&apos;ll need to upgrade to
                the{" "}
                <Link
                  href={nextPlan?.link}
                  className="font-medium text-blue-600 no-underline"
                >
                  {nextPlan?.name} plan
                </Link>{" "}
                to add more reflections.
              </Text>
            ) : (
              <Text className="text-sm leading-6 text-black">
                Once you hit your limit, you&apos;ll need to upgrade to the{" "}
                <Link
                  href={nextPlan?.link}
                  className="font-medium text-blue-600 no-underline"
                >
                  {nextPlan?.name} plan
                </Link>{" "}
                to add more reflections.
              </Text>
            )}
            <Section className="mb-8">
              <Link
                className="rounded-lg bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={`https://patternreveal.xyz/${slug}/upgrade`}
              >
                Upgrade my plan
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
