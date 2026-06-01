/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Tag, Calendar, Copy, Check, Info, Award, Utensils, ShoppingBag, Plane, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MerchantPromo } from '../types';

const INITIAL_PROMOS: MerchantPromo[] = [
  {
    id: 'p1',
    title: 'Diskon 50% di Starbucks Coffee',
    merchantName: 'Starbucks Coffee Indonesia',
    discountValue: '50% OFF',
    description: 'Nikmati minuman favorit Anda setengah harga menggunakan Kartu Debit atau Kartu Kredit OCTO klik.',
    code: 'OCTOSTARBUCKS50',
    category: 'kuliner',
    endDate: '31 Des 2026',
    terms: [
      'Berlaku di seluruh outlet Starbucks Indonesia.',
      'Minimum transaksi Rp 100.000 sebelum pajak.',
      'Maksimum potongan harga sebesar Rp 75.000.',
      'Berlaku setiap hari Jumat, Sabtu, dan Minggu.'
    ],
    usageCount: 1420,
    minTransaction: 100000
  },
  {
    id: 'p2',
    title: 'Potongan Rp 150.000 di Tokopedia',
    merchantName: 'Tokopedia Official',
    discountValue: 'Rp 150K',
    description: 'Promo belanja hemat akhir bulan untuk semua kebutuhan rumah tangga di official store Tokopedia.',
    code: 'OCTOTOPO150',
    category: 'belanja',
    endDate: '30 Sep 2026',
    terms: [
      'Berlaku khusus pembayaran penuh dengan Kartu Kredit OCTO klik.',
      'Min. transaksi Rp 1.500.000.',
      'Berlaku untuk semua kategori kecuali E-Gold dan Reksa Dana.',
      'Kuota harian terbatas.'
    ],
    usageCount: 845,
    minTransaction: 1500000
  },
  {
    id: 'p3',
    title: 'Cashback 20% Booking Tiket Garuda Indonesia',
    merchantName: 'Garuda Indonesia',
    discountValue: '20% CASHBACK',
    description: 'Terbang hemat ke rute domestik pilihan Anda dengan cashback spesial masuk langsung ke saldo tabungan.',
    code: 'OCTOGARUDA20',
    category: 'travel',
    endDate: '15 Okt 2026',
    terms: [
      'Cashback berlaku untuk pemesanan tiket pesawat kelas Ekonomi dan Bisnis.',
      'Maksimum cashback Rp 500.000 per transaksi per nomor rekening.',
      'Pemesanan dilakukan via website resmi Garuda Indonesia.',
      'Cashback akan dikreditkan maksimum H+7 setelah waktu penerbangan.'
    ],
    usageCount: 512,
    minTransaction: 2000000
  },
  {
    id: 'p4',
    title: 'Gratis 1 Bulan Premium Membership Spotify',
    merchantName: 'Spotify Music Indonesia',
    discountValue: '1 BLN GRATIS',
    description: 'Dengarkan lagu favoritmu bebas iklan dan simpan secara offline sepuasnya tanpa batas.',
    code: 'OCTOSPOTIFYONE',
    category: 'lifestyle',
    endDate: '30 Jun 2026',
    terms: [
      'Hanya berlaku untuk pengguna baru Spotify Premium.',
      'Harus mendaftarkan Kartu Kredit/Debit OCTO klik sebagai kartu utama.'
    ],
    usageCount: 2049,
    minTransaction: 0
  },
  {
    id: 'p5',
    title: 'Diskon 35% Makan Hemat di Sushi Tei',
    merchantName: 'Sushi Tei Restaurant',
    discountValue: '35% OFF',
    description: 'Rayakan momen kebersamaan dengan sushi autentik Jepang berkualitas premium bersama keluarga.',
    code: 'OCTOSUSHITEI35',
    category: 'kuliner',
    endDate: '15 Des 2026',
    terms: [
      'Hanya berlaku makan di tempat (Dine-In).',
      'Min. transaksi Rp 400.000 sebelum pajak/services.',
      'Maksimum diskon Rp 200.000 per bill.',
      'Tidak berlaku pisah struk pembayaran.'
    ],
    usageCount: 789,
    minTransaction: 400000
  },
  {
    id: 'p6',
    title: 'Potongan Belanja Rp 100.000 di Shopee',
    merchantName: 'Shopee Indonesia Store',
    discountValue: 'Rp 100K',
    description: 'Belanja aman dan nyaman barang incaran apa saja di Shopee Mall dengan diskon langsung.',
    code: 'OCTOSHOPEE100',
    category: 'belanja',
    endDate: '31 Des 2026',
    terms: [
      'Berlaku khusus pembelanjaan di Shopee Mall.',
      'Pilih metode pembayaran cicilan 0% kartu kredit OCTO klik.',
      'Min. transaksi Rp 1.000.000.',
      'Berlaku sekali per user id Shopee.'
    ],
    usageCount: 1650,
    minTransaction: 1000000
  },
  {
    id: 'p7',
    title: 'Hemat Rp 300.000 di Agoda Booking Hotel',
    merchantName: 'Agoda Domestic & Intl',
    discountValue: 'Rp 300K',
    description: 'Dapatkan penginapan impian dengan harga miring di hotel seluruh dunia untuk staycation seru.',
    code: 'OCTOAGODAHOTEL',
    category: 'travel',
    endDate: '28 Feb 2027',
    terms: [
      'Berlaku untuk seluruh akomodasi hotel di dalam dan luar negeri.',
      'Min. transaksi Rp 2.500.000.',
      'Harus memesan melalui landing page khusus agoda.com/octoklik'
    ],
    usageCount: 395,
    minTransaction: 2500000
  },
  {
    id: 'p8',
    title: 'Cashback Rp 50.000 Pembelian Tiket Bioskop XXI',
    merchantName: 'Cinema XXI Indonesia',
    discountValue: 'Cashback 50K',
    description: 'Nonton film blockbuster bioskop favorit Anda akhir pekan dengan cashback langsung.',
    code: 'OCTOXXICASH',
    category: 'lifestyle',
    endDate: '31 Agu 2026',
    terms: [
      'Berlaku untuk tiket Deluxe dan IMAX di weekend.',
      'Min. transaksi Rp 150.000.',
      'Harus melakukan pembayaran QRIS di loket pembayaran.'
    ],
    usageCount: 1110,
    minTransaction: 150000
  }
];

export default function PromoMerchant() {
  const [promos, setPromos] = useState<MerchantPromo[]>(INITIAL_PROMOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [selectedPromo, setSelectedPromo] = useState<MerchantPromo | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const filteredPromos = promos.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'semua' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'kuliner':
        return <Utensils className="w-4 h-4" />;
      case 'belanja':
        return <ShoppingBag className="w-4 h-4" />;
      case 'travel':
        return <Plane className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryImage = (category: string) => {
    switch (category) {
      case 'kuliner':
        return 'from-amber-50 to-orange-100/40';
      case 'belanja':
        return 'from-blue-50 to-indigo-100/40';
      case 'travel':
        return 'from-teal-50 to-emerald-100/40';
      default:
        return 'from-purple-50 to-pink-100/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-[#EE3124]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">Promo Diskon Merchant</h2>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Gunakan kartu OCTO klik Anda dan hemat belanja dengan diskon terbaik dari merchant rekanan kami.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs bg-red-50 border border-red-100 px-4 py-2 rounded-xl text-[#EE3124] font-bold">
          <Award className="w-4 h-4 text-[#EE3124] shrink-0" />
          <span>Reward poin berlipat ganda untuk setiap transaksi promo.</span>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="promo-search"
            type="text"
            placeholder="Cari merchant atau kata kunci promo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-sm text-slate-800 placeholder-slate-400 transition-all font-medium focus:ring-4 focus:ring-red-500/5"
          />
        </div>

        {/* Categories Tab selector */}
        <div className="lg:col-span-7 flex flex-wrap gap-2">
          {['semua', 'kuliner', 'belanja', 'travel', 'lifestyle'].map((cat) => (
            <button
              id={`promo-category-${cat}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-1.5 border ${
                selectedCategory === cat
                  ? 'bg-[#EE3124] border-[#EE3124] text-white shadow-md shadow-red-500/10'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50/80 shadow-sm'
              }`}
            >
              {cat !== 'semua' && getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Promos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPromos.length > 0 ? (
          filteredPromos.map((promo) => (
            <motion.div
              id={`promo-card-${promo.id}`}
              layout
              key={promo.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#EE3124]/30 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Visual Header */}
                <div className={`p-6 bg-gradient-to-br ${getCategoryImage(promo.category)} border-b border-slate-100 relative flex items-center justify-between`}>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-mono tracking-widest text-[#EE3124] uppercase font-extrabold">
                      {promo.category}
                    </span>
                    <h4 className="text-slate-900 font-extrabold text-base truncate group-hover:text-[#EE3124] transition-colors leading-tight">
                      {promo.merchantName}
                    </h4>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-slate-200 font-bold text-xs text-[#EE3124] shadow-sm ml-2 shrink-0">
                    {promo.discountValue}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <p className="text-slate-800 font-bold text-sm tracking-tight leading-tight line-clamp-2">
                      {promo.title}
                    </p>
                    <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mt-1">
                      {promo.description}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Hingga {promo.endDate}</span>
                    </div>
                    <span className="bg-slate-150 px-2.5 py-0.5 rounded text-slate-500 font-extrabold">
                      {promo.usageCount} Terpakai
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-auto">
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-2.5 mt-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-700 select-all shrink-0">
                    {promo.code}
                  </span>
                  <button
                    id={`promo-copy-btn-${promo.id}`}
                    onClick={() => handleCopyCode(promo.code)}
                    className="p-1.5 hover:bg-slate-200/50 text-slate-400 hover:text-slate-750 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                    title="Salin Kode Promo"
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-4 h-4 text-emerald-600 animate-scale" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    id={`promo-detail-btn-${promo.id}`}
                    onClick={() => setSelectedPromo(promo)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-all text-center flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Detail S&K</span>
                  </button>
                  <button
                    id={`promo-claim-btn-${promo.id}`}
                    onClick={() => alert(`Selamat! Voucher diskon dari "${promo.merchantName}" berhasil Anda simpan ke dompet penawaran OCTO klik Anda. Kartu utama Anda akan mendeteksi otomatis saat bertransaksi.`)}
                    className="w-full py-2 bg-red-50 hover:bg-[#EE3124] text-[#EE3124] hover:text-white rounded-xl text-xs font-bold border border-red-200/50 hover:border-transparent transition-all text-center cursor-pointer"
                  >
                    Klaim Promo
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm">
            <Tag className="w-10 h-10 text-slate-300 mb-3" />
            <span className="text-slate-800 font-extrabold text-base">Promo Tidak Ditemukan</span>
            <span className="text-slate-400 text-xs mt-1">Coba gunakan kata kunci pencarian atau kategori filter lainnya</span>
          </div>
        )}
      </div>

      {/* Copy notification popup feedback */}
      <AnimatePresence>
        {copiedCode && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 p-4 rounded-xl shadow-2xl flex items-center space-x-3 text-sm text-slate-800"
          >
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-extrabold text-slate-900 leading-none">Salin Berhasil</p>
              <p className="text-slate-500 text-xs mt-1">Kode <code className="text-[#EE3124] font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{copiedCode}</code> siap digunakan!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms and Conditions Detail Modal */}
      <AnimatePresence>
        {selectedPromo && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPromo(null)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-10"
            >
              {/* Modal Banner */}
              <div className={`p-6 bg-gradient-to-br ${getCategoryImage(selectedPromo.category)} border-b border-slate-150`}>
                <span className="text-xs font-mono tracking-widest text-[#EE3124] uppercase font-bold bg-white/60 px-2 py-0.5 rounded-md border border-red-100">
                  {selectedPromo.category}
                </span>
                <h3 className="text-slate-900 font-extrabold text-xl mt-3 leading-tight">{selectedPromo.merchantName}</h3>
                <p className="text-[#EE3124] font-bold mt-1 text-sm">{selectedPromo.title}</p>
              </div>

              {/* Terms Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi Promo</h4>
                  <p className="text-slate-650 text-sm mt-2 leading-relaxed font-semibold">{selectedPromo.description}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Syarat & Ketentuan Pemakaian</h4>
                  <ul className="space-y-2">
                    {selectedPromo.terms.map((term, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-slate-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-[#EE3124] rounded-full shrink-0 mt-2" />
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedPromo.minTransaction !== undefined && (
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-505 font-bold">
                    <span>Minimum Pembayaran:</span>
                    <strong className="text-slate-900 text-sm font-black">
                      {selectedPromo.minTransaction === 0 ? 'Tidak Ada Min.' : `Rp ${selectedPromo.minTransaction.toLocaleString('id-ID')}`}
                    </strong>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-55 border-t border-slate-200 p-4 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Berlaku s/d {selectedPromo.endDate}</span>
                <div className="flex space-x-2">
                  <button
                    id="modal-close"
                    onClick={() => setSelectedPromo(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    id="modal-copy"
                    onClick={() => {
                      handleCopyCode(selectedPromo.code);
                      setSelectedPromo(null);
                    }}
                    className="px-4 py-2 bg-[#EE3124] hover:bg-red-650 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin Kode</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
