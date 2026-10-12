import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { Appointment } from '../../types';
import {
  Calendar,
  Clock,
  Video,
  Globe,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  X,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MessageSquare
} from 'lucide-react';

export const PatientAppointmentsPage: React.FC = () => {
  const { appointments, activeCase, scheduleAppointment, updateAppointmentStatus } = useCase();

  const [activeVideoApt, setActiveVideoApt] = useState<Appointment | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // New slot state
  const [newDate, setNewDate] = useState('2026-10-22');
  const [newTime, setNewTime] = useState('15:00 - 15:45 GMT');
  const [newType, setNewType] = useState<Appointment['appointmentType']>('Virtual Pre-Op Consultation');
  const [newNotes, setNewNotes] = useState('Pre-operative surgical planning and implant sizing discussion.');

  // Video modal controls state
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleAppointment({
      caseId: activeCase?.id || 'case-eth-9021',
      patientId: 'usr-patient-1',
      patientName: 'Sarah Jenkins',
      providerId: 'p-1',
      providerName: 'Apollo Hospital & Heart Institute',
      doctorName: 'Dr. Arvind Mehta',
      appointmentType: newType,
      date: newDate,
      timeSlot: newTime,
      timezone: 'Europe/London (GMT+1)',
      notes: newNotes
    });
    setShowScheduleModal(false);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
            Tele-Health & Clinical Consultations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-0.5">
            Surgeon Appointments & Bookings
          </h1>
          <p className="text-xs text-[#5A6B70] mt-1">
            Conduct encrypted video consultations with your overseas surgical team and review travel scheduling.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 self-start"
        >
          <PlusCircle className="w-4 h-4 text-teal-300" />
          <span>Request New Consultation Slot</span>
        </button>
      </div>

      {/* Timezone Helper Banner */}
      <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-4 text-xs text-teal-900 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Globe className="w-4 h-4 text-[#167D78] shrink-0" />
          <span>
            <strong>Dual Timezone Display:</strong> Times displayed in your local timezone <strong>London GMT (BST)</strong> and hospital local time <strong>India IST (+4:30h)</strong>.
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#167D78] bg-white px-2.5 py-1 rounded-lg border border-teal-200">
          Auto-synchronized
        </span>
      </div>

      {/* Appointment Cards List */}
      <div className="space-y-4">
        {appointments.map((apt) => {
          const isConfirmed = apt.status === 'confirmed';

          return (
            <div
              key={apt.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize border ${
                      isConfirmed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    ● {apt.status}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">#{apt.id}</span>
                  <span className="text-xs font-bold text-[#167D78]">• {apt.appointmentType}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#123B46]">{apt.doctorName}</h3>
                  <p className="text-xs text-[#5A6B70]">{apt.providerName}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 max-w-xl">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>{apt.timeSlot}</span>
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    ({apt.timezone})
                  </div>
                </div>

                {apt.notes && (
                  <p className="text-xs text-gray-600 italic">
                    Note: "{apt.notes}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                {isConfirmed && (
                  <button
                    onClick={() => setActiveVideoApt(apt)}
                    className="px-5 py-2.5 bg-[#167D78] hover:bg-[#11625e] text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4 text-teal-200" />
                    <span>Join Video Consultation</span>
                  </button>
                )}

                <button
                  onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-xs font-semibold border border-gray-200 transition-colors"
                >
                  Cancel / Reschedule
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Tele-Health Video Modal (mandated by Section 13) */}
      {activeVideoApt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#123B46] text-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-teal-500/30 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <div>
                  <h3 className="text-sm font-bold">{activeVideoApt.appointmentType}</h3>
                  <p className="text-[11px] text-teal-300">
                    Encrypted Tele-Health Room with {activeVideoApt.doctorName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideoApt(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Canvas Simulation */}
            <div className="relative bg-gray-900 rounded-2xl h-80 overflow-hidden flex items-center justify-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                alt="Doctor Video Feed"
                className="w-full h-full object-cover opacity-90"
              />

              {/* Surgeon Name Banner */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-xs px-3 py-1 rounded-lg text-xs font-semibold text-white">
                {activeVideoApt.doctorName} (Apollo Joint Reconstruction)
              </div>

              {/* Patient Self View Overlay */}
              <div className="absolute bottom-4 right-4 w-28 h-20 bg-gray-800 rounded-xl overflow-hidden border border-white/20 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                  alt="Patient Self Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 px-1 rounded text-white">You</span>
              </div>
            </div>

            {/* In-Call Controls Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-teal-200">
                Call Duration: <span className="font-mono font-bold text-white">08:42</span> (Connected)
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`p-3 rounded-full transition-colors ${
                    micOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-500 text-white'
                  }`}
                  title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
                >
                  {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setVideoOn(!videoOn)}
                  className={`p-3 rounded-full transition-colors ${
                    videoOn ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-red-500 text-white'
                  }`}
                  title={videoOn ? 'Stop Camera' : 'Start Camera'}
                >
                  {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setActiveVideoApt(null)}
                  className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>Leave Consultation</span>
                </button>
              </div>

              <div className="text-xs text-teal-300">
                1080p HD Audio & Video
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Slot Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-[#123B46]">Request a Consultation Slot</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Consultation Objective</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="Virtual Pre-Op Consultation">Virtual Pre-Op Consultation (30 mins)</option>
                  <option value="In-Person Evaluation">In-Person Evaluation (Hospital Arrival)</option>
                  <option value="Procedure Review">Procedure Review & Implant Selection</option>
                  <option value="Aftercare Follow-up">Post-Treatment Aftercare Review</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Time Slot (GMT)</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="11:00 - 11:45 GMT">11:00 - 11:45 GMT (15:30 IST)</option>
                    <option value="14:30 - 15:15 GMT">14:30 - 15:15 GMT (19:00 IST)</option>
                    <option value="16:00 - 16:45 GMT">16:00 - 16:45 GMT (20:30 IST)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Questions for Surgeon</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder="e.g. Ask about surgical recovery time, implant brand, or anesthesia type..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#123B46] hover:bg-[#0d2b33] text-white font-bold rounded-xl shadow-xs"
                >
                  Book Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
