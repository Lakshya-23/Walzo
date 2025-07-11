
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const UseCasesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const useCases = [
    {
      title: "Interior Designers",
      description: "Simplify sourcing with physical samples. See textures and quality before committing to large orders.",
      image: "/lovable-uploads/14ad76a3-0d51-4b22-972d-17176adf834a.png"
    },
    {
      title: "Hotels & Hospitality", 
      description: "Ensure brand consistency across properties. Sample before bulk purchasing for renovations.",
      image: "/lovable-uploads/4e04c1aa-2590-4bd2-b92c-3140e96ee824.png"
    },
    {
      title: "Corporate Offices",
      description: "Source durable, high-quality furniture that matches your workspace aesthetic and ergonomic needs.",
      image: "/lovable-uploads/c8c08345-a78b-4c95-b0a1-de0fd45d121e.png"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-walzo-teal leading-tight mb-4">
            Designed for Your Business
          </h2>
          <p className="text-xl text-walzo-teal/70 max-w-2xl mx-auto">
            From interior design studios to enterprise offices, Walzo scales with your needs
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Image Area */}
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-walzo-teal">{useCase.title}</h3>
                  <p className="text-walzo-teal/70 leading-relaxed text-sm">{useCase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
