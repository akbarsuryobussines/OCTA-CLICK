/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, User, ShieldAlert, Eye, EyeOff, Coins } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay for premium feel
    setTimeout(() => {
      if (username === 'Akbar' && password === 'akbar') {
        onLoginSuccess(username);
      } else {
        setError('Username atau Password salah! Gunakan "Akbar" dan "akbar".');
        setIsLoading(false);
      }
    }, 1000);
  };

  const autofillDemo = () => {
    setUsername('Akbar');
    setPassword('akbar');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-[#F1F5F9] via-[#F8FAFC] to-white p-4 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-[#EE3124]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-4 z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EE3124] flex items-center justify-center shadow-lg shadow-red-500/20">
            <Coins className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-800">
              OCTO <span className="text-[#EE3124]">klik</span>
            </span>
            <div className="text-[9px] text-slate-500 font-mono tracking-widest uppercase font-bold">Digital Banking</div>
          </div>
        </div>
        <div className="text-xs text-mono text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          Secure Core Integration v2.4
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center z-10 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-xl shadow-slate-200/50"
        >
          {/* Welcoming Text */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-red-50 text-[#EE3124] rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-inner">
              OK
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Selamat Datang</h1>
            <p className="text-slate-500 text-sm mt-1">
              Silakan login ke platform perbankan digital <strong className="text-[#EE3124]">OCTO klik</strong> Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-700 text-xs"
              >
                <ShieldAlert className="w-4.5 h-4.5 text-[#EE3124] shrink-0" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-all focus:ring-4 focus:ring-red-500/5 font-medium"
                  placeholder="Masukkan Username Anda"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#EE3124] focus:outline-none text-slate-800 placeholder-slate-400 text-sm transition-all focus:ring-4 focus:ring-red-500/5 font-mono tracking-widest text-lg"
                  placeholder="••••••••"
                  required
                />
                <button
                  id="login-toggle-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              id="login-submit-button"
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#EE3124] hover:bg-red-600 text-white rounded-xl font-bold text-sm tracking-wide shadow-md shadow-red-500/10 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-55"
            >
              {isLoading ? (
                <>
                  <div className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memverifikasi Sandi...</span>
                </>
              ) : (
                <span>Masuk Sekarang</span>
              )}
            </button>
          </form>

          {/* Quick Demo Assist */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500">Mencoba demo? Klik di bawah untuk mengisinya:</span>
            <button
              id="login-autofill-demo"
              onClick={autofillDemo}
              className="mt-2 block mx-auto text-xs font-bold text-[#EE3124] hover:text-red-700 underline transition-colors cursor-pointer"
            >
              Gunakan Akun Penguji (Akbar / akbar)
            </button>
          </div>
        </motion.div>
      </main>

       {/* Footer bar */}
      <footer className="w-full text-center py-4 z-10 text-[11px] text-slate-500 border-t border-slate-200/50">
        <p>© 2026 PT Bank OCTO klik Indonesia Tbk. Terdaftar dan diawasi oleh OJK dan merupakan peserta penjaminan LPS.</p>
      </footer>
    </div>
  );
}

