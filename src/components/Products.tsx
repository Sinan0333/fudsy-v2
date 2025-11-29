import { ShoppingCart, Clock } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  isComingSoon: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ginger Garlic Paste",
    description:
      "Fresh, aromatic, and ready to use. Save time without compromising on taste and quality.",
    price: "₹129",
    image: "/products/tamarind-powder.jpeg",
    isComingSoon: true,
  },
  {
    id: 2,
    name: "Tamarind Powder",
    description:
      "Skip the soaking and straining. Just add our instant tamarind powder for authentic tangy flavor.",
    price: "₹149",
    image: "/products/tamarind-powder.jpeg",
    isComingSoon: false,
  },
  {
    id: 3,
    name: "Curry Masala Mix",
    description:
      "The perfect blend of spices for rich, flavorful curries. Just add and cook.",
    price: "₹179",
    image: "/products/tamarind-powder.jpeg",
    isComingSoon: true,
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
    window.open(`https://wa.me/your-number?text=${message}`, "_blank");
  };

  const handleComingSoonClick = () => {
    const message = encodeURIComponent(
      "I would like to be notified when this product is available!"
    );
    window.open(`https://wa.me/your-number?text=${message}`, "_blank");
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
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#006938]">
                    {product.price}
                  </span>
                  <button
                    onClick={() => handleBuyNow(product.name)}
                    className="bg-[#006938] hover:bg-[#005530] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>
                </div>
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
    </section>
  );
};

export default Products;
