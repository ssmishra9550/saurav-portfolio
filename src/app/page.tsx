import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MetricsBar from "@/components/MetricsBar";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ClientProcessSection from "@/components/ClientProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import NeuralBackground from "@/components/fx/NeuralBackground";
import ScrollProgress from "@/components/fx/ScrollProgress";
import ScrollEffects from "@/components/fx/ScrollEffects";

export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <ScrollProgress />
      <NeuralBackground />
      <ScrollEffects />
      <Navbar />
      <Hero />
      <MetricsBar />
      <ProjectsSection />
      <ServicesSection />
      <TechStackSection />
      <ExperienceSection />
      <ClientProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
