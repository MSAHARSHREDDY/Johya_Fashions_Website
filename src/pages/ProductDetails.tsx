import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Info, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = products.find(p => p.id === id);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => 
        p.id !== product.id && 
        (p.category === product.category || p.subcategory === product.subcategory)
      )
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-gold underline">Back to collections</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest uppercase mb-12 hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-beige/50 overflow-hidden"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-[3/4] bg-beige/50 overflow-hidden cursor-pointer">
                  <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
              {product.category} / {product.subcategory}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">{product.name}</h1>
            
            <p className="text-charcoal/60 leading-relaxed mb-10 text-lg font-light">
              {product.description}
            </p>

            <div className="space-y-8 mb-12">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase mb-4 block text-charcoal/40">Select Size</span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] py-3 px-4 border text-xs font-bold tracking-widest uppercase transition-all ${
                        selectedSize === size ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-charcoal/10 hover:border-charcoal'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase mb-4 block text-charcoal/40">Color</span>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-3 px-6 border text-xs font-bold tracking-widest uppercase transition-all ${
                        selectedColor === color ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-charcoal/10 hover:border-charcoal'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-charcoal text-white py-5 rounded-full font-bold tracking-[0.2em] uppercase hover:bg-gold transition-all mb-6">
              Enquire Now
            </button>
            
            <div className="flex items-center justify-between pt-8 border-t border-charcoal/10 text-xs tracking-widest uppercase font-bold text-charcoal/40">
              <button className="flex items-center space-x-2 hover:text-charcoal transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-charcoal transition-colors">
                <Info className="w-4 h-4" />
                <span>Product Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Related Items</h2>
              <Link to="/products" className="text-xs font-bold tracking-widest uppercase border-b border-charcoal/20 pb-1">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <Link to={`/products/${p.id}`} key={p.id} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-beige/50">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest mb-1 group-hover:text-gold transition-colors">{p.name}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
