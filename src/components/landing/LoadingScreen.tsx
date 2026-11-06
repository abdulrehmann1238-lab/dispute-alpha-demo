import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 400);
          }, 200);
          return 100;
        }
        return prev + 15;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F8F6] transition-opacity duration-400 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center p-8 max-w-sm animate-in fade-in duration-500">
        <BrandLogo size="xl" showTagline={false} />

        <p className="font-serif italic text-sm text-secondaryText tracking-wide mt-3 mb-6">
          Clarity in every dispute.
        </p>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-1 bg-borderLine rounded-full overflow-hidden relative">
          <div
            className="h-full bg-navy rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] text-secondaryText/70 tracking-widest uppercase mt-3">
          Initializing Workspace {progress}%
        </span>
      </div>
    </div>
  );
};

