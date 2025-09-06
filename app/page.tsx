import Link from "next/link";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { constructMetadata } from "@/utils/functions/construct-metadata";
import {
  ArrowRight,
  Shield,
  Heart,
  Brain,
  Sparkles,
  CheckCircle,
  Star,
  Users,
  Zap,
  Target,
  TrendingUp,
  Lock,
  Play,
  ArrowUpRight,
  Github,
  Twitter,
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 relative antialiased">
        <BackgroundBeams />

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <Logo className="text-black" />
            <div className="flex gap-4">
              <Link href="/app/login">
                <Button
                  variant="ghost"
                  className="text-black hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/app/register">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full text-sm text-purple-700 mb-8 relative">
                <div className="absolute inset-0 rounded-full border-2 border-purple-300 animate-pulse" />
                <Sparkles className="h-4 w-4 relative z-10" />
                <span className="relative z-10">
                  AI-Powered Relationship Analysis
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Transform your relationships
                </span>
                <br />
                <span className="text-black">with AI insights</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-black">
                Identify toxic patterns, build healthy boundaries, and create
                meaningful connections. Let AI guide you to healthier
                relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link href="/app/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 text-lg px-8 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Start your journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/app/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50 text-lg px-8 py-3 transition-all duration-300"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    See how it works
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-black">
                <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>AI-powered insights</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Privacy first</span>
                </div>
                <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
                  <Lock className="h-4 w-4 text-pink-500" />
                  <span>Secure & compliant</span>
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
                Powerful features designed to help you understand, grow, and
                build healthier relationships.
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
                  Receive insights and watch as your relationships transform
                  with healthier patterns.
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

        {/* Footer */}
        <footer className="relative z-10 py-12 px-6 border-t border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <Logo className="text-black mb-4" />
                <p className="text-black mb-4">
                  AI-powered relationship analysis platform that helps you
                  identify patterns, build boundaries, and create healthier
                  connections.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="#"
                    className="text-black hover:text-purple-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-black hover:text-purple-600 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-4">Product</h3>
                <ul className="space-y-2 text-black">
                  <li>
                    <Link
                      href="/features"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/api"
                      className="hover:text-purple-600 transition-colors"
                    >
                      API
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-4">Company</h3>
                <ul className="space-y-2 text-black">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-purple-600 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-4">Support</h3>
                <ul className="space-y-2 text-black">
                  <li>
                    <Link
                      href="/help"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/security"
                      className="hover:text-purple-600 transition-colors"
                    >
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-purple-100">
              <p className="text-black text-sm">
                © 2024 PatternReveal.xyz. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm mt-4 md:mt-0">
                <Link
                  href="/privacy"
                  className="text-black hover:text-purple-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-black hover:text-purple-600 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-black hover:text-purple-600 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
