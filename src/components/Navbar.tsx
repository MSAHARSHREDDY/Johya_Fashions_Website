import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { navigation, contactInfo } from '../data';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isScrolledOrNotHome = scrolled || !isHome;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        isScrolledOrNotHome
          ? 'bg-charcoal py-4 border-gold/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'bg-transparent py-6 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className={cn(
            'text-2xl font-bold tracking-tighter transition-colors',
            isScrolledOrNotHome ? 'text-gold' : 'text-white'
          )}
        >
          {contactInfo.brand}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-bold tracking-[0.2em] uppercase transition-all hover:text-gold',
                location.pathname === item.path
                  ? (isScrolledOrNotHome ? 'text-gold' : 'text-white')
                  : (isScrolledOrNotHome ? 'text-white/60' : 'text-white/80')
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={isScrolledOrNotHome ? 'text-gold' : 'text-white'} />
          ) : (
            <Menu className={isScrolledOrNotHome ? 'text-gold' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-charcoal/10 p-5 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-sm font-bold tracking-[0.2em] uppercase transition-colors',
                    location.pathname === item.path ? 'text-charcoal' : 'text-charcoal/60'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
