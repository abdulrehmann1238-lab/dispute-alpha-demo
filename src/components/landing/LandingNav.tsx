import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface LandingNavProps {
  onRequestDemo: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ onRequestDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-md border-b border-borderLine py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center">
          <BrandLogo size="md" showTagline={false} />
        </Link>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollTo('features')}
            className="text-xs font-medium text-secondaryText hover:text-navy transition-colors"
          >
            Platform
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="text-xs font-medium text-secondaryText hover:text-navy transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('workflow')}
            className="text-xs font-medium text-secondaryText hover:text-navy transition-colors"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollTo('security')}
            className="text-xs font-medium text-secondaryText hover:text-navy transition-colors"
          >
            Security
          </button>
          <button
            onClick={() => scrollTo('preview')}
            className="text-xs font-medium text-secondaryText hover:text-navy transition-colors"
          >
            Interactive Demo
          </button>
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-medium text-navy hover:text-navy-light rounded-lg hover:bg-warm transition-colors"
          >
            Sign In
          </Link>
          <button
            onClick={onRequestDemo}
            className="px-4 py-2 text-xs font-medium text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 group"
          >
            <span>Request a Demo</span>
            <ArrowRight className="w-3.5 h-3.5 text-sage group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/login"
            className="px-3 py-1.5 text-xs font-medium text-navy bg-warm rounded-lg"
          >
            Sign In
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-secondaryText hover:text-navy"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-borderLine px-4 pt-3 pb-6 space-y-3 shadow-card animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollTo('features')}
            className="block w-full text-left py-2 text-xs font-medium text-navy"
          >
            Platform
          </button>
          <button
            onClick={() => scrollTo('workflow')}
            className="block w-full text-left py-2 text-xs font-medium text-navy"
          >
            Workflow
          </button>
          <button
            onClick={() => scrollTo('security')}
            className="block w-full text-left py-2 text-xs font-medium text-navy"
          >
            Security
          </button>
          <button
            onClick={() => scrollTo('preview')}
            className="block w-full text-left py-2 text-xs font-medium text-navy"
          >
            Interactive Demo
          </button>

          <div className="pt-3 border-t border-borderLine flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestDemo();
              }}
              className="w-full py-2.5 text-center text-xs font-medium text-white bg-navy rounded-lg"
            >
              Request a Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

