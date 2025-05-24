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
  Text,
  Tailwind
} from "@react-email/components";
import * as React from "react";

interface AccountLockedEmailProps {
  email: string;
  lockedAt: Date;
  reason: string;
}

export const AccountLocked = ({
  email,
  lockedAt,
  reason
}: AccountLockedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your account has been locked</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Heading>
              Your account ({email}) has been locked at{" "}
              {lockedAt.toLocaleString()}
            </Heading>
            <Text>{reason}</Text>
            <Text>Please contact support to unlock your account.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
