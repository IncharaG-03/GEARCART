"use client";
import Link from 'next/link';
import catalogData from '@/data/products.json';

export default function FlyoutMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-[100] transition-opacity" 
        onClick={onClose}
      />

      {/* Side Menu */}
      <div className="fixed top-0 left-0 h-full w-[350px] bg-white z-[101] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left duration-300">
        
        {/* Header Area */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-[24px] font-black tracking-tighter text-[#1f5a2b]">
            GEARCART
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Categories List - Images Removed */}
        <div className="flex-1 overflow-y-auto">
          {catalogData.map((category) => (
            <Link 
              key={category.id}
              href={`/category/${category.id}`}
              onClick={onClose}
              className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
            >
              <span className="text-[15px] font-bold text-gray-800 group-hover:text-[#1f5a2b]">
                {category.name}
              </span>
              <span className="text-gray-300 group-hover:text-[#1f5a2b] font-light text-xl">
                ›
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}