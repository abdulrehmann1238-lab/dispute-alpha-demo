import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { Toast } from '../common/Toast';
import { AddClientModal } from '../modals/AddClientModal';
import { CreateTaskModal } from '../modals/CreateTaskModal';
import { CreateDisputeModal } from '../modals/CreateDisputeModal';

export const AppLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateDisputeOpen, setIsCreateDisputeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toast notifications */}
      <Toast />

      {/* Global Modals */}
      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
      />
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      />
      <CreateDisputeModal
        isOpen={isCreateDisputeOpen}
        onClose={() => setIsCreateDisputeOpen(false)}
      />

      {/* Fixed Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-300">
        <TopHeader
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenAddClient={() => setIsAddClientOpen(true)}
          onOpenCreateTask={() => setIsCreateTaskOpen(true)}
          onOpenCreateDispute={() => setIsCreateDisputeOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

