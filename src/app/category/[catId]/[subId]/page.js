"use client";
import { useParams } from 'next/navigation';
import catalogData from '@/data/products.json';
import Link from 'next/link';

export default function SubCategoryDetailPage() {
  const params = useParams();
  const catId = params.catId;
  const subId = params.subId;

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  // 1. Find Main Category
  const category = catalogData.find(c => 
    c.id === catId || slugify(c.name) === catId
  );
  
  // 2. Find Specific Sub-Category (e.g., Screws)
  let subData = null;
  category?.groups?.forEach(group => {
    const found = group.subCategories?.find(s => slugify(s.name) === subId);
    if (found) subData = found;
  });

  if (!category || !subData) {
    return <div className="p-20 text-center">Category or Sub-Category not found.</div>;
  }

  return (
    <div className="bg-white min-h-screen p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wider mb-8">
        <Link href="/" className="hover:text-[#336633]">Catalog</Link>
        <span>/</span>
        <Link href={`/category/${catId}`} className="hover:text-[#336633]">{category.name}</Link>
        <span>/</span>
        <span className="text-black font-bold">{subData.name}</span>
      </nav>

      <h1 className="text-[#336633] text-[28px] font-bold mb-10 flex items-center">
        <span className="bg-[#336633] w-1.5 h-8 mr-4"></span>
        {subData.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subData.nestedItems?.map((item, index) => {
          const itemId = slugify(item.name);
          return (
            <Link 
              key={index} 
              href={`/category/${catId}/${subId}/${itemId}`}
              className="flex border border-gray-200 hover:shadow-md transition-shadow bg-white group cursor-pointer"
            >
              <div className="w-[140px] h-[140px] flex-shrink-0 flex items-center justify-center border-r border-gray-100 p-4">
                <img 
                  src={item.image.replace('./', '/')} 
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-5 flex flex-col justify-center">
                <h3 className="text-[#003366] font-bold text-[16px] group-hover:underline uppercase">{item.name}</h3>
                <span className="text-[11px] text-[#336633] font-bold uppercase mt-4">View Item</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}