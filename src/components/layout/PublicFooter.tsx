import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Award, HeartPulse, HelpCircle } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#123B46] text-white pt-16 pb-12 border-t border-[#1b4e5c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-[#1f5664] text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#167D78]/30 text-teal-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Strict JCI / NABH Verification</h4>
              <p className="text-gray-300 leading-relaxed">Every listed provider is checked against government registries and international hospital accreditation boards.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#167D78]/30 text-teal-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Private Medical Vault</h4>
              <p className="text-gray-300 leading-relaxed">Medical imaging and records are shared exclusively with explicitly authorized surgical teams under patient consent.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#167D78]/30 text-teal-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Itemized Transparent Quotes</h4>
              <p className="text-gray-300 leading-relaxed">Clear disclosures of implants, surgical fees, stay days, inclusions, and exclusions with no hidden surprise costs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#167D78]/30 text-teal-300">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm mb-1">Coordinated Aftercare</h4>
              <p className="text-gray-300 leading-relaxed">Structured recovery milestones, post-operative video reviews with your surgeon, and home physician coordination.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-[#1f5664]">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#167D78] flex items-center justify-center text-white">
                <Shield className="w-4 h-4 text-teal-200" />
              </div>
              <span className="text-xl font-bold font-['Manrope'] tracking-tight">EthAum</span>
            </div>
            <p className="text-gray-300 text-sm max-w-sm mb-4 leading-relaxed">
              EthAum is the patient-first international medical tourism marketplace, uniting world-class clinical excellence with seamless cross-border care navigation.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>24/7 International Medical Desk active</span>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-white text-sm mb-3">Popular Treatments</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/treatments/total-knee-replacement" className="hover:text-teal-300 transition-colors">Knee Replacement</Link></li>
              <li><Link to="/treatments/coronary-artery-bypass-graft" className="hover:text-teal-300 transition-colors">Cardiac Bypass (CABG)</Link></li>
              <li><Link to="/treatments/ivf-icsi-pgta" className="hover:text-teal-300 transition-colors">IVF & PGT-A Genetics</Link></li>
              <li><Link to="/treatments/all-on-4-dental-implants" className="hover:text-teal-300 transition-colors">Full Arch Dental Implants</Link></li>
              <li><Link to="/treatments/rhinoplasty-facial-contouring" className="hover:text-teal-300 transition-colors">Ultrasonic Rhinoplasty</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white text-sm mb-3">Top Destinations</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/destinations/bangkok-thailand" className="hover:text-teal-300 transition-colors">Bangkok, Thailand</Link></li>
              <li><Link to="/destinations/new-delhi-india" className="hover:text-teal-300 transition-colors">New Delhi, India</Link></li>
              <li><Link to="/destinations/istanbul-turkey" className="hover:text-teal-300 transition-colors">Istanbul, Turkey</Link></li>
              <li><Link to="/destinations/barcelona-spain" className="hover:text-teal-300 transition-colors">Barcelona, Spain</Link></li>
              <li><Link to="/providers" className="hover:text-teal-300 transition-colors">View All Hospitals</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-white text-sm mb-3">Governance & Support</h5>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/help" className="hover:text-teal-300 transition-colors">Patient Help Center</Link></li>
              <li><Link to="/help#safety" className="hover:text-teal-300 transition-colors">Clinical Safety Rules</Link></li>
              <li><Link to="/privacy" className="hover:text-teal-300 transition-colors">Privacy & Health Data</Link></li>
              <li><Link to="/terms" className="hover:text-teal-300 transition-colors">Terms of Service</Link></li>
              <li><Link to="/auth/sign-in" className="hover:text-teal-300 transition-colors">Provider Portal Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Clinical Disclaimer as specified in section 1.1 and 10 */}
        <div className="pt-8 text-xs text-gray-400 leading-relaxed space-y-3">
          <p className="bg-[#0e2c34] p-4 rounded-xl border border-[#1b4b58] text-gray-300">
            <strong className="text-teal-300 uppercase tracking-wider block mb-1">Clinical Oversight & Legal Disclosures:</strong>
            EthAum operates as a technology coordination platform and international healthcare marketplace. EthAum does not offer independent clinical medical advice, diagnose medical conditions, or perform clinical treatments. All diagnoses, treatment plans, surgical packages, and medical opinions are issued exclusively by licensed medical practitioners at accredited hospitals and clinics. Any indicative cost figures are estimates subject to clinician review of official diagnostic records.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
            <p>© {new Date().getFullYear()} EthAum Medical Tourism Platform. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <Link to="/privacy" className="hover:underline">HIPAA & GDPR Privacy Compliance</Link>
              <span>•</span>
              <Link to="/terms" className="hover:underline">Transparent Fee Policy</Link>
              <span>•</span>
              <span className="text-teal-300 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Emergency: Call local embassy or 911/112
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
