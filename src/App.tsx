import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CaseProvider } from './context/CaseContext';
import { CurrencyProvider } from './components/shared/CurrencySelector';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { PatientLayout } from './components/layout/PatientLayout';
import { ProviderLayout } from './components/layout/ProviderLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { TreatmentsPage } from './pages/public/TreatmentsPage';
import { TreatmentDetailPage } from './pages/public/TreatmentDetailPage';
import { DestinationsPage } from './pages/public/DestinationsPage';
import { ProvidersPage } from './pages/public/ProvidersPage';
import { ProviderDetailPage } from './pages/public/ProviderDetailPage';
import { HelpPage } from './pages/public/HelpPage';
import { TermsPage } from './pages/public/TermsPage';
import { PrivacyPage } from './pages/public/PrivacyPage';

// Auth Pages
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';

// Patient Pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { CaseWizardPage } from './pages/patient/CaseWizardPage';
import { CaseDetailPage } from './pages/patient/CaseDetailPage';
import { ProviderMatchesPage } from './pages/patient/ProviderMatchesPage';
import { QuoteComparisonPage } from './pages/patient/QuoteComparisonPage';
import { PatientAppointmentsPage } from './pages/patient/PatientAppointmentsPage';
import { PatientMessagesPage } from './pages/patient/PatientMessagesPage';
import { AftercarePage } from './pages/patient/AftercarePage';

// Provider Pages
import { ProviderDashboard } from './pages/provider/ProviderDashboard';
import { ProviderLeadsPage } from './pages/provider/ProviderLeadsPage';
import { ProviderCaseDetailPage } from './pages/provider/ProviderCaseDetailPage';
import { QuoteBuilderPage } from './pages/provider/QuoteBuilderPage';
import { ProviderAppointmentsPage } from './pages/provider/ProviderAppointmentsPage';
import { ProviderMessagesPage } from './pages/provider/ProviderMessagesPage';

// Admin Page
import { AdminDashboard } from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CaseProvider>
          <CurrencyProvider>
            <Routes>
              {/* Public Marketplace Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="treatments" element={<TreatmentsPage />} />
                <Route path="treatments/:slug" element={<TreatmentDetailPage />} />
                <Route path="destinations/:slug" element={<DestinationsPage />} />
                <Route path="providers" element={<ProvidersPage />} />
                <Route path="providers/:slug" element={<ProviderDetailPage />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="auth/sign-in" element={<SignInPage />} />
                <Route path="auth/sign-up" element={<SignUpPage />} />
              </Route>

              {/* Patient Workspace Routes */}
              <Route path="/patient" element={<PatientLayout />}>
                <Route index element={<PatientDashboard />} />
                <Route path="cases/new" element={<CaseWizardPage />} />
                <Route path="cases/:caseId" element={<CaseDetailPage />} />
                <Route path="cases/:caseId/matches" element={<ProviderMatchesPage />} />
                <Route path="cases/:caseId/quotes" element={<QuoteComparisonPage />} />
                <Route path="appointments" element={<PatientAppointmentsPage />} />
                <Route path="messages" element={<PatientMessagesPage />} />
                <Route path="aftercare" element={<AftercarePage />} />
              </Route>

              {/* Healthcare Provider Workspace Routes */}
              <Route path="/provider" element={<ProviderLayout />}>
                <Route index element={<ProviderDashboard />} />
                <Route path="leads" element={<ProviderLeadsPage />} />
                <Route path="cases/:caseId" element={<ProviderCaseDetailPage />} />
                <Route path="cases/:caseId/quotes/new" element={<QuoteBuilderPage />} />
                <Route path="appointments" element={<ProviderAppointmentsPage />} />
                <Route path="messages" element={<ProviderMessagesPage />} />
              </Route>

              {/* Platform Admin Route */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CurrencyProvider>
        </CaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
