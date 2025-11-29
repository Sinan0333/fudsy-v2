import { MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/your-number", "_blank");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div className="text-center md:text-left">
            <img
              src="/logos/fudsy-green.png"
              alt="Fudsy Logo"
              className="h-16 w-auto object-contain mb-4 mx-auto md:mx-0 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm">Food Made Easy</p>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-400 hover:text-[#006938] transition-colors duration-300">
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-gray-400 hover:text-[#006938] transition-colors duration-300">
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={handleWhatsAppClick}
                  className="text-gray-400 hover:text-[#006938] transition-colors duration-300">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-end gap-4 mb-4">
              <button
                onClick={handleWhatsAppClick}
                className="w-10 h-10 bg-[#006938] hover:bg-[#005530] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2025 Fudsy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
