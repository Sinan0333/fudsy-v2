import { MessageCircle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleContactClick = () => {
    const message = encodeURIComponent(
      "I would like to know more about your products!"
    );
    window.open(`https://wa.me/+918137813446?text=${message}`, "_blank");
  };

  // const features = [
  //   { icon: Zap, text: "Instant Solutions" },
  //   { icon: Leaf, text: "100% Natural" },
  //   { icon: Shield, text: "Trusted Quality" },
  // ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-gray-100 relative overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-200 to-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-red-100 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-br from-slate-200 to-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        {/* Floating cursor light effect */}
        <div
          className="absolute w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,105,56,0.08) 0%, transparent 70%)",
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "none",
          }}></div>
      </div>

      {/* Content */}
      <div
        className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-emerald-200/50 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <span className="w-2 h-2 rounded-full bg-[#006938] animate-pulse"></span>
          <span className="text-sm font-semibold text-gray-700">
            Revolutionary Food Solutions
          </span>
        </div>

        {/* Logo */}
        <div className="mb-10 flex justify-center transform transition-transform duration-500 hover:scale-110">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-red-300/20 rounded-full blur-2xl"></div>
            <img
              src="/logos/fudsy-green.png"
              alt="Fudsy Logo"
              className="h-32 md:h-44 lg:h-52 w-auto object-contain relative"
            />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
          Food Made{" "}
          <span className="bg-gradient-to-r from-[#006938] to-emerald-600 bg-clip-text text-transparent">
            Easy
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
          Instant cooking solutions crafted to save your time while keeping the
          taste authentic.
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Transform your kitchen with Fudsy's premium instant food products. No
          compromise on taste, just pure convenience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={handleContactClick}
            className="group relative overflow-hidden bg-[#006938] hover:bg-[#005530] text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3 w-full sm:w-auto justify-center">
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300 relative" />
            <span className="relative">Contact Us</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300 relative" />
          </button>

          {/* <button className="group px-8 md:px-10 py-4 md:py-5 rounded-full text-base md:text-lg font-bold text-gray-900 border-2 border-gray-300 hover:border-[#006938] transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto">
            Learn More
          </button> */}
        </div>

        {/* Feature highlights */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4 md:p-6 hover:bg-white/60 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#006938] to-emerald-600 rounded-xl group-hover:shadow-lg transition-all duration-300 mb-3 md:mb-4">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-gray-800 font-semibold text-sm md:text-base">
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div> */}

        {/* Scroll indicator */}
        <div className="absolute bottom- left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
