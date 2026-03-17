"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Searchbar from './Searchbar'; 
import FlyoutMenu from './Flyoutmenu';
import LoginModal from './Loginmodal';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Track if the user is actually logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 font-sans sticky top-0 z-50">
      
      <FlyoutMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Pass the login function to the modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={() => setIsLoggedIn(true)} 
      />

      <div className="flex justify-between items-center px-8 py-1.5 text-[11px] font-bold text-[#1f5a2b]">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:underline group"
          onClick={() => setIsMenuOpen(true)}
        >
          <div className="flex flex-col justify-between w-3.5 h-2">
            <span className="h-[1.5px] w-full bg-[#1f5a2b]"></span>
            <span className="h-[1.5px] w-full bg-[#1f5a2b]"></span>
            <span className="h-[1.5px] w-full bg-[#1f5a2b]"></span>
          </div>
          <span className="uppercase tracking-tight">Browse Catalog</span>
        </div>
        
        <div className="flex items-center gap-6 text-gray-500 font-medium">
          <span className="hidden sm:inline">(+91) 7899951746</span>
          <span className="text-gray-200">|</span>
          { /*<span className="hover:underline cursor-pointer uppercase text-[10px]">Email Us</span>
          <span className="text-gray-200">|</span>*/}
          
          {/* Dynamic Login / User Display */}
          <div 
            className="flex items-center gap-1 cursor-pointer hover:underline font-black text-[#1f5a2b] uppercase"
            onClick={() => !isLoggedIn && setIsLoginOpen(true)}
          >
            {isLoggedIn ? (
              <span className="flex items-center gap-1">
                USER <span className="text-[10px] bg-[#1f5a2b] text-white px-1 rounded-sm"></span>
              </span>
            ) : (
              <>LOG IN <span className="text-[8px] translate-y-[0.5px]">▼</span></>
            )}
          </div>
        </div>
      </div>

      {/* ... Rest of your branding and search row ... */}
      <div className="flex items-center px-8 py-2.5 gap-10">
        <div className="text-[28px] font-black tracking-[-0.06em] text-[#1f5a2b] leading-none cursor-pointer" onClick={() => router.push('/')}>
          GEARCART
        </div>
        <div className="flex-1 max-w-[550px]">
          <Searchbar />
        </div>
        <div className="flex gap-8 text-[13px] font-black text-[#1f5a2b] ml-auto uppercase tracking-tighter">
          {/*<span className="cursor-pointer hover:underline">Order</span>
          <span className="cursor-pointer hover:underline">Order History</span>*/}
        </div>
      </div>
      <div className="h-[2px] bg-[#ffcc00] w-full"></div>
    </header>
  );
}