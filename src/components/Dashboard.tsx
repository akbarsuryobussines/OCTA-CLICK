/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Coins, 
  Send, 
  Smartphone, 
  DollarSign, 
  Plus, 
  Calendar, 
  Search, 
  Trash2, 
  Download, 
  Check, 
  AlertCircle,
  CreditCard,
  Building,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserAccount, Transaction } from '../types';

const INITIAL_TRANS_HISTORY: Transaction[] = [
  {
    id: 't1',
    type: 'transfer',
    amount: 1500000,
    date: '31 Mei 2026',
    description: 'Transfer ke Budi Raharjo - Bisnis',
    category: 'M-Banking'
  },
  {
    id: 't2',
    type: 'receive',
    amount: 7200000,
    date: '30 Mei 2026',
    description: 'Terima Transfer PT Sinar Sukses Mandiri - Gaji Akbar',
    category: 'Payroll Gaji'
  },
  {
    id: 't3',
    type: 'payment',
    amount: 120000,
    date: '28 Mei 2026',
    description: 'Token Listrik PLN - Pasca Bayar',
    category: 'Tagihan Utilitas'
  },
  {
    id: 't4',
    type: 'topup',
    amount: 250000,
    date: '25 Mei 2026',
    description: 'Top-up saldo E-wallet GoPay',
    category: 'Dompet Digital'
  },
  {
    id: 't5',
    type: 'payment',
    amount: 104500,
    date: '20 Mei 2026',
    description: 'Makan Bento Sushi Tei - Promo Disc 35%',
    category: 'Kuliner Merchant'
  }
];

interface DashboardProps {
  username: string;
}

export default function Dashboard({ username }: DashboardProps) {
  const [account, setAccount] = useState<UserAccount>({
    username,
    fullName: 'Akbar Suryo',
    accountNumber: '410-09-5192-3',
    balance: 14250300, // Rp 14.25 Million
    points: 420,
    savingGoal: 20000000,
    savingCurrent: 8500000,
    transactions: INITIAL_TRANS_HISTORY
  });

  // Dialog control states for transactions
  const [activeForm, setActiveForm] = useState<'transfer' | 'topup' | 'payment' | null>(null);
  const [descFilter, setDescFilter] = useState('');
  
  // Form input states
  const [formDestAccount, setFormDestAccount] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formWalletProvider, setFormWalletProvider] = useState('GoPay');
  const [formBillType, setFormBillType] = useState('Listrik PLN');

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseInt(formAmount);
    
    if (isNaN(value) || value <= 0) {
      alert('Nominal transaksi harus berupa angka positif yang valid!');
      return;
    }

    if (value > account.balance && activeForm !== null) {
      alert('Maaf, saldo rekening Anda tidak mencukupi untuk memproses transaksi ini!');
      return;
    }

    // Process accounting logic
    let tempBalance = account.balance;
    let tempPoints = account.points;
    let desc = '';

    if (activeForm === 'transfer') {
      tempBalance -= value;
      // Earn some points
      tempPoints += Math.round(value / 100000); // 1 point per 100k
      desc = `Transfer ke ${formDestAccount} - ${formNotes || 'Pembayaran Digital'}`;
    } else if (activeForm === 'topup') {
      tempBalance -= value;
      tempPoints += 2; // Flat reward points inside
      desc = `Top-up Saldo E-wallet ${formWalletProvider} - Nomer ${formDestAccount}`;
    } else if (activeForm === 'payment') {
      tempBalance -= value;
      tempPoints += 5; // Flat reward points inside
      desc = `Pembayaran Tagihan ${formBillType} - ID Pelanggan ${formDestAccount}`;
    }

    const newTransaction: Transaction = {
      id: `t_${Date.now()}`,
      type: activeForm === 'transfer' ? 'transfer' : activeForm === 'topup' ? 'topup' : 'payment',
      amount: value,
      date: 'Hari ini',
      description: desc,
      category: activeForm === 'transfer' ? 'Transfer Online' : activeForm === 'topup' ? 'Top-up E-Wallet' : 'Tagihan Bulanan'
    };

    setAccount({
      ...account,
      balance: tempBalance,
      points: tempPoints,
      transactions: [newTransaction, ...account.transactions]
    });

    // Reset inputs & close modal form
    setFormDestAccount('');
    setFormAmount('');
    setFormNotes('');
    setActiveForm(null);
    
    // Alert feedback
    alert('Sukses! Transaksi Anda telah berhasil diverifikasi dan diproses oleh core banking Octo Klik.');
  };

  const handleSavingsDeposit = () => {
    const depositAmount = 500000;
    if (account.balance < depositAmount) {
      alert('Saldo rekening tidak mencukupi untuk dipindahkan ke tabungan impian!');
      return;
    }

    setAccount({
      ...account,
      balance: account.balance - depositAmount,
      savingCurrent: account.savingCurrent + depositAmount,
      transactions: [
        {
          id: `t_${Date.now()}`,
          type: 'transfer',
          amount: depositAmount,
          date: 'Hari ini',
          description: 'Setoran Rutin untuk Celengan Impian',
          category: 'Investasi Saving'
        },
        ...account.transactions
      ]
    });
    alert('Hebat! Setoran tabungan impian sebesar Rp 500.000 sukses dialokasikan.');
  };

  const deleteTransaction = (id: string, amount: number, type: string) => {
    // Reverse funds for refund scenario
    let reversedBalance = account.balance;
    if (type === 'transfer' || type === 'topup' || type === 'payment') {
      reversedBalance += amount;
    } else {
      reversedBalance -= amount;
    }

    setAccount({
      ...account,
      balance: reversedBalance,
      transactions: account.transactions.filter(t => t.id !== id)
    });
  };

  // Filter Transaction history logs
  const filteredHistory = account.transactions.filter(t => 
    t.description.toLowerCase().includes(descFilter.toLowerCase()) || 
    t.category?.toLowerCase().includes(descFilter.toLowerCase()) ||
    t.type.toLowerCase().includes(descFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Account Info Bar */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          Halo, Selamat Datang Kembali, <span className="text-[#EE3124]">{account.fullName}</span>!
        </h2>
        <p className="text-xs text-slate-500 font-medium">Dashboard perbankan pribadi Anda aman terkendali.</p>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Total balance account (6 cols) */}
        <div className="md:col-span-6 bg-gradient-to-br from-[#EE3124] to-[#A30D11] p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[200px]">
          <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-white/10 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-white/90" />
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#FDF2F1]">Saldo Rekening Utama</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#FDF2F1]/80">{account.accountNumber}</span>
          </div>

          <div className="mt-4">
            <span className="text-xs text-[#FDF2F1]/90 block">Total Saldo Tersedia</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 font-mono block">
              Rp {account.balance.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-4 text-xs text-white">
            <span className="flex items-center">
              <Coins className="w-4 h-4 text-amber-300 mr-1.5" />
              <span>Octo Points: <strong className="text-white font-mono">{account.points} XP</strong></span>
            </span>
            <div className="bg-black/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
              Nasabah Prioritas
            </div>
          </div>
        </div>

        {/* Savings Goal progress card (3 cols) */}
        <div className="md:col-span-3 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between min-h-[200px]" id="saving-widget">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Celengan Impian</span>
              <span className="text-[10px] bg-red-50 text-[#EE3124] font-bold px-2 py-0.5 rounded-full">
                {Math.round((account.savingCurrent / account.savingGoal) * 100)}%
              </span>
            </div>
            <h4 className="text-slate-800 font-extrabold text-sm tracking-tight">Kebutuhan Liburan Akhir Tahun</h4>
            <div className="mt-3 space-y-0.5">
              <p className="text-lg font-mono font-extrabold text-slate-950">Rp {account.savingCurrent.toLocaleString('id-ID')}</p>
              <p className="text-[10px] text-slate-500">Target: Rp {account.savingGoal.toLocaleString('id-ID')}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {/* simple meter chart */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                style={{ width: `${(account.savingCurrent / account.savingGoal) * 100}%` }}
                className="bg-[#EE3124] h-full rounded-full transition-all"
              />
            </div>
            <button
              id="savings-deposit-trigger"
              onClick={handleSavingsDeposit}
              className="w-full py-2 bg-red-50 hover:bg-[#EE3124] text-[#EE3124] hover:text-white border border-red-200/50 hover:border-transparent rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Setor Rp 500rb</span>
            </button>
          </div>
        </div>

        {/* Analytical Spend Meter (3 cols) */}
        <div className="md:col-span-3 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">Analisis Pengeluaran</span>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <TrendingUp className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold block uppercase">Bulan Ini</span>
                <p className="text-base font-extrabold text-slate-900 font-mono">Rp 1.975.000</p>
              </div>
            </div>
          </div>

          {/* simple horizontal custom visualization */}
          <div className="space-y-2.5 mt-4 font-sans text-[10px] text-slate-600">
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span>Transfer Keluar</span>
                <span className="text-slate-800 font-bold">75%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div className="bg-[#EE3124] w-[75%] h-full rounded-full" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span>Belanja Merchant</span>
                <span className="text-slate-800 font-bold">15%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div className="bg-amber-500 w-[15%] h-full rounded-full" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span>Tagihan Utilitas</span>
                <span className="text-slate-800 font-bold">10%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div className="bg-blue-500 w-[10%] h-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK TRANS ACTIONS CONTROLS GRID */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Hub Kilat Transaksi Mandiri</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <button
            id="quick-action-transfer"
            onClick={() => {
              setActiveForm('transfer');
              setFormDestAccount('');
            }}
            className="p-5 bg-white border border-slate-200 hover:border-[#EE3124]/30 rounded-2xl flex items-center gap-4 transition-all hover:shadow-md cursor-pointer text-left"
          >
            <div className="p-3 bg-red-50 text-[#EE3124] rounded-xl">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-800 block">Transfer Baru</span>
              <span className="text-[10px] text-slate-400 font-semibold">Kirim Rekening Bank Mandiri</span>
            </div>
          </button>

          <button
            id="quick-action-topup"
            onClick={() => {
              setActiveForm('topup');
              setFormDestAccount('08781206554');
            }}
            className="p-5 bg-white border border-slate-200 hover:border-[#EE3124]/30 rounded-2xl flex items-center gap-4 transition-all hover:shadow-md cursor-pointer text-left"
          >
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-800 block">Top-up E-Wallet</span>
              <span className="text-[10px] text-slate-400 font-semibold font-mono">GoPay, OVO, ShopeePay</span>
            </div>
          </button>

          <button
            id="quick-action-payment"
            onClick={() => {
              setActiveForm('payment');
              setFormDestAccount('331209180744');
            }}
            className="p-5 bg-white border border-slate-200 hover:border-[#EE3124]/30 rounded-2xl flex items-center gap-4 transition-all hover:shadow-md cursor-pointer text-left"
          >
            <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-slate-800 block">Bayar Tagihan</span>
              <span className="text-[10px] text-slate-400 font-semibold">PLN Listrik, BPJS Kesehatan</span>
            </div>
          </button>

        </div>
      </div>

      {/* MODAL TRANSACTION DIALOG FORMS */}
      <AnimatePresence>
        {activeForm !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveForm(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 p-6 shadow-2xl z-10"
            >
              <h3 className="text-lg font-black text-slate-800 flex items-center mb-4">
                {activeForm === 'transfer' && 'Kirim Transfer Baru'}
                {activeForm === 'topup' && 'Topup Saldo Dompet Digital'}
                {activeForm === 'payment' && 'Bayar Tagihan Baru'}
              </h3>

              <form onSubmit={handleActionSubmit} className="space-y-4">
                {/* Specific field parameters based on dynamic active form type */}
                {activeForm === 'topup' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase text-slate-500">Pilih E-Wallet Provider</label>
                    <select
                      id="action-wallet-provider"
                      value={formWalletProvider}
                      onChange={(e) => setFormWalletProvider(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EE3124]/10"
                    >
                      <option value="GoPay">GoPay (Gojek E-wallet)</option>
                      <option value="OVO Premium">OVO (Grab E-Wallet)</option>
                      <option value="ShopeePay">ShopeePay Shopee Mall</option>
                      <option value="DANA Dompet">DANA Dompet Indonesia</option>
                    </select>
                  </div>
                )}

                {activeForm === 'payment' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase text-slate-500">Pilih Kategori Tagihan</label>
                    <select
                      id="action-bill-type"
                      value={formBillType}
                      onChange={(e) => setFormBillType(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-250 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#EE3124]/10"
                    >
                      <option value="Listrik PLN">Token Listrik PLN - Auto-paid</option>
                      <option value="BPJS Kesehatan">Iuran BPJS Kesehatan Mandiri</option>
                      <option value="PDAM Air Minum">PDAM Air Minum Daerah</option>
                      <option value="Wi-Fi Indihome">Wi-Fi Internet Fiber Indihome</option>
                    </select>
                  </div>
                )}

                {/* Dest Number field - context dynamic */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold uppercase text-slate-500">
                    {activeForm === 'transfer' && 'Nomor Rekening Tujuan'}
                    {activeForm === 'topup' && 'Nomor HP Terdaftar'}
                    {activeForm === 'payment' && 'ID Pelanggan / No. Tagihan'}
                  </label>
                  <input
                    id="action-dest-account"
                    type="text"
                    required
                    value={formDestAccount}
                    onChange={(e) => setFormDestAccount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EE3124]/15"
                    placeholder={
                      activeForm === 'transfer' ? 'Contoh: 512-09-1234-9' :
                      activeForm === 'topup' ? 'Contoh: 08123456789' : 'Contoh: 33129184518'
                    }
                  />
                </div>

                {/* Amount input */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold uppercase text-slate-500">Nominal Transaksi (Rp)</label>
                  <input
                    id="action-amount"
                    type="number"
                    required
                    min="10000"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EE3124]/15"
                    placeholder="Minimal Rp 10.000"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                    <span>Maksimal Transfer: Rp 50.000.000</span>
                    <button
                      id="action-set-max-balance"
                      type="button"
                      onClick={() => setFormAmount(Math.min(account.balance, 5000000).toString())}
                      className="text-[#EE3124] font-bold underline cursor-pointer"
                    >
                      Batas demo Rp 5M
                    </button>
                  </div>
                </div>

                {/* Optional description (only for transfer online) */}
                {activeForm === 'transfer' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold uppercase text-slate-500">Pesan Catatan (Opsional)</label>
                    <input
                      id="action-notes"
                      type="text"
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#EE3124]/15"
                      placeholder="Contoh: Pembayaran Jasa / Belanja Sepatu"
                    />
                  </div>
                )}

                {/* Submits buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    id="action-cancel"
                    type="button"
                    onClick={() => setActiveForm(null)}
                    className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 cursor-pointer"
                  >
                    Batalkan
                  </button>
                  <button
                    id="action-confirm"
                    type="submit"
                    className="w-1/2 py-2.5 bg-[#EE3124] hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Kirim & Verifikasi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECENT TRANSACTION HISTORY LOGS TABLE (Fitur Utama Dashboard secara jelas) */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Table header control bar */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <History className="w-4.5 h-4.5 text-[#EE3124]" />
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Riwayat Transaksi Terkini
            </h4>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-60">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </div>
              <input
                id="trans-search-filter"
                type="text"
                placeholder="Cari deskripsi, kategori..."
                value={descFilter}
                onChange={(e) => setDescFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-205 rounded-xl focus:border-[#EE3124] focus:outline-none text-xs text-slate-800 placeholder-slate-400"
              />
            </div>
            <button
              id="trans-download"
              onClick={() => alert('Mutasi rekening bulanan sukses dieskpor ke format CSV/Excel. Silakan cek folder Download utama Anda.')}
              className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
              title="Ekspor Rekening Koran"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List items block */}
        <div className="divide-y divide-slate-100 overflow-y-auto max-h-[360px]">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((trans) => (
              <div
                id={`trans-item-${trans.id}`}
                key={trans.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
               >
                <div className="flex items-center space-x-3.5 min-w-0">
                  {/* Indicator icons */}
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    trans.type === 'receive' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : trans.type === 'transfer' 
                      ? 'bg-rose-50 text-red-500' 
                      : 'bg-amber-50 text-amber-500'
                  }`}>
                    {trans.type === 'receive' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0">
                    <p className="text-slate-800 font-bold text-sm tracking-tight leading-snug truncate">
                      {trans.description}
                    </p>
                    <div className="flex items-center space-x-2 text-[10.5px] text-slate-400 mt-0.5 font-bold">
                      <span>{trans.date}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="bg-slate-100 px-2 py-0.2 rounded text-slate-500 uppercase tracking-wider text-[9px] font-bold">
                        {trans.category || 'Tabungan'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 ml-4 shrink-0">
                  <span className={`font-mono text-sm font-bold whitespace-nowrap ${
                    trans.type === 'receive' ? 'text-emerald-600' : 'text-slate-800'
                  }`}>
                    {trans.type === 'receive' ? '+' : '-'} Rp {trans.amount.toLocaleString('id-ID')}
                  </span>
                  
                  {/* Delete button (simulates refunds or corrections, fully active as requested) */}
                  <button
                    id={`trans-delete-btn-${trans.id}`}
                    onClick={() => {
                      if (confirm('Apakah Anda ingin membatalkan transaksi demo ini dan mengembalikan saldo rekening?')) {
                        deleteTransaction(trans.id, trans.amount, trans.type);
                      }
                    }}
                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-[#EE3124] rounded transition-colors cursor-pointer"
                    title="Batalkan Transaksi (Sistem Terpakai)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center">
              <History className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-slate-800 font-bold text-sm">Tidak Ada Transaksi Ditemukan</p>
              <p className="text-xs text-slate-400 mt-0.5">Silakan lakukan transfer atau pembayaran tagihan di atas untuk mengisi riwayat baru</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
