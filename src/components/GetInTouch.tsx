import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";

const GetInTouch = () => {
  const [visibleContent, setVisibleContent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("idle");

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      setStatusMessage(
        "Thank you! We received your message. Our team will get back to you soon."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("idle");
        setStatusMessage("");
      }, 5000);
    } catch (err) {
      setSubmitStatus("error");
      setStatusMessage(
        "Something went wrong. Please try again or contact us directly."
      );
      setTimeout(() => {
        setSubmitStatus("idle");
        setStatusMessage("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      contact: "hello@fudsy.com",
      link: "mailto:hello@fudsy.com",
    },
    {
      icon: MessageSquare,
      title: "Chat with Us",
      description: "Message us on WhatsApp",
      contact: "+91 XXXXX XXXXX",
      link: "https://wa.me/your-number",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Call our support team",
      contact: "+91 XXXXX XXXXX",
      link: "tel:+91XXXXXXXXXX",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            visibleContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-[#006938] to-emerald-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from
            you! Connect with our team and let us know how we can help.
          </p>
        </div>

        {/* Contact Methods */}
        {/* <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 transform ${
            visibleContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}>
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border-2 border-gray-200 hover:border-[#006938] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full group-hover:bg-gradient-to-br group-hover:from-[#006938] group-hover:to-emerald-600 transition-all duration-300 mb-4">
                  <Icon className="w-7 h-7 text-[#006938] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {method.description}
                </p>
                <p className="text-[#006938] font-semibold hover:underline">
                  {method.contact}
                </p>
              </a>
            );
          })}
        </div> */}

        {/* Form Section */}
        <div
          className={`transition-all duration-1000 transform ${
            visibleContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </h3>
                <p className="text-gray-600">
                  Fill out the form and our team will respond as quickly as
                  possible.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Feedback",
                    description: "Share your experience with our products",
                  },
                  {
                    label: "Suggestions",
                    description: "Help us improve with your ideas",
                  },
                  {
                    label: "Support",
                    description: "Get help with any questions or issues",
                  },
                  {
                    label: "Partnerships",
                    description: "Interested in working together?",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#006938] text-white font-bold">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.label}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006938] focus:outline-none transition-colors duration-300 bg-gray-50"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006938] focus:outline-none transition-colors duration-300 bg-gray-50"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006938] focus:outline-none transition-colors duration-300 bg-gray-50"
                    placeholder="What is this about?"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#006938] focus:outline-none transition-colors duration-300 bg-gray-50 resize-none"
                    placeholder="Tell us your thoughts..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 text-green-700 text-sm font-medium">
                    {statusMessage}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium">
                    {statusMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#006938] to-emerald-600 hover:from-[#005530] hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
