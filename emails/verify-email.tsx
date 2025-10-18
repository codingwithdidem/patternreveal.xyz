import { EMAIL_OTP_EXPIRY_IN } from "@/lib/auth/constants";
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
import { PATTERNREVEAL_WORDMARK } from "@/utils/constants";

export function VerifyEmail({
  email = "user@example.com",
  code = "123456",
  expires = new Date(Date.now() + EMAIL_OTP_EXPIRY_IN * 1000),
}: {
  email: string;
  code: string;
  expires: Date;
}) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to get started with PatternReveal</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-slate-50 font-sans">
          <Section className="bg-gradient-to-r from-blue-600 to-slate-900">
            <Container className="mx-auto max-w-[600px] px-10 py-8">
              <Img
                src={PATTERNREVEAL_WORDMARK}
                alt="PatternReveal"
                className="mx-auto"
                width={200}
                height={40}
              />
            </Container>
          </Section>

          <Container className="mx-auto max-w-[600px] bg-white shadow-lg">
            <Section className="px-10 py-8">
              <Heading className="mx-0 my-0 p-0 text-2xl font-bold text-slate-900 text-center">
                Verify Your Email Address
              </Heading>

              <Text className="mt-6 text-base leading-6 text-slate-600 text-center">
                Welcome to <strong>PatternReveal</strong>! We're excited to have
                you on board.
              </Text>

              <Text className="mt-4 text-base leading-6 text-slate-600 text-center">
                To complete your account setup and start discovering your
                behavioral patterns, please verify your email address by
                entering the code below:
              </Text>

              <Section className="my-8">
                <div className="mx-auto w-fit rounded-lg bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-blue-100 px-8 py-6 text-center shadow-inner">
                  <Text className="text-sm font-medium text-slate-600 mb-2 my-0">
                    Verification Code
                  </Text>
                  <div className="font-mono text-3xl font-bold tracking-[0.3em] text-slate-900 bg-white rounded-md px-4 py-3 border border-slate-200">
                    {code}
                  </div>
                </div>
              </Section>

              <Text className="text-sm leading-6 text-slate-600 text-center">
                This verification code will expire in{" "}
                <strong>10 minutes</strong> for security reasons.
              </Text>

              <Text className="mt-6 text-sm leading-6 text-slate-600 text-center">
                If you didn&apos;t create an account with PatternReveal, you can
                safely ignore this email.
              </Text>
            </Section>

            <Section className="bg-slate-50 px-10 py-6 border-t border-slate-200">
              <Text className="text-xs leading-5 text-slate-500 text-center my-0">
                Need help? Contact us at{" "}
                <Link
                  href="mailto:info@patternreveal.xyz"
                  className="text-blue-600 underline"
                >
                  info@patternreveal.xyz
                </Link>
              </Text>

              <Text className="mt-3 text-xs leading-5 text-slate-400 text-center my-0">
                PatternReveal • Discover Your Behavioral Patterns
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default VerifyEmail;
