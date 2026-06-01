/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Transaction {
  id: string;
  type: 'transfer' | 'topup' | 'payment' | 'receive';
  amount: number;
  date: string;
  description: string;
  category?: string;
  merchant?: string;
}

export interface UserAccount {
  username: string;
  fullName: string;
  accountNumber: string;
  balance: number;
  points: number;
  savingGoal: number;
  savingCurrent: number;
  transactions: Transaction[];
}

export interface MerchantPromo {
  id: string;
  title: string;
  merchantName: string;
  discountValue: string;
  description: string;
  code: string;
  category: 'kuliner' | 'belanja' | 'travel' | 'lifestyle';
  endDate: string;
  terms: string[];
  usageCount: number;
  minTransaction?: number;
}

export interface CreditCardProduct {
  id: string;
  name: string;
  type: 'Premium' | 'Cashback' | 'Travel' | 'Shopping';
  minIncome: number;
  annualFee: string;
  features: string[];
  bannerColor: string; // Tailwind class string for credit card visual
  benefitsSummary: string;
}

export interface InstallmentSchedule {
  month: number;
  principalRepayment: number;
  interestRepayment: number;
  totalMonthlyPayment: number;
  remainingBalance: number;
}

export interface CalculatorResult {
  principal: number;
  interestRate: number;
  tenureMonths: number;
  monthlyInstallment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: InstallmentSchedule[];
}

export interface CreditCardApplication {
  fullName: string;
  nik: string;
  phoneNumber: string;
  email: string;
  monthlyIncome: number;
  employmentType: string;
  cardId: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  approvedLimit?: number;
  notes?: string;
}
