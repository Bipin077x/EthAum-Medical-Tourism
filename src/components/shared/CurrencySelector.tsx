import React, { createContext, useContext, useState } from 'react';

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'AUD';

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  formatPrice: (amountInUSD: number) => string;
}

const RATES: Record<SupportedCurrency, { rate: number; symbol: string }> = {
  USD: { rate: 1.0, symbol: '$' },
  EUR: { rate: 0.92, symbol: '€' },
  GBP: { rate: 0.78, symbol: '£' },
  AUD: { rate: 1.52, symbol: 'A$' }
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<SupportedCurrency>('USD');

  const formatPrice = (amountInUSD: number): string => {
    const config = RATES[currency];
    const converted = Math.round(amountInUSD * config.rate);
    return `${config.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencySelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="inline-flex items-center gap-1 bg-white border border-[#E2E8E7] rounded-lg p-1 text-xs shadow-2xs">
      {!compact && <span className="text-gray-400 pl-1.5 font-medium">Currency:</span>}
      {(['USD', 'GBP', 'EUR', 'AUD'] as SupportedCurrency[]).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-2 py-1 rounded font-semibold transition-all ${
            currency === c
              ? 'bg-[#123B46] text-white shadow-2xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
};
