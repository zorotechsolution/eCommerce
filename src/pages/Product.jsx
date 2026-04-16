import React, { useState } from "react";
import { ayurvedicMedicines } from "../db/data";
import { Link, useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { FaFilter, FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const Product = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [sortOrder, setSortOrder] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all");

  // Define side categories
  const categoriesList = [
    "All Collections",
    "Siddhar",
    "Classical Medicines",
    "Personal Care",
    "Brands",
    "Health & Nutrition",
    "General"
  ];

  let displayedProducts = ayurvedicMedicines;
  
  // Category Filter
  if (category && category !== "All Collections") {
    displayedProducts = displayedProducts.filter(
      (product) => product.category === category
    );
  }

  // Price Filter Logic
  if (priceFilter === "under-100") {
    displayedProducts = displayedProducts.filter(p => p.price < 100);
  } else if (priceFilter === "100-500") {
    displayedProducts = displayedProducts.filter(p => p.price >= 100 && p.price <= 500);
  } else if (priceFilter === "500-1000") {
    displayedProducts = displayedProducts.filter(p => p.price > 500 && p.price <= 1000);
  } else if (priceFilter === "over-1000") {
    displayedProducts = displayedProducts.filter(p => p.price > 1000);
  }

  // Sorting Logic
  if (sortOrder === "price-low") {
    displayedProducts = [...displayedProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-high") {
    displayedProducts = [...displayedProducts].sort((a, b) => b.price - a.price);
  }

  const handleQuickAdd = (e, product) => {
    e.preventDefault(); // Prevent navigating to detail page
    dispatch(addItem({ ...product, quantity: 1 }));
    // Quick visual feedback could be added here
  };

  return (
    <>
      <section className="bg-slate-50 min-h-screen pb-16">
        
        {/* Collection Header Banner */}
        <div className="bg-[rgb(7,81,89)] text-white py-12 px-5 mb-10 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
           <div className="absolute bottom-0 left-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-30"></div>
           <div className="relative z-10 max-w-7xl mx-auto">
             <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-3">
               {category && category !== "All Collections" ? category : "All Collections"}
             </h1>
             <p className="text-teal-100 font-medium tracking-wide">
               Discover our authentic range of natural remedies and personal care products.
             </p>
           </div>
        </div>

        <div className="px-5 md:px-10 lg:px-20 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-10">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-2">
             <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 font-bold text-slate-700"
             >
                <FaFilter className="text-[rgb(7,81,89)]" /> 
                {showMobileFilters ? "Close Filters" : "Filter Products"}
             </button>
             <div className="text-sm font-bold text-slate-400">{displayedProducts.length} Results</div>
          </div>

          {/* Sidebar / Filters */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'}  lg:block w-full lg:w-72 shrink-0 flex flex-col gap-6`}>
             
             {/* Categories Widget */}
             <div className="bg-white rounded-[2rem] mb-5 p-8 shadow-sm border border-slate-100">
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 border-b-2 border-slate-100 pb-4">
                  Categories
                </h2>
                <ul className="flex flex-col gap-3">
                  {categoriesList.map((cat, idx) => {
                    const isActive = category === cat || (!category && cat === "All Collections");
                    return (
                      <li key={idx}>
                        <Link 
                          to={cat === "All Collections" ? "/collections" : `/collections/${cat}`}
                          className={`flex items-center justify-between py-2 px-4 rounded-xl transition-all font-bold ${
                            isActive 
                              ? "bg-[rgb(7,81,89)] text-white shadow-md shadow-[rgb(7,81,89)]/20" 
                              : "text-slate-500 hover:bg-slate-50 hover:text-[rgb(7,81,89)]"
                          }`}
                        >
                          {cat}
                          {isActive && <span className="text-xs">●</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
             </div>

             {/* Price Filter Widget */}
             <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 border-b-2 border-slate-100 pb-4">
                  Price Range
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { value: "all", label: "All Prices" },
                    { value: "under-100", label: "Under ₹100" },
                    { value: "100-500", label: "₹100 - ₹500" },
                    { value: "500-1000", label: "₹500 - ₹1000" },
                    { value: "over-1000", label: "Over ₹1000" }
                  ].map((option, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="radio" 
                          name="price_filter" 
                          value={option.value}
                          checked={priceFilter === option.value}
                          onChange={(e) => setPriceFilter(e.target.value)}
                          className="peer sr-only" 
                        />
                        <div className={`w-5 h-5 rounded-full border-2 transition-colors ${priceFilter === option.value ? 'border-[rgb(7,81,89)]' : 'border-slate-300 group-hover:border-[rgb(7,81,89)]'}`}></div>
                        <div className={`absolute w-2.5 h-2.5 rounded-full bg-[rgb(7,81,89)] transition-transform scale-0 peer-checked:scale-100`}></div>
                      </div>
                      <span className={`font-bold transition-colors ${priceFilter === option.value ? 'text-[rgb(7,81,89)]' : 'text-slate-500 group-hover:text-slate-700'}`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
             </div>

          </aside>

          {/* Main Product Grid */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <div className="hidden lg:flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
               <div className="font-bold text-slate-500">
                 Showing <span className="text-[rgb(7,81,89)]">{displayedProducts.length}</span> products
               </div>
               <div className="flex items-center gap-3">
                 <label className="font-bold text-sm text-slate-500 uppercase tracking-widest">Sort By:</label>
                 <select 
                   value={sortOrder}
                   onChange={(e) => setSortOrder(e.target.value)}
                   className="border border-slate-200 outline-none rounded-xl px-4 py-2 text-sm font-bold text-slate-800 bg-slate-50 cursor-pointer focus:border-[rgb(7,81,89)]"
                 >
                   <option value="">Featured</option>
                   <option value="price-low">Price: Low to High</option>
                   <option value="price-high">Price: High to Low</option>
                 </select>
               </div>
            </div>

            {displayedProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-[2rem] border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-500">No products found.</h2>
                <p className="mt-4 text-slate-400">Try browsing a different category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedProducts.map((product, id) => {
                  return (
                    <Link to={`/ProductList/${product.id}`} key={id} className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-[0_15px_40px_rgba(7,81,89,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col">
                      <div className="overflow-hidden p-6 bg-white aspect-square relative flex items-center justify-center">
                        <img
                          src={product.img}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          alt={product.productName}
                        />
                        {/* Quick Add Button Cover */}
                        <button 
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-[rgb(7,81,89)] hover:bg-orange-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-300"
                          title="Quick Add to Cart"
                        >
                          <FaCartPlus className="text-xl" />
                        </button>
                      </div>
                      <div className="bg-slate-50 p-6 flex flex-col flex-1 border-t border-slate-100">
                        <h2 className="font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[rgb(7,81,89)] transition-colors h-11">
                          {product.productName}
                        </h2>
                        <div className="flex items-center gap-1 mt-3 mb-4">
                          <span className="flex text-amber-400">
                            {[1,2,3,4,5].map(i => <StarIcon key={i} sx={{ fontSize: 16 }} />)}
                          </span>
                          <span className="align-middle text-xs font-bold text-slate-400">
                            (91)
                          </span>
                        </div>
                        <div className="mt-auto flex justify-between items-end">
                           <h3 className="text-xl font-black text-[rgb(7,81,89)]">
                             ₹{product.price}
                           </h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default Product;
