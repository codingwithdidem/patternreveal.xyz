import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Twitter, Github } from "lucide-react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-20 p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <Logo className="text-black" />
          </Link>
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

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
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
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-purple-100">
            <p className="text-black text-sm">
              © {new Date().getFullYear()} PatternReveal.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
