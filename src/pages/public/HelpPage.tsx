import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Phone, Mail, ShieldAlert, FileText, ChevronDown } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqList = [
    {
      q: 'How does EthAum guarantee the quality of partner hospitals?',
      a: 'We only partner with hospitals that maintain active accreditation by the Joint Commission International (JCI), National Accreditation Board for Hospitals (NABH), or official European healthcare regulatory equivalents. In addition, our medical board independently audits clinician surgical complication statistics, mortality rates, and English fluency.'
    },
    {
      q: 'Can my medical quotes change after I travel abroad?',
      a: 'All proposals issued through EthAum are itemized formal commitments. They include surgeon fees, implants, anesthesia, nursing, and defined hospital stay duration. A quote can only vary if the in-person diagnostic evaluation reveals severe unstated clinical comorbidities. In such exceptional cases, any modification must be agreed upon in writing prior to surgery.'
    },
    {
      q: 'How does medical record privacy work?',
      a: 'EthAum complies strictly with HIPAA and GDPR standards. Your medical imaging (MRIs, CTs) and clinical histories are encrypted in transit and at rest. Files are shared strictly with the authorized surgical department of the hospitals you choose to receive proposals from, and you can revoke access at any time.'
    },
    {
      q: 'What if I need an attendant or family member to travel with me?',
      a: 'Most international hospital packages include complimentary companion accommodation in the patient’s private deluxe suite, as well as airport pick-up/drop-off for both the patient and their traveling companion. Special dietary meals for companions can also be arranged.'
    },
    {
      q: 'What is the Fit-to-Fly protocol?',
      a: 'Prior to leaving the destination, your surgical team conducts a mandatory physical examination, inspects wound healing, and issues an official clinical "Fit-to-Fly" certificate along with blood thinning (DVT) prophylaxis guidelines to present to airline authorities.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F8F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-teal-50 text-[#167D78] mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B46] font-['Manrope']">
            Patient Help Center & Support Desk
          </h1>
          <p className="text-sm text-[#5A6B70] mt-2 max-w-xl mx-auto">
            Guidance on cross-border healthcare navigation, travel safety, and medical records.
          </p>
        </div>

        {/* Emergency Box */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-10 text-rose-900 flex items-start gap-3.5 text-xs">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-rose-950 mb-1">Medical Emergency Disclaimer</h3>
            <p className="leading-relaxed">
              If you are experiencing an acute, life-threatening medical emergency (such as severe chest pain, shortness of breath, or sudden neurological weakness), do not submit an online form. Please call your local national emergency services (911, 999, 112) or proceed to the nearest emergency department immediately.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-10">
          <h2 className="text-xl font-bold text-[#123B46] mb-6 font-['Manrope']">
            Frequently Answered Questions
          </h2>
          <div className="space-y-3">
            {faqList.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-gray-900 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180 text-teal-600' : ''}`} />
                </button>
                {openIndex === i && (
                  <div className="p-4 pt-1 text-xs text-[#5A6B70] leading-relaxed bg-gray-50/50 border-t border-gray-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-200 flex items-start gap-4">
            <div className="p-3 bg-teal-50 text-[#167D78] rounded-xl">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">24/7 Global Care Hotline</h4>
              <p className="text-xs text-gray-500 mt-1">Direct access to patient support</p>
              <a href="tel:+18005553842" className="text-xs font-bold text-[#167D78] mt-2 block hover:underline">
                +1 (800) 555-ETHAUM
              </a>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200 flex items-start gap-4">
            <div className="p-3 bg-teal-50 text-[#167D78] rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">Case Coordination Team</h4>
              <p className="text-xs text-gray-500 mt-1">Average email response in &lt; 2 hours</p>
              <a href="mailto:care@ethaum.health" className="text-xs font-bold text-[#167D78] mt-2 block hover:underline">
                care@ethaum.health
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
