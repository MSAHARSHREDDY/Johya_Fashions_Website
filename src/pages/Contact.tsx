import { motion } from 'motion/react';
import { contactInfo } from '../data';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Let's Connect</h1>
          <p className="text-charcoal/60 max-w-xl text-lg font-light">
            Have a question about our collections or need personalized styling advice? Reach out to us.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-12 shadow-2xl border border-charcoal/5">
            <div className="space-y-12">
              <div className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-gold shadow-sm mx-auto md:mx-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-2">Call Us</h3>
                  <p className="text-xl font-medium">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-gold shadow-sm mx-auto md:mx-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-2">Email Us</h3>
                  <p className="text-xl font-medium">{contactInfo.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-12 border-t md:border-t-0 md:border-l border-charcoal/10 pt-12 md:pt-0 md:pl-12">
              <div className="space-y-4 text-center md:text-left">
                <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-gold shadow-sm mx-auto md:mx-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-2">Boutique Location</h3>
                  <p className="text-xl font-medium">
                    123 Luxury Avenue, Fashion District, New Delhi, India
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-6 text-center md:text-left">Follow Our Journey</h3>
                <div className="flex justify-center md:justify-start space-x-6">
                  <a href={contactInfo.socials.instagram} className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all shadow-sm">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={contactInfo.socials.facebook} className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all shadow-sm">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={contactInfo.socials.twitter} className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all shadow-sm">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
