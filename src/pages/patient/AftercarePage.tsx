import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import {
  HeartHandshake,
  CheckCircle2,
  Clock,
  Star,
  ShieldCheck,
  FileText,
  AlertCircle,
  Send,
  Calendar
} from 'lucide-react';

export const AftercarePage: React.FC = () => {
  const { aftercareMilestones, toggleMilestone, activeCase } = useCase();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewFeedback, setReviewFeedback] = useState(
    'Dr. Arvind Mehta and the Apollo Delhi international nursing team were exemplary. The Mako robotic joint precision allowed me to walk with minimal pain on day 2. The airport concierge and hotel visits were flawless.'
  );
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
            Stage 11 & 12 • Coordinated Recovery Protocol
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
            {activeCase?.id || 'case-eth-9021'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
          Dedicated Post-Operative Aftercare
        </h1>
        <p className="text-xs text-[#5A6B70] mt-1">
          Clinical instructions issued by your surgeon, fit-to-fly clearance, and remote rehabilitation milestones.
        </p>
      </div>

      {/* Structured Recovery Milestones */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-[#123B46]">Recovery Milestone Checklist</h2>
            <p className="text-xs text-[#5A6B70]">Mark tasks completed as you progress through each stage</p>
          </div>
          <span className="text-xs font-bold text-[#167D78] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            {aftercareMilestones.filter((m) => m.status === 'completed').length} of {aftercareMilestones.length} Completed
          </span>
        </div>

        <div className="space-y-4">
          {aftercareMilestones.map((m) => {
            const isCompleted = m.status === 'completed';

            return (
              <div
                key={m.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-gray-200 hover:border-teal-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleMilestone(m.id)}
                  className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-gray-300 hover:border-teal-600'
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs font-bold ${isCompleted ? 'text-gray-900 line-through' : 'text-gray-900'}`}>
                      Day {m.dueDay}: {m.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {m.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#5A6B70] mt-1 leading-relaxed">
                    {m.instructions}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Post-Treatment Review Form (Section 15) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          <h2 className="text-base font-bold text-[#123B46]">Verified Case Evaluation & Review</h2>
        </div>
        <p className="text-xs text-[#5A6B70] mb-6">
          Your feedback assists future international patients and verifies surgical quality scores on the marketplace.
        </p>

        {reviewSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block font-bold">Thank you for submitting your evaluation!</strong>
              <span>Your verified feedback has been recorded into the EthAum Quality Registry.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Clinical Satisfaction Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-110"
                  >
                    <span className={star <= reviewRating ? 'text-amber-400' : 'text-gray-300'}>★</span>
                  </button>
                ))}
                <span className="text-xs font-bold text-gray-700 ml-2">{reviewRating} / 5 Stars</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Detailed Patient Feedback</label>
              <textarea
                rows={3}
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#167D78]"
                placeholder="Share your experience with the hospital, operating surgeon, and concierge care..."
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Submit Verified Evaluation</span>
              <Send className="w-3.5 h-3.5 text-teal-300" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
