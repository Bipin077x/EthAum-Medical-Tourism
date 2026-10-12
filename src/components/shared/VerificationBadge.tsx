import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface VerificationBadgeProps {
  label?: string;
  source?: string;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  label = 'JCI Accredited',
  source,
  size = 'md'
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      }`}
      title={source || 'Officially verified against international accreditation registry'}
    >
      <ShieldCheck className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-600`} />
      <span>{label}</span>
      <CheckCircle2 className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-emerald-500`} />
    </div>
  );
};
