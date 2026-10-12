import React from 'react';
import { CaseStatus } from '../../types';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface CaseTimelineProps {
  currentStage: number; // 1 to 12
  status: CaseStatus;
  compact?: boolean;
}

const STAGES = [
  { step: 1, title: 'Discovery', label: 'Treatment Found' },
  { step: 2, title: 'Case Creation', label: 'Intake Completed' },
  { step: 3, title: 'Record Vault', label: 'Medical Uploads' },
  { step: 4, title: 'Qualification', label: 'AI & Clinical Review' },
  { step: 5, title: 'Hospital Match', label: 'Accredited Matching' },
  { step: 6, title: 'Itemized Quotes', label: 'Proposals Received' },
  { step: 7, title: 'Provider Selection', label: 'Hospital Chosen' },
  { step: 8, title: 'Consultation', label: 'Tele-health Video' },
  { step: 9, title: 'Booking & Visa', label: 'Travel Pack Issued' },
  { step: 10, title: 'Arrival & Surgery', label: 'Clinical Procedure' },
  { step: 11, title: 'Dedicated Aftercare', label: 'Hotel & Recovery' },
  { step: 12, title: 'Post-Travel Review', label: 'Follow-up & Rating' },
];

export const CaseTimeline: React.FC<CaseTimelineProps> = ({ currentStage, status, compact = false }) => {
  if (compact) {
    const current = STAGES.find((s) => s.step === currentStage) || STAGES[0];
    return (
      <div className="bg-white p-3 rounded-xl border border-[#E2E8E7] shadow-2xs">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold text-[#123B46] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#167D78]"></span>
            Stage {currentStage} of 12: {current.title}
          </span>
          <span className="text-[11px] font-medium text-[#167D78] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            {status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#123B46] to-[#167D78] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStage / 12) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E2E8E7] shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div>
          <h4 className="text-sm font-bold text-[#123B46] uppercase tracking-wider">Treatment Case Lifecycle</h4>
          <p className="text-xs text-[#5A6B70]">Stage {currentStage} of 12 — Continuous clinical tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-[#167D78] border border-teal-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Active Progress: {Math.round((currentStage / 12) * 100)}%</span>
          </span>
        </div>
      </div>

      {/* Horizontal timeline on desktop / wrap on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
        {STAGES.map((s) => {
          const isDone = s.step < currentStage;
          const isCurrent = s.step === currentStage;
          const isFuture = s.step > currentStage;

          return (
            <div
              key={s.step}
              className={`p-2.5 rounded-xl border text-xs transition-all ${
                isCurrent
                  ? 'bg-teal-50/70 border-[#167D78] shadow-xs ring-1 ring-[#167D78]'
                  : isDone
                  ? 'bg-gray-50 border-gray-200 text-gray-700'
                  : 'bg-white border-dashed border-gray-200 text-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold ${isCurrent ? 'text-[#167D78]' : 'text-gray-400'}`}>
                  Step {s.step}
                </span>
                {isDone ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                ) : isCurrent ? (
                  <span className="w-4 h-4 rounded-full bg-[#167D78] text-white flex items-center justify-center text-[10px] animate-pulse">
                    <Clock className="w-2.5 h-2.5" />
                  </span>
                ) : (
                  <span className="w-4 h-4 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[9px]">
                    {s.step}
                  </span>
                )}
              </div>
              <div className={`font-semibold truncate ${isCurrent ? 'text-[#123B46]' : isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                {s.title}
              </div>
              <div className="text-[10px] text-gray-500 truncate">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
