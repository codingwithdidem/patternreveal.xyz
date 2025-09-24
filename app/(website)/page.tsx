import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { constructMetadata } from "@/utils/functions/construct-metadata";
import BackgroundPattern from "@/components/BackgroundPattern";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Highlighter } from "@/components/magicui/highlighter";
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
          <div className="grid lg:grid-cols-12 gap-4 items-center">
            {/* Left side - Text content */}
            <div className="text-left lg:col-span-5">
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
              </div>
            </div>

            {/* Right side - Demo Screenshot */}
            <div className="relative lg:col-span-7">
              <div className="relative w-full h-[450px] aspect-video bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <Image
                  src="/images/demo.png"
                  alt="PatternReveal reflection analysis interface showing relationship pattern insights"
                  fill
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6 bg-white">
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
      <section id="help" className="py-10 bg-white sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              How does it work?
            </h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Get started in just 3 simple steps and begin your journey to
              healthier relationships
            </p>
          </div>

          <div className="relative mt-12 lg:mt-20">
            {/* Curved dotted line for desktop */}
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              <svg
                className="w-full"
                viewBox="0 0 800 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Decorative curved line"
              >
                <title>Decorative curved line connecting steps</title>
                <path
                  d="M50 20 Q200 5 350 20 T650 20 T750 20"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                />
              </svg>
            </div>

            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">1</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                  Sign up & reflect
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Create your account and start your daily reflections in our
                  intuitive dashboard.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">2</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                  AI analyzes patterns
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Our AI analyzes your reflections to identify patterns and
                  provide insights.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">3</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">
                  Transform & grow
                </h3>
                <p className="mt-4 text-base text-gray-600">
                  Receive insights and watch as your relationships transform
                  with healthier patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <TestimonialsSection /> */}

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
