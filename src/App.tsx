/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  Coins, 
  Tag, 
  Calculator, 
  CreditCard, 
  LogOut, 
  User, 
  Bell, 
  Globe, 
  Menu, 
  X,
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our custom modules
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PromoMerchant from './components/PromoMerchant';
import KalkulatorCicilan from './components/KalkulatorCicilan';
import SimulasiKartuKredit from './components/SimulasiKartuKredit';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'promos' | 'calculator' | 'creditcard'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setMobileMenuOpen(false);
  };

  // If there's no active user session, direct them to the login experience
  if (!currentUser) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col lg:flex-row relative font-sans">
      
      {/* LEFT SIDEBAR - Visible on Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#1E293B] flex-shrink-0 flex-col h-screen sticky top-0 border-r border-[#1E293B]/20 z-25">
        {/* Sidebar Brand Header */}
        <div className="p-5 bg-[#EE3124] flex items-center gap-3 shadow-md">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-[#EE3124] shadow-sm">OK</div>
          <div>
            <h1 className="text-white font-extrabold text-lg tracking-tight leading-none">OCTO Klik</h1>
            <span className="text-[9px] text-white/70 uppercase tracking-widest font-mono mt-0.5 block">Digital Banking</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 mt-4">
          <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider px-3 mb-2">Menu Layanan</div>
          {[
            { id: 'dashboard', label: 'Dashboard Utama', icon: <Building2 className="w-4 h-4" /> },
            { id: 'promos', label: 'Promo Merchant', icon: <Tag className="w-4 h-4" /> },
            { id: 'calculator', label: 'Kalkulator Cicilan', icon: <Calculator className="w-4 h-4" /> },
            { id: 'creditcard', label: 'Simulasi Kartu Kredit', icon: <CreditCard className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              id={`nav-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#EE3124] text-white shadow-md shadow-red-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Bottom Profile */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="bg-slate-800 p-3 rounded-xl flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#EE3124] rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                A
              </div>
              <div className="min-w-0">
                <div className="text-white text-xs font-bold truncate">{currentUser}</div>
                <div className="text-slate-400 text-[9px] font-mono tracking-wider font-semibold">PREMIUM MEMBER</div>
              </div>
            </div>
            <button
              id="sidebar-logout-btn"
              onClick={handleLogout}
              className="p-1.5 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER BAR - Visible on Mobile and Tablet only */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EE3124] flex items-center justify-center font-bold text-white shadow-sm">
            OK
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base tracking-tight leading-none">
              OCTO <span className="text-[#EE3124]">klik</span>
            </h1>
            <span className="text-[8px] text-slate-500 block uppercase tracking-widest font-mono mt-0.5">Digital Banking</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mobile Notification Button */}
          <button
            id="mobile-notification-btn"
            onClick={() => {
              setUnreadNotifications(0);
              alert('Tiga penawaran spesial baru dari Starbucks, Agoda, dan Sushi Tei aktif hari ini!');
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-all relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#EE3124] rounded-full"></span>
            )}
          </button>

          <button
            id="mobile-menu-switcher"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </header>

      {/* Mobile Responsive Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900 border-b border-slate-800 z-35 sticky top-[53px]"
          >
            <div className="p-4 space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard Utama', icon: <Building2 className="w-4 h-4 text-[#EE3124]" /> },
                { id: 'promos', label: 'Promo Merchant', icon: <Tag className="w-4 h-4 text-[#EE3124]" /> },
                { id: 'calculator', label: 'Kalkulator Cicilan', icon: <Calculator className="w-4 h-4 text-[#EE3124]" /> },
                { id: 'creditcard', label: 'Simulasi Kartu Kredit', icon: <CreditCard className="w-4 h-4 text-[#EE3124]" /> }
              ].map((tab) => (
                <button
                  id={`mobile-nav-${tab.id}`}
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#EE3124] text-white'
                      : 'text-slate-300 hover:text-white bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}

              <div className="p-3 bg-slate-800/80 rounded-xl mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-[#EE3124] text-white rounded-full flex items-center justify-center font-bold text-xs">A</div>
                  <span className="text-slate-300 text-xs font-bold">{currentUser}</span>
                </div>
                <button
                  id="mobile-logout-drawer"
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-[#EE3124] hover:text-white transition-all cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER BODY */}
      <div className="flex-1 flex flex-col relative min-w-0">
        
        {/* DESKTOP MAIN HEADER BAR */}
        <header className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 shrink-0 z-20">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-bold text-slate-800">
              Selamat Datang, <span className="text-slate-900 font-extrabold">{currentUser}</span>
            </h2>
            <div className="h-4 w-[1px] bg-slate-200" />
            <span className="text-xs text-slate-500 font-mono tracking-wide">
              M-Banking Terlindung Aman • OJK Terdaftar
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Last login details as requested in Professional design */}
            <div className="text-xs text-slate-500 font-medium">
              Login Terakhir: <span className="font-mono font-bold text-slate-700">Hari ini, 10:15 WIB</span>
            </div>

            {/* Notifications Alert icon button */}
            <button
              id="header-notification-btn"
              onClick={() => {
                setUnreadNotifications(0);
                alert('Tiga promo terpopuler eksklusif untuk Anda dari Starbucks Coffee, Agoda, dan Sushi Tei telah aktif di saldo penawaran Anda.');
              }}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 hover:text-slate-950 transition-all relative border border-slate-200/50 cursor-pointer"
              title="Notifikasi Penawaran Spesial"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#EE3124] rounded-full"></span>
              )}
            </button>

            {/* Logout button */}
            <button
              id="header-logout-btn"
              onClick={handleLogout}
              className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 hover:text-slate-800 transition-all border border-slate-200/50 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* CONTAINER FOR TAB ACTIVE CONTENTS */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto z-10 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-7xl mx-auto"
            >
              {activeTab === 'dashboard' && <Dashboard username={currentUser} />}
              {activeTab === 'promos' && <PromoMerchant />}
              {activeTab === 'calculator' && <KalkulatorCicilan />}
              {activeTab === 'creditcard' && <SimulasiKartuKredit />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* CORPORATE LEGAL SECURITY FOOTER */}
        <footer className="bg-slate-100 border-t border-slate-250 py-6 text-center text-[10px] text-slate-500 font-medium z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <div className="flex flex-wrap justify-center items-center gap-4 text-slate-600 font-bold uppercase tracking-wider text-[9px]">
              <span className="flex items-center"><Lock className="w-3.5 h-3.5 text-[#EE3124] mr-1" /> Enkripsi SSL 256-Bit</span>
              <span>Syarat & Ketentuan Umum</span>
              <span>Kebijakan Privasi</span>
              <span className="flex items-center"><Globe className="w-3.5 h-3.5 text-slate-500 mr-1" /> Bahasa Indonesia (ID)</span>
            </div>
            <p className="leading-relaxed max-w-4xl mx-auto">
              © 2026 PT Bank OCTO klik Indonesia Tbk. Terdaftar dan diawasi oleh OJK (Otoritas Jasa Keuangan) serta merupakan peserta penjaminan Lembaga Penjamin Simpanan (LPS). Promo diskon merchant, simulasi pengajuan kartu kredit, dan kalkulator cicilan di atas merupakan visualisasi promosi digital interaktif. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}

