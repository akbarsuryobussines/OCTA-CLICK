/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CreditCard, Check, ShieldCheck, Landmark, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CreditCardProduct, CreditCardApplication } from '../types';

const CARD_DATA: CreditCardProduct[] = [
  {
    id: 'cc1',
    name: 'OCTO Titanium Infinite',
    type: 'Premium',
    minIncome: 15000000, // Rp 15 Juta min
    annualFee: 'Rp 600.000 (Gratis iuran 1 tahun pertama)',
    features: [
      '3x Reward Point untuk transaksi restauran dan travel.',
      'Akses gratis Airport Lounge di seluruh bandara besar Indonesia.',
      'Asuransi perlindungan bagasi dan keterlambatan terbang hingga Rp 10 Juta.',
      'Suku bunga cicilan rendah 1.2% per bulan.'
    ],
    bannerColor: 'from-slate-900 via-slate-850 to-slate-950',
    benefitsSummary: 'Limit premium & Lounge bandara gratis'
  },
  {
    id: 'cc2',
    name: 'OCTO Everyday Cashback',
    type: 'Cashback',
    minIncome: 5000000, // Rp 5 Juta min
    annualFee: 'Rp 200.000 / Tahun (Gratis bila transaksi bulanan > 3x)',
    features: [
      'Cashback 5% berbelanja di supermarket besar (Indomaret, Alfamart, Superindo).',
      'Cashback 3% pengisian BBM di seluruh SPBU Shell & Pertamina.',
      'Konversi cicilan 0% instan untuk semua belanja ritel hingga 6 bulan.',
      'Potongan diskon tambahan belanja merchant up to 20%.'
    ],
    bannerColor: 'from-red-650 via-red-800 to-amber-950',
    benefitsSummary: 'Cashback belanja harian & hemat pengisian BBM'
  },
  {
    id: 'cc3',
    name: 'OCTO World Travel Card',
    type: 'Travel',
    minIncome: 10000000, // Rp 10 Juta min
    annualFee: 'Rp 500.000 (Bebas biaya iuran selamanya jika pemakaian aktif)',
    features: [
      'Double KrisFlyer / GarudaMiles mileages untuk setiap transaksi penerbangan.',
      'Nilai tukar mata uang asing terbaik saat bepergian ke luar negeri.',
      'Diskon spesial reservasi Agoda, Booking.com, dan Expedia up to Rp 500.000.',
      'Layanan darurat medis internasional komprehensif.'
    ],
    bannerColor: 'from-teal-800 via-slate-900 to-zinc-950',
    benefitsSummary: 'Kumpulkan miles penerbangan tercepat'
  },
  {
    id: 'cc4',
    name: 'OCTO Shopper Gold Card',
    type: 'Shopping',
    minIncome: 3000000, // Rp 3 Juta min
    annualFee: 'Rp 150.000 (Gratis seumur hidup tanpa syarat)',
    features: [
      'Voucher belanja Tokopedia / Shopee senilai Rp 100K khusus pendaftaran sukses.',
      'Bunga cicilan 0% hingga 12 bulan untuk pembelian gadget.',
      'Ekstra diskon merchant e-commerce rekanan setiap tanggal kembar (11.11, 12.12).',
      'Tanpa batas minimum transaksi bulanan.'
    ],
    bannerColor: 'from-purple-900 via-indigo-950 to-fuchsia-950',
    benefitsSummary: 'Idola belanja online e-commerce diskon melimpah'
  }
];

export default function SimulasiKartuKredit() {
  const [selectedCardId, setSelectedCardId] = useState<string>('cc2');
  const [income, setIncome] = useState<number>(8500000);
  const [nik, setNik] = useState<string>('');
  const [fullName, setFullName] = useState<string>('Akbar');
  const [phone, setPhone] = useState<string>('081234567890');
  const [email, setEmail] = useState<string>('akbarsuryobussines@gmail.com');
  const [employmentType, setEmploymentType] = useState<string>('Karyawan Swasta');
  
  const [submitState, setSubmitState] = useState<'idle' | 'processing' | 'result'>('idle');
  const [applicationResult, setApplicationResult] = useState<CreditCardApplication | null>(null);

  const selectedCard = CARD_DATA.find(c => c.id === selectedCardId) || CARD_DATA[0];

  // Helper salary check
  const isEligible = income >= selectedCard.minIncome;

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (nik.length < 16) {
      alert('Nomor Induk Kependudukan (NIK) harus berjumlah 16 digit angka yang valid!');
      return;
    }

    setSubmitState('processing');

    // Simulate complete server scoring check
    setTimeout(() => {
      const isApproved = income >= selectedCard.minIncome;
      let limit = 0;
      let status: 'Approved' | 'Rejected' = 'Rejected';
      let notes = '';

      if (isApproved) {
        status = 'Approved';
        // Base credit limit is usually ~3x income, capped by product
        limit = Math.min(income * 2.5, selectedCard.id === 'cc1' ? 100000000 : 30000000);
        notes = `Selamat! Pengajuan kartu kredit ${selectedCard.name} Anda disetujui secara prinsip oleh Digital Engine OCTO Klik. Kartu digital akan terbit di aplikasi OCTO Mobile dalam 24 Jam.`;
      } else {
        status = 'Rejected';
        notes = `Mohon maaf, pengajuan kartu ${selectedCard.name} ditangguhkan sementara karena pendapatan minimum terdaftar belum mencukupi kualifikasi produk ini (Minimal Rp ${selectedCard.minIncome.toLocaleString('id-ID')}/bulan). Saran kami, Anda dapat mencoba mengajukan tipe kartu Shopper Gold Card atau menaikkan jaminan saldo.`;
      }

      setApplicationResult({
        fullName,
        nik,
        phoneNumber: phone,
        email,
        monthlyIncome: income,
        employmentType,
        cardId: selectedCardId,
        status,
        approvedLimit: limit,
        notes
      });
      setSubmitState('result');
    }, 2800);
  };

  const handleReset = () => {
    setSubmitState('idle');
    setApplicationResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-[#EE3124]" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">Simulasi Kartu Kredit Instan</h2>
        </div>
        <p className="text-slate-500 text-sm mt-1">
          Pilih jenis kartu impian Anda, hitung kesesuaian limit penawaran berdasarkan penghasilan bulanan, dan dapatkan status persetujuan seketika.
        </p>
      </div>

      {submitState !== 'result' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Card Products Catalog Selection (left-hand side) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Jenis Kartu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CARD_DATA.map((card) => {
                const fitsSalary = income >= card.minIncome;
                return (
                  <button
                    id={`cc-select-${card.id}`}
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    className={`text-left rounded-2xl border transition-all relative overflow-hidden group flex flex-col justify-between p-5 min-h-[185px] cursor-pointer shadow-sm ${
                      selectedCardId === card.id
                        ? 'border-[#EE3124] bg-white ring-2 ring-[#EE3124]/5'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {/* Visual Card representation inside item */}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-4">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                          card.type === 'Premium' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-red-50 text-[#EE3124] border border-red-100'
                        }`}>
                          {card.type}
                        </span>
                        <div className="w-6 h-4 bg-amber-400 rounded-md border border-amber-500/50 flex items-center justify-center opacity-70">
                          <span className="w-1.5 h-full border-r border-amber-600/30" />
                          <span className="w-1.5 h-full" />
                        </div>
                      </div>
                      <h4 className="text-base font-black text-slate-800 group-hover:text-[#EE3124] transition-colors line-clamp-1">
                        {card.name}
                      </h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2 font-semibold">
                        {card.benefitsSummary}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center text-[11px] font-bold">
                        <span className="text-slate-400 uppercase tracking-wider">Min. Penghasilan:</span>
                        <strong className={`font-mono ${fitsSalary ? 'text-emerald-600' : 'text-amber-500'}`}>
                          Rp {(card.minIncome / 1000).toLocaleString('id-ID')}K/bln
                        </strong>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Card Benefits Detail Section */}
            <motion.div
              layout
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-4 gap-2">
                <div>
                  <h4 className="text-slate-800 font-extrabold text-base flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-[#EE3124] rounded-full shrink-0" />
                    <span>Fitur {selectedCard.name}</span>
                  </h4>
                  <span className="text-slate-400 text-xs font-bold block mt-1">Iuran Tahunan: {selectedCard.annualFee}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Kualifikasi:</span>
                  <div className={`text-xs font-bold ${isEligible ? 'text-emerald-650' : 'text-red-500'} mt-0.5`}>
                    {isEligible ? '✓ Pendapatan Memenuhi Syarat' : '✕ Pendapatan Kurang Cukup'}
                  </div>
                </div>
              </div>

              <ul className="space-y-3">
                {selectedCard.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* SIMULATION FORM (right-hand side) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">Form Pengajuan Simulasi</h3>

            <form onSubmit={handleSimulate} className="space-y-5">
              {/* Card visual showcase */}
              <div className={`p-5 rounded-2xl bg-gradient-to-br ${selectedCard.bannerColor} border border-white/10 relative overflow-hidden shadow-md min-h-[140px] flex flex-col justify-between font-mono`}>
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-white/5 rounded-full blur-[30px] pointer-events-none" />
                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-150 tracking-wider">OCTO Klik Platinum</span>
                    <h5 className="text-white font-black text-xs sm:text-sm mt-0.5 font-sans whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                      {selectedCard.name}
                    </h5>
                  </div>
                  <Landmark className="w-5 h-5 text-white/50 shrink-0" />
                </div>
                <div className="z-10 mt-6 md:mt-8">
                  <p className="text-[14px] text-white tracking-widest font-black">4512 8820 1205 9184</p>
                  <p className="text-[9px] text-slate-350 mt-2 uppercase tracking-wide">Card Member: {fullName || 'Nama Lengkap'}</p>
                </div>
              </div>

              {/* Monthly Income input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Penghasilan Bersih Bulanan (Rp)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <span className="text-xs font-extrabold font-mono">Rp</span>
                  </div>
                  <input
                    id="simulate-income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-sm text-slate-800 placeholder-slate-400 font-mono tracking-wide focus:ring-4 focus:ring-red-500/5 font-extrabold"
                    placeholder="Contoh: 8500000"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold">
                  Semakin tinggi pendapatan bersih bulanan, penawaran limit kredit awal Anda akan semakin besar.
                </p>
              </div>

              {/* Full Name input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Nama Lengkap (Sesuai KTP)</label>
                <div className="relative">
                  <input
                    id="simulate-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-sm text-slate-800 font-black focus:ring-4 focus:ring-red-500/5"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                  />
                </div>
              </div>

              {/* NIK Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">16 Digit NIK (KTP)</label>
                <div className="relative">
                  <input
                    id="simulate-nik"
                    type="text"
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-sm text-slate-800 placeholder-slate-400 font-mono focus:ring-4 focus:ring-red-500/5 font-extrabold"
                    placeholder="Contoh: 3171010202950003"
                    required
                  />
                </div>
              </div>

              {/* Contact info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">No. Handphone</label>
                  <input
                    id="simulate-phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-xs text-slate-700 font-semibold focus:ring-4 focus:ring-red-500/5"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block">E-Mail Aktif</label>
                  <input
                    id="simulate-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-xs text-slate-700 font-semibold focus:ring-4 focus:ring-red-500/5"
                    required
                  />
                </div>
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Status Kepegawaian</label>
                <select
                  id="simulate-employment-status"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-sm text-slate-750 font-extrabold cursor-pointer focus:ring-4 focus:ring-red-500/5"
                >
                  <option value="Karyawan Swasta">Karyawan Swasta</option>
                  <option value="Pengusaha / Wiraswasta">Wiraswasta / Profesional</option>
                  <option value="PNS / Pegawai BUMN">PNS / Pegawai BUMN</option>
                  <option value="Mahasiswa / Fresh Graduate">Belum Memiliki Pekerjaan Tetap</option>
                </select>
              </div>

              {/* Submit Trigger Actions */}
              <div className="pt-4">
                {submitState === 'processing' ? (
                  <button
                    id="simulate-submit-spinner"
                    type="button"
                    disabled
                    className="w-full py-3 bg-slate-50 text-slate-400 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center space-x-2 border border-slate-200"
                  >
                    <Loader2 className="w-5 h-5 text-[#EE3124] animate-spin" />
                    <span>Menganalisis Kelayakan SLIK OJK...</span>
                  </button>
                ) : (
                  <button
                    id="simulate-submit"
                    type="submit"
                    className="w-full py-3 bg-[#EE3124] hover:bg-[#EE3124]/90 text-white rounded-xl font-bold text-sm tracking-wide shadow-md shadow-red-500/10 transition-all text-center cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Ajukan Simulasi Instant</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </form>
          </div>

        </div>
      ) : (
        /* application outcome view */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto space-y-8 shadow-sm"
        >
          {applicationResult?.status === 'Approved' ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl font-black">
                ✓
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-emerald-600 uppercase font-black px-2.5 py-1 bg-emerald-50 rounded border border-emerald-200">
                  Lolos Kualifikasi Instan (Approved)
                </span>
                <h3 className="text-slate-900 font-extrabold text-2xl tracking-tight mt-3">Persis Seperti Sesuai Ekspektasi!</h3>
                <p className="text-slate-550 text-sm mt-1 font-semibold">Kami merekomendasikan limit kredit penawaran perdana sebesar:</p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-100 py-4 px-6 rounded-2xl max-w-sm mx-auto font-mono text-center">
                <span className="text-xs text-emerald-600 font-black uppercase tracking-wider block">Limit Kredit Awal Estimasi</span>
                <span className="text-slate-900 font-black text-2xl sm:text-3xl mt-1 block">
                  Rp {Math.round(applicationResult.approvedLimit || 0).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-50 border border-red-105 text-[#EE3124] rounded-full flex items-center justify-center mx-auto mb-2 text-2xl font-black">
                !
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-[#EE3124] uppercase font-black px-2.5 py-1 bg-red-50 rounded border border-red-100">
                  Ditangguhkan (Review Needed)
                </span>
                <h3 className="text-slate-900 font-extrabold text-2xl tracking-tight mt-3">Perlu Penyesuaian Saldo Jaminan</h3>
                <p className="text-slate-550 text-sm mt-1 font-semibold">Pendapatan minimum belum sesuai standar dari kartu yang bersangkutan</p>
              </div>
            </div>
          )}

          {/* Core Decision breakdown boxes */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs text-slate-600 font-bold">
            <h4 className="text-slate-800 font-extrabold text-xs uppercase tracking-wider border-b border-slate-200 pb-2.5 flex items-center space-x-1.5 font-sans">
              <ShieldCheck className="w-4 h-4 text-[#EE3124]" />
              <span>Detail Hasil Skor SLIK</span>
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 font-bold block">Nama Pemohon:</span>
                <strong className="text-slate-800 font-extrabold">{applicationResult?.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">NIK No. KTP:</span>
                <strong className="text-slate-800 font-mono">{applicationResult?.nik}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Gaji Dilaporkan:</span>
                <strong className="text-slate-800">Rp {applicationResult?.monthlyIncome.toLocaleString('id-ID')}/bln</strong>
              </div>
              <div>
                <span className="text-slate-400 font-bold block">Tipe Pekerjaan:</span>
                <strong className="text-slate-800">{applicationResult?.employmentType}</strong>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed pt-3 border-t border-slate-200 font-semibold">
              {applicationResult?.notes}
            </p>
          </div>

          {/* Reset buttons */}
          <div className="flex space-x-4">
            <button
              id="simulate-reset"
              onClick={handleReset}
              className="w-1/2 py-2.5 bg-white hover:bg-slate-50 text-slate-705 rounded-xl border border-slate-200 text-xs font-extrabold transition-all cursor-pointer text-center"
            >
              Ulangi Simulasi Baru
            </button>
            <button
              id="simulate-claim-marketing"
              onClick={() => {
                alert(`Pengajuan kartu kredit ${selectedCard.name} Anda dengan limit Rp ${(applicationResult?.approvedLimit || 15000000).toLocaleString('id-ID')} telah dikirimkan ke database representatif sales bank. Kami akan segera menghubungi nomor ${phone} dalam 1 jam jam kerja.`);
              }}
              className="w-1/2 py-2.5 bg-[#EE3124] hover:bg-red-650 text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
            >
              Kirim Pengajuan Resmi
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
