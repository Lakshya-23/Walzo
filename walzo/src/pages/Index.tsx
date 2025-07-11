
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import HybridModelSection from '@/components/HybridModelSection';
import UseCasesSection from '@/components/UseCasesSection';
import SparkathonSection from '@/components/SparkathonSection';
import TeamSection from '@/components/TeamSection';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scrolling behavior
    if (containerRef.current) {
      gsap.set(containerRef.current, { opacity: 0 });
      
      // Show container after preloader
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 2.5
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Preloader />
      <Navigation />
      <div ref={containerRef} className="min-h-screen">
        <HeroSection />
          <HowItWorksSection />
        <div id="how-it-works">
        <HybridModelSection />
        </div>
        <div id="use-cases">
          <UseCasesSection />
        </div>
        <SparkathonSection />
        <div id="team">
          <TeamSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
