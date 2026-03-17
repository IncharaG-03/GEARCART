"use client";
import { useParams } from 'next/navigation';
import catalogData from '@/data/products.json';
import Link from 'next/link';

export default function CategoryLandingPage() {
  const { catId } = useParams();

  // Find category by ID or slugified name
  const category = catalogData.find(c => 
    c.id === catId || c.name.toLowerCase().replace(/\s+/g, '-') === catId
  );

  if (!category) return <div className="p-20 text-center text-gray-500">Category not found.</div>;

  const groups = category.groups || category.Categories || [];

  return (
    <div className="bg-white min-h-screen p-8">
      {/* --- BREADCRUMB ROUTING --- */}
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wider mb-8">
        <Link href="/" className="hover:text-[#336633] hover:underline">Catalog</Link>
        <span>/</span>
        <span className="text-black font-bold">{category.name}</span>
      </nav>

      <h1 className="text-[#336633] text-[28px] font-bold mb-10 flex items-center">
        <span className="bg-[#336633] w-1.5 h-8 mr-4"></span>
        {category.name}
      </h1>

      {groups.map((group, gIdx) => (
        <div key={gIdx} className="mb-12">
          <h3 className="text-[14px] font-bold text-black mb-6 border-l border-gray-300 pl-4 uppercase tracking-widest">
            {group.name}
          </h3>

          <div className="flex flex-wrap gap-8">
            {(group.subCategories || group.items || [])?.map((sub, sIdx) => {
              const subId = sub.id || sub.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link 
                  key={sIdx} 
                  href={`/category/${catId}/${subId}`}
                  className="w-[110px] flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-[90px] h-[90px] border border-[#dddddd] flex items-center justify-center mb-3 bg-white group-hover:shadow-md transition-all">
                    <img 
                      src={sub.image.replace('./', '/')} 
                      alt={sub.name}
                      className="max-w-[80%] max-h-[80%] object-contain"
                    />
                  </div>
                  <span className="text-[12px] text-center text-[#555555] group-hover:underline group-hover:text-[#003366] leading-tight">
                    {sub.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}