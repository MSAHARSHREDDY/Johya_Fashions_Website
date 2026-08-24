import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { heroData, categories, products } from '../data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroData.image}
            alt="Johya Fashions Hero"
            className="w-full h-full object-cover object-center brightness-75 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-8xl font-bold tracking-tighter mb-6"
          >
            {heroData.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-xl text-white/80 mb-10 tracking-[0.2em] uppercase font-light"
          >
            {heroData.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center space-x-3 bg-white text-charcoal px-10 py-4 rounded-full font-semibold tracking-widest text-sm hover:bg-gold hover:text-white transition-all group"
            >
              <span>{heroData.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
        >
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* Brand Intro */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">Our Legacy</span>
          <p className="text-charcoal/60 max-w-2xl mx-auto leading-relaxed text-lg font-light">
            Founded with a vision to blend traditional craftsmanship with modern silhouettes, 
            Johya Fashions brings you curated collections that celebrate your identity at every stage of life.
          </p>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-10 bg-beige/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[500px] overflow-hidden cursor-pointer"
              >
                <Link to={`/products?category=${category.id}`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2 tracking-tighter">{category.name}</h3>
                    <p className="text-white/70 text-sm mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      {category.description}
                    </p>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase border-b border-white/40 pb-1 w-fit group-hover:border-white transition-colors">
                      Explore {category.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
