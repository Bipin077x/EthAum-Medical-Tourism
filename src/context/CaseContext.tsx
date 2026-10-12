import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PatientCase,
  Quote,
  Appointment,
  Message,
  AftercareMilestone,
  MedicalRecord,
  ExtractedClinicalData,
  ProviderMatch
} from '../types';
import {
  initialPatientCases,
  mockQuotes,
  mockAppointments,
  mockMessages,
  mockAftercareMilestones,
  mockProviders
} from '../data/mockData';

interface CaseContextType {
  cases: PatientCase[];
  activeCase: PatientCase | null;
  quotes: Quote[];
  appointments: Appointment[];
  messages: Message[];
  aftercareMilestones: AftercareMilestone[];
  setActiveCaseId: (id: string) => void;
  createCase: (newCase: Omit<PatientCase, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'currentStageNumber' | 'medicalRecords' | 'clinicalSummary' | 'consentGiven'>) => string;
  updateCaseStatus: (caseId: string, status: PatientCase['status'], stage?: number) => void;
  uploadMedicalRecord: (caseId: string, file: { name: string; size: string; category: MedicalRecord['category'] }) => Promise<MedicalRecord>;
  updateExtractedClinicalData: (caseId: string, data: Partial<ExtractedClinicalData>) => void;
  confirmExtractedData: (caseId: string) => void;
  createQuote: (newQuote: Omit<Quote, 'id' | 'createdAt' | 'version' | 'status'>) => string;
  acceptQuote: (quoteId: string) => void;
  scheduleAppointment: (apt: Omit<Appointment, 'id' | 'status'>) => string;
  updateAppointmentStatus: (aptId: string, status: Appointment['status']) => void;
  sendMessage: (msg: { caseId: string; senderId: string; senderName: string; senderRole: Message['senderRole']; content: string; isInternalNote?: boolean }) => void;
  toggleMilestone: (id: string) => void;
  getMatchesForCase: (caseId: string) => ProviderMatch[];
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const CaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<PatientCase[]>(() => {
    const saved = localStorage.getItem('ethaum_cases');
    return saved ? JSON.parse(saved) : initialPatientCases;
  });

  const [activeCaseId, setActiveCaseId] = useState<string>(() => {
    return initialPatientCases[0]?.id || '';
  });

  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('ethaum_quotes');
    return saved ? JSON.parse(saved) : mockQuotes;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('ethaum_appointments');
    return saved ? JSON.parse(saved) : mockAppointments;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('ethaum_messages');
    return saved ? JSON.parse(saved) : mockMessages;
  });

  const [aftercareMilestones, setAftercareMilestones] = useState<AftercareMilestone[]>(() => {
    const saved = localStorage.getItem('ethaum_milestones');
    return saved ? JSON.parse(saved) : mockAftercareMilestones;
  });

  useEffect(() => {
    localStorage.setItem('ethaum_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('ethaum_quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('ethaum_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ethaum_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ethaum_milestones', JSON.stringify(aftercareMilestones));
  }, [aftercareMilestones]);

  const activeCase = cases.find((c) => c.id === activeCaseId) || cases[0] || null;

  const createCase = (newCaseData: Omit<PatientCase, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'currentStageNumber' | 'medicalRecords' | 'clinicalSummary' | 'consentGiven'>) => {
    const newId = `case-eth-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase: PatientCase = {
      ...newCaseData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'submitted',
      currentStageNumber: 2,
      consentGiven: true,
      medicalRecords: [],
      clinicalSummary: {
        primaryDiagnosis: 'Patient reported chronic joint symptoms undergoing AI record extraction',
        medicalHistory: ['Prior clinical record pending complete parsing'],
        currentMedications: ['As reported in intake'],
        allergies: ['Pending confirmation'],
        urgencyLevel: 'routine',
        aiConfidenceScore: 88,
        extractedNotes: 'Intake submitted. Hospital matching algorithm activated.',
        patientConfirmed: false
      }
    };
    setCases((prev) => [newCase, ...prev]);
    setActiveCaseId(newId);
    return newId;
  };

  const updateCaseStatus = (caseId: string, status: PatientCase['status'], stage?: number) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status,
            currentStageNumber: stage !== undefined ? stage : c.currentStageNumber,
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );
  };

  const uploadMedicalRecord = async (
    caseId: string,
    file: { name: string; size: string; category: MedicalRecord['category'] }
  ): Promise<MedicalRecord> => {
    const newRecord: MedicalRecord = {
      id: `rec-${Date.now()}`,
      fileName: file.name,
      fileType: file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      category: file.category,
      verifiedStatus: 'processed',
      authorizedForProviders: true
    };

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            medicalRecords: [newRecord, ...c.medicalRecords],
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );

    return newRecord;
  };

  const updateExtractedClinicalData = (caseId: string, data: Partial<ExtractedClinicalData>) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            clinicalSummary: {
              ...c.clinicalSummary,
              ...data
            },
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );
  };

  const confirmExtractedData = (caseId: string) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            clinicalSummary: {
              ...c.clinicalSummary,
              patientConfirmed: true
            },
            status: c.status === 'submitted' ? 'matched' : c.status,
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );
  };

  const createQuote = (newQuoteData: Omit<Quote, 'id' | 'createdAt' | 'version' | 'status'>) => {
    const quoteId = `quote-${Date.now()}`;
    const newQuote: Quote = {
      ...newQuoteData,
      id: quoteId,
      createdAt: new Date().toISOString(),
      version: 1,
      status: 'pending'
    };

    setQuotes((prev) => [newQuote, ...prev]);

    // Update case status to quotes_received if not already
    updateCaseStatus(newQuoteData.caseId, 'quotes_received', 6);
    return quoteId;
  };

  const acceptQuote = (quoteId: string) => {
    const selected = quotes.find((q) => q.id === quoteId);
    if (!selected) return;

    setQuotes((prev) =>
      prev.map((q) => (q.id === quoteId ? { ...q, status: 'accepted' } : q.caseId === selected.caseId ? { ...q, status: 'declined' } : q))
    );

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === selected.caseId) {
          return {
            ...c,
            selectedProviderId: selected.providerId,
            selectedQuoteId: quoteId,
            status: 'provider_selected',
            currentStageNumber: 7,
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );
  };

  const scheduleAppointment = (aptData: Omit<Appointment, 'id' | 'status'>) => {
    const newId = `apt-${Date.now()}`;
    const newApt: Appointment = {
      ...aptData,
      id: newId,
      status: 'confirmed',
      meetingLink: `https://meet.ethaum.health/room/${newId}`
    };

    setAppointments((prev) => [newApt, ...prev]);
    updateCaseStatus(aptData.caseId, 'consultation_scheduled', 8);
    return newId;
  };

  const updateAppointmentStatus = (aptId: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === aptId ? { ...a, status } : a))
    );
  };

  const sendMessage = (msgData: { caseId: string; senderId: string; senderName: string; senderRole: Message['senderRole']; content: string; isInternalNote?: boolean }) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      caseId: msgData.caseId,
      senderId: msgData.senderId,
      senderName: msgData.senderName,
      senderRole: msgData.senderRole,
      timestamp: new Date().toISOString(),
      content: msgData.content,
      isInternalNote: msgData.isInternalNote
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const toggleMilestone = (id: string) => {
    setAftercareMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'completed' ? 'pending' : 'completed' } : m
      )
    );
  };

  const getMatchesForCase = (_caseId: string): ProviderMatch[] => {
    return [
      {
        id: 'match-1',
        caseId: _caseId,
        provider: mockProviders[0], // Apollo
        matchScore: 96,
        matchReasons: [
          'High clinical volume: Performs >1,200 robotic knee arthroplasties annually',
          'Lead Surgeon Dr. Mehta holds Edinburgh FRCS with 24 years joint reconstruction specialty',
          'Exact budget fit: Package estimate ($5,200) is well within patient $8,000 budget'
        ],
        matchCaveats: [
          'Requires 14-day local recovery window prior to long-haul commercial flight clearance'
        ],
        status: 'recommended',
        indicativePackageUSD: 5200
      },
      {
        id: 'match-2',
        caseId: _caseId,
        provider: mockProviders[1], // Bumrungrad
        matchScore: 93,
        matchReasons: [
          'JCI accredited since 2002; Newsweek Top 100 World Hospital ranking',
          'Full Stryker Mako robotic suite with specialized hydrotherapy recovery center',
          'Dedicated British patient coordination desk with 24/7 tele-nurse'
        ],
        matchCaveats: [
          'Higher baseline cost ($6,850 USD) but includes companion luxury hospitality amenities'
        ],
        status: 'recommended',
        indicativePackageUSD: 6850
      },
      {
        id: 'match-3',
        caseId: _caseId,
        provider: mockProviders[3], // Quirónsalud Barcelona
        matchScore: 84,
        matchReasons: [
          'EU medical standards with top Spanish orthopedic rehabilitation center',
          'Shorter flight duration for UK & European based patients'
        ],
        matchCaveats: [
          'Higher currency pricing in Euros (~$7,800 USD equivalent)'
        ],
        status: 'recommended',
        indicativePackageUSD: 7800
      }
    ];
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        activeCase,
        quotes,
        appointments,
        messages,
        aftercareMilestones,
        setActiveCaseId,
        createCase,
        updateCaseStatus,
        uploadMedicalRecord,
        updateExtractedClinicalData,
        confirmExtractedData,
        createQuote,
        acceptQuote,
        scheduleAppointment,
        updateAppointmentStatus,
        sendMessage,
        toggleMilestone,
        getMatchesForCase
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
};
