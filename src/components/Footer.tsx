import { Link } from 'react-router-dom';
import { navigation, contactInfo } from '../data';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter">{contactInfo.brand}</h3>
            <p className="text-white/60 max-w-xs leading-relaxed">
              {contactInfo.tagline}. Timeless elegance for the modern family.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-widest">Navigation</h4>
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-widest">Contact</h4>
            <div className="text-white/60 space-y-4 text-sm">
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} {contactInfo.brand}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
