import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Settings, 
  Building, 
  ShieldCheck, 
  Bell, 
  RotateCcw, 
  Save, 
  Clock, 
  Lock,
  CheckCircle2 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetDemoData, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'general' | 'organization' | 'security' | 'notifications'>('general');
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [timezone, setTimezone] = useState(settings.timezone);
  const [sessionTimeout, setSessionTimeout] = useState(settings.sessionTimeout);
  const [autoNotification, setAutoNotification] = useState(settings.autoNotification);
  const [requireTwoSignOffs, setRequireTwoSignOffs] = useState(settings.requireTwoSignOffs);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      companyName,
      timezone,
      sessionTimeout,
      autoNotification,
      requireTwoSignOffs,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">System Settings</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Configure dispute operations policies, organization identity, and compliance preferences.
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="px-3.5 py-2 text-xs font-semibold text-[#BD3838] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Main Settings Card */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card overflow-hidden">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-2 p-3 border-b border-borderLine bg-[#FCFCFB] overflow-x-auto">
          {[
            { id: 'general', label: 'General Configuration' },
            { id: 'organization', label: 'Organization Profile' },
            { id: 'security', label: 'Security & Compliance' },
            { id: 'notifications', label: 'Alert Preferences' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'bg-sage-light text-navy' : 'text-secondaryText hover:text-navy hover:bg-warm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6 max-w-2xl">
          
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Organization Legal Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Operational Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
                >
                  <option value="America/New_York (EST)">America/New_York (Eastern)</option>
                  <option value="America/Chicago (CST)">America/Chicago (Central)</option>
                  <option value="America/Denver (MST)">America/Denver (Mountain)</option>
                  <option value="America/Los_Angeles (PST)">America/Los_Angeles (Pacific)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Session Inactivity Timeout (Minutes)</label>
                <input
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
                />
              </div>
            </div>
          )}

          {/* Organization Tab */}
          {activeTab === 'organization' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Company Wordmark / Logo</label>
                <div className="p-4 rounded-xl border border-borderLine bg-warm/30 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-navy text-white flex items-center justify-center font-bold text-sm">
                    DA
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy">Dispute Alpha Operational Mark</p>
                    <p className="text-[11px] text-secondaryText">Applied automatically to client disclosures and portal headers</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Compliance Officer of Record</label>
                <input
                  type="text"
                  disabled
                  value="Alex Vance (Managing Director)"
                  className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-warm/50 text-secondaryText"
                />
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="p-4 bg-warm/50 rounded-xl border border-borderLine space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireTwoSignOffs}
                    onChange={(e) => setRequireTwoSignOffs(e.target.checked)}
                    className="w-4 h-4 rounded text-navy border-borderLine focus:ring-sage mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-semibold text-navy block">
                      Enforce Dual Administrative Review for Round 3 Letters
                    </span>
                    <span className="text-[11px] text-secondaryText">
                      Requires two independent compliance officers to authorize escalated litigation or CFPB-level dispute correspondence.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 bg-warm/50 rounded-xl border border-borderLine space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-navy">
                  <ShieldCheck className="w-4 h-4 text-sage-dark" />
                  <span>Mandatory Human Review Gate</span>
                </div>
                <p className="text-[11px] text-secondaryText leading-relaxed">
                  Dispute Alpha enforces strict human authorization before dispute dispatch. Automated mass-mail generation without staff sign-off is disabled system-wide.
                </p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-warm/40 rounded-xl border border-borderLine cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoNotification}
                  onChange={(e) => setAutoNotification(e.target.checked)}
                  className="w-4 h-4 rounded text-navy border-borderLine focus:ring-sage"
                />
                <div>
                  <span className="text-xs font-semibold text-navy block">
                    Real-time Bureau Response Alerts
                  </span>
                  <span className="text-[11px] text-secondaryText">
                    Notify assigned specialists immediately when investigation updates or deletion notices are recorded.
                  </span>
                </div>
              </label>
            </div>
          )}

          <div className="pt-4 border-t border-borderLine flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-sage" />
              <span>Save System Settings</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

