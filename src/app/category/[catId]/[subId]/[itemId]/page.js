"use client";
import { useParams } from 'next/navigation';
import catalogData from '@/data/products.json';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const { catId, subId, itemId } = params;

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  /** * DATA GENERATOR: 
   * Placeholder for technical data not found in the JSON 
   */
  const getTechnicalDetails = (name) => {
    return {
      features: [
        "Precision-engineered for high-tolerance industrial environments.",
        "Constructed from wear-resistant materials for extended service life.",
        "Meets rigorous quality standards for consistent performance.",
        "Corrosion-resistant finish for use in demanding conditions."
      ],
      specs: [
        { label: "Material", value: "Industrial-Grade Alloy" },
        { label: "System of Measurement", value: "Inch / Metric" },
        { label: "Compliance", value: "ISO 9001 Certified" },
        { label: "Tolerance", value: "High Precision" }
      ]
    };
  };

  /** * DATA LOOKUP: 
   * Locates the specific product from the catalogData 
   */
  const category = catalogData.find(c => c.id === catId || slugify(c.name) === catId);
  let subData = null;
  category?.groups?.forEach(g => {
    const found = g.subCategories?.find(s => slugify(s.name) === subId);
    if (found) subData = found;
  });

  const product = subData?.nestedItems?.find(i => slugify(i.name) === itemId);
  const relatedItems = subData?.nestedItems?.filter(i => slugify(i.name) !== itemId) || [];

  if (!product) return <div className="p-20 text-center text-sm uppercase font-bold">Product not found.</div>;

  const techDetails = getTechnicalDetails(product.name);

  return (
    <div className="bg-white min-h-screen p-8 text-sm max-w-[1400px] mx-auto">
      
      {/* SECTION: NAVIGATION BREADCRUMBS */}
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 uppercase mb-8">
        <Link href="/" className="hover:text-[#336633]">Catalog</Link> / 
        <Link href={`/category/${catId}`}>{category?.name}</Link> / 
        <Link href={`/category/${catId}/${subId}`}>{subData?.name}</Link> / 
        <span className="text-black font-bold">{product.name}</span>
      </nav>

      {/* SECTION: MAIN PRODUCT VIEW (Image & Text side-by-side) */}
      <div className="flex flex-col md:flex-row gap-10 mb-1 items-stretch">
        
        {/* --- LEFT SIDE: IMAGE CONTAINER --- */}
        <div className="w-full md:w-1/2 border border-gray-200 p-8 flex items-center justify-center bg-white h-[300px]">
          <img 
            src={product.image.replace('./', '/')} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain" 
          />
        </div>

        {/* --- RIGHT SIDE: CONTENT CONTAINER (Title, Description, Bullets) --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-between py-1">
          <div>
            {/* Heading & Green Accent Bar - Styled to match text length */}
            <div className="w-fit"> 
              <h1 className="text-[#336633] text-[28px] font-black mb-2 uppercase tracking-tighter">
                {product.name}
              </h1>
              <div className="h-1 bg-[#336633] mb-6"></div> 
            </div>
            
            {/* Product Summary */}
            <p className="text-gray-700 leading-relaxed font-normal mb-6">
              {product.description || `High-performance industrial component specifically engineered for precision assembly and heavy-duty mechanical applications.`}
            </p>

            {/* Bulleted List (Characteristics) */}
            <div className="">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Characteristics</h3>
              <ul className="space-y-3">
                {techDetails.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800 font-medium">
                    <span className="w-1.5 h-1.5 bg-[#336633] shrink-0 rotate-45"></span> 
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: TECHNICAL DATA BAR (Horizontal rectangle below image/content) */}
      <div className="w-full bg-[#f8f8f8] border border-gray-200 mb-12 overflow-hidden">
         <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
           {techDetails.specs.map((spec, i) => (
            <div key={i} className="flex flex-col p-6">
               <span className="text-[12px] font-black text-gray-400 uppercase tracking-tighter mb-1">
                 {spec.label}
               </span>

               <span className="font-bold text-gray-900 text-[14px]">
                 {spec.value}
               </span>
             </div>
           ))}
         </div>
       </div>

      {/* SECTION: RELATED PRODUCTS (Grid footer) */}
      {relatedItems.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-[#336633] text-[14px] font-black uppercase tracking-[0.2em] mb-4">
            Related items in this category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {relatedItems.map((item, index) => (
              <Link 
                key={index} 
                href={`/category/${catId}/${subId}/${slugify(item.name)}`}
                className="group block"
              >
                {/* Related Item Small Thumbnail */}
                <div className="aspect-square border border-gray-100 p-4 mb-2 flex items-center justify-center bg-white group-hover:border-[#336633] transition-colors">
                  <img 
                    src={item.image.replace('./', '/')} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" 
                  />
                </div>
                {/* Related Item Label */}
                <h4 className="text-[11px] font-bold text-gray-500 group-hover:text-[#336633] uppercase leading-tight">
                  {item.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}