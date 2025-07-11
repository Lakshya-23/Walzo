import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import HeroImg from '/lovable-uploads/hero.webp';

const HeroSection = () => {
  // We only need refs for the elements we want to animate individually.
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // We create a GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // Animate the text content entrance
      const tl = gsap.timeline({ 
        delay: 0.5 // Reduced delay for a snappier feel
      });

      tl.from(".hero-text-content", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
      
      // Floating animation for the image
      gsap.to(imageRef.current, {
        y: -10, // How high it floats
        duration: 5, // How long one "bob" takes
        repeat: -1, // Repeat forever
        yoyo: true, // Go back and forth
        ease: "sine.inOut" // A very smooth, natural ease
      });

    }, sectionRef); // Scope the context to the section

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-[#DBFF48] relative overflow-hidden flex items-center py-20"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div 
              // Added a common class for easier targeting with GSAP
              className="hero-text-content text-4xl md:text-6xl lg:text-7xl font-black text-walzo-teal leading-tight"
            >
              The Most Reliable Way to{' '}
              <span className="text-walzo-teal/80">Source and Scale</span>{' '}
              Furniture
            </div>
            
            <div 
              className="hero-text-content text-lg md:text-xl text-walzo-teal/80 max-w-2xl leading-relaxed"
            >
              Walzo combines on-demand physical sample delivery with a powerful hyperlocal logistics network. 
              Try before you buy, and scale with confidence.
            </div>
            
            <div className="hero-text-content">
              <Button 
                onClick={() => navigate('/catalog')}
                size="lg"
                className="bg-walzo-teal text-white hover:bg-walzo-teal/90 text-lg px-8 py-6 rounded-full font-semibold shadow-xl"
              >
                Browse Sample Catalog
              </Button>
            </div>
          </div>

          {/* Right Floating Images */}
          <div 
            ref={imageRef} // Add ref to the container for animation
            className="relative h-[400px] lg:h-[600px] hidden lg:block "
          >
            <img 
              src={HeroImg} 
              // Improved alt text for accessibility
              alt="An illustration of Walzo's platform connecting different business elements" 
              // Optimized classes to make the image fit its container
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply soft-edge-mask soft-edge-glow "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;