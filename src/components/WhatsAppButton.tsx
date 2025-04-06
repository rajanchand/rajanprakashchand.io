
import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "447570731478"; // UK format without leading 0
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
      aria-label="Contact on WhatsApp"
    >
      <MessageSquare className="h-6 w-6" />
    </a>
  );
}
