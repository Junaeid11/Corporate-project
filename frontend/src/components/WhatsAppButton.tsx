import { FaWhatsapp } from "react-icons/fa";

const phone = "+8801518786300";
const whatsappUrl = `https://wa.me/${phone}`;

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors flex items-center justify-center"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
} 