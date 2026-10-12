import { Treatment, Destination, Provider, PatientCase, Quote, Appointment, Message, AftercareMilestone } from '../types';

export const mockTreatments: Treatment[] = [
  {
    id: 't-1',
    slug: 'total-knee-replacement',
    title: 'Total Knee Replacement (Bilateral & Single)',
    category: 'Orthopedics',
    shortDescription: 'Minimally invasive knee joint replacement using computer-navigated robotic guidance and FDA-approved titanium implants.',
    fullDescription: 'Total Knee Replacement (TKR) involves resurfacing damaged articular cartilage and bone with high-grade biocompatible titanium-chromium alloy implants and ultra-high-molecular-weight polyethylene spacers. International centers offer robotic assistance (e.g. Mako or Stryker), reducing tissue trauma and cutting rehabilitation time by 40%.',
    indicativeCostUSD: { min: 4500, max: 9200 },
    averageDurationDays: 14,
    recoveryDays: 45,
    successRatePercentage: 96,
    popularDestinations: ['India', 'Thailand', 'Turkey', 'Mexico'],
    keyInclusions: [
      'Pre-op high-res robotic 3D CT scan',
      'Surgeon, assistant surgeon, and anesthesiologist fees',
      'FDA-approved ceramic/titanium knee prosthesis',
      '5 nights private hospital stay with companion accommodation',
      'Daily in-hospital physiotherapy sessions',
      'Airport pick-up/drop-off & dedicated English-speaking care coordinator'
    ],
    risksAndConsiderations: [
      'Deep vein thrombosis (DVT) risk during long-haul flights (prophylaxis prescribed)',
      'Transient joint stiffness requiring disciplined physiotherapy',
      'Must avoid air travel for minimum 10-14 days post-discharge'
    ],
    faqs: [
      {
        question: 'When is it safe to fly back home after knee replacement surgery?',
        answer: 'Surgeons generally clear patients for long-distance commercial flights between 12 and 16 days post-surgery once wound healing is inspected and mobility benchmarks are met.'
      },
      {
        question: 'What implants are utilized?',
        answer: 'Our verified partner hospitals strictly use internationally recognized, FDA/CE marked brands such as Stryker, Zimmer Biomet, and Smith+Nephew with 20+ year track records.'
      }
    ]
  },
  {
    id: 't-2',
    slug: 'coronary-artery-bypass-graft',
    title: 'Coronary Artery Bypass Graft (CABG)',
    category: 'Cardiology',
    shortDescription: 'Beating-heart off-pump bypass surgery performed by world-renowned cardiovascular surgical teams.',
    fullDescription: 'CABG redirects blood around blocked sections of coronary arteries. Leading partner centers specialize in minimally invasive and off-pump (beating heart) techniques that minimize stroke risk and accelerate recovery.',
    indicativeCostUSD: { min: 6800, max: 14500 },
    averageDurationDays: 18,
    recoveryDays: 60,
    successRatePercentage: 98,
    popularDestinations: ['India', 'Turkey', 'Thailand', 'Spain'],
    keyInclusions: [
      'Comprehensive cardiac catheterization & angiography',
      'Cardiac surgeon and intensive care team fees',
      '2 nights Cardiac ICU + 6 nights private telemetry room',
      'All disposable graft materials & monitoring medications',
      'Comprehensive cardiac rehab kickoff & tele-cardiology follow-up for 6 months'
    ],
    risksAndConsiderations: [
      'Strict pre-travel stability clearance mandatory by home cardiologist',
      'Requires cardiac-fit-to-fly airline certification issued post-surgery'
    ],
    faqs: [
      {
        question: 'Is off-pump bypass safer than traditional bypass?',
        answer: 'Off-pump bypass avoids the cardiopulmonary machine, significantly reducing systemic inflammation and post-operative cognitive changes in selected patients.'
      }
    ]
  },
  {
    id: 't-3',
    slug: 'ivf-icsi-pgta',
    title: 'IVF with ICSI & PGT-A Genetic Screening',
    category: 'Fertility (IVF)',
    shortDescription: 'Advanced assisted reproductive technology with blastocyst culture and comprehensive chromosomal screening.',
    fullDescription: 'In-vitro fertilization (IVF) coupled with Intracytoplasmic Sperm Injection (ICSI) and Next-Generation Sequencing (NGS) Pre-implantation Genetic Testing for Aneuploidies (PGT-A) delivers world-leading embryo viability rates.',
    indicativeCostUSD: { min: 3800, max: 7500 },
    averageDurationDays: 21,
    recoveryDays: 3,
    successRatePercentage: 72,
    popularDestinations: ['Spain', 'Turkey', 'Thailand', 'Mexico'],
    keyInclusions: [
      'Ovarian stimulation monitoring with serial hormone profiles and ultrasound',
      'Egg retrieval procedure with intravenous conscious sedation',
      'Sperm preparation & ICSI micro-fertilization',
      'Extended blastocyst culture to Day 5/6',
      'PGT-A biopsy analysis for up to 6 embryos',
      'Frozen embryo transfer (FET) preparation'
    ],
    risksAndConsiderations: [
      'Risk of ovarian hyperstimulation syndrome (monitored closely)',
      'Multiple cycles may occasionally be needed based on maternal age and ovarian reserve'
    ],
    faqs: [
      {
        question: 'Can PGT-A testing screen for hereditary conditions?',
        answer: 'Yes, PGT-M can be added to screen for specific monogenic hereditary diseases alongside comprehensive chromosomal aneuploidy screening.'
      }
    ]
  },
  {
    id: 't-4',
    slug: 'all-on-4-dental-implants',
    title: 'All-on-4 / All-on-6 Full Arch Dental Restoration',
    category: 'Dental Surgery',
    shortDescription: 'Full-arch fixed prosthetic restoration with Swiss Nobel Biocare or Straumann titanium implants and Zirconia bridge.',
    fullDescription: 'The All-on-4 technique provides a permanent, non-removable screw-retained ceramic or zirconia bridge supported by 4 to 6 strategically angled titanium implants, often completed with immediate temporary loading in just 72 hours.',
    indicativeCostUSD: { min: 3200, max: 6800 },
    averageDurationDays: 7,
    recoveryDays: 10,
    successRatePercentage: 98,
    popularDestinations: ['Mexico', 'Turkey', 'Thailand', 'Spain'],
    keyInclusions: [
      'Full 3D CBCT scan and digital smile design simulation',
      '4 to 6 premium titanium implants (Straumann / Nobel Biocare)',
      'Extraction of failing teeth & immediate surgical guide placement',
      'Provisional high-impact PMMA fixed bridge on day 3',
      'Final CAD/CAM precision Zirconia monolithic bridge'
    ],
    risksAndConsiderations: [
      'Requires good bone density; bone grafting or sinus lift may be recommended if severe resorption exists'
    ],
    faqs: [
      {
        question: 'Will I be left without teeth during the trip?',
        answer: 'No. Patients receive a fixed immediate acrylic bridge within 48 to 72 hours of implant placement so you never leave without teeth.'
      }
    ]
  },
  {
    id: 't-5',
    slug: 'rhinoplasty-facial-contouring',
    title: 'Ultrasonic Piezo Rhinoplasty & Septoplasty',
    category: 'Cosmetic & Plastic Surgery',
    shortDescription: 'Precision bone sculpting using piezo ultrasonic technology that protects soft tissue and eliminates bruising.',
    fullDescription: 'Ultrasonic rhinoplasty utilizes piezo crystal vibration to gently sculpt and reshape nasal bones without fracturing or damaging surrounding blood vessels and mucosal tissue, achieving natural aesthetics and uncompromised airway breathing.',
    indicativeCostUSD: { min: 2800, max: 5400 },
    averageDurationDays: 8,
    recoveryDays: 14,
    successRatePercentage: 95,
    popularDestinations: ['Turkey', 'Thailand', 'Mexico', 'Spain'],
    keyInclusions: [
      '3D morphing consultation with board-certified plastic surgeon',
      'General anesthesia and hospital surgical suite fees',
      'Piezo ultrasonic bone sculpting & internal silicone splint',
      '1 night hospital observation + post-op hotel visits',
      'Splint removal, cast check, and lymphatic drainage facial massage'
    ],
    risksAndConsiderations: [
      'Mild swelling can take 6-12 months to completely resolve into final refined contour'
    ],
    faqs: [
      {
        question: 'How long until I can return to public activities without bandages?',
        answer: 'The external thermoplastic splint is removed on Day 7, after which minimal bruising remains and most patients feel comfortable sight-seeing or flying.'
      }
    ]
  },
  {
    id: 't-6',
    slug: 'minimally-invasive-spine-fusion',
    title: 'Endoscopic & Minimally Invasive Lumbar Spine Fusion',
    category: 'Neurology & Spine',
    shortDescription: 'Targeted decompression and transforaminal interbody fusion (TLIF) with high-definition endoscopic magnification.',
    fullDescription: 'Minimally Invasive Spine Surgery (MISS) utilizes specialized tubular retractor systems and intra-operative O-arm neuro-navigation to stabilize vertebral instability and decompress pinched nerve roots while sparing muscular back attachments.',
    indicativeCostUSD: { min: 6200, max: 12800 },
    averageDurationDays: 12,
    recoveryDays: 30,
    successRatePercentage: 94,
    popularDestinations: ['India', 'Thailand', 'Spain'],
    keyInclusions: [
      'High-field 3T pre-op MRI and kinetic functional flexion-extension X-rays',
      'Senior neurosurgeon, spinal fellow, and neuro-monitoring fees',
      '3 nights hospital recovery with specialized spinal care nursing',
      'Custom ergonomic lumbar support brace & physio coaching'
    ],
    risksAndConsiderations: [
      'Avoid heavy lifting or strenuous twisting movements for 6 weeks'
    ],
    faqs: [
      {
        question: 'How does endoscopic fusion compare to traditional open surgery?',
        answer: 'Endoscopic incisions measure under 18mm, drastically lowering post-operative wound discomfort and blood loss.'
      }
    ]
  }
];

export const mockDestinations: Destination[] = [
  {
    id: 'dest-1',
    slug: 'bangkok-thailand',
    name: 'Bangkok',
    country: 'Thailand',
    city: 'Bangkok',
    flagEmoji: '🇹🇭',
    tagline: 'World-renowned medical hospitality & multi-specialty excellence',
    description: 'Thailand is the pioneer of modern global medical tourism, boasting over 60 JCI-accredited medical centers with 5-star concierge patient lounges, bilingual translation centers, and renowned surgical talent.',
    averageSavingsPercent: 65,
    jciHospitalsCount: 64,
    directFlightsFrom: ['London Heathrow', 'New York JFK', 'Sydney', 'Frankfurt', 'Dubai', 'Singapore'],
    languageSupport: ['English', 'Arabic', 'Japanese', 'Russian', 'French', 'German'],
    visaInfo: 'Medical Visa exemption for 60 days for 93 nationalities; specialized Medical Treatment (MT) Visa extensible up to 90 days.',
    bestTimeToVisit: 'November to February (cool, dry season)',
    popularTreatments: ['Total Knee Replacement', 'Cosmetic & Plastic Surgery', 'Dental Restoration', 'Cardiology'],
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'dest-2',
    slug: 'new-delhi-india',
    name: 'New Delhi & NCR',
    country: 'India',
    city: 'New Delhi',
    flagEmoji: '🇮🇳',
    tagline: 'Leading quaternary care, robotic surgeries, and unparalleled value',
    description: 'India provides world-class clinical capabilities with Harvard and Royal College-trained surgeons at 70-85% lower costs than North America and Western Europe, supported by English-speaking medical staff across all tertiary centers.',
    averageSavingsPercent: 78,
    jciHospitalsCount: 41,
    directFlightsFrom: ['London Heathrow', 'San Francisco', 'Chicago', 'Frankfurt', 'Doha', 'Tokyo'],
    languageSupport: ['English (Fluent)', 'Arabic', 'French', 'Swahili', 'Russian'],
    visaInfo: 'Dedicated Indian e-Medical Visa approved online within 72-96 hours with permission for up to 2 medical attendants.',
    bestTimeToVisit: 'October to March (pleasant winter climate)',
    popularTreatments: ['Orthopedics', 'Cardiovascular Surgery', 'Organ Transplants', 'Endoscopic Spine Surgery'],
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'dest-3',
    slug: 'istanbul-turkey',
    name: 'Istanbul',
    country: 'Turkey',
    city: 'Istanbul',
    flagEmoji: '🇹🇷',
    tagline: 'The bridge of international medicine, aesthetics, and advanced oncology',
    description: 'Strategically positioned between Europe and Asia, Istanbul operates state-of-the-art academic health complexes, leading the continent in aesthetic surgery, fertility clinics, and cyberknife oncology.',
    averageSavingsPercent: 68,
    jciHospitalsCount: 46,
    directFlightsFrom: ['All major European hubs', 'Los Angeles', 'New York', 'Toronto', 'Dubai'],
    languageSupport: ['English', 'German', 'French', 'Arabic', 'Russian', 'Italian'],
    visaInfo: 'Instant e-Visa for US, UK, and European travelers; healthcare fast-track entry at Istanbul International Airport.',
    bestTimeToVisit: 'April to June & September to November',
    popularTreatments: ['Ultrasonic Rhinoplasty', 'Dental Implants', 'Hair Transplantation', 'IVF & Genetics'],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'dest-4',
    slug: 'barcelona-spain',
    name: 'Barcelona',
    country: 'Spain',
    city: 'Barcelona',
    flagEmoji: '🇪🇸',
    tagline: 'European healthcare gold standard & premier reproductive medicine',
    description: 'Spain ranks among the top 5 healthcare systems globally in WHO rankings. Barcelona is the undisputed European hub for IVF, fertility genetics, oncology immunotherapy, and pediatric complex surgery.',
    averageSavingsPercent: 45,
    jciHospitalsCount: 28,
    directFlightsFrom: ['Across Europe', 'New York JFK', 'Miami', 'Buenos Aires', 'Dubai'],
    languageSupport: ['Spanish', 'English', 'French', 'Catalan', 'Italian'],
    visaInfo: 'Schengen Area access for 90 days visa-free for US, UK, Canadian, and Australian citizens.',
    bestTimeToVisit: 'May to October',
    popularTreatments: ['IVF with PGT-A', 'Cardiology', 'Orthopedics', 'Oncology'],
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80'
  }
];

export const mockProviders: Provider[] = [
  {
    id: 'p-1',
    slug: 'apollo-gleneagles-delhi',
    name: 'Apollo Hospital & Heart Institute',
    type: 'hospital',
    city: 'New Delhi',
    country: 'India',
    address: 'Sarita Vihar, Delhi Mathura Road, New Delhi 110076',
    accreditations: ['JCI Accredited (6th Cycle)', 'NABH Accredited', 'NABL Lab Certified', 'ISO 9001:2015'],
    verificationStatus: 'verified',
    verifiedSource: 'Verified via Joint Commission International Registry & Ministry of Health',
    rating: 4.9,
    reviewCount: 382,
    leadClinician: {
      name: 'Dr. Arvind Mehta, MS, MCh (Ortho), FRCS',
      title: 'Senior Director & Chief of Joint Reconstruction',
      specialty: 'Orthopedics & Robotic Arthroplasty',
      experienceYears: 24,
      education: 'All India Institute of Medical Sciences (AIIMS) & Royal College of Surgeons (Edinburgh)',
      languages: ['English', 'Hindi', 'Punjabi'],
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
    },
    specialties: ['Orthopedics', 'Cardiology', 'Neurology & Spine', 'Oncology'],
    facilities: ['Mako Robotic Surgical Suite', '128-Slice Dual Source CT', '50 Private International Suites', 'In-house Pharmacy & Telemedicine Center'],
    internationalPatientServices: [
      'Airport VIP transfer directly to private suite',
      'Dedicated multi-lingual patient manager',
      'SIM card and local currency assistance',
      'Accommodations for travel companion included',
      'Dietary requirements (Halal, Kosher, Vegetarian, Diabetic) prepared by clinical chefs'
    ],
    about: 'Apollo Hospitals is widely recognized as the pioneer of accredited healthcare in South Asia, treating over 20,000 international patients annually from more than 120 nations with zero compromise on clinical safety and outcomes.',
    estimatedCostRangeUSD: { min: 4600, max: 8800 }
  },
  {
    id: 'p-2',
    slug: 'bumrungrad-international-bangkok',
    name: 'Bumrungrad International Hospital',
    type: 'hospital',
    city: 'Bangkok',
    country: 'Thailand',
    address: '33 Sukhumvit 3, Khlong Toei Nuea, Watthana, Bangkok 10110',
    accreditations: ['JCI Accredited since 2002', 'GHA Global Healthcare Accreditation with Excellence', 'DAkkS Germany Certified'],
    verificationStatus: 'verified',
    verifiedSource: 'Verified via JCI Directory & Thailand Board of Investment Healthcare Registry',
    rating: 4.95,
    reviewCount: 512,
    leadClinician: {
      name: 'Dr. Somchai Vacharathit, MD, FICS',
      title: 'Director of Robotic Orthopedic Joint Institute',
      specialty: 'Orthopedics & Sports Medicine',
      experienceYears: 22,
      education: 'Chulalongkorn University & Johns Hopkins Medicine Clinical Fellow',
      languages: ['English', 'Thai', 'German'],
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80'
    },
    specialties: ['Orthopedics', 'Cosmetic & Plastic Surgery', 'Cardiology', 'Fertility (IVF)'],
    facilities: ['Robotic Surgical Theater with Stryker Navigation', '580-bed luxury hospital complex', 'International Medical Coordination Center with 200 interpreters'],
    internationalPatientServices: [
      'Suvarnabhumi Airport private lounge and escort',
      'Direct billing agreements with 60+ global insurers',
      'Onsite embassy liaison desk',
      '24/7 Virtual follow-up via Bumrungrad Anywhere App'
    ],
    about: 'Bumrungrad is the first hospital in Asia to receive JCI accreditation and is consistently ranked by Newsweek among the top 100 hospitals in the world.',
    estimatedCostRangeUSD: { min: 5800, max: 9900 }
  },
  {
    id: 'p-3',
    slug: 'memorial-health-group-istanbul',
    name: 'Memorial Şişli Hospital & Medical Park',
    type: 'hospital',
    city: 'Istanbul',
    country: 'Turkey',
    address: 'Piyalepaşa Bulvarı, 34385 Şişli, Istanbul',
    accreditations: ['JCI Quality Certification', 'ISO 15189 Medical Lab Accredited', 'EAFPS Certified Plastic Surgeons'],
    verificationStatus: 'verified',
    verifiedSource: 'Verified via Republic of Turkey Ministry of Health International Patient Portal',
    rating: 4.85,
    reviewCount: 294,
    leadClinician: {
      name: 'Dr. Burak Demir, MD, EBOPRAS',
      title: 'Head of Facial Plastic & Aesthetic Reconstruction',
      specialty: 'Cosmetic & Plastic Surgery',
      experienceYears: 18,
      education: 'Istanbul University Cerrahpaşa & European Board Certified in Plastic Surgery',
      languages: ['English', 'Turkish', 'French'],
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
    },
    specialties: ['Cosmetic & Plastic Surgery', 'Dental Surgery', 'Fertility (IVF)', 'Cardiology'],
    facilities: ['Dedicated Piezo Ultrasound Rhinoplasty Suites', 'Advanced IVF Genetics Lab', 'VIP Recovery Penthouse Suites overlooking Bosphorus'],
    internationalPatientServices: [
      'Mercedes VIP Sprinter airport & clinic transfers',
      'Complimentary companion stay in 5-star partner hotel',
      'English, Arabic, Russian & German patient chaperones',
      'All surgical medications & post-op compression kits provided'
    ],
    about: 'Memorial Health Group became the first hospital in Turkey and the 21st worldwide to achieve JCI accreditation, delivering compassionate, high-tech healthcare across 11 hospital campuses.',
    estimatedCostRangeUSD: { min: 3200, max: 7400 }
  },
  {
    id: 'p-4',
    slug: 'quironsalud-barcelona',
    name: 'Hospital Quirónsalud Barcelona',
    type: 'hospital',
    city: 'Barcelona',
    country: 'Spain',
    address: 'Plaça d’Alfonso Comín, 5, 08023 Barcelona',
    accreditations: ['JCI Quality Seal of Approval', 'AENOR Universal Accessibility Standard', 'ISO 14001'],
    verificationStatus: 'verified',
    verifiedSource: 'Verified via Spanish National Healthcare Registry & European Medical Tourism Association',
    rating: 4.88,
    reviewCount: 240,
    leadClinician: {
      name: 'Dr. Elena Rossi, MD, PhD',
      title: 'Scientific Director of Assisted Human Reproduction',
      specialty: 'Fertility (IVF)',
      experienceYears: 20,
      education: 'Universitat de Barcelona & Clinique de Montchoisi Switzerland Fellow',
      languages: ['Spanish', 'English', 'Italian', 'French'],
      avatar: 'https://images.unsplash.com/photo-1594824813515-5a21bcbeee6b?auto=format&fit=crop&w=300&q=80'
    },
    specialties: ['Fertility (IVF)', 'Orthopedics', 'Cardiology', 'Oncology'],
    facilities: ['Next-Generation Sequencing Embryo Lab', 'State-of-the-art Hybrid Operating Rooms', 'Private healing gardens'],
    internationalPatientServices: [
      'Dedicated British/American medical coordinator',
      'Fast-track consultation booking within 48 hours',
      'Schengen medical visa documentation support'
    ],
    about: 'Quirónsalud is Spain’s premier healthcare group, operating over 50 hospitals known for rigorous academic standards, ethical care, and cutting-edge medical technologies.',
    estimatedCostRangeUSD: { min: 4200, max: 8600 }
  }
];

export const initialPatientCases: PatientCase[] = [
  {
    id: 'case-eth-9021',
    patientId: 'usr-patient-1',
    patientName: 'Sarah Jenkins',
    patientEmail: 'sarah.jenkins@example.com',
    patientCountry: 'United Kingdom',
    patientPhone: '+44 7700 900142',
    treatmentSlug: 'total-knee-replacement',
    treatmentTitle: 'Total Knee Replacement (Bilateral & Single)',
    preferredDestination: 'Bangkok, Thailand or New Delhi, India',
    budgetPreferenceUSD: 8000,
    preferredLanguage: 'English',
    createdAt: '2026-10-05T09:30:00Z',
    updatedAt: '2026-10-12T14:15:00Z',
    status: 'quotes_received',
    currentStageNumber: 6,
    consentGiven: true,
    medicalRecords: [
      {
        id: 'rec-101',
        fileName: 'Right_Knee_MRI_WeightBearing_Axial_Sagittal.pdf',
        fileType: 'application/pdf',
        fileSize: '14.2 MB',
        uploadedAt: '2026-10-06T10:15:00Z',
        category: 'MRI/CT Scan',
        verifiedStatus: 'processed',
        authorizedForProviders: true
      },
      {
        id: 'rec-102',
        fileName: 'NHS_Orthopedic_Consultant_Referral_Notes.pdf',
        fileType: 'application/pdf',
        fileSize: '2.4 MB',
        uploadedAt: '2026-10-06T10:16:00Z',
        category: 'Physician Referral',
        verifiedStatus: 'processed',
        authorizedForProviders: true
      },
      {
        id: 'rec-103',
        fileName: 'Blood_Panel_CBC_ESR_Cardiac_Clearance.pdf',
        fileType: 'application/pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-10-07T11:40:00Z',
        category: 'Lab Report',
        verifiedStatus: 'processed',
        authorizedForProviders: true
      }
    ],
    clinicalSummary: {
      primaryDiagnosis: 'Severe Grade IV Tricompartmental Osteoarthritis of the Right Knee with Varus Deformity (7 degrees)',
      medicalHistory: [
        'Progressive joint pain since 2021 refractory to hyaluronic acid injections',
        'Mild well-controlled hypertension (on Amlodipine 5mg daily)',
        'No prior knee surgeries; non-smoker'
      ],
      currentMedications: ['Amlodipine 5mg once daily', 'Paracetamol 1g as needed for flare-ups'],
      allergies: ['Penicillin (mild cutaneous hives in childhood)'],
      urgencyLevel: 'routine',
      aiConfidenceScore: 94,
      extractedNotes: 'Patient exhibits significant medial joint space obliteration and subchondral sclerosis. Indicated for primary unconstrained robotic-assisted total knee arthroplasty with non-penicillin surgical antibiotic prophylaxis (Cefazolin or Vancomycin).',
      patientConfirmed: true
    }
  }
];

export const mockQuotes: Quote[] = [
  {
    id: 'quote-apollo-1',
    caseId: 'case-eth-9021',
    providerId: 'p-1',
    providerName: 'Apollo Hospital & Heart Institute',
    providerCountry: 'India',
    leadSurgeon: 'Dr. Arvind Mehta, MS, MCh (Ortho), FRCS',
    version: 1,
    totalAmountUSD: 5200,
    currency: 'USD',
    lineItems: [
      { id: 'li-1', description: 'Robotic-guided Mako Surgical Arthroplasty & Surgeon/Anesthesia Team', category: 'Surgical Procedure', amountUSD: 2400 },
      { id: 'li-2', description: 'Stryker Triathlon FDA-approved Titanium Knee Prosthesis & Bearing', category: 'Implants & Medication', amountUSD: 1350 },
      { id: 'li-3', description: '5 Nights Deluxe Private Suite with Companion Bed & Clinical Nursing', category: 'Hospital Stay', amountUSD: 750 },
      { id: 'li-4', description: 'In-hospital Daily Physiotherapy & Continuous Passive Motion (CPM)', category: 'Post-op Therapy', amountUSD: 350 },
      { id: 'li-5', description: 'Airport VIP Transfer & Dedicated Case Coordinator', category: 'Transfers & Concierge', amountUSD: 350 }
    ],
    inclusions: [
      'Pre-op 3D CT mapping & cardiac clearance',
      'All surgical consumables & medications during stay',
      'Take-home post-discharge medications for 14 days',
      'Ergonomic hinged knee walker brace',
      'Follow-up tele-orthopedic consults for 6 months'
    ],
    exclusions: [
      'International flight tickets & companion travel insurance',
      'Unforeseen complications requiring Extended ICU beyond 24 hours',
      'Elective personal phone calls & room service outside diet plan'
    ],
    estimatedStayDaysHospital: 5,
    estimatedStayDaysHotel: 9,
    validUntil: '2026-11-30',
    status: 'pending',
    notes: 'Dr. Mehta has reviewed the MRI and confirms ideal candidacy for Mako robotic surgery with rapid-recovery analgesic pathway.',
    createdAt: '2026-10-09T14:30:00Z'
  },
  {
    id: 'quote-bumrungrad-2',
    caseId: 'case-eth-9021',
    providerId: 'p-2',
    providerName: 'Bumrungrad International Hospital',
    providerCountry: 'Thailand',
    leadSurgeon: 'Dr. Somchai Vacharathit, MD, FICS',
    version: 1,
    totalAmountUSD: 6850,
    currency: 'USD',
    lineItems: [
      { id: 'li-21', description: 'Robotic Total Knee Arthroplasty (Stryker Navigation System)', category: 'Surgical Procedure', amountUSD: 3100 },
      { id: 'li-22', description: 'Zimmer Biomet Persona Personalized Knee Implant System', category: 'Implants & Medication', amountUSD: 1700 },
      { id: 'li-23', description: '5 Nights Executive Private Patient Room + Companion Amenities', category: 'Hospital Stay', amountUSD: 1100 },
      { id: 'li-24', description: 'Hydrotherapy & Rehabilitation Center Sessions', category: 'Post-op Therapy', amountUSD: 500 },
      { id: 'li-25', description: 'Suvarnabhumi Airport Limousine transfer & Concierge', category: 'Transfers & Concierge', amountUSD: 450 }
    ],
    inclusions: [
      'Comprehensive pre-operative cardiovascular & anesthetic testing',
      'Full implant manufacturer 25-year international warranty certificate',
      'Hydrotherapy sessions in rehabilitation center',
      '24/7 dedicated British nurse liaison coordinator'
    ],
    exclusions: [
      'International flights & visa fees',
      'Treatment of pre-existing comorbidities outside orthopedic care'
    ],
    estimatedStayDaysHospital: 5,
    estimatedStayDaysHotel: 8,
    validUntil: '2026-11-25',
    status: 'pending',
    notes: 'Bumrungrad orthopedics team is prepared to receive patient in November. Fast-track visa letter can be issued in 24 hours.',
    createdAt: '2026-10-10T08:15:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    caseId: 'case-eth-9021',
    patientId: 'usr-patient-1',
    patientName: 'Sarah Jenkins',
    providerId: 'p-1',
    providerName: 'Apollo Hospital & Heart Institute',
    doctorName: 'Dr. Arvind Mehta',
    appointmentType: 'Virtual Pre-Op Consultation',
    date: '2026-10-15',
    timeSlot: '14:30 - 15:15 GMT',
    timezone: 'Europe/London (GMT+1)',
    status: 'confirmed',
    meetingLink: 'https://meet.ethaum.health/room/apollo-ortho-dr-mehta-9021',
    notes: 'Discussion of Mako robotic implant sizing and review of non-penicillin prophylactic protocol.'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    caseId: 'case-eth-9021',
    senderId: 'p-1',
    senderName: 'Apollo International Care Desk (Priya Sharma)',
    senderRole: 'provider',
    timestamp: '2026-10-09T14:40:00Z',
    content: 'Dear Ms. Jenkins, Dr. Arvind Mehta has evaluated your right knee MRI. The bone quality is excellent for cementless fixation. We have submitted your itemized proposal #quote-apollo-1. Please let us know if you have any questions regarding the schedule!'
  },
  {
    id: 'msg-2',
    caseId: 'case-eth-9021',
    senderId: 'usr-patient-1',
    senderName: 'Sarah Jenkins',
    senderRole: 'patient',
    timestamp: '2026-10-09T16:20:00Z',
    content: 'Thank you Priya and Dr. Mehta! I reviewed the quote. Could you confirm if the airport transfer covers my husband as well since he will be traveling with me as my companion?'
  },
  {
    id: 'msg-3',
    caseId: 'case-eth-9021',
    senderId: 'p-1',
    senderName: 'Apollo International Care Desk (Priya Sharma)',
    senderRole: 'provider',
    timestamp: '2026-10-09T16:35:00Z',
    content: 'Yes, absolutely! The VIP airport transfer and the hospital companion bed with full boarding are completely covered for your husband without any extra cost.'
  }
];

export const mockAftercareMilestones: AftercareMilestone[] = [
  {
    id: 'milestone-1',
    title: 'Hospital Discharge & Wound Inspection',
    dueDay: 5,
    status: 'completed',
    instructions: 'Surgical incision evaluated for wound closure. Waterproof antimicrobial dressing applied. Baseline walking test completed.'
  },
  {
    id: 'milestone-2',
    title: 'Hotel Recovery & Daily Range-of-Motion Exercises',
    dueDay: 8,
    status: 'completed',
    instructions: 'Physiotherapist visits hotel daily. Achieve 90-degree passive knee flexion. Continue anti-embolism compression stockings.'
  },
  {
    id: 'milestone-3',
    title: 'Suture Inspection & Fit-to-Fly Certification',
    dueDay: 13,
    status: 'pending',
    instructions: 'In-person clinic review. Final wound suture check. Fit-to-fly documentation issued with blood thinning travel advice.'
  },
  {
    id: 'milestone-4',
    title: 'Post-Travel Tele-Orthopedic Check-in',
    dueDay: 28,
    status: 'pending',
    instructions: 'Remote video call with Dr. Mehta to evaluate gait progression, pain levels, and local NHS physical therapy coordination.'
  }
];
