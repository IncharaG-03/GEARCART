"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import catalogData from '@/data/products.json';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 2) { setResults([]); return; }

    const matches = [];
    catalogData.forEach(cat => {
      if (cat.name.toLowerCase().includes(val.toLowerCase())) {
        matches.push({ name: cat.name, url: `/category/${cat.id}`, type: 'Category' });
      }
      cat.groups?.forEach(group => {
        group.subCategories?.forEach(sub => {
          if (sub.name.toLowerCase().includes(val.toLowerCase())) {
            matches.push({ name: sub.name, url: `/category/${cat.id}/${slugify(sub.name)}`, type: 'Section' });
          }
          sub.nestedItems?.forEach(item => {
            if (item.name.toLowerCase().includes(val.toLowerCase())) {
              matches.push({ 
                name: item.name, 
                url: `/category/${cat.id}/${slugify(sub.name)}/${slugify(item.name)}`, 
                type: 'Product' 
              });
            }
          });
        });
      });
    });
    setResults(matches.slice(0, 8));
  };

  return (
    <div className="relative w-full">
      <div className="flex items-stretch bg-white border border-gray-300 focus-within:border-[#1f5a2b] shadow-[inset_0_1px_1px_rgba(0,0,0,0.03)] overflow-hidden">
        <input 
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search"
          className="w-full px-3 py-1 text-[14px] outline-none bg-transparent placeholder-gray-400 text-gray-800"
        />
        <button className="px-3 flex items-center justify-center text-gray-400 hover:text-[#1f5a2b] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl z-[999] mt-1">
          {results.map((res, i) => (
            <div 
              key={i} 
              onClick={() => { router.push(res.url); setResults([]); setQuery(''); }}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 flex justify-between items-center"
            >
              <span className="text-[13px] text-[#003366] font-bold">{res.name}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest">{res.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}