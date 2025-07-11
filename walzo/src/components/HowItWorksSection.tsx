import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SofaScene from './SofaScene';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  { name: 'Nordic Blue', color: '#5E81AC' },
  { name: 'Crimson Red', color: '#BF616A' },
  { name: 'Forest Green', color: '#A3BE8C' },
  { name: 'Sunset Gold', color: '#EBCB8B' },
  { name: 'Lavender Gray', color: '#B48EAD' },
];

const ITEM_HEIGHT = 100;
const ITEM_MARGIN = 16;
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + ITEM_MARGIN;

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const reelRef = useRef(null);
  
  const [activeMaterial, setActiveMaterial] = useState(materials[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let proxy = {
      index: 0
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${materials.length * 400}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo([leftColRef.current, '.heading-content'], 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
      );
      
      tl.fromTo('.reel-container', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.5");

      // Animate the reel and proxy object simultaneously
      tl.to(reelRef.current, {
        y: `-${(materials.length - 1) * TOTAL_ITEM_HEIGHT}px`,
        duration: 4,
        ease: 'power1.inOut',
      }, "<");

       tl.to(proxy, {
        index: materials.length - 1,
        duration: 4,
        ease: 'power1.inOut',
        // onUpdate will fire on every frame of this tween
        onUpdate: () => {
            const currentIndex = Math.round(proxy.index);
            // We use a functional state update to ensure we always have the latest state
            setActiveIndex((prevIndex) => {
                if (currentIndex !== prevIndex) {
                    setActiveMaterial(materials[currentIndex]);
                    return currentIndex;
                }
                return prevIndex;
            });
        },
       }, "<");

    }, sectionRef);

    return () => ctx.revert();
    
    // THE FLICKER FIX: Use an empty dependency array.
    // This ensures the GSAP timeline is created ONLY ONCE and is not
    // destroyed and recreated on every state change.
  }, []); 

  return (
    <section ref={sectionRef} className="py-24 bg-white relative" style={{ minHeight: '100vh' }}>
      <div className="container mx-auto px-6 lg:px-8 h-full">
        {/* THE WIDTH FIX: Switch from a 2-column to a 5-column grid on large screens */}
        <div className="grid lg:grid-cols-5 gap-16 h-full items-center">
          
          {/* Give the model 3 out of 5 columns (60% width) */}
          <div ref={leftColRef} className="lg:col-span-3 relative w-full h-[50vh] lg:h-[80vh]">
            <SofaScene color={activeMaterial.color} />
          </div>

          {/* Give the content 2 out of 5 columns (40% width) */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-8 mb-8 heading-content">
              <h2 className="text-4xl md:text-5xl font-black text-walzo-teal leading-tight">
                See it. Feel it.{' '}
                <span className="text-walzo-lime bg-walzo-lime/10 px-2 py-2 rounded  ">
                  Approve it.
                </span>
              </h2>
               <p className="text-lg text-walzo-teal/80 leading-relaxed">Scroll to virtually try on different materials. Each sample kit includes physical swatches for you to touch and feel.</p>
            </div>
            
            <div className="reel-container relative h-[100px] w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2">
              <div ref={reelRef} className="relative">
                {materials.map((material, index) => (
                  <div 
                    key={index}
                    className={`w-full h-24 rounded-lg flex items-center justify-between px-6 shadow-sm transition-all duration-300 ease-in-out ${index !== materials.length - 1 ? 'mb-4' : ''} ${activeIndex === index ? 'opacity-100 scale-105 shadow-lg' : 'opacity-40 scale-95'}`}
                    style={{ backgroundColor: '#fff' }}
                  >
                    <span className="font-bold text-lg text-walzo-teal">{material.name}</span>
                    <div className="w-12 h-12 rounded-full border-2 border-gray-200" style={{ backgroundColor: material.color }}></div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center mt-4 text-walzo-teal/60 font-semibold animate-pulse">Scroll to explore materials</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;