import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  role: UserRole;
  switchRole: (newRole: UserRole) => void;
  signIn: (role: UserRole, email?: string) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const DEMO_USERS: Record<UserRole, User | null> = {
  public: null,
  patient: {
    id: 'usr-patient-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    role: 'patient',
    country: 'United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  provider: {
    id: 'usr-provider-1',
    name: 'Dr. Arvind Mehta',
    email: 'arvind.mehta@apollohospitals.example',
    role: 'provider',
    organization: 'Apollo Hospital & Heart Institute',
    country: 'India',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Elena Vance',
    email: 'admin.compliance@ethaum.health',
    role: 'admin',
    organization: 'EthAum Global Verification Board',
    country: 'Global',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('ethaum_role') as UserRole;
    return saved || 'patient';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => DEMO_USERS[role]);

  useEffect(() => {
    localStorage.setItem('ethaum_role', role);
    setCurrentUser(DEMO_USERS[role]);
  }, [role]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const signIn = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const signOut = () => {
    setRole('public');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        switchRole,
        signIn,
        signOut,
        isAuthenticated: role !== 'public'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
