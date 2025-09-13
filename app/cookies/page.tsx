import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | PatternReveal",
  description:
    "PatternReveal Cookie Policy - How we use cookies and tracking technologies",
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>

          <p className="text-lg text-muted-foreground mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <p className="mb-6">
            This Cookie Policy explains how PatternReveal ("we," "our," or "us")
            uses cookies and similar tracking technologies when you visit our
            website and use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            1. What Are Cookies?
          </h2>

          <p className="mb-6">
            Cookies are small text files that are stored on your device when you
            visit a website. They help websites remember information about your
            visit, such as your preferences and settings, making your next visit
            easier and the site more useful to you.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. How We Use Cookies
          </h2>

          <p className="mb-4">We use cookies for several purposes:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Essential Cookies:</strong> Required for the website to
              function properly
            </li>
            <li>
              <strong>Authentication Cookies:</strong> Keep you logged in to
              your account
            </li>
            <li>
              <strong>Preference Cookies:</strong> Remember your settings and
              preferences
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how you use
              our website
            </li>
            <li>
              <strong>Performance Cookies:</strong> Monitor and improve website
              performance
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            3. Types of Cookies We Use
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3">
            3.1 Essential Cookies
          </h3>
          <p className="mb-4">
            These cookies are necessary for the website to function and cannot
            be switched off:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Session management cookies</li>
            <li>Authentication tokens</li>
            <li>Security and fraud prevention cookies</li>
            <li>Load balancing cookies</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            3.2 Functional Cookies
          </h3>
          <p className="mb-4">
            These cookies enable enhanced functionality and personalization:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Language and region preferences</li>
            <li>Theme and display preferences</li>
            <li>Workspace and user settings</li>
            <li>Form data and input preferences</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            3.3 Analytics Cookies
          </h3>
          <p className="mb-4">
            We use analytics cookies to understand how our website is used:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>PostHog:</strong> User behavior analytics and product
              insights
            </li>
            <li>
              <strong>Sentry:</strong> Error monitoring and performance tracking
            </li>
            <li>
              <strong>Tinybird:</strong> Usage analytics and pattern analysis
              data
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            3.4 Third-Party Cookies
          </h3>
          <p className="mb-4">
            We may use third-party services that set their own cookies:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Google Analytics:</strong> Website traffic and user
              behavior analysis
            </li>
            <li>
              <strong>Paddle:</strong> Payment processing and subscription
              management
            </li>
            <li>
              <strong>Resend:</strong> Email delivery and communication services
            </li>
            <li>
              <strong>Google OAuth:</strong> Authentication services (when using
              Google sign-in)
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            4. Cookie Duration
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3">4.1 Session Cookies</h3>
          <p className="mb-4">
            These cookies are temporary and are deleted when you close your
            browser:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Login session cookies</li>
            <li>Form data cookies</li>
            <li>Temporary preference cookies</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">
            4.2 Persistent Cookies
          </h3>
          <p className="mb-4">
            These cookies remain on your device for a set period:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Authentication cookies (30 days)</li>
            <li>Preference cookies (1 year)</li>
            <li>Analytics cookies (2 years)</li>
            <li>Marketing cookies (1 year)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            5. Managing Cookies
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3">
            5.1 Browser Settings
          </h3>
          <p className="mb-4">
            You can control cookies through your browser settings:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Chrome:</strong> Settings → Privacy and security → Cookies
              and other site data
            </li>
            <li>
              <strong>Firefox:</strong> Options → Privacy & Security → Cookies
              and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Manage Website
              Data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Cookies and site permissions →
              Cookies and site data
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">5.2 Cookie Consent</h3>
          <p className="mb-6">
            When you first visit our website, you may see a cookie consent
            banner. You can choose which types of cookies to accept or reject.
            Note that disabling certain cookies may affect the functionality of
            our website.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            6. Third-Party Cookie Policies
          </h2>

          <p className="mb-4">
            For information about how third-party services use cookies, please
            refer to their privacy policies:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>PostHog:</strong>{" "}
              <a
                href="https://posthog.com/privacy"
                className="text-blue-600 hover:underline"
              >
                https://posthog.com/privacy
              </a>
            </li>
            <li>
              <strong>Sentry:</strong>{" "}
              <a
                href="https://sentry.io/privacy/"
                className="text-blue-600 hover:underline"
              >
                https://sentry.io/privacy/
              </a>
            </li>
            <li>
              <strong>Paddle:</strong>{" "}
              <a
                href="https://paddle.com/privacy/"
                className="text-blue-600 hover:underline"
              >
                https://paddle.com/privacy/
              </a>
            </li>
            <li>
              <strong>Google:</strong>{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-600 hover:underline"
              >
                https://policies.google.com/privacy
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Updates to This Cookie Policy
          </h2>

          <p className="mb-6">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated policy on this page and updating the "Last
            updated" date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            8. Contact Information
          </h2>

          <p className="mb-4">
            If you have any questions about our use of cookies, please contact
            us:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Email:</strong> privacy@patternreveal.xyz
            </li>
            <li>
              <strong>General Contact:</strong> info@patternreveal.xyz
            </li>
            <li>
              <strong>Address:</strong> [Your Business Address]
            </li>
          </ul>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
            <p className="mb-2">
              You can manage your cookie preferences at any time by visiting our
              cookie settings page or adjusting your browser settings. Please
              note that some features of our website may not function properly
              if you disable certain cookies.
            </p>
            <p>
              <strong>Cookie Settings:</strong>{" "}
              <a
                href="/cookie-settings"
                className="text-blue-600 hover:underline"
              >
                Manage Cookie Preferences
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
