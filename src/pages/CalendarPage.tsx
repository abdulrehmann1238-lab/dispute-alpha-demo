import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Building, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck,
  Plus
} from 'lucide-react';
import { CalendarEvent } from '../types';

export const CalendarPage: React.FC = () => {
  const { calendarEvents, addCalendarEvent, clients } = useApp();

  const [currentMonth, setCurrentMonth] = useState('November 2026');
  const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<any>('deadline');
  const [newDate, setNewDate] = useState('2026-11-20');
  const [newTime, setNewTime] = useState('14:00');
  const [newDesc, setNewDesc] = useState('');
  const [newClient, setNewClient] = useState(clients[0]?.firstName + ' ' + clients[0]?.lastName || '');

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCalendarEvent({
      title: newTitle,
      type: newType,
      date: newDate,
      time: newTime,
      clientName: newClient,
      description: newDesc,
    });

    setIsAddOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const getEventBadgeVariant = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'bureau_response': return 'info';
      case 'deadline': return 'attention';
      case 'internal_review': return 'sage';
      case 'client_appointment': return 'pending';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Detail Modal */}
      {selectedEvent && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          description={`${selectedEvent.type.replace('_', ' ').toUpperCase()} • ${selectedEvent.date} at ${selectedEvent.time || '12:00'}`}
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs">
            {selectedEvent.clientName && (
              <div className="p-3 bg-warm/50 rounded-lg border border-borderLine">
                <span className="text-[10px] text-secondaryText block uppercase font-bold">Related Client</span>
                <span className="text-sm font-semibold text-navy">{selectedEvent.clientName}</span>
              </div>
            )}

            <div>
              <span className="text-secondaryText block text-[11px] mb-1 font-semibold uppercase">Description & Notes</span>
              <p className="p-3 bg-surface rounded-lg border border-borderLine text-navy leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {selectedEvent.assignedStaff && (
              <div>
                <span className="text-secondaryText text-[11px]">Assigned Specialist: {selectedEvent.assignedStaff}</span>
              </div>
            )}

            <div className="pt-3 border-t border-borderLine flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Schedule Operational Deadline"
        description="Add a bureau response due date or client milestone."
        maxWidth="md"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Event / Deadline Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Equifax 30-day statutory response due"
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Category Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg bg-surface focus:outline-none focus:ring-1 focus:ring-sage"
              >
                <option value="bureau_response">Bureau Response Date</option>
                <option value="deadline">Statutory Deadline</option>
                <option value="internal_review">Internal Compliance Review</option>
                <option value="client_appointment">Client Consultation</option>
                <option value="task_deadline">Staff Task Deadline</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy mb-1">Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Related Client</label>
            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              placeholder="Client name"
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Notes / Description</label>
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-xs border border-borderLine rounded-lg focus:outline-none focus:ring-1 focus:ring-sage"
            />
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
              Save Event
            </button>
          </div>
        </form>
      </Modal>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-navy tracking-tight">Calendar & Deadlines</h1>
          <p className="text-xs sm:text-sm text-secondaryText mt-1">
            Monitor statutory 30-day response dates, client briefings, and compliance audits.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-navy hover:bg-navy-light rounded-lg shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-sage" />
          <span>+ Add Deadline</span>
        </button>
      </div>

      {/* Calendar View Container */}
      <div className="bg-surface rounded-xl border border-borderLine shadow-card p-6 space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderLine">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-borderLine text-secondaryText hover:text-navy hover:bg-warm">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg border border-borderLine text-secondaryText hover:text-navy hover:bg-warm">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-lg font-semibold text-navy">{currentMonth}</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg bg-warm/60 p-1 border border-borderLine">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'month' ? 'bg-surface text-navy font-semibold shadow-subtle' : 'text-secondaryText'
                }`}
              >
                Month Grid
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  viewMode === 'agenda' ? 'bg-surface text-navy font-semibold shadow-subtle' : 'text-secondaryText'
                }`}
              >
                Agenda List
              </button>
            </div>
          </div>
        </div>

        {/* Month View Simulation */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center font-bold text-[10px] text-secondaryText uppercase py-1">
                {d}
              </div>
            ))}

            {/* Fictional November 2026 Calendar days 1 to 30 */}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-11-${String(dayNum).padStart(2, '0')}`;
              const dayEvents = calendarEvents.filter(e => e.date === dateStr);

              return (
                <div
                  key={dayNum}
                  className="min-h-[100px] p-2 bg-[#FCFCFB] hover:bg-warm/40 border border-borderLine rounded-lg transition-colors flex flex-col justify-between"
                >
                  <span className="text-xs font-medium text-navy">{dayNum}</span>

                  <div className="space-y-1 mt-1">
                    {dayEvents.map(evt => (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className="p-1 rounded text-[10px] bg-surface border border-borderLine hover:border-sage shadow-xs cursor-pointer truncate font-medium text-navy"
                        title={evt.title}
                      >
                        <span className="w-1.5 h-1.5 rounded-full inline-block mr-1 bg-sage" />
                        {evt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Agenda View */}
        {viewMode === 'agenda' && (
          <div className="divide-y divide-borderLine">
            {calendarEvents.map(evt => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="py-3.5 px-3 hover:bg-warm/40 cursor-pointer rounded-lg transition-colors flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 text-center p-2 rounded-lg bg-warm/60 border border-borderLine">
                    <span className="block text-[10px] uppercase font-bold text-secondaryText">Date</span>
                    <span className="text-xs font-semibold text-navy">{evt.date.substring(5)}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-navy">{evt.title}</h4>
                    <p className="text-[11px] text-secondaryText mt-0.5">{evt.description}</p>
                    {evt.clientName && (
                      <p className="text-[10px] text-sage-dark font-medium mt-1">Client: {evt.clientName}</p>
                    )}
                  </div>
                </div>

                <Badge size="sm" variant={getEventBadgeVariant(evt.type)}>
                  {evt.type.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

