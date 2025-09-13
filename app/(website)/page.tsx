import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { constructMetadata } from "@/utils/functions/construct-metadata";
import BackgroundPattern from "@/components/BackgroundPattern";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Highlighter } from "@/components/magicui/highlighter";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Shield,
  Heart,
  Brain,
  CheckCircle,
  Lock,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "PatternReveal.xyz - AI-Powered Relationship Pattern Analysis",
  description:
    "AI-powered relationship analysis platform that helps you identify manipulative behaviors, emotional abuse patterns, and toxic dynamics. Create daily reflections, get expert insights, and build stronger personal boundaries to protect your well-being.",
  image: "/images/example-report.png",
  url: "https://patternreveal.xyz",
});

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative antialiased">
      <BackgroundPattern />
      <div className="absolute inset-0 -z-5">
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[20, 25]}
          className="opacity-30"
          squaresClassName="stroke-gray-500/40 hover:fill-gray-400/60"
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight text-black">
                Discover the{" "}
                <Highlighter color="#DDA0DD" action="highlight">
                  patterns
                </Highlighter>{" "}
                in your relationships.
              </h1>
              <p className="text-xl md:text-2xl mb-12 leading-relaxed text-gray-600">
                Identify toxic patterns, build healthy boundaries, and create
                meaningful connections with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link href="/app/register">
                  <Button size="lg">Start for free</Button>
                </Link>
                <Link href="/app/login">
                  <Button size="lg" variant="outline">
                    See it in action
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>AI-powered insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Privacy first</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-500" />
                  <span>Secure & compliant</span>
                </div>
              </div>
            </div>

            {/* Right side - Dashboard mockup */}
            <div className="relative">
              <div className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Dashboard mockup content */}
                <div className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black rounded-lg" />
                      <span className="font-semibold text-gray-800">
                        PatternReveal
                      </span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  </div>

                  {/* Sidebar */}
                  <div className="flex gap-6 flex-1">
                    <div className="w-48 space-y-3">
                      <div className="h-8 bg-gray-200 rounded" />
                      <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded" />
                        <div className="h-6 bg-gray-200 rounded" />
                        <div className="h-6 bg-gray-200 rounded" />
                        <div className="h-6 bg-gray-200 rounded" />
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 space-y-4">
                      <div className="h-32 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                          Total Insights
                        </div>
                        <div className="text-3xl font-bold text-purple-600">
                          1,247
                        </div>
                        <div className="text-sm text-gray-600">
                          +12.5% vs last month
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-gray-200 rounded-lg" />
                        <div className="h-24 bg-gray-200 rounded-lg" />
                      </div>

                      <div className="h-32 bg-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Everything you need to thrive
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to help you understand, grow, and build
              healthier relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-purple-100 bg-white transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                AI Pattern Recognition
              </h3>
              <p className="text-black leading-relaxed">
                Advanced AI analyzes your daily reflections to identify
                recurring behaviors and relationship dynamics.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-purple-100 bg-white transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Boundary Protection
              </h3>
              <p className="text-black leading-relaxed">
                Learn to recognize and maintain healthy boundaries while
                identifying toxic dynamics.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl border border-purple-100 bg-white transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Emotional Intelligence
              </h3>
              <p className="text-black leading-relaxed">
                Build emotional awareness and develop healthier communication
                patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              How it works
            </h2>
            <h3 className="text-2xl font-semibold text-black mb-8">
              3 simple steps to healthier relationships
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Sign up & reflect
              </h3>
              <p className="text-black leading-relaxed">
                Create your account and start your daily reflections in our
                intuitive dashboard.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                AI analyzes patterns
              </h3>
              <p className="text-black leading-relaxed">
                Our AI analyzes your reflections to identify patterns and
                provide insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">
                Transform & grow
              </h3>
              <p className="text-black leading-relaxed">
                Receive insights and watch as your relationships transform with
                healthier patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-12 rounded-3xl text-black shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-200">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Ready to transform your relationships?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-black">
              Join thousands of people who are building healthier connections
              with AI-powered insights.
            </p>
            <Link href="/app/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 text-lg px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start with free plan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
