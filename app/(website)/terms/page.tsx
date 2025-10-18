import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Terms and Conditions | PatternReveal",
  description:
    "PatternReveal Terms and Conditions - Rules and guidelines for using our relationship reflection platform",
};

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

        <p className="text-lg text-muted-foreground mb-8">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <p className="mb-6">
          Welcome to PatternReveal. These Terms and Conditions ("Terms") govern
          your use of our relationship reflection and pattern analysis platform
          ("Service") operated by PatternReveal ("us," "we," or "our").
        </p>

        <p className="mb-6">
          By accessing or using our Service, you agree to be bound by these
          Terms. If you disagree with any part of these terms, then you may not
          access the Service.
        </p>

        <p className="mb-6">
          Our Terms and Conditions ("Terms") govern all use of our Service and
          together with the Privacy Policy constitutes your agreement with us
          ("agreement").
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Definitions</h2>

        <p className="mb-4">
          Below is a list of definitions for the terms used in these Terms and
          Conditions:
        </p>

        <Table className="mb-6">
          <TableHeader>
            <TableRow>
              <TableHead className="px-8 py-6 font-semibold">Term</TableHead>
              <TableHead className="px-6 py-4 font-semibold">
                Definition
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="px-8 py-6 font-medium">Service</TableCell>
              <TableCell className="px-6 py-4">
                PatternReveal website and application operated by PatternReveal
                for relationship reflection and pattern analysis.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-8 py-6 font-medium">User</TableCell>
              <TableCell className="px-6 py-4">
                The individual using our Service.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-8 py-6 font-medium">Account</TableCell>
              <TableCell className="px-6 py-4">
                A registered user account on our Service.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-8 py-6 font-medium">Content</TableCell>
              <TableCell className="px-6 py-4">
                Any text, data, information, or other materials uploaded,
                posted, or transmitted through our Service.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-8 py-6 font-medium">Workspace</TableCell>
              <TableCell className="px-6 py-4">
                A collaborative space where users can share reflections and
                insights.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="px-8 py-6 font-medium">
                AI Analysis
              </TableCell>
              <TableCell className="px-6 py-4">
                Automated analysis of user content using artificial intelligence
                to generate insights and patterns.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          2. Acceptance of Terms
        </h2>

        <p className="mb-6">
          By creating an account, accessing our platform, or using our services,
          you acknowledge that you have read, understood, and agree to be bound
          by these Terms and our Privacy Policy. These Terms constitute a
          legally binding agreement between you and PatternReveal.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          3. Description of Service
        </h2>

        <p className="mb-4">PatternReveal provides:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            A platform for recording and analyzing personal relationship
            reflections
          </li>
          <li>AI-powered pattern analysis and insights</li>
          <li>Workspace collaboration features</li>
          <li>Mood tracking and emotional intelligence tools</li>
          <li>Behavioral pattern recognition and recommendations</li>
          <li>Subscription-based premium features</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          4. User Accounts and Registration
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-3">4.1 Account Creation</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            You must provide accurate and complete information when creating an
            account
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account credentials
          </li>
          <li>You must be at least 13 years old to create an account</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">4.2 Account Security</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            You are responsible for all activities that occur under your account
          </li>
          <li>
            You must notify us immediately of any unauthorized use of your
            account
          </li>
          <li>
            We reserve the right to suspend or terminate accounts that violate
            these Terms
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Acceptable Use</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">5.1 Permitted Uses</h3>
        <p className="mb-4">You may use our Service to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Record personal relationship reflections and experiences</li>
          <li>Analyze your own behavioral and emotional patterns</li>
          <li>Collaborate with trusted individuals in shared workspaces</li>
          <li>Access AI-generated insights and recommendations</li>
          <li>Export your personal data</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">5.2 Prohibited Uses</h3>
        <p className="mb-4">You may not use our Service to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            Record or analyze content about individuals without their consent
          </li>
          <li>Harass, threaten, or harm others</li>
          <li>
            Share content that violates others' privacy or confidentiality
          </li>
          <li>Use the Service for commercial purposes without permission</li>
          <li>Attempt to reverse engineer or compromise our systems</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Share account credentials with others</li>
          <li>Upload malicious code or attempt to disrupt the Service</li>
        </ul>

        <p className="mb-6">
          Furthermore, while you can use our free plan for personal purposes,
          excessive usage that impacts service performance for other users is
          considered a breach of our fair use policies. As such, we reserve the
          right to suspend or terminate your access to the Services if we
          determine, in our sole discretion, that you have violated these Terms
          of Service.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">5.3 Fair Use Policy</h3>
        <p className="mb-4">
          You are responsible for your use of the Services and for any content
          that you post or transmit through the Service. You may not use the
          Service for any malicious purpose, including but not limited to:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Creating fake or misleading relationship reflections</li>
          <li>Using the Service to stalk, harass, or monitor others</li>
          <li>
            Using the Service to justify, normalize, or perpetuate abuse,
            manipulation, or harmful behaviors toward others
          </li>
          <li>Attempting to manipulate AI analysis results</li>
          <li>Using the Service for unauthorized commercial purposes</li>
          <li>Violating intellectual property rights of others</li>
          <li>
            Sharing content that could endanger others or promote illegal
            activities
          </li>
        </ul>
        <p className="mb-6">
          <strong>Note:</strong> PatternReveal is designed to help users
          recognize and understand relationship patterns, including harmful
          ones. Documenting your experiences, even if they involve abuse or
          harmful patterns, is permitted and may be essential for your personal
          growth and safety. However, using the platform to justify or
          perpetuate harmful behaviors toward others is prohibited.
        </p>
        <p className="mb-6">
          Furthermore, while you can use our free plan for personal purposes,
          excessive usage that impacts service performance for other users is
          considered a breach of our fair use policies. As such, we reserve the
          right to suspend or terminate your access to the Services if we
          determine, in our sole discretion, that you have violated these Terms
          of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          6. Content and Data
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-3">6.1 Your Content</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            You retain ownership of your reflection content and personal data
          </li>
          <li>
            You grant us a limited license to process your content to provide
            our services
          </li>
          <li>
            You are responsible for ensuring your content does not violate
            others' rights
          </li>
          <li>
            We do not claim ownership of your personal reflections or data
          </li>
          <li>
            During the term of this Agreement, you grant PatternReveal the right
            to access, collect, use, process, store, disclose, sublicense, and
            transmit your data solely for the purposes of operating, providing,
            maintaining, and improving PatternReveal and our related services
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">
          6.2 AI Analysis and Processing
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            Your content is processed by AI systems to generate insights and
            patterns
          </li>
          <li>
            AI analysis results are provided for informational purposes only
          </li>
          <li>
            We do not guarantee the accuracy or completeness of AI-generated
            insights
          </li>
          <li>
            You should not rely solely on AI analysis for important life
            decisions
          </li>
          <li>
            AI analysis may identify concerning patterns, including abusive or
            harmful behaviors, to help you recognize and understand your
            situation
          </li>
          <li>
            If AI analysis suggests concerning patterns, consider seeking
            professional help for guidance and support
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          7. Subscription and Payment
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-3">
          7.1 Subscription Plans
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            We offer free and paid subscription plans with different features
            and limits
          </li>
          <li>
            Subscription fees are processed through Paddle, our payment
            processor
          </li>
          <li>15-day money-back guarantee for new subscriptions</li>
          <li>No refunds after 15 days or for existing subscriptions</li>
          <li>Refunds processed through Paddle within 5-10 business days</li>
          <li>
            We may change pricing with 30 days' notice to existing subscribers
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">
          7.2 Billing and Cancellation
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Subscriptions automatically renew unless cancelled</li>
          <li>
            You can cancel your subscription at any time through your account
            settings
          </li>
          <li>
            Cancellation takes effect at the end of your current billing period
          </li>
          <li>
            We may suspend accounts for non-payment after reasonable notice
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">7.3 Refund Policy</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <strong>15-Day Money-Back Guarantee:</strong> We offer a 15-day
            money-back guarantee for new subscriptions only. If you're not
            completely satisfied with PatternReveal Pro, you can request a full
            refund within 15 days of your initial purchase.
          </li>
          <li>
            <strong>No Refunds After 15 Days:</strong> Refunds are not available
            after the 15-day period or for existing subscriptions that have been
            active beyond the initial 15 days.
          </li>
          <li>
            <strong>Refund Requests:</strong> To request a refund, contact us at{" "}
            <a
              href="mailto:support@patternreveal.xyz"
              className="text-blue-600"
            >
              support@patternreveal.xyz
            </a>{" "}
            with your account details and reason for the refund request.
          </li>
          <li>
            <strong>Processing Time:</strong> Refunds are processed through
            Paddle within 5-10 business days and will appear on your original
            payment method.
          </li>
          <li>
            <strong>Account Changes:</strong> Upon refund, your account will be
            immediately downgraded to the free plan, but you'll retain access to
            your journal entries and basic features.
          </li>
          <li>
            <strong>Refund Exceptions:</strong> Refunds may not be available in
            cases of Terms of Service violations, fraudulent activity, abuse of
            the refund policy, or requests made after 15 days from initial
            purchase.
          </li>
          <li>
            <strong>No Pro-Rated Refunds:</strong> We do not offer pro-rated
            refunds for partial subscription periods.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          8. Privacy and Data Protection
        </h2>

        <p className="mb-6">
          Your privacy is important to us. Our collection and use of personal
          information is governed by our{" "}
          <a
            href="/privacy"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Privacy Policy
          </a>
          , which is incorporated into these Terms by reference. By using our
          Service, you consent to the collection and use of information as
          described in our Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          9. Intellectual Property
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-3">
          9.1 Our Intellectual Property
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>PatternReveal and all related trademarks are our property</li>
          <li>
            Our platform, software, and algorithms are protected by intellectual
            property laws
          </li>
          <li>
            You may not copy, modify, or distribute our proprietary technology
          </li>
          <li>
            By signing up for the Services, you agree that we may use your
            company name and logo in our marketing materials
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">
          9.2 User-Generated Content
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>You retain ownership of your reflection content</li>
          <li>
            You grant us a license to process and analyze your content for
            service provision
          </li>
          <li>
            We do not use your content for marketing or other commercial
            purposes without consent
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">
          9.3 Usage Data and Analytics
        </h3>
        <p className="mb-4">
          PatternReveal may compile and derive aggregated performance metrics,
          usage patterns, and other statistical data from users of the Services
          ("Usage Data"). All Usage Data is aggregated and anonymized so that it
          cannot be used to identify you, your customers, or any specific
          individual. Usage Data is not considered your data or personal data,
          cannot be re-identified, and will be deemed PatternReveal's data. All
          Usage Data is anonymized and de-identified.
        </p>
        <p className="mb-6">
          Any data that cannot be associated with you or your customers may also
          be used by PatternReveal for support and service improvements.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          10. Disclaimers and Limitations
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-3">
          10.1 Service Availability
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            We strive for high availability but cannot guarantee uninterrupted
            service
          </li>
          <li>
            We may perform maintenance that temporarily affects service
            availability
          </li>
          <li>We are not responsible for third-party service interruptions</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">
          10.2 AI Analysis Disclaimer
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>AI-generated insights are for informational purposes only</li>
          <li>
            We do not provide professional psychological or relationship
            counseling
          </li>
          <li>
            You should consult qualified professionals for serious relationship
            or mental health concerns
          </li>
          <li>We are not liable for decisions made based on our AI analysis</li>
          <li>
            AI analysis is designed to help identify patterns, including
            potentially harmful ones, to support your personal growth and safety
          </li>
          <li>
            If you are experiencing abuse or are in danger, please contact
            emergency services or domestic violence hotlines immediately
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          11. Limitation of Liability
        </h2>

        <p className="mb-6">
          IN NO EVENT WILL EITHER PARTY BE LIABLE UNDER OR IN CONNECTION WITH
          THIS AGREEMENT, UNDER ANY LEGAL OR EQUITABLE THEORY – INCLUDING BREACH
          OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR
          OTHERWISE – FOR ANY: (i) CONSEQUENTIAL, INCIDENTAL, INDIRECT,
          EXEMPLARY, SPECIAL, AGGRAVATED, OR PUNITIVE DAMAGES; (ii) INCREASED
          COSTS, DIMINUTION IN VALUE, OR LOSS OF BUSINESS, PRODUCTION, REVENUES,
          OR PROFITS; (iii) LOSS OF GOODWILL OR REPUTATION; (iv) USE, INABILITY
          TO USE, LOSS, INTERRUPTION, DELAY, OR RECOVERY OF ANY DATA, OR ANY
          BREACH OF DATA OR SYSTEM SECURITY; OR (v) COST OF REPLACEMENT GOODS OR
          SERVICES – IN EACH CASE REGARDLESS OF WHETHER THE PARTY WAS ADVISED OF
          THE POSSIBILITY OF SUCH LOSSES OR DAMAGES OR WHETHER SUCH LOSSES OR
          DAMAGES WERE OTHERWISE FORESEEABLE.
        </p>

        <p className="mb-6">
          IN NO EVENT WILL EITHER PARTY'S AGGREGATE LIABILITY ARISING OUT OF OR
          RELATED TO THIS AGREEMENT, UNDER ANY LEGAL OR EQUITABLE THEORY, EXCEED
          THE TOTAL SUBSCRIPTION FEES PAID BY CLIENT TO PATTERNREVEAL UNDER THIS
          AGREEMENT FOR THE SIX (6) MONTH PERIOD PRECEDING THE EVENT GIVING RISE
          TO THE CLAIM.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">11.1 Exceptions</h3>
        <p className="mb-6">
          THE LIMITATION IN SECTION 11 WILL NOT APPLY TO: (I) ANY FAILURE OF
          CLIENT TO PAY ANY FEES OWED TO PATTERNREVEAL; (II) ANY BREACH OF
          RESTRICTIONS ON USE; OR (III) ANY BREACH OF CONFIDENTIALITY
          OBLIGATIONS.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          12. Confidentiality
        </h2>

        <p className="mb-4">
          Given the highly sensitive nature of relationship reflection data,
          both parties acknowledge the importance of maintaining strict
          confidentiality. "Confidential Information" means any information
          disclosed by one party to the other in connection with this Agreement
          that is designated as proprietary or confidential by the disclosing
          party, or should reasonably be understood to be proprietary or
          confidential given its nature and the circumstances of disclosure.
        </p>

        <p className="mb-4">Each party agrees to:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            use the other party's Confidential Information solely for the
            purpose of fulfilling its obligations under this Agreement;
          </li>
          <li>
            protect the other party's Confidential Information with at least the
            same degree of care it uses to protect its own confidential
            information of similar importance;
          </li>
          <li>
            not disclose the other party's Confidential Information to any third
            party except to its employees, contractors, or professional advisors
            who have a legitimate need to know the information and who are bound
            by confidentiality obligations at least as protective as those in
            this Agreement.
          </li>
        </ul>

        <p className="mb-6">
          The obligations do not apply to any information that the receiving
          party can demonstrate has become publicly known through no wrongful
          act or omission of the receiving party; is rightfully received from a
          third party without restriction on disclosure; is independently
          developed by the receiving party without use of or reference to the
          disclosing party's Confidential Information.
        </p>

        <p className="mb-6">
          The receiving party may disclose Confidential Information if required
          by law, regulation, or court order, provided that it (where legally
          permissible) gives prompt written notice to the disclosing party to
          allow the disclosing party to seek a protective order or other remedy.
          Upon termination of this Agreement, each party will, at the disclosing
          party's request, return or destroy all Confidential Information in its
          possession, subject to any retention required by applicable law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          13. Indemnification
        </h2>

        <p className="mb-6">
          You agree to indemnify and hold harmless PatternReveal from any
          claims, damages, losses, or expenses (including reasonable attorneys'
          fees) arising from your use of the Service, violation of these Terms,
          or infringement of any third-party rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">14. Termination</h2>

        <h3 className="text-xl font-medium mt-6 mb-3">
          14.1 Termination by You
        </h3>
        <p className="mb-4">You may terminate your account at any time by:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Contacting us at info@patternreveal.xyz</li>
          <li>Using the account deletion feature in your settings</li>
          <li>Cancelling your subscription (if applicable)</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">
          14.2 Termination by Us
        </h3>
        <p className="mb-4">We may terminate or suspend your account if:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>You violate these Terms</li>
          <li>You fail to pay subscription fees</li>
          <li>We discontinue the Service</li>
          <li>Required by law or regulation</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-3">
          14.3 Access Suspension
        </h3>
        <p className="mb-4">
          We can, at any time and at our sole discretion, without limiting any
          of our other rights or remedies at law or in equity under this
          Agreement, suspend your access to or use of PatternReveal:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>for scheduled maintenance;</li>
          <li>due to a Force Majeure Event;</li>
          <li>if you violate any provision of the Agreement;</li>
          <li>to address any emergency security concerns;</li>
          <li>
            if required by a governmental or regulatory authority or as a result
            of a change in applicable law.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          15. Governing Law and Disputes
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-3">15.1 Governing Law</h3>
        <p className="mb-6">
          This Agreement and related disputes will be governed by the laws of
          the State of California without regard to its conflicts of laws
          principles.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">15.2 Arbitration</h3>
        <p className="mb-4">
          Both parties agree to resolve any claims relating to this Agreement
          only through final and binding arbitration, except as set forth below.
          The American Arbitration Association (AAA) will administer the
          arbitration under its Commercial Arbitration Rules. The arbitration
          will be held in San Francisco (CA), or any other location both parties
          agree to in writing.
        </p>
        <p className="mb-4">
          If a party breaches its obligations under this Agreement, the
          non-breaching party may bring a lawsuit in the federal or state courts
          of San Francisco County, California solely for injunctive relief to
          stop the breach without first engaging in the informal dispute notice
          process described above. The state or federal courts sitting in San
          Francisco County, California shall have exclusive jurisdiction and
          venue over any dispute arising out of your use of the PatternReveal
          Services, subject to the mandatory arbitration provisions herein, and
          you hereby consent to the jurisdiction of those courts.
        </p>

        <h3 className="text-xl font-medium mt-6 mb-3">15.3 No Class Actions</h3>
        <p className="mb-4">
          You may only resolve disputes related to or arising from this
          Agreement on an individual basis and will not bring a claim in a
          class, consolidated, or representative action. This waiver is an
          independent covenant. You have the right to opt-out and not be bound
          by the arbitration provisions by sending written notice of your
          decision to opt-out to: legal@patternreveal.xyz with the subject line
          "ARBITRATION OPT-OUT". The notice must be sent within thirty (30) days
          of the date that you first accept these Terms, otherwise you shall be
          bound to arbitrate any disputes in accordance with these Terms. If you
          opt-out of these arbitration provisions, PatternReveal also will not
          be bound by them.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          16. Changes to Terms
        </h2>

        <p className="mb-6">
          We reserve the right to modify these Terms at any time. We will notify
          users of material changes by email or through the Service. Your
          continued use of the Service after changes become effective
          constitutes acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">17. Force Majeure</h2>

        <p className="mb-6">
          Other than when it comes to Client's payment responsibilities, neither
          of us will be held responsible if we can't meet our obligations under
          this Agreement because of something beyond our control, including
          fires, power outages, extreme weather, labour disputes or government
          interventions (a "Force Majeure Event") as long as the party unable to
          fulfill its obligations notifies the other party promptly and gets
          back on track as soon as possible. If a Force Majeure Event causes a
          delay that lasts for 90 days without a solution, either of us may
          terminate the Agreement without any penalties.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">18. Severability</h2>

        <p className="mb-6">
          If any provision of these Terms is found to be unenforceable or
          invalid, the remaining provisions shall remain in full force and
          effect.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          19. Contact Information
        </h2>

        <p className="mb-4">
          If you have any questions about these Terms, please contact us at
          info@patternreveal.xyz.
        </p>

        <div className="bg-muted p-6 rounded-lg mt-8">
          <h3 className="text-lg font-semibold mb-2">Emergency Contact</h3>
          <p className="mb-2">
            If you are experiencing a mental health emergency or are in danger,
            please contact emergency services immediately:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Emergency Services:</strong> 911 (US) or your local
              emergency number
            </li>
            <li>
              <strong>Crisis Text Line:</strong> Text HOME to 741741
            </li>
            <li>
              <strong>National Suicide Prevention Lifeline:</strong> 988
            </li>
            <li>
              <strong>National Domestic Violence Hotline:</strong>{" "}
              1-800-799-7233
            </li>
            <li>
              <strong>RAINN (Rape, Abuse & Incest National Network):</strong>{" "}
              1-800-656-HOPE
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            PatternReveal is not a substitute for professional help. If you are
            experiencing abuse or are in danger, please seek immediate help from
            qualified professionals and emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}
