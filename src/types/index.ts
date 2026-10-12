export type UserRole = 'public' | 'patient' | 'provider' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  organization?: string;
  country?: string;
}

export type TreatmentCategory =
  | 'Orthopedics'
  | 'Cardiology'
  | 'Oncology'
  | 'Cosmetic & Plastic Surgery'
  | 'Dental Surgery'
  | 'Fertility (IVF)'
  | 'Neurology & Spine'
  | 'Ophthalmology';

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  category: TreatmentCategory;
  shortDescription: string;
  fullDescription: string;
  indicativeCostUSD: { min: number; max: number };
  averageDurationDays: number;
  recoveryDays: number;
  successRatePercentage: number;
  popularDestinations: string[];
  keyInclusions: string[];
  risksAndConsiderations: string[];
  faqs: { question: string; answer: string }[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  city: string;
  flagEmoji: string;
  tagline: string;
  description: string;
  averageSavingsPercent: number;
  jciHospitalsCount: number;
  directFlightsFrom: string[];
  languageSupport: string[];
  visaInfo: string;
  bestTimeToVisit: string;
  popularTreatments: string[];
  image: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  type: 'hospital' | 'clinic' | 'specialist';
  city: string;
  country: string;
  address: string;
  accreditations: string[]; // e.g., ['JCI Accredited', 'NABH Certified', 'ISO 9001']
  verificationStatus: 'verified' | 'pending' | 'under_review';
  verifiedSource: string;
  rating: number;
  reviewCount: number;
  leadClinician: {
    name: string;
    title: string;
    specialty: string;
    experienceYears: number;
    education: string;
    languages: string[];
    avatar: string;
  };
  specialties: TreatmentCategory[];
  facilities: string[];
  internationalPatientServices: string[];
  about: string;
  estimatedCostRangeUSD: { min: number; max: number };
}

export type CaseStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'matched'
  | 'quotes_received'
  | 'provider_selected'
  | 'consultation_scheduled'
  | 'booking_confirmed'
  | 'treatment_in_progress'
  | 'aftercare'
  | 'completed';

export interface MedicalRecord {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadedAt: string;
  category: 'MRI/CT Scan' | 'Lab Report' | 'Physician Referral' | 'Prescription' | 'Clinical History';
  verifiedStatus: 'processed' | 'analyzing' | 'flagged';
  authorizedForProviders: boolean;
}

export interface ExtractedClinicalData {
  primaryDiagnosis: string;
  medicalHistory: string[];
  currentMedications: string[];
  allergies: string[];
  urgencyLevel: 'routine' | 'urgent' | 'elective';
  aiConfidenceScore: number;
  extractedNotes: string;
  patientConfirmed: boolean;
}

export interface PatientCase {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientCountry: string;
  patientPhone: string;
  treatmentSlug: string;
  treatmentTitle: string;
  preferredDestination: string;
  budgetPreferenceUSD: number;
  preferredLanguage: string;
  createdAt: string;
  updatedAt: string;
  status: CaseStatus;
  currentStageNumber: number;
  medicalRecords: MedicalRecord[];
  clinicalSummary: ExtractedClinicalData;
  consentGiven: boolean;
  selectedProviderId?: string;
  selectedQuoteId?: string;
}

export interface ProviderMatch {
  id: string;
  caseId: string;
  provider: Provider;
  matchScore: number; // 0-100
  matchReasons: string[];
  matchCaveats: string[];
  status: 'recommended' | 'contacted' | 'declined';
  indicativePackageUSD: number;
}

export interface QuoteLineItem {
  id: string;
  description: string;
  category: 'Surgical Procedure' | 'Hospital Stay' | 'Anesthesia & Surgeon Fee' | 'Implants & Medication' | 'Post-op Therapy' | 'Transfers & Concierge';
  amountUSD: number;
  isOptional?: boolean;
}

export interface Quote {
  id: string;
  caseId: string;
  providerId: string;
  providerName: string;
  providerCountry: string;
  providerLogo?: string;
  leadSurgeon: string;
  version: number;
  totalAmountUSD: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'AUD';
  lineItems: QuoteLineItem[];
  inclusions: string[];
  exclusions: string[];
  estimatedStayDaysHospital: number;
  estimatedStayDaysHotel: number;
  validUntil: string;
  status: 'pending' | 'accepted' | 'declined' | 'revised' | 'expired';
  notes: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  caseId: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  doctorName: string;
  appointmentType: 'Virtual Pre-Op Consultation' | 'In-Person Evaluation' | 'Procedure Review' | 'Aftercare Follow-up';
  date: string;
  timeSlot: string;
  timezone: string;
  status: 'requested' | 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
}

export interface Message {
  id: string;
  caseId: string;
  senderId: string;
  senderName: string;
  senderRole: 'patient' | 'provider' | 'admin';
  timestamp: string;
  content: string;
  attachments?: { name: string; url: string; size: string }[];
  isInternalNote?: boolean;
}

export interface AftercareMilestone {
  id: string;
  title: string;
  dueDay: number;
  status: 'pending' | 'completed' | 'overdue';
  instructions: string;
  doctorNotes?: string;
}
