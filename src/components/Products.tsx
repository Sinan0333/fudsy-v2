import { ShoppingCart, Clock } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  offer?: number;
  offerPrice: number;
  image: string;
  isComingSoon: boolean;
  delivery: string;
}

const deliveryStatus = {
  unavailable: "Unavailable",
  deliveryCharges: "Delivery Charges",
  freeDelivery: "Free Delivery",
};

const getDeliveryStatusColor = (status: string) => {
  switch (status) {
    case deliveryStatus.unavailable:
      return "bg-gray-100";
    case deliveryStatus.deliveryCharges:
      return "bg-red-100";
    case deliveryStatus.freeDelivery:
      return "bg-green-100";
    default:
      return "bg-gray-100";
  }
};

const products: Product[] = [
  // {
  //   id: 1,
  //   name: "Tamarind Powder - 1 Pack",
  //   description:
  //     "Skip the soaking and straining. Just add our instant tamarind powder for authentic tangy flavor.",
  //   originalPrice: 60,
  //   offer: 17,
  //   offerPrice: 49,
  //   image: "/products/tamarind-powder.jpeg",
  //   isComingSoon: false,
  //   delivery: deliveryStatus.unavailable,
  // },
  {
    id: 2,
    name: "Tamarind Powder - 3 Pack Combo",
    description:
      "Skip the soaking and straining. Just add our instant tamarind powder for authentic tangy flavor.",
    originalPrice: 180,
    offer: 17,
    offerPrice: 149,
    image: "/products/tamarind-powder-3-combo.png",
    isComingSoon: false,
    delivery: deliveryStatus.deliveryCharges,
  },
  {
    id: 3,
    name: "Tamarind Powder - 5 Pack Combo",
    description:
      "Skip the soaking and straining. Just add our instant tamarind powder for authentic tangy flavor.",
    originalPrice: 300,
    offer: 17,
    offerPrice: 249,
    image: "/products/tamarind-powder-5-combo.png",
    isComingSoon: false,
    delivery: deliveryStatus.freeDelivery,
  },
];

const Products = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            products.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200);
            });
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

  const handleBuyNow = (productName: string) => {
    const message = encodeURIComponent(`I want to buy ${productName}`);
    window.open(`https://wa.me/+918137813446?text=${message}`, "_blank");
  };

  const handleComingSoonClick = () => {
    const message = encodeURIComponent(
      "I would like to be notified when this product is available!"
    );
    window.open(`https://wa.me/+918137813446?text=${message}`, "_blank");
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          Our Products
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Discover our range of instant cooking solutions designed to make your
          kitchen experience effortless
        </p>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform relative ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${product.isComingSoon ? "opacity-50" : ""}`}>
                <div
                  className={`relative overflow-hidden h-96 ${
                    product.isComingSoon ? "blur-sm" : ""
                  }`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className={`p-6 ${product.isComingSoon ? "blur-sm" : ""}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        {product.offer}% OFF
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-[#006938]">
                        ₹{product.offerPrice}
                      </span>
                      <div
                        className={`rounded-md flex items-center ${getDeliveryStatusColor(
                          product.delivery
                        )} py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm`}>
                        {/* <div className="mx-auto block h-2 w-2 rounded-full bg-green-800 mr-2"></div> */}
                        {product.delivery}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBuyNow(product.name)}
                    className="w-full bg-[#006938] hover:bg-[#005530] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>
                </div>

                {product.isComingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-3xl">
                    <button
                      onClick={handleComingSoonClick}
                      className="group/badge bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#006938]" />
                      Coming Soon
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
