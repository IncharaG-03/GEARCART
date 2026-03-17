"use client";
import catalogData from '@/data/products.json';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Page Title */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h1 className="text-[#336633] text-[26px] font-normal leading-none m-0">
          All Categories
        </h1>
      </div>

      <div className="px-6 pt-4">
        {catalogData.map((category) => (
          <div key={category.id} className="mb-16">
            <h2 className="text-[#336633] text-[22px] font-bold mb-8 flex items-center">
              <span className="bg-[#336633] w-1.5 h-7 mr-4"></span>
              {category.name}
            </h2>

            {/* Handle both "groups" and "Categories" (for Office Supplies) */}
            {(category.groups || category.Categories)?.map((group, gIdx) => (
              <div key={gIdx} className="mb-12 ml-6">
                <h3 className="text-[15px] font-bold text-black mb-6 border-l border-gray-300 pl-4 tracking-wider uppercase">
                  {group.name}
                </h3>

                <div className="flex flex-wrap items-start gap-x-4 gap-y-10">
                  {/* Handle both "subCategories" and "items" in your JSON */}
                  {(group.subCategories || group.items)?.map((sub, sIdx) => {
                    // FALLBACK: If sub.id is missing, create one from the name
                    const safeSubId = sub.id || sub.name.toLowerCase().replace(/\s+/g, '-');
                    
                    return (
                      <Link 
                        key={sIdx} 
                        href={`/category/${category.id}/${safeSubId}`} 
                        className="w-[90px] flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-[90px] h-[90px] border border-[#dddddd] flex items-center justify-center mb-3 bg-white group-hover:shadow-md transition-shadow">
                          <img 
                            src={sub.image.startsWith('.') ? sub.image.substring(1) : sub.image} 
                            alt={sub.name}
                            className="max-w-[85%] max-h-[85%] object-contain"
                            onError={(e) => { e.target.src = "https://placehold.co/90x90?text=Item"; }}
                          />
                        </div>
                        <span className="text-[12px] text-[#555555] text-center leading-tight group-hover:text-[#003366] group-hover:underline">
                          {sub.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}