import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { REVIEWS } from "../data/reviews";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleContent, setVisibleContent] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(3);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleContent(true);
            observer.disconnect();
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

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= REVIEWS.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? Math.max(0, REVIEWS.length - itemsToShow) : prev - 1
    );
  };

  const visibleReviews = REVIEWS.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            visibleContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers{" "}
            <span className="bg-gradient-to-r from-[#006938] to-emerald-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've transformed their
            cooking experience with our instant solutions
          </p>
        </div>

        {/* Reviews Carousel */}
        <div
          className={`transition-all duration-1000 transform ${
            visibleContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}>
          <div className="relative">
            {/* Reviews Grid */}
            <div
              ref={containerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
              {visibleReviews.map((review, index) => (
                <div
                  key={review.id}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-100 hover:border-[#006938] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  {/* Star Rating */}
                  <div className="flex justify-between items-start mb-4">
                    <div>{renderStars(review.rating)}</div>
                    <span className="text-sm font-semibold text-[#006938] bg-emerald-50 px-3 py-1 rounded-full">
                      {review.product}
                    </span>
                  </div>

                  {/* Review Title */}
                  {/* <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {review.title}
                  </h3> */}

                  {/* Review Content */}
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                    {review.content}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500">Verified Customer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {REVIEWS.length > itemsToShow && (
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={prevSlide}
                  className="group p-3 bg-white border-2 border-gray-200 hover:border-[#006938] rounded-full transition-all duration-300 hover:bg-[#006938]">
                  <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </button>
                <div className="flex items-center gap-2">
                  {[...Array(Math.ceil(REVIEWS.length / itemsToShow))].map(
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i * itemsToShow)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === Math.floor(currentIndex / itemsToShow)
                            ? "bg-[#006938] w-8"
                            : "bg-gray-300"
                        }`}
                      />
                    )
                  )}
                </div>
                <button
                  onClick={nextSlide}
                  className="group p-3 bg-white border-2 border-gray-200 hover:border-[#006938] rounded-full transition-all duration-300 hover:bg-[#006938]">
                  <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {/* <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 transform ${
            visibleContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {[
            { label: 'Happy Customers', value: '5K+' },
            { label: 'Average Rating', value: '4.9/5' },
            { label: 'Reviews', value: '2.3K+' },
            { label: 'Years Trusted', value: '3+' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border-2 border-emerald-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#006938] mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Reviews;
