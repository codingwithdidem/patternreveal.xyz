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
  Text
} from "@react-email/components";

export function WorkspaceInvite({
  email = "codingwithdide@gmail.com",
  url = "http://localhost:8888/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
  workspaceName = "My Ex",
  workspaceUser = "Didem Kucukkaraaslan",
  workspaceUserEmail = "codingwithdidem@gmail.com"
}: {
  email: string;
  url: string;
  workspaceName: string;
  workspaceUser: string | null;
  workspaceUserEmail: string | null;
}) {
  return (
    <Html>
      <Head />
      <Preview>Join {workspaceName} on PatternReveal</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[600px] rounded border border-solid border-neutral-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-xl font-medium text-black">
              Join {workspaceName} on PatternReveal
            </Heading>
            {workspaceUser && workspaceUserEmail ? (
              <Text className="text-sm leading-6 text-black">
                <strong>{workspaceUser}</strong> (
                <Link
                  className="text-blue-600 no-underline"
                  href={`mailto:${workspaceUserEmail}`}
                >
                  {workspaceUserEmail}
                </Link>
                ) has invited you to join the <strong>{workspaceName}</strong>{" "}
                workspace on PatternReveal!
              </Text>
            ) : (
              <Text className="text-sm leading-6 text-black">
                You have been invited to join the{" "}
                <strong>{workspaceName}</strong> workspace on PatternReveal!
              </Text>
            )}
            <Section className="mb-8 mt-8">
              <Link
                className="rounded-lg bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Join Workspace
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default WorkspaceInvite;
