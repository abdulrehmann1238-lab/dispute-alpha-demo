import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';
import { Shield, UserCheck, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { switchRole } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@disputealpha.demo');

  const demoAccounts = [
    {
      role: 'admin' as UserRole,
      name: 'Alex Vance',
      email: 'admin@disputealpha.demo',
      title: 'Managing Director & Compliance Lead',
      description: 'Complete operational visibility: approve dispute correspondence, manage staff, configure bureau directories, audit activity logs.',
      icon: Shield,
      badge: 'Executive Admin',
      path: '/app/dashboard',
    },
    {
      role: 'staff' as UserRole,
      name: 'Sarah Jenkins',
      email: 'staff@disputealpha.demo',
      title: 'Senior Dispute Specialist',
      description: 'Operations specialist: review credit reports, flag discrepancies, draft dispute letters, log bureau responses, complete tasks.',
      icon: UserCheck,
      badge: 'Operations Staff',
      path: '/app/dashboard',
    },
    {
      role: 'client' as UserRole,
      name: 'Jordan Hayes',
      email: 'client@disputealpha.demo',
      title: 'Enrolled Consumer Client',
      description: 'Customer view: track milestone progress, upload requested identity documents, review approved dispute summaries, direct messaging.',
      icon: Users,
      badge: 'Client Portal',
      path: '/client',
    },
  ];

  const handleSelectRole = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole);
    if (selectedRole === 'client') {
      navigate('/client');
    } else {
      navigate('/app/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-sage-light selection:text-navy">
      <div className="max-w-xl w-full mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-4">
            <BrandLogo size="lg" showTagline={true} />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm border border-borderLine text-xs font-semibold text-navy mt-2">
            <Sparkles className="w-3.5 h-3.5 text-sage-dark" />
            <span>Interactive Demo Sign In</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-navy font-normal tracking-tight mt-3">
            Select a persona to explore
          </h2>
          <p className="text-xs sm:text-sm text-secondaryText mt-1.5">
            Test how Dispute Alpha adapts interfaces and permissions for each operational stakeholder.
          </p>
        </div>

        {/* Demo Persona Cards */}
        <div className="space-y-3">
          {demoAccounts.map((acc) => {
            const Icon = acc.icon;
            const isSelected = selectedRole === acc.role;
            return (
              <div
                key={acc.role}
                onClick={() => handleSelectRole(acc)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-surface border-navy shadow-card ring-1 ring-navy'
                    : 'bg-surface/70 border-borderLine hover:border-sage/60 hover:bg-surface'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-navy text-white' : 'bg-warm text-navy'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-navy">{acc.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-warm text-secondaryText">
                          {acc.email}
                        </span>
                      </div>
                      <p className="text-xs text-sage-dark font-medium mt-0.5">{acc.title}</p>
                      <p className="text-[11px] text-secondaryText mt-1 leading-relaxed">
                        {acc.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-sage-light text-navy' : 'bg-warm text-secondaryText'
                    }`}>
                      {acc.badge}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <form onSubmit={handleLogin} className="space-y-4">
          <button
            type="submit"
            className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-xl shadow-card transition-all flex items-center justify-center gap-2 group"
          >
            <span>Enter as {selectedRole.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4 text-sage group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center text-xs text-secondaryText">
          <Link to="/" className="hover:text-navy underline">
            ← Return to Marketing Landing Page
          </Link>
        </div>

      </div>
    </div>
  );
};

