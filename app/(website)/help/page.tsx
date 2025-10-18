"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Search,
  BookOpen,
  Shield,
  HelpCircle,
  MessageCircle,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { useState, useMemo } from "react";

// Help content data
const helpContent = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    questions: [
      {
        question: "How do I create my first reflection?",
        answer:
          'Creating your first reflection is easy and takes just a few minutes: Sign up for a free account, Navigate to the "Reflections" section in your dashboard, Click "New Reflection" and choose a template, Write about your day, relationships, or specific situations, Save your reflection and let our AI analyze it',
      },
      {
        question: "What should I write about in my reflections?",
        answer:
          "Write about anything that's on your mind regarding your relationships and interactions: Conversations that made you feel uncomfortable, Patterns you've noticed in your relationships, Emotional responses to specific situations, Boundaries that were crossed or respected, Any concerns about manipulative behavior",
      },
      {
        question: "How often should I create reflections?",
        answer:
          "We recommend creating reflections regularly to get the best insights. Daily reflections provide the most comprehensive pattern analysis, but even weekly reflections can be valuable for understanding relationship dynamics.",
      },
    ],
  },
  {
    id: "account-management",
    title: "Account Management",
    icon: HelpCircle,
    questions: [
      {
        question: "How do I change my password?",
        answer:
          'To change your password: Go to your account settings, Click on "Security", Enter your current password, Enter your new password twice, Click "Update Password"',
      },
      {
        question: "Can I export my data?",
        answer:
          "Yes! Pro plan users can export their reflections and insights. Go to Settings → Data Export to download your data in JSON format. Free plan users can request a data export by contacting support.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to Settings → Account → Delete Account. This action is permanent and will remove all your reflections and data. Make sure to export any data you want to keep before proceeding.",
      },
    ],
  },
  {
    id: "privacy-security",
    title: "Privacy & Security",
    icon: Shield,
    questions: [
      {
        question: "Is my data private and secure?",
        answer:
          "Absolutely. We take your privacy seriously: All data is encrypted in transit and at rest, We never share your personal reflections with third parties, Your data is stored securely in SOC 2 compliant servers, We follow GDPR and CCPA privacy regulations, You can delete your data at any time",
      },
      {
        question: "Who can see my reflections?",
        answer:
          "Only you can see your reflections. Our AI analyzes your content to provide insights, but no human ever reads your personal reflections. The AI processing is automated and your data remains private.",
      },
      {
        question: "Can I make my account more private?",
        answer:
          "Yes! In your privacy settings, you can: Enable two-factor authentication, Set up login notifications, Control data retention periods, Manage third-party integrations",
      },
    ],
  },
  {
    id: "ai-features",
    title: "AI Features",
    icon: MessageCircle,
    questions: [
      {
        question: "How does AI pattern analysis work?",
        answer:
          "Our AI analyzes your reflections to identify patterns in: Communication styles and responses, Emotional triggers and reactions, Boundary violations and respect, Manipulative behaviors, Relationship dynamics over time",
      },
      {
        question: "Are the AI insights accurate?",
        answer:
          "Our AI is trained on relationship psychology and behavioral patterns. While it can identify common patterns and provide valuable insights, it's not a substitute for professional therapy. Use the insights as a starting point for self-reflection and consider professional help for serious relationship issues.",
      },
      {
        question: "Can I improve the AI's accuracy?",
        answer:
          "Yes! The more detailed and consistent your reflections are, the better the AI can identify patterns. Try to include specific examples, emotions, and context in your reflections. Regular reflection practice also helps the AI understand your unique patterns better.",
      },
    ],
  },
  {
    id: "billing",
    title: "Billing & Plans",
    icon: HelpCircle,
    questions: [
      {
        question: "What's included in the free plan?",
        answer:
          "The free plan includes: 2 AI analyses per month, 10 reflections per month, 1 user, and 30-day data retention.",
      },
      {
        question: "How do I upgrade to Pro?",
        answer:
          "You can upgrade anytime from your account settings. Pro includes 30 AI analyses per month, 15 AI questions per month, 1,000 reflections per month, advanced relationship insights, analytics insights, 5 users, 1-year data retention, and priority support.",
      },
      {
        question: "Can I cancel my subscription?",
        answer:
          "Yes, you can cancel your Pro subscription anytime from your account settings. You'll continue to have Pro features until the end of your current billing period, then revert to the free plan.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Yes! We offer a 15-day money-back guarantee for new subscriptions only. You can request a refund by contacting info@patternreveal.xyz within 15 days of your initial purchase. No refunds are available after 15 days or for existing subscriptions. Full details are in our Terms of Service.",
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter content based on search query
  const filteredContent = useMemo(() => {
    if (!searchQuery.trim()) return helpContent;

    const query = searchQuery.toLowerCase();
    return helpContent
      .map((section) => ({
        ...section,
        questions: section.questions.filter(
          (q) =>
            q.question.toLowerCase().includes(query) ||
            q.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.questions.length > 0);
  }, [searchQuery]);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
        <div className="max-w-6xl mx-auto py-12 px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Find answers to your questions and learn how to get the most out
              of PatternReveal
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Browse by Category
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#getting-started"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors py-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Getting Started
                  </a>
                </li>
                <li>
                  <a
                    href="#account-management"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors py-2"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Account Management
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy-security"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors py-2"
                  >
                    <Shield className="h-4 w-4" />
                    Privacy & Security
                  </a>
                </li>
                <li>
                  <a
                    href="#ai-features"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors py-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    AI Features
                  </a>
                </li>
                <li>
                  <a
                    href="#billing"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors py-2"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Billing & Plans
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            {searchQuery && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800">
                  Showing{" "}
                  {filteredContent.reduce(
                    (total, section) => total + section.questions.length,
                    0
                  )}{" "}
                  results for "{searchQuery}"
                </p>
              </div>
            )}

            {filteredContent.length === 0 && searchQuery ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try searching with different keywords or browse our categories
                  below.
                </p>
              </div>
            ) : (
              filteredContent.map((section) => {
                const IconComponent = section.icon;
                return (
                  <section key={section.id} id={section.id} className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <IconComponent className="h-8 w-8 text-purple-600" />
                      {section.title}
                    </h2>

                    <div className="space-y-6">
                      {section.questions.map((q, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-semibold mb-3">
                            {q.question}
                          </h3>
                          <div className="text-gray-600">
                            {q.answer.split(":").map((part, partIndex) => {
                              if (partIndex === 0) {
                                return (
                                  <p key={partIndex} className="mb-4">
                                    {part}
                                  </p>
                                );
                              }
                              const items = part
                                .split(",")
                                .map((item) => item.trim())
                                .filter((item) => item);
                              if (items.length > 1) {
                                return (
                                  <ul
                                    key={partIndex}
                                    className="list-disc list-inside space-y-1"
                                  >
                                    {items.map((item, itemIndex) => (
                                      <li key={itemIndex}>{item}</li>
                                    ))}
                                  </ul>
                                );
                              }
                              return <p key={partIndex}>{part}</p>;
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })
            )}

            {/* Contact Support */}
            <section className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="mailto:info@patternreveal.xyz">
                  <Button className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Support
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
