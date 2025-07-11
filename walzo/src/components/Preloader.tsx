
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([textRef.current, progressRef.current], { opacity: 0, y: 30 });
    
    // Animation sequence
    tl.to([textRef.current, progressRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.3")
    .to(preloaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "+=0.3")
    .set(preloaderRef.current, { display: "none" });

  }, []);

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 bg-walzo-teal z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div 
          ref={textRef}
          className="text-6xl md:text-8xl font-black text-white mb-8"
        >
          Walzo
        </div>
        <div className="w-64 h-1 bg-walzo-teal/30 rounded-full overflow-hidden mx-auto">
          <div 
            ref={progressRef}
            className="h-full bg-walzo-lime rounded-full w-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
