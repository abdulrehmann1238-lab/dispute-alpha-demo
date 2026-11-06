import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { 
  UserCog, 
  UserPlus, 
  Users, 
  CheckSquare, 
  ShieldCheck, 
  Lock, 
  Mail,
  UserCheck 
} from 'lucide-react';

export const TeamPage: React.FC = () => {
  const { teamMembers, addTeamMember, toggleTeamMemberStatus, currentUser } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Administrator' | 'Manager' | 'Staff'>('Staff');
  const [title, setTitle] = useState('Dispute Specialist');

  if (currentUser.role !== 'admin') {
    return (
      <div className="bg-surface rounded-xl border border-borderLine p-8 text-center max-w-lg mx-auto mt-12 space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-navy">Restricted Access</h2>
        <p className="text-xs text-secondaryText leading-relaxed">
          Team administration and permission allocation are restricted exclusively to Super Administrators. You are currently viewing as <span className="font-semibold text-navy">{currentUser.name} ({currentUser.role.toUpperCase()})</span>.
        </p>
      </div>
    );
  }

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addTeamMember({
      name,
      email,
      role,
      title,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      status: 'active',
    });

    setIsAddOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Add Team Member Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Operations Specialist"
        description="Invite staff to assist with client intake, dispute drafting, or compliance review."
        maxWidth="md"
      >
        <form onSubmit={handleCreateMember} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Liam Sterling"
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Corporate Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="l.sterling@disputealpha.demo"
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">System Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              >
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Dispute Staff</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Functional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Credit Analyst"
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-borderLine">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 text-xs text-secondaryText hover:text-navy rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm"
            >
              Add Member
            </button>
          </div>
        </form>
      </Modal>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Team Management</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Oversee staff workload, role permissions, and dispute review assignments.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5 text-sage" />
          <span>+ Add Member</span>
        </button>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <div
            key={member.id}
            className="bg-surface rounded-xl p-5 border border-borderLine shadow-card space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover border border-borderLine"
                />
                <div>
                  <h3 className="text-sm font-semibold text-navy">{member.name}</h3>
                  <p className="text-[11px] text-secondaryText">{member.title}</p>
                </div>
              </div>

              <Badge
                size="sm"
                variant={member.status === 'active' ? 'success' : 'default'}
              >
                {member.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-borderLine/70">
              <div className="p-2 bg-warm/40 rounded-lg">
                <span className="text-[10px] text-secondaryText block">Assigned Clients</span>
                <span className="font-semibold text-navy">{member.assignedClientsCount}</span>
              </div>
              <div className="p-2 bg-warm/40 rounded-lg">
                <span className="text-[10px] text-secondaryText block">Active Tasks</span>
                <span className="font-semibold text-navy">{member.activeTasksCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-borderLine">
              <span className="text-secondaryText font-mono text-[11px]">{member.email}</span>
              <button
                onClick={() => toggleTeamMemberStatus(member.id)}
                className="text-[11px] text-secondaryText hover:text-navy underline"
              >
                {member.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

