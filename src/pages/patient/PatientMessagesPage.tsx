import React, { useState } from 'react';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import {
  MessageSquare,
  Send,
  Building2,
  Paperclip,
  CheckCheck,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const PatientMessagesPage: React.FC = () => {
  const { messages, sendMessage, activeCase } = useCase();
  const { currentUser } = useAuth();
  const [inputText, setInputText] = useState('');

  const caseId = activeCase?.id || 'case-eth-9021';
  const caseMessages = messages.filter((m) => m.caseId === caseId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage({
      caseId,
      senderId: currentUser?.id || 'usr-patient-1',
      senderName: currentUser?.name || 'Sarah Jenkins',
      senderRole: 'patient',
      content: inputText
    });

    setInputText('');
  };

  const quickTemplates = [
    'Can you confirm if airport transfer covers my husband as traveling companion?',
    'What brand of knee prosthesis is specified in the quote?',
    'Could you issue the Medical Visa Invitation letter for the consulate?'
  ];

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-[#167D78] uppercase tracking-wider">
            Case-Scoped Direct Communication
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
            {caseId}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
          Hospital Care Desk & Surgeon Chat
        </h1>
        <p className="text-xs text-[#5A6B70] mt-0.5">
          End-to-end encrypted medical communication with Apollo Hospital International Patient Desk.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xs overflow-hidden flex flex-col h-[540px]">
        {/* Chat Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-[#167D78] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900">Apollo International Care Desk</h3>
              <p className="text-[11px] text-[#5A6B70]">Liaison coordinator for Dr. Arvind Mehta (Orthopedics)</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted Thread</span>
          </div>
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F5F8F7]/50">
          {caseMessages.map((msg) => {
            const isMe = msg.senderRole === 'patient';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-700">{msg.senderName}</span>
                  <span>•</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className={`max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    isMe
                      ? 'bg-[#123B46] text-white rounded-tr-xs'
                      : 'bg-white text-gray-900 border border-gray-200 rounded-tl-xs'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Template Pills */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-none">
          <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap">Suggested:</span>
          {quickTemplates.map((tpl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setInputText(tpl)}
              className="px-2.5 py-1 bg-white hover:bg-teal-50 hover:text-[#167D78] rounded-full border border-gray-200 text-[11px] whitespace-nowrap text-gray-700 transition-colors"
            >
              {tpl}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
          <button
            type="button"
            className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
            title="Attach diagnostic file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question for the surgical team..."
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#167D78] focus:bg-white"
          />

          <button
            type="submit"
            className="px-4 py-2.5 bg-[#123B46] hover:bg-[#0d2b33] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5 text-teal-300" />
          </button>
        </form>
      </div>
    </div>
  );
};
