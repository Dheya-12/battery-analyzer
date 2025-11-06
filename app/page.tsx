import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import TechnicalSpecs from '@/components/TechnicalSpecs';
import UseCases from '@/components/UseCases';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import GradientBackground from '@/components/GradientBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      <GradientBackground />

      <Hero />
      <Features />
      <HowItWorks />
      <TechnicalSpecs />
      <UseCases />
      <CTASection />
      <Footer />
    </main>
  );
}
