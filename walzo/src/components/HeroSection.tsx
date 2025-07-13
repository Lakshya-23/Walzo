import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import HeroImg from '/lovable-uploads/hero.webp';

const HeroSection = () => {
 
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({ 
        delay: 0.5 
      });

      tl.from(".hero-text-content", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
      
      
      gsap.to(imageRef.current, {
        y: -10, 
        duration: 5,
        repeat: -1, 
        yoyo: true, 
        ease: "sine.inOut" 
      });

    }, sectionRef); 

    return () => ctx.revert(); 
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-[#DBFF48] relative overflow-hidden flex items-center py-20"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div 
              
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

          
          <div 
            ref={imageRef} 
            className="relative h-[400px] lg:h-[600px] hidden lg:block "
          >
            <img 
              src={HeroImg} 
              
              alt="An illustration of Walzo's platform connecting different business elements" 
              
              className="absolute inset-0 w-full h-full object-contain mix-blend-multiply soft-edge-mask soft-edge-glow "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;