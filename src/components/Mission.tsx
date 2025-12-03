import { Target, CheckCircle, Leaf, ChefHat, Clock, Heart } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Mission = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reasons = [
    { icon: Leaf, text: "100% Natural Ingredients" },
    { icon: Clock, text: "Saves Time While Cooking" },
    { icon: CheckCircle, text: "Authentic Taste Guaranteed" },
    { icon: ChefHat, text: "Easy-to-Use Daily Essentials" },
    { icon: Heart, text: "Trusted by Home Cooks" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 pb-0 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-10 h-10 text-[#006938]" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              To make cooking easier, quicker, and more enjoyable by creating
              instant food solutions without compromising authenticity. We
              believe that everyone deserves to enjoy delicious, home-cooked
              meals without spending hours in the kitchen.
            </p>
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-700 italic">
                "At Fudsy, we're passionate about bringing the joy of cooking
                back to your kitchen by eliminating the tedious prep work and
                letting you focus on what matters most - creating memorable
                meals for your loved ones."
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 transform delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us
            </h2>
            <div className="space-y-4">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}>
                    <div className="flex-shrink-0 w-12 h-12 bg-[#006938] rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {reason.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
