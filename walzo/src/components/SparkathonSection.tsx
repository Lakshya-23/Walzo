
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SparkathonSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax animation for the image
      

      // Floating animation for the image
      gsap.to(imageRef.current, {
        y: 20,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none none"
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-walzo-teal w-full">
      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-8 text-center">
        <div className="w-full max-w-7xl mx-auto">
          {/* Full Width Rounded Image with Shadow and Animation */}
          <div 
            ref={imageRef}
            className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/lovable-uploads/20d3909b-fc2a-4150-b934-138b719c057b.png"
              alt="Walmart Sparkathon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SparkathonSection;
