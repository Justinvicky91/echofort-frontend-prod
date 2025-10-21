import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(true);
  const whatsappNumber = "919361440568";
  const defaultMessage = "Hello! I need help with EchoFort.";

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={openWhatsApp}
        className="flex items-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="font-medium hidden sm:block">Chat with us</span>
      </button>
    </div>
  );
}

