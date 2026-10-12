import React from 'react';
import { useCase } from '../../context/CaseContext';
import { Calendar, Clock, Video, CheckCircle2, User, Building2 } from 'lucide-react';

export const ProviderAppointmentsPage: React.FC = () => {
  const { appointments } = useCase();

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
          Surgical Consultation Scheduling
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-0.5">
          Doctor Availability & Patient Appointments
        </h1>
        <p className="text-xs text-[#5A6B70] mt-1">
          Coordinate international telemedicine evaluations and manage clinical slot capacity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-[#123B46] uppercase tracking-wider">
            Scheduled Patient Consultations
          </h2>

          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ● {apt.status}
                  </span>
                  <span className="text-xs font-bold text-[#167D78]">{apt.appointmentType}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900">{apt.patientName}</h3>
                <p className="text-xs text-[#5A6B70]">Case #{apt.caseId} • {apt.doctorName}</p>

                <div className="flex items-center gap-4 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                  <span className="flex items-center gap-1 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" /> {apt.date}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> {apt.timeSlot}
                  </span>
                </div>
              </div>

              <a
                href={apt.meetingLink || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-[#167D78] hover:bg-[#11625e] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors self-start sm:self-center shrink-0"
              >
                <Video className="w-4 h-4 text-teal-200" />
                <span>Launch Tele-Room</span>
              </a>
            </div>
          ))}
        </div>

        {/* Doctor Availability Settings */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#123B46]">Consultation Slot Management</h3>
          <p className="text-xs text-[#5A6B70]">
            Set regular weekly consultation windows for overseas patients.
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
              <span>Tuesdays: 14:00 - 18:00 IST</span>
              <span className="font-bold text-emerald-700">Active</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
              <span>Thursdays: 14:00 - 18:00 IST</span>
              <span className="font-bold text-emerald-700">Active</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
              <span>Saturdays: 10:00 - 13:00 IST</span>
              <span className="font-bold text-emerald-700">Active</span>
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold">
              Update Hospital Calendar Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
