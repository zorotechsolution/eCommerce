import React, { useState, useEffect, useMemo } from "react";
import API from "../utils/axiosConfig";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useLang } from "../context/LangContext";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { FaThLarge, FaList, FaChevronDown, FaChevronUp, FaCartPlus, FaTimes } from "react-icons/fa";

// ─── Static filter data ───────────────────────────────────────────────────────
const TYPES     = ["Capsules", "Churnam", "Leham", "Tailam", "General"];
const BRANDS    = ["Kottakkal", "AVP Ayurveda", "Kerala Ayurveda", "AVN", "Vaidyaratnam"];
const CATEGORIES = ["Siddhar", "Classical Medicines", "Personal Care", "Health & Nutrition", "Herbal Oils", "General"];
const AILMENTS  = ["Cold", "Diabetes", "Sinusitis", "Digestion", "Immunity", "Hair", "Skin", "Stress"];
const SORT_OPTS = [
  { value: "",           label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "newest",     label: "Newest" },
];

// ─── Star renderer ────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
  <span className="flex items-center gap-0.5 text-amber-400">
    {[1,2,3,4,5].map(i =>
      i <= rating
        ? <StarIcon      key={i} sx={{ fontSize: 14 }} />
        : <StarBorderIcon key={i} sx={{ fontSize: 14 }} />
    )}
  </span>
);

// ─── Accordion section ───────────────────────────────────────────────────────
const AccordionSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest">{title}</span>
        {open
          ? <FaChevronUp   className="text-[10px] text-gray-400" />
          : <FaChevronDown className="text-[10px] text-gray-400" />}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
};

// ─── Checkbox row ─────────────────────────────────────────────────────────────
const CheckRow = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group py-1">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-3.5 h-3.5 accent-[rgb(7,81,89)] cursor-pointer"
    />
    <span className="text-sm text-gray-600 group-hover:text-[rgb(7,81,89)] transition-colors leading-none">
      {label}
    </span>
  </label>
);

// ─── Popular product mini card ────────────────────────────────────────────────
const PopularCard = ({ product }) => (
  <Link to={`/ProductList/${product.id}`} className="flex items-center gap-3 py-2 group">
    <img
      src={product.img}
      alt={product.productName}
      className="w-14 h-14 object-contain rounded-lg border border-gray-100 bg-gray-50 shrink-0"
    />
    <div className="min-w-0">
      <p className="text-xs font-semibold text-gray-700 group-hover:text-[rgb(7,81,89)] transition-colors line-clamp-2 leading-snug">
        {product.productName}
      </p>
      <Stars rating={product.rating} />
      <p className="text-xs font-bold text-[rgb(7,81,89)] mt-0.5">
        ₹{Number(product.price).toFixed(2)}
      </p>
    </div>
  </Link>
);

// ─── Main component ───────────────────────────────────────────────────────────
const Product = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { t } = useLang();

  const [ayurvedicMedicines, setAyurvedicMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await API.get('/products?limit=50');
        const formatted = data.data.map(p => {
          const rawImg = p.images?.[0]?.url || "";
          return {
            ...p,
            id: p._id,
            productName: p.name,
            productDescription: p.description,
            img: rawImg.startsWith('http') ? rawImg : `http://localhost:5000${rawImg}`,
            category: p.category?.name || "General",
            rating: p.ratings || 4,
            reviews: p.numOfReviews || 0
          };
        });
        setAyurvedicMedicines(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /* view state */
  const [gridView,       setGridView]       = useState(true);
  const [sortOrder,      setSortOrder]      = useState("");
  const [showSidebar,    setShowSidebar]    = useState(false);

  /* filter state */
  const [selectedTypes,    setSelectedTypes]    = useState([]);
  const [selectedBrands,   setSelectedBrands]   = useState([]);
  const [selectedAilments, setSelectedAilments] = useState([]);

  /* toggle helpers */
  const toggle = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  /* derived: products matching current page category + filters */
  const filtered = useMemo(() => {
    let list = [...ayurvedicMedicines];

    if (category && category !== "All Collections") {
      list = list.filter(p => p.category === category);
    }
    if (selectedTypes.length)    list = list.filter(p => selectedTypes.includes(p.type));
    if (selectedBrands.length)   list = list.filter(p => selectedBrands.includes(p.brand));
    if (selectedAilments.length) list = list.filter(p =>
      selectedAilments.some(a => p.ailments?.includes(a))
    );

    if (sortOrder === "price-asc")  list.sort((a,b) => Number(a.price) - Number(b.price));
    if (sortOrder === "price-desc") list.sort((a,b) => Number(b.price) - Number(a.price));
    if (sortOrder === "rating")     list.sort((a,b) => b.rating - a.rating);

    return list;
  }, [category, selectedTypes, selectedBrands, selectedAilments, sortOrder, ayurvedicMedicines]);

  // Automatically clear filters when moving between primary categories
  useEffect(() => {
    clearAll();
  }, [category]);

  const popularProducts = [...ayurvedicMedicines]
    .sort((a,b) => b.reviews - a.reviews)
    .slice(0, 3);

  const anyFilter = selectedTypes.length || selectedBrands.length || selectedAilments.length;

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSelectedAilments([]);
  };

  const pageTitle = category && category !== "All Collections"
    ? `${category.toUpperCase()} PRODUCTS`
    : "ALL AYURVEDIC PRODUCTS";

  return (
    <div className="min-h-screen bg-[#f8f8f6] font-sans">

      {/* ─── Page banner ──────────────────────────────────────────────────── */}
      <div className="bg-[rgb(7,81,89)] text-white py-8 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-600 rounded-full mix-blend-multiply blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-30 pointer-events-none" />
        <div className="relative">
          <p className="text-teal-200 text-xs uppercase tracking-widest mb-1 font-bold">
            {t('collections')}
          </p>
          <h1 className="text-2xl md:text-4xl font-black tracking-wide">{pageTitle}</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-6">

        {/* ─── Mobile filter toggle ─────────────────────────────────────── */}
        <div className="lg:hidden flex gap-2">
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 shadow-sm"
          >
            ☰ Filters {anyFilter ? `(${+!!selectedTypes.length + +!!selectedBrands.length + +!!selectedAilments.length})` : ""}
          </button>
          {anyFilter > 0 && (
            <button onClick={clearAll} className="flex items-center gap-1 text-xs text-rose-500 font-bold">
              <FaTimes /> Clear
            </button>
          )}
        </div>

        {/* ─── Mobile sidebar overlay ───────────────────────────────────── */}
        {showSidebar && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="bg-black/40 absolute inset-0" onClick={() => setShowSidebar(false)} />
            <div className="relative bg-white w-72 h-full overflow-y-auto p-5 shadow-2xl">
              <button onClick={() => setShowSidebar(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
                <FaTimes />
              </button>
              <SidebarContent
                selectedTypes={selectedTypes}    setSelectedTypes={setSelectedTypes}
                selectedBrands={selectedBrands}  setSelectedBrands={setSelectedBrands}
                selectedAilments={selectedAilments} setSelectedAilments={setSelectedAilments}
                toggle={toggle} popularProducts={popularProducts}
                category={category}
              />
            </div>
          </div>
        )}

        {/* ─── Desktop sidebar ──────────────────────────────────────────── */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <SidebarContent
              selectedTypes={selectedTypes}    setSelectedTypes={setSelectedTypes}
              selectedBrands={selectedBrands}  setSelectedBrands={setSelectedBrands}
              selectedAilments={selectedAilments} setSelectedAilments={setSelectedAilments}
              toggle={toggle} popularProducts={popularProducts}
              category={category}
            />
          </div>
        </aside>

        {/* ─── Main content ─────────────────────────────────────────────── */}
        <section className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex flex-wrap items-center justify-between gap-3 mb-5">
            {/* left: view toggle + count */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setGridView(true)}
                  className={`p-2 transition-colors ${gridView ? "bg-[rgb(7,81,89)] text-white" : "text-gray-400 hover:bg-gray-50"}`}
                  title="Grid View"
                >
                  <FaThLarge className="text-sm" />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={`p-2 transition-colors ${!gridView ? "bg-[rgb(7,81,89)] text-white" : "text-gray-400 hover:bg-gray-50"}`}
                  title="List View"
                >
                  <FaList className="text-sm" />
                </button>
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {loading ? "Loading..." : (
                  <>
                    Showing: <span className="font-bold text-gray-800">{filtered.length}</span> of{" "}
                    <span className="font-bold text-gray-800">{ayurvedicMedicines.length}</span>
                  </>
                )}
              </span>
              {anyFilter > 0 && (
                <button onClick={clearAll} className="hidden md:flex items-center gap-1 text-xs text-rose-500 font-bold hover:text-rose-700 transition-colors">
                  <FaTimes className="text-[10px]" /> Clear filters
                </button>
              )}
            </div>

            {/* right: sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-500 hidden sm:block">Sort</span>
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-[rgb(7,81,89)] bg-white font-medium text-gray-700 cursor-pointer"
              >
                {SORT_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {anyFilter > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {[...selectedTypes.map(v => ({v, set: setSelectedTypes, arr: selectedTypes})),
                ...selectedBrands.map(v => ({v, set: setSelectedBrands, arr: selectedBrands})),
                ...selectedAilments.map(v => ({v, set: setSelectedAilments, arr: selectedAilments}))
              ].map(({v, set, arr}) => (
                <span key={v} className="flex items-center gap-1.5 bg-[rgb(7,81,89)]/10 text-[rgb(7,81,89)] text-xs font-bold px-3 py-1 rounded-full">
                  {v}
                  <button onClick={() => set(arr.filter(x => x !== v))} className="hover:text-orange-500 transition-colors">
                    <FaTimes className="text-[9px]" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Product grid / list */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center shadow-sm">
              <p className="text-4xl mb-4">🌿</p>
              <h3 className="text-lg font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400 text-sm mb-6">Try adjusting your filters or browse all collections.</p>
              <button onClick={clearAll} className="bg-[rgb(7,81,89)] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-500 transition-colors">
                Clear All Filters
              </button>
            </div>
          ) : gridView ? (
            /* ── GRID ── */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} dispatch={dispatch} />
              ))}
            </div>
          ) : (
            /* ── LIST ── */
            <div className="flex flex-col gap-4">
              {filtered.map(product => (
                <ProductListCard key={product.id} product={product} dispatch={dispatch} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// ─── Sidebar content (shared between mobile & desktop) ────────────────────────
const SidebarContent = ({
  selectedTypes, setSelectedTypes,
  selectedBrands, setSelectedBrands,
  selectedAilments, setSelectedAilments,
  toggle, popularProducts, category
}) => (
  <div className="flex flex-col gap-0">
    <AccordionSection title="BROWSE CATEGORIES">
      <Link
        to="/collections"
        className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg transition-colors text-sm font-bold ${!category || category === "All Collections" ? "text-[rgb(7,81,89)] bg-[rgb(7,81,89)]/5" : "text-gray-500 hover:text-[rgb(7,81,89)]"}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
        All Products
      </Link>
      {CATEGORIES.map(cat => (
        <Link
          key={cat}
          to={`/collections/${cat}`}
          className={`flex items-center gap-2.5 py-1.5 px-2 rounded-lg transition-colors text-sm font-medium ${category === cat ? "text-[rgb(7,81,89)] bg-[rgb(7,81,89)]/5 font-bold" : "text-gray-500 hover:text-[rgb(7,81,89)]"}`}
        >
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          {cat}
        </Link>
      ))}
    </AccordionSection>

    <AccordionSection title="FILTER BY TYPE">
      {TYPES.map(t => (
        <CheckRow
          key={t} label={t}
          checked={selectedTypes.includes(t)}
          onChange={() => toggle(selectedTypes, setSelectedTypes, t)}
        />
      ))}
    </AccordionSection>

    <AccordionSection title="FILTER BY BRANDS">
      {BRANDS.map(b => (
        <CheckRow
          key={b} label={b}
          checked={selectedBrands.includes(b)}
          onChange={() => toggle(selectedBrands, setSelectedBrands, b)}
        />
      ))}
    </AccordionSection>

    <AccordionSection title="FILTER BY AILMENTS">
      {AILMENTS.map(a => (
        <CheckRow
          key={a} label={a}
          checked={selectedAilments.includes(a)}
          onChange={() => toggle(selectedAilments, setSelectedAilments, a)}
        />
      ))}
    </AccordionSection>

    <AccordionSection title="POPULAR PRODUCTS">
      <div className="flex flex-col divide-y divide-gray-50">
        {popularProducts.map(p => <PopularCard key={p.id} product={p} />)}
      </div>
    </AccordionSection>
  </div>
);

// ─── Grid product card ────────────────────────────────────────────────────────
const ProductCard = ({ product, dispatch }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addItem({ ...product, quantity: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group flex flex-col overflow-hidden">
      <Link to={`/ProductList/${product.id}`} className="relative block">
        {product.onSale && (
          <span className="absolute top-2 left-2 bg-[#e8417b] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider z-10">
            SALE
          </span>
        )}
        <div className="aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.img}
            alt={product.productName}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/ProductList/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[rgb(7,81,89)] transition-colors leading-snug line-clamp-2 mb-1 min-h-[2.5rem]">
            {product.productName}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-1">
          <Stars rating={product.rating} />
          <span className="text-[11px] text-gray-400 font-medium">{product.reviews} reviews</span>
        </div>

        <p className="text-xs font-bold text-[rgb(7,81,89)] mb-2">{product.brand}</p>

        <div className="flex items-center gap-2 mt-auto mb-3">
          <span className="text-base font-black text-gray-900">₹{Number(product.price).toFixed(2)}</span>
          {product.onSale && product.originalPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">₹{Number(product.originalPrice).toFixed(2)}</span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
            added
              ? "bg-green-500 text-white"
              : "bg-[rgb(7,81,89)] hover:bg-orange-500 text-white"
          }`}
        >
          <FaCartPlus />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

// ─── List product card ────────────────────────────────────────────────────────
const ProductListCard = ({ product, dispatch }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-5 overflow-hidden group p-4">
      <Link to={`/ProductList/${product.id}`} className="relative shrink-0 w-28 h-28">
        {product.onSale && (
          <span className="absolute -top-1 -left-1 bg-[#e8417b] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase z-10">
            SALE
          </span>
        )}
        <div className="w-full h-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
          <img src={product.img} alt={product.productName} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
        </div>
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <Link to={`/ProductList/${product.id}`}>
            <h3 className="text-sm font-bold text-gray-800 group-hover:text-[rgb(7,81,89)] transition-colors leading-snug mb-1">{product.productName}</h3>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <Stars rating={product.rating} />
            <span className="text-[11px] text-gray-400">{product.reviews} reviews</span>
          </div>
          <p className="text-xs font-bold text-[rgb(7,81,89)] mb-1">{product.brand}</p>
          <p className="text-xs text-gray-500 line-clamp-2 hidden sm:block">{product.productDescription}</p>
        </div>
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-gray-900">₹{Number(product.price).toFixed(2)}</span>
            {product.onSale && product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">₹{Number(product.originalPrice).toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 py-1.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              added ? "bg-green-500 text-white" : "bg-[rgb(7,81,89)] hover:bg-orange-500 text-white"
            }`}
          >
            <FaCartPlus /> {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
