import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Relationship Coach",
    avatar: "S",
    content:
      "PatternReveal helped me recognize toxic patterns I was blind to. The AI insights gave me the clarity I needed to set healthy boundaries and protect my well-being.",
    rating: 5,
    color: "blue",
  },
  {
    name: "Michael R.",
    role: "Married 5 years",
    avatar: "M",
    content:
      "The daily reflection feature transformed how I communicate with my partner. We now have deeper, more meaningful conversations and stronger emotional bonds.",
    rating: 5,
    color: "green",
  },
  {
    name: "Emma L.",
    role: "Therapist",
    avatar: "E",
    content:
      "As a therapist, I recommend PatternReveal to my clients. The AI analysis provides insights that complement traditional therapy and helps people make real progress.",
    rating: 5,
    color: "purple",
  },
  {
    name: "David K.",
    role: "Divorced, rebuilding",
    avatar: "D",
    content:
      "After my divorce, I was afraid to trust again. PatternReveal helped me understand my patterns and build healthier relationships. I'm now in a loving partnership.",
    rating: 5,
    color: "pink",
  },
];

const colorClasses = {
  blue: "from-blue-100/20 to-indigo-100/20 text-blue-600",
  green: "from-green-100/20 to-blue-100/20 text-green-600",
  purple: "from-purple-100/20 to-pink-100/20 text-purple-600",
  pink: "from-pink-100/20 to-purple-100/20 text-pink-600",
};

export function TestimonialsSection() {
  return (
    <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Loved by thousands
          </h2>
          <h3 className="text-2xl font-semibold text-black mb-8">
            Real stories from real people
          </h3>
          <p className="text-xl text-black max-w-3xl mx-auto leading-relaxed">
            See how PatternReveal is transforming relationships and helping
            people build healthier connections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-8 rounded-2xl border border-purple-100 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-purple-200" />

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={`star-${testimonial.name}-${i}`}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-black mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${
                    colorClasses[testimonial.color as keyof typeof colorClasses]
                  } rounded-full flex items-center justify-center font-semibold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-black text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-purple-100">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`overall-star-${i}`}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-black font-medium">
              4.9/5 from 2,000+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
