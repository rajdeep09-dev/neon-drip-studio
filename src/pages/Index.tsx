import LivingBackground from "@/components/drip/LivingBackground";
import Navbar from "@/components/drip/Navbar";
import HeroSection from "@/components/drip/HeroSection";
import MarqueeTicker from "@/components/drip/MarqueeTicker";
import AboutSection from "@/components/drip/AboutSection";
import MenuSection from "@/components/drip/MenuSection";
import VibesGallery from "@/components/drip/VibesGallery";
import TestimonialsSection from "@/components/drip/TestimonialsSection";
import ReservationSection from "@/components/drip/ReservationSection";
import InstagramCTA from "@/components/drip/InstagramCTA";
import LocationSection from "@/components/drip/LocationSection";
import NewsletterSection from "@/components/drip/NewsletterSection";
import FooterSection from "@/components/drip/FooterSection";
import SEOHead from "@/components/drip/SEOHead";

const Index = () => {
  return (
    <main id="main-content" className="relative min-h-screen overflow-x-hidden bg-background">
      <SEOHead
        path="/"
        description="specialty coffee for people who'd rather be anywhere but a starbucks. single origin beans, small batch roasted, in the arts district."
      />
      <LivingBackground />
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <AboutSection />
      <MenuSection />
      <VibesGallery />
      <TestimonialsSection />
      <section id="reservation">
        <ReservationSection />
      </section>
      <InstagramCTA />
      <LocationSection />
      <NewsletterSection />
      <FooterSection />
    </main>
  );
};

export default Index;
