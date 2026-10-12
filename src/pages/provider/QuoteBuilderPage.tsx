import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { useAuth } from '../../context/AuthContext';
import { QuoteLineItem } from '../../types';
import {
  FileSpreadsheet,
  PlusCircle,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Eye,
  Building2,
  DollarSign
} from 'lucide-react';

export const QuoteBuilderPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { cases, createQuote } = useCase();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const currentCase = cases.find((c) => c.id === caseId) || cases[0];

  // Dynamic Line Items State
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([
    {
      id: 'li-1',
      description: 'Robotic Mako Total Knee Arthroplasty (Surgeon & Anesthesia Teams)',
      category: 'Surgical Procedure',
      amountUSD: 2450
    },
    {
      id: 'li-2',
      description: 'Stryker Triathlon FDA-certified Titanium Knee Implant & Spacer',
      category: 'Implants & Medication',
      amountUSD: 1400
    },
    {
      id: 'li-3',
      description: '5 Nights Deluxe Private Suite with Companion Bed & Nursing',
      category: 'Hospital Stay',
      amountUSD: 800
    },
    {
      id: 'li-4',
      description: 'In-Hospital Physical Therapy & CPM Machine Mobilization',
      category: 'Post-op Therapy',
      amountUSD: 350
    },
    {
      id: 'li-5',
      description: 'VIP Airport Transfer (Both Patient & Companion) & Sim Card',
      category: 'Transfers & Concierge',
      amountUSD: 300
    }
  ]);

  // Inclusions & Exclusions
  const [inclusions, setInclusions] = useState<string[]>([
    'All pre-operative 3D imaging & cardiovascular anesthesia clearance',
    'Surgeon operating fees, assistant surgeon, and theater nursing staff',
    'Standard post-discharge take-home medications for 14 days',
    'Follow-up tele-orthopedic consults for 6 months after returning home'
  ]);
  const [newInclusion, setNewInclusion] = useState('');

  const [exclusions, setExclusions] = useState<string[]>([
    'International airline travel tickets & baggage fees',
    'Emergency intensive care (ICU) beyond 24 hours for unforeseen preexisting events',
    'Personal room amenities outside dietary plan'
  ]);
  const [newExclusion, setNewExclusion] = useState('');

  const [hospitalStayDays, setHospitalStayDays] = useState(5);
  const [hotelStayDays, setHotelStayDays] = useState(9);
  const [validUntilDate, setValidUntilDate] = useState('2026-11-30');
  const [surgeonNotes, setSurgeonNotes] = useState(
    'Based on the right knee MRI, patient has ideal bony geometry for computer-navigated robotic arthroplasty. Prophylactic non-penicillin protocol will be administered.'
  );

  // Dynamic Total Calculation (mandated deterministic)
  const totalAmount = useMemo(() => {
    return lineItems.reduce((sum, item) => sum + (Number(item.amountUSD) || 0), 0);
  }, [lineItems]);

  const handleAddLineItem = () => {
    const newItem: QuoteLineItem = {
      id: `li-${Date.now()}`,
      description: 'Additional Clinical Service',
      category: 'Surgical Procedure',
      amountUSD: 250
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter((i) => i.id !== id));
  };

  const handleUpdateLineItem = (id: string, field: keyof QuoteLineItem, value: any) => {
    setLineItems(
      lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddInclusion = () => {
    if (!newInclusion.trim()) return;
    setInclusions([...inclusions, newInclusion.trim()]);
    setNewInclusion('');
  };

  const handleAddExclusion = () => {
    if (!newExclusion.trim()) return;
    setExclusions([...exclusions, newExclusion.trim()]);
    setNewExclusion('');
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();

    createQuote({
      caseId: currentCase.id,
      providerId: 'p-1',
      providerName: currentUser?.organization || 'Apollo Hospital & Heart Institute',
      providerCountry: 'India',
      leadSurgeon: currentUser?.name || 'Dr. Arvind Mehta, FRCS',
      totalAmountUSD: totalAmount,
      currency: 'USD',
      lineItems,
      inclusions,
      exclusions,
      estimatedStayDaysHospital: Number(hospitalStayDays),
      estimatedStayDaysHotel: Number(hotelStayDays),
      validUntil: validUntilDate,
      notes: surgeonNotes
    });

    navigate(`/provider/cases/${currentCase.id}`);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Structured Proposal Formulation
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
            {currentCase.id}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B46] font-['Manrope']">
          Interactive Quote Builder
        </h1>
        <p className="text-xs text-[#5A6B70] mt-0.5">
          Formulate a binding, itemized medical tourism package for <strong>{currentCase.patientName}</strong> ({currentCase.treatmentTitle}).
        </p>
      </div>

      <form onSubmit={handleSubmitQuote} className="space-y-8">
        {/* Dynamic Line-Item Editor */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-[#123B46] flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#167D78]" />
                <span>Line Items & Cost Allocation</span>
              </h2>
              <p className="text-xs text-[#5A6B70]">Each line item is visible to the patient for transparent comparison</p>
            </div>

            <button
              type="button"
              onClick={handleAddLineItem}
              className="px-3.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-[#167D78] rounded-xl text-xs font-bold border border-teal-200 flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Line Item</span>
            </button>
          </div>

          <div className="space-y-3">
            {lineItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-3 text-xs"
              >
                <div className="w-full sm:w-44 shrink-0">
                  <select
                    value={item.category}
                    onChange={(e) => handleUpdateLineItem(item.id, 'category', e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg font-medium"
                  >
                    <option value="Surgical Procedure">Surgical Procedure</option>
                    <option value="Implants & Medication">Implants & Medication</option>
                    <option value="Hospital Stay">Hospital Stay</option>
                    <option value="Post-op Therapy">Post-op Therapy</option>
                    <option value="Transfers & Concierge">Transfers & Concierge</option>
                    <option value="Anesthesia & Surgeon Fee">Surgeon & Anesthesia</option>
                  </select>
                </div>

                <div className="flex-1 w-full">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleUpdateLineItem(item.id, 'description', e.target.value)}
                    placeholder="Item description (e.g. Mako robotic fee, Stryker implant)..."
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>

                <div className="w-full sm:w-32 shrink-0 flex items-center gap-1">
                  <span className="font-bold text-gray-500">$</span>
                  <input
                    type="number"
                    step={50}
                    value={item.amountUSD}
                    onChange={(e) => handleUpdateLineItem(item.id, 'amountUSD', Number(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-right"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveLineItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Auto-sum calculation bar */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl flex items-center justify-between text-xs">
            <span className="font-bold text-[#123B46] text-sm">Deterministic Calculated Package Total:</span>
            <div className="text-2xl font-extrabold text-[#123B46] font-['Manrope']">
              ${totalAmount.toLocaleString()} USD
            </div>
          </div>
        </div>

        {/* Stay and Validity Settings */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#123B46]">Stay Logistics & Validity</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Hospital Stay (Nights)</label>
              <input
                type="number"
                value={hospitalStayDays}
                onChange={(e) => setHospitalStayDays(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Recommended Hotel Stay (Nights)</label>
              <input
                type="number"
                value={hotelStayDays}
                onChange={(e) => setHotelStayDays(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Proposal Validity Expiry</label>
              <input
                type="date"
                value={validUntilDate}
                onChange={(e) => setValidUntilDate(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Chief Surgeon Clinical Commentary</label>
            <textarea
              rows={3}
              value={surgeonNotes}
              onChange={(e) => setSurgeonNotes(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              placeholder="Clinical rationale, implant choices, or anesthesia recommendations..."
            />
          </div>
        </div>

        {/* Inclusions and Exclusions Tag Editors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Confirmed Inclusions</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInclusion}
                onChange={(e) => setNewInclusion(e.target.value)}
                placeholder="Add inclusion (e.g. airport limo)..."
                className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddInclusion}
                className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {inclusions.map((inc, i) => (
                <li key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span>✓ {inc}</span>
                  <button
                    type="button"
                    onClick={() => setInclusions(inclusions.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Explicit Exclusions</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                placeholder="Add exclusion (e.g. flights)..."
                className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddExclusion}
                className="px-3 py-2 bg-gray-600 text-white rounded-lg text-xs font-bold"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {exclusions.map((exc, i) => (
                <li key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span>• {exc}</span>
                  <button
                    type="button"
                    onClick={() => setExclusions(exclusions.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to={`/provider/cases/${currentCase.id}`}
            className="px-5 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-100 font-semibold rounded-xl text-xs"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-7 py-3 bg-[#123B46] hover:bg-[#0d2b33] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span>Publish Formal Proposal to Patient ($ {totalAmount.toLocaleString()})</span>
          </button>
        </div>
      </form>
    </div>
  );
};
