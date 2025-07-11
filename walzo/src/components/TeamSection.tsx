
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin } from 'lucide-react';

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: -10,
          duration: 0.8,
          stagger: 0.1,
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

  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Lead Developer & Co-Founder",
      avatar: "AR",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Priya Sharma",
      role: "Product Manager & Co-Founder", 
      avatar: "PS",
      github: "#",
      linkedin: "#"
    },
    {
      name: "Michael Chen",
      role: "UI/UX Designer",
      avatar: "MC",
      github: "#", 
      linkedin: "#"
    },
    {
      name: "Sarah Johnson",
      role: "Logistics Strategist",
      avatar: "SJ",
      github: "#",
      linkedin: "#"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-walzo-teal">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Meet the Team
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Passionate innovators building the future of B2B furniture sourcing
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                {/* Avatar */}
                <div className="w-20 h-20 bg-walzo-lime rounded-2xl flex items-center justify-center mx-auto mb-4 text-walzo-teal font-black text-xl group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                
                {/* Info */}
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-white/70 text-sm mb-6">{member.role}</p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a 
                    href={member.github}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-300"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a 
                    href={member.linkedin}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
