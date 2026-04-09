import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import PortfolioGallery from "@/components/PortfolioGallery";
import AuthoritySection from "@/components/AuthoritySection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesGrid />
      <PortfolioGallery />
      <AuthoritySection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
