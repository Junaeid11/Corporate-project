import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GoogleMap from "@/components/GoogleMap";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 relative">
      <Hero />
      <section className="py-16">
        <Services />
      </section>
      <section className="py-16 bg-white/80">
        <GoogleMap />
      </section>
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
