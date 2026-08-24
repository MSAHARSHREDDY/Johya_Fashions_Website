import { useState } from 'react';
import { gallery } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'women' | 'men' | 'lifestyle'>('all');

  const filteredGallery = filter === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  return (
    <div className="pt-32 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Visual Journey</h1>
          <p className="text-charcoal/60 max-w-xl mx-auto text-lg font-light">
            A celebration of style across generations. Peek into the Johya Fashions showroom and lifestyle.
          </p>
        </header>

        {/* Filter */}
        <div className="flex justify-center space-x-4 mb-16 overflow-x-auto no-scrollbar pb-4">
          {['all', 'women', 'men', 'lifestyle'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all",
                filter === cat ? "bg-charcoal text-white shadow-xl" : "bg-white text-charcoal/40 hover:text-charcoal"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group cursor-pointer break-inside-avoid overflow-hidden bg-beige/50"
                onClick={() => setSelectedImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white w-8 h-8 scale-75 group-hover:scale-100 transition-transform" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all bg-gradient-to-t from-charcoal/80 to-transparent">
                  <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest block mb-1">{item.category}</span>
                  <h3 className="text-white font-bold tracking-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-charcoal/95 flex items-center justify-center p-6"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-10 right-10 text-white/60 hover:text-white transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-10 h-10" />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={selectedImage}
                className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
