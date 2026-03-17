"use client";
import catalogData from '@/data/products.json';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-60 border-r border-gray-90 bg-white fixed left-0 top-[95px] h-[calc(100vh-102px)] overflow-y-auto z-20">
      {/* Sidebar Header: Flush with the top */}
      <div className="px-6 h-[20px] flex items-center border-b border-gray-100 text-[11px] font-bold uppercase tracking-[0.2em] text-black bg-white">
        Choose a Category
      </div>

      <nav>
        <ul className="flex flex-col">
          {catalogData.map((category) => {
            const isActive = pathname.includes(category.id);

            return (
              <li key={category.id} className="border-b border-gray-50">
                <Link 
                  href={`/category/${category.id}`}
                  className={`flex items-center px-6 py-3.5 transition-colors ${
                    isActive ? 'bg-[#fffdf2]' : 'hover:bg-[#fffdf2]'
                  }`}
                >
                  <span className={`text-[12px] font-bold tracking-tight leading-tight group-hover:underline decoration-1 underline-offset-4 ${
                    isActive ? 'text-black' : 'text-[#1f5a2b]'
                  }`}>
                    {category.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}