
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-walzo-teal py-16 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Logo/Brand */}
          <div>
            <h3 className="text-4xl font-black text-white mb-2">Walzo</h3>
            <p className="text-white/70">Revolutionizing B2B Furniture Sourcing</p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-8">
            <a 
              href="#"
              className="flex items-center gap-2 text-white/80 hover:text-walzo-lime transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 space-y-2">
            <p className="text-white/60">© 2024 Walzo. All rights reserved.</p>
            <p className="text-walzo-lime font-semibold">A Walmart Sparkathon Project</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
