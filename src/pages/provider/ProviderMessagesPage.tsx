import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Send, User, ShieldCheck } from 'lucide-react';

export const ProviderMessagesPage: React.FC = () => {
  const { messages, sendMessage, activeCase } = useCase();
  const { currentUser } = useAuth();
  const [replyText, setReplyText] = useState('');

  const caseId = activeCase?.id || 'case-eth-9021';
  const caseMessages = messages.filter((m) => m.caseId === caseId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    sendMessage({
      caseId,
      senderId: currentUser?.id || 'usr-provider-1',
      senderName: `${currentUser?.organization || 'Apollo Hospital'} Care Desk`,
      senderRole: 'provider',
      content: replyText
    });

    setReplyText('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
          Patient Communication
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope'] mt-0.5">
          Patient Care Messages
        </h1>
        <p className="text-xs text-[#5A6B70] mt-1">
          Case #{caseId} • Patient: <strong>{activeCase?.patientName || 'Sarah Jenkins'}</strong> ({activeCase?.treatmentTitle})
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages list */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
          {caseMessages.map((msg) => {
            const isProvider = msg.senderRole === 'provider';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isProvider ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-700">{msg.senderName}</span>
                  <span>•</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className={`max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isProvider
                      ? 'bg-[#123B46] text-white rounded-tr-xs'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-gray-200 flex items-center gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply to patient regarding clinical preparation or travel..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#167D78]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Send Response</span>
            <Send className="w-3.5 h-3.5 text-teal-300" />
          </button>
        </form>
      </div>
    </div>
  );
};
