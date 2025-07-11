
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll trigger for navbar background change
      ScrollTrigger.create({
        trigger: "body",
        start: "100px top",
        onUpdate: (self) => {
          if (navRef.current) {
            gsap.to(navRef.current, {
              backgroundColor: "#0A2540",
              backdropFilter: "blur(10px)",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-4 w-96 sm:w-[500px] md:w-[800px]  left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-10 bg-walzo-teal border border-white/20 transition-all duration-300"
     
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-white font-black text-xl">
          Walzo
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-white hover:text-walzo-lime transition-colors duration-200 font-medium"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('use-cases')}
            className="text-white hover:text-walzo-lime transition-colors duration-200 font-medium"
          >
            Use Cases
          </button>
          <button 
            onClick={() => scrollToSection('team')}
            className="text-white hover:text-walzo-lime transition-colors duration-200 font-medium"
          >
            Our Team
          </button>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/catalog')}
          className="bg-walzo-lime text-walzo-teal hover:bg-walzo-lime/90 font-semibold px-6 py-2 rounded-full max-sm:hidden"
        >
          Browse Catalog
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
