
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HybridModelSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureARef = useRef<HTMLDivElement>(null);
  const featureBRef = useRef<HTMLDivElement>(null);
  const imageARef = useRef<HTMLDivElement>(null);
  const imageBRef = useRef<HTMLDivElement>(null);
  const textARef = useRef<HTMLDivElement>(null);
  const textBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Feature A animations
      gsap.fromTo([imageARef.current, textARef.current], 
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: featureARef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Feature B animations
      gsap.fromTo([textBRef.current, imageBRef.current], 
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: featureBRef.current,
            start: "top 70%",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-walzo-teal">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 ">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Our{' '}
            <span className="text-walzo-lime">Complete Process:</span>{' '}
            From Sample to Scale
          </h2>
        </div>

        {/* Feature A: On-Demand Sample Delivery */}
        <div ref={featureARef} className="grid lg:grid-cols-2 gap-0 items-center mb-20">
          {/* Left: Image */}
          <div ref={imageARef} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl w-[70%] ">
              <img 
                src="/lovable-uploads/f0eb687f-36e0-4c29-b3c4-1aa843b33f59.png"
                alt="Walzo Sample Kit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Text */}
          <div ref={textARef} className="">
            <div>
              <h3 className="text-3xl font-bold text-walzo-lime">On-Demand Sample Delivery</h3>
              <h4 className="text-xl font-semibold text-white/90 mt-2">The B2B Darkstore</h4>
            </div>
            <p className="text-white text-lg leading-relaxed">
              Our system uses a central, low-cost dark store stocked with single sample pieces. 
              Businesses can order a physical sample to try at their location, solving the critical 
              need for physical evaluation before a large B2B purchase.
            </p>
            <div className="flex items-center space-x-3 pt-4">
              <div className="w-10 h-10 rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/70afafbf-c817-4ee0-a986-dc801ebe4cec.png"
                  alt="Walmart"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-white/80 text-sm">Logistics Powered by Walmart</span>
            </div>
          </div>
        </div>

        {/* Feature B: Kirana Network Integration */}
        <div ref={featureBRef} className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left: Text */}
          <div ref={textBRef} className="space-y-6 lg:order-1">
            <div>
              <h3 className="text-3xl font-bold text-walzo-lime">Kirana Network Integration</h3>
              <h4 className="text-xl font-semibold text-white/90 mt-2">Seamless Hyperlocal Fulfillment</h4>
            </div>
            <p className="text-white text-lg leading-relaxed">
              If an item is out of stock in the nearest dark store, our platform automatically 
              routes the order to a verified Kirana partner. A simple dashboard allows them to 
              accept the order for pickup by a delivery rider.
            </p>
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/d4fb364f-e3fd-4fa1-a339-9d57f6e7fea8.png"
                    alt="Flipkart"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-white/80 text-sm">Flipkart Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-20 rounded flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/phonepe.png"
                    alt="PhonePe"
                    className="w-10 h-8 object-contain "
                  />
                </div>
                <span className="text-white/80 text-sm">PhonePe Verification</span>
              </div>
            </div>
          </div>

          {/* Right: Image/Mockup */}
          <div ref={imageBRef} className="relative lg:order-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl w-3/4 bg-gradient-to-br from-green-400 to-green-600 p-8">
              <img 
                src="/lovable-uploads/edb13338-22d5-4ce5-90d0-4fa340373684.png"
                alt="Kirana Partner Dashboard"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HybridModelSection;
