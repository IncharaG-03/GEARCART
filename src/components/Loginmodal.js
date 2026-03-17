"use client";
import { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    setTimeout(() => {
      setIsLoggingIn(false);
      onLoginSuccess(); // THIS CHANGES THE HEADER TEXT
      onClose(); 
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm bg-white shadow-2xl border border-gray-200 rounded-sm">
        <div className="bg-[#1f5a2b] p-4 flex justify-between items-center text-white font-black uppercase">
          <span>Log In</span>
          <button onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="email" placeholder="Email" required className="w-full border p-2 text-black outline-none focus:border-[#1f5a2b]" />
          <input type="password" placeholder="Password" required className="w-full border p-2 text-black outline-none focus:border-[#1f5a2b]" />
          <button 
            type="submit"
            className="w-full bg-[#1f5a2b] text-white font-black py-3 uppercase tracking-tight disabled:bg-gray-400"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging In..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}