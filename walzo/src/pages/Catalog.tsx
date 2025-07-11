
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');

  const products = [
    {
      id: 1,
      name: "The 'Crimson' Accent Chair",
      image: "/lovable-uploads/757f3e76-1ebb-442f-a78a-f3a4f86688ea.png",
      trialFee: "₹250",
      category: "Chairs",
      style: "Modern"
    },
    {
      id: 2,
      name: "The 'Hampton' Sectional Sofa",
      image: "/lovable-uploads/8039d1f6-0337-4f9a-8428-604414aa12be.png",
      trialFee: "₹500",
      category: "Chairs",
      style: "Classic"
    },
    {
      id: 3,
      name: "The 'Royal Blue' Chesterfield",
      image: "/lovable-uploads/3942346d-0fe5-47dd-bff3-852934596647.png",
      trialFee: "₹400",
      category: "Chairs",
      style: "Classic"
    },
    {
      id: 4,
      name: "The 'Elegance' Armchair",
      image: "/lovable-uploads/676da1ec-61dc-444c-b74b-f3a59a234d49.png",
      trialFee: "₹300",
      category: "Chairs",
      style: "Classic"
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const styleMatch = selectedStyle === 'All' || product.style === selectedStyle;
    return categoryMatch && styleMatch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      const cards = gridRef.current?.querySelectorAll('.product-card');
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 40 });
        
        ScrollTrigger.batch(cards, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out"
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mr-4 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-walzo-teal to-walzo-lime bg-clip-text text-transparent">
              Explore Our Sample Catalog
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl">
              Order a physical sample to evaluate quality and craftsmanship in your own space. 
              All trial fees are fully refundable upon return or credited towards a bulk purchase.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-12 p-6 bg-gray-50 rounded-2xl">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walzo-teal"
            >
              <option value="All">All Categories</option>
              <option value="Chairs">Chairs</option>
              <option value="Tables">Tables</option>
              <option value="Lighting">Lighting</option>
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Style</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-walzo-teal"
            >
              <option value="All">All Styles</option>
              <option value="Modern">Modern</option>
              <option value="Industrial">Industrial</option>
              <option value="Classic">Classic</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.03,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-walzo-teal mb-3">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="bg-walzo-lime text-walzo-teal px-3 py-1 rounded-full text-sm font-semibold">
                    Trial Fee: {product.trialFee}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-walzo-teal border-walzo-teal hover:bg-walzo-teal hover:text-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
