import React, { useState } from 'react';
import { LoadingScreen } from '../components/landing/LoadingScreen';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { ProductOverview } from '../components/landing/ProductOverview';
import { WorkflowSection } from '../components/landing/WorkflowSection';
import { SecuritySection } from '../components/landing/SecuritySection';
import { PreviewSection } from '../components/landing/PreviewSection';
import { LandingFooter } from '../components/landing/LandingFooter';
import { ContactModal } from '../components/landing/ContactModal';

export const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Show loading screen only once per session or brief initial load
    return sessionStorage.getItem('dispute_alpha_loaded') !== 'true';
  });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('dispute_alpha_loaded', 'true');
  };

  const scrollToWorkflow = () => {
    const el = document.getElementById('workflow');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-sage-light selection:text-navy">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <ContactModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      <LandingNav onRequestDemo={() => setIsDemoModalOpen(true)} />
      
      <main className="flex-1">
        <HeroSection onSeeHowItWorks={scrollToWorkflow} />
        <ProductOverview />
        <WorkflowSection />
        <SecuritySection />
        <PreviewSection />
      </main>

      <LandingFooter onRequestDemo={() => setIsDemoModalOpen(true)} />
    </div>
  );
};

