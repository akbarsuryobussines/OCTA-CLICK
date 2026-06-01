/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calculator, Percent, CalendarRange, Coins, ArrowUpRight, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { CalculatorResult, InstallmentSchedule } from '../types';

export default function KalkulatorCicilan() {
  const [loanAmount, setLoanAmount] = useState<number>(50000000); // 50 Million IDR default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default APR
  const [tenure, setTenure] = useState<number>(12); // 12 months default
  const [interestType, setInterestType] = useState<'flat' | 'efektif'>('flat');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  // Re-calculate when inputs change
  useEffect(() => {
    calculateInstallments();
  }, [loanAmount, interestRate, tenure, interestType]);

  const calculateInstallments = () => {
    const P = loanAmount;
    const annualRate = interestRate / 100;
    const N = tenure;
    
    let monthlyInstallment = 0;
    let totalPayment = 0;
    let totalInterest = 0;
    const schedule: InstallmentSchedule[] = [];

    if (interestType === 'flat') {
      // FLAT INTEREST METHOD
      // Monthly interest is calculated once based on the original principal
      const monthlyInterestAmount = (P * annualRate) / 12;
      const monthlyPrincipalAmount = P / N;
      monthlyInstallment = monthlyPrincipalAmount + monthlyInterestAmount;
      totalInterest = monthlyInterestAmount * N;
      totalPayment = P + totalInterest;

      let remainingBalance = P;
      for (let i = 1; i <= N; i++) {
        remainingBalance -= monthlyPrincipalAmount;
        schedule.push({
          month: i,
          principalRepayment: monthlyPrincipalAmount,
          interestRepayment: monthlyInterestAmount,
          totalMonthlyPayment: monthlyInstallment,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }
    } else {
      // EFFECTIVE / ANNUITY INTEREST METHOD
      // Monthly installment is fixed, but interest is calculated on the remaining balance
      const r = annualRate / 12; // Monthly interest rate
      
      // Formula for Annuity Monthly Installment:
      // Installment = P * r * (1+r)^N / ((1+r)^N - 1)
      if (r === 0) {
        monthlyInstallment = P / N;
        totalPayment = P;
        totalInterest = 0;
      } else {
        monthlyInstallment = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
        totalPayment = monthlyInstallment * N;
        totalInterest = totalPayment - P;
      }

      let remainingBalance = P;
      for (let i = 1; i <= N; i++) {
        const interestRepayment = remainingBalance * r;
        const principalRepayment = monthlyInstallment - interestRepayment;
        remainingBalance -= principalRepayment;

        schedule.push({
          month: i,
          principalRepayment,
          interestRepayment,
          totalMonthlyPayment: monthlyInstallment,
          remainingBalance: Math.max(0, remainingBalance)
        });
      }
    }

    setResult({
      principal: P,
      interestRate: interestRate,
      tenureMonths: N,
      monthlyInstallment,
      totalPayment,
      totalInterest,
      schedule
    });
  };

  const getQuickValues = () => {
    return [
      { label: 'Kredit HP/Gawai', value: 10000000, tenor: 12, rate: 10 },
      { label: 'Pinjaman Renovasi', value: 75000000, tenor: 24, rate: 8.5 },
      { label: 'Kredit Mobil Bekas', value: 180000000, tenor: 36, rate: 7.2 },
      { label: 'Kredit Modal Usaha', value: 350000050, tenor: 48, rate: 6.8 }
    ];
  };

  const loadRecommendation = (rec: { value: number; tenor: number; rate: number }) => {
    setLoanAmount(rec.value);
    setTenure(rec.tenor);
    setInterestRate(rec.rate);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-[#EE3124]" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">Kalkulator Cicilan Cerdas</h2>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Lakukan simulasi pinjaman dengan bunga kompetitif dan pelajari rincian schedule angsuran per bulan secara transparan.
        </p>
      </div>

      {/* Grid Layout controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Forms Field Section */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Parameter Pinjaman</h3>

          {/* Quick presets */}
          <div className="space-y-2">
            <span className="text-xs text-slate-500 font-bold block">Rekomendasi Simulasi Instan:</span>
            <div className="grid grid-cols-2 gap-2">
              {getQuickValues().map((rec, idx) => (
                <button
                  id={`calc-preset-${idx}`}
                  key={idx}
                  onClick={() => loadRecommendation(rec)}
                  className="p-3 border border-slate-200 bg-white hover:bg-slate-50/50 hover:border-[#EE3124]/30 rounded-xl text-left text-xs transition-all cursor-pointer group"
                >
                  <p className="font-extrabold text-slate-700 group-hover:text-[#EE3124] line-clamp-1">{rec.label}</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Rp {(rec.value / 1000000).toFixed(0)}Jt • {rec.tenor} Bln • {rec.rate}%</p>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Metode Perhitungan Bunga</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="calc-interest-flat"
                onClick={() => setInterestType('flat')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  interestType === 'flat'
                    ? 'bg-[#EE3124] border-[#EE3124] text-white shadow-md shadow-red-500/10'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                Flat (Bunga Tetap)
              </button>
              <button
                id="calc-interest-efektif"
                onClick={() => setInterestType('efektif')}
                className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  interestType === 'efektif'
                    ? 'bg-[#EE3124] border-[#EE3124] text-white shadow-md shadow-red-500/10'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                Efektif / Anuitas
              </button>
            </div>
            <p className="text-[10px] text-slate-450 font-semibold leading-relaxed pt-1.5">
              {interestType === 'flat'
                ? 'Suku bunga dihitung berdasarkan nilai awal hutang. Nominal angsuran bulanan akan selalu sama rata.'
                : 'Porsi bunga dihitung berdasarkan sisa hutang terakhir. Porsi pembayaran pokok bertambah besar tiap bulan.'}
            </p>
          </div>

          {/* Loan Amount Range */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-550 uppercase tracking-wider">Plavon Pinjaman (Nominal)</span>
              <span className="text-slate-800 text-xs font-extrabold bg-slate-100 px-2.5 py-1 rounded-lg">
                Rp {loanAmount.toLocaleString('id-ID')}
              </span>
            </div>
            <input
              id="calc-loan-amount-slider"
              type="range"
              min="5000000"
              max="500000000"
              step="5000000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EE3124]"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold">
              <span>Rp 5 Juta</span>
              <span>Rp 500 Juta</span>
            </div>
          </div>

          {/* Interest Rate Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-550 uppercase tracking-wider">Suku Bunga per Tahun (% APR)</span>
              <span className="text-slate-800 text-xs font-extrabold bg-slate-100 px-2.5 py-1 rounded-lg flex items-center space-x-1">
                <Percent className="w-3 h-3 text-[#EE3124] mr-0.5" />
                <span>{interestRate.toFixed(1)}%</span>
              </span>
            </div>
            <input
              id="calc-interest-rate-slider"
              type="range"
              min="4.0"
              max="18.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EE3124]"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold">
              <span>Promo 4.0%</span>
              <span>Max 18.0%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-550 uppercase tracking-wider">Tenor Pinjaman (Bulan)</span>
              <span className="text-slate-800 text-xs font-extrabold bg-slate-100 px-2.5 py-1 rounded-lg flex items-center space-x-1">
                <CalendarRange className="w-3 h-3 text-[#EE3124] mr-0.5" />
                <span>{tenure} Bulan</span>
              </span>
            </div>
            <input
              id="calc-tenure-slider"
              type="range"
              min="6"
              max="60"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EE3124]"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold">
              <span>6 Bulan (0.5 Tahun)</span>
              <span>60 Bulan (5 Tahun)</span>
            </div>
          </div>
        </div>

        {/* Results Visual & Breakdowns */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          {result && (
            <>
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Monthly Payment card */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                  <div className="absolute top-4 right-4 p-1.5 bg-red-50 rounded-lg text-[#EE3124]">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#EE3124]">
                    Cicilan Bulanan
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-mono">
                    Rp {Math.round(result.monthlyInstallment).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Pembayaran flat terjadwal</p>
                </div>

                {/* Total Interest paid card */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                  <div className="absolute top-4 right-4 p-1.5 bg-amber-50 rounded-lg text-amber-500">
                    <Percent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Total Bunga Dibayar
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-mono">
                    Rp {Math.round(result.totalInterest).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Over tenure ({result.tenureMonths} bln)</p>
                </div>

                {/* Total repayment card */}
                <div className="bg-white border border-slate-200 p-5 rounded-2xl relative overflow-hidden shadow-sm">
                  <div className="absolute top-4 right-4 p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                    <Coins className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Total Pengembalian
                  </span>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-mono">
                    Rp {Math.round(result.totalPayment).toLocaleString('id-ID')}
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Pokok + Total bunga akumulasi</p>
                </div>
              </div>

              {/* Dynamic visual graph of Principal vs Interest */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Rasio Pembayaran</span>
                <div className="h-6 w-full rounded-xl bg-slate-100 overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${(result.principal / result.totalPayment) * 100}%` }}
                    className="bg-gradient-to-r from-red-500 to-[#EE3124] h-full flex items-center justify-center text-[10px] font-bold text-white font-mono"
                    title="Proporsi Pokok Pinjaman"
                  >
                    Pokok ({((result.principal / result.totalPayment) * 100).toFixed(0)}%)
                  </div>
                  {result.totalInterest > 0 && (
                    <div
                      style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                      className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-bold text-white font-mono"
                      title="Proporsi Angsuran Bunga"
                    >
                      Bunga ({((result.totalInterest / result.totalPayment) * 100).toFixed(0)}%)
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1 font-bold">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#EE3124]" />
                    <span>Pokok: Rp {result.principal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500" />
                    <span>Bunga: Rp {Math.round(result.totalInterest).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Amortization Table */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50/50">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#EE3124]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Tabel Jadwal Angsuran Bulanan
                    </span>
                  </div>
                  <button
                    id="calc-print-schedule-alert"
                    onClick={() => alert('Jadwal perhitungan angsuran berhasil diformat menjadi PDF draft untuk dicetak. Hubungi konsultan finansial OCTO klik Anda.')}
                    className="flex items-center space-x-1 hover:text-white hover:bg-[#EE3124] transition-colors cursor-pointer text-xs bg-white border border-slate-200 hover:border-transparent px-3 py-1.5 rounded-xl text-slate-600 font-bold"
                  >
                    <span>Cetak PDF Draft</span>
                  </button>
                </div>

                <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 sticky top-0 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200 z-10">
                      <tr>
                        <th className="p-3 pl-5 font-bold">Bulan Ke</th>
                        <th className="p-3 font-bold">Pokok</th>
                        <th className="p-3 font-bold">Bunga</th>
                        <th className="p-3 font-bold">Total Cicilan</th>
                        <th className="p-3 pr-5 font-bold">Sisa Pinjaman</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-mono text-slate-600 font-semibold">
                      {result.schedule.map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50/65 transition-colors">
                          <td className="p-3 pl-5 text-slate-400 font-bold">Bulan {row.month}</td>
                          <td className="p-3">Rp {Math.round(row.principalRepayment).toLocaleString('id-ID')}</td>
                          <td className="p-3 text-amber-600">Rp {Math.round(row.interestRepayment).toLocaleString('id-ID')}</td>
                          <td className="p-3 text-slate-900 font-extrabold">Rp {Math.round(row.totalMonthlyPayment).toLocaleString('id-ID')}</td>
                          <td className="p-3 pr-5 text-slate-450">Rp {Math.round(row.remainingBalance).toLocaleString('id-ID')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-50/80 border-t border-slate-200 text-center text-[10px] text-slate-400 font-bold leading-relaxed">
                  *Perhitungan di atas merupakan simulasi estimasi awal berdasarkan tipe bunga flat / efektif. Suku bunga riil saat disetujui dapat bervariasi bergantung pada skoring kredit nasabah.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
