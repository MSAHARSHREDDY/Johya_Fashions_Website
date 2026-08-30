import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products, categories } from '../data';
import { Search, Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="pt-32 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Our Collections</h1>
          <p className="text-charcoal/60 max-w-xl text-lg font-light">
            Explore curated fashion for women, men, and kids. From heritage ethnic wear to modern essentials.
          </p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={() => setSearchParams({ category: 'all' })}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all",
                activeCategory === 'all' ? "bg-charcoal text-white" : "bg-white text-charcoal/40 hover:text-charcoal"
              )}
            >
              All Collections
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id })}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all",
                  activeCategory === cat.id ? "bg-charcoal text-white" : "bg-white text-charcoal/40 hover:text-charcoal"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-charcoal/10 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-charcoal/10 rounded-full pl-6 pr-12 py-3 text-sm font-medium focus:outline-none focus:border-gold/50 cursor-pointer"
              >
                <option value="newest">Newest</option>
                <option value="name">Alphabetical</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={product.id}
              >
                <div className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-3 md:mb-6 bg-beige/50">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold uppercase tracking-widest mb-1 group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-[10px] md:text-xs text-charcoal/40 uppercase tracking-wider mb-2">{product.subcategory}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40">
            <p className="text-charcoal/40 tracking-widest uppercase text-sm">No products found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({ category: 'all' });
              }}
              className="mt-6 text-gold text-sm font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
