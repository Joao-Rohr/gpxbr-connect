import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5521964223571?text=" + encodeURIComponent("Olá, vim pelo site da GpxBr Corretora! Gostaria de uma cotação.");

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-whatsapp-foreground shadow-glow transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
