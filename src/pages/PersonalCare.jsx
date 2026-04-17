import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axiosConfig";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useLang } from "../context/LangContext";
import { 
  FaLeaf, FaCartPlus, FaChevronRight, FaStar, 
  FaMagic, FaClock, FaCheckCircle, FaQuoteLeft,
  FaSpa, FaTint, FaSun, FaWind, FaGem, FaArrowRight
} from "react-icons/fa";
import HeroImage from "../assets/siddha_personal_care_hero.png";

const PersonalCare = () => {
  const dispatch = useDispatch();
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await API.get('/products?limit=50');
        const formatted = res.data.data
          .filter(p => p.category?.name === "Personal Care")
          .map(p => {
            const rawImg = p.images?.[0]?.url || "";
            return {
              ...p,
              id: p._id,
              productName: p.name,
              productDescription: p.description,
              img: rawImg.startsWith('http') ? rawImg : `http://localhost:5000${rawImg}`,
              price: p.price
            };
          });
        setProducts(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const regimens = [
    { title: "Cleanse", subtitle: "Remove Toxins", icon: <FaTint />, desc: "Ancient blends to purify skin without stripping natural oils." },
    { title: "Nourish", subtitle: "Deep Hydration", icon: <FaSpa />, desc: "Sacred oils and herb-infused serums for cell-level restoration." },
    { title: "Heal", subtitle: "Targeted Care", icon: <FaLeaf />, desc: "Specific formulations for acne, pigmentation, and hair health." },
    { title: "Protect", subtitle: "Daily Shield", icon: <FaGem />, desc: "Lightweight barriers that shield from pollution and oxidation." }
  ];

  const pillars = [
    { icon: <FaSun />, name: "Pitham", focus: "Brightness & Heat", desc: "Balancing Pitta addresses inflammation, sensitivity, and redness." },
    { icon: <FaWind />, name: "Vadham", focus: "Moisture & Flow", desc: "Vata care prevents dryness, thin hair, and premature aging." },
    { icon: <FaTint />, name: "Kabam", focus: "Firmness & Oil", desc: "Kapha balancing controls excess oil and maintains skin elasticity." }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      
      {/* Cinematic Hero */}
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HeroImage} 
            alt="Siddha Personal Care" 
            className="w-full h-full object-cover scale-105 animate-[slow-zoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white"></div>
        </div>
        
        <div className="relative z-10 text-center px-5 max-w-5xl">
          <div className="flex justify-center items-center gap-2 mb-6 animate-fade-in-down">
            <span className="w-12 h-[1px] bg-amber-400"></span>
            <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs">Vel Siddhar Arakkattalai</span>
            <span className="w-12 h-[1px] bg-amber-400"></span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 animate-fade-in-up">
            TIMELESS <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">SIDDHA BEAUTY</span>
          </h1>
          <p className="text-white/80 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed italic animate-fade-in-up-delay">
            "Your body is a temple; treat it with the sacred wisdom of ancient healers."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay-2">
            <a href="#regimen" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-10 py-4 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              BUILD YOUR REGIMEN
            </a>
            <Link to="/collections/Personal Care" className="backdrop-blur-md bg-white/10 border border-white/20 text-white font-black px-10 py-3.5 rounded-full hover:bg-white/20 transition-all">
              EXPLORE ALL
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-white rounded-full"></div>
            </div>
        </div>
      </section>

      {/* The Wisdom of Siddhars (Pillars) */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">THE THREE <br/>PILLARS OF RADIANCE</h2>
              <p className="text-slate-500 text-lg">Siddha medicine views personal care as an internal and external harmony of the Three Humors (Mukkutram).</p>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-8xl font-black text-slate-100 italic">01</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl">
            {pillars.map((p, i) => (
              <div key={i} className="group p-10 md:p-14 hover:bg-[rgb(7,81,89)] transition-colors duration-500 border-b md:border-b-0 md:border-r border-slate-100 last:border-0">
                <div className="text-5xl text-amber-500 mb-8 transform group-hover:-translate-y-2 transition-transform duration-500">{p.icon}</div>
                <h3 className="text-2xl font-black mb-2 group-hover:text-white transition-colors">{p.name}</h3>
                <p className="text-amber-600 font-bold mb-6 group-hover:text-amber-400 transition-colors uppercase text-xs tracking-widest">{p.focus}</p>
                <p className="text-slate-500 group-hover:text-white/60 transition-colors leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ancient Regimens (Interactive Section) */}
      <section id="regimen" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-bold uppercase tracking-widest mb-4 block">Personalized Care</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800">CRAFT YOUR RITUAL</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {regimens.map((reg, i) => (
              <button 
                key={i} 
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm transition-all ${activeStep === i ? "bg-[rgb(7,81,89)] text-white shadow-xl scale-110" : "bg-white text-slate-400 hover:text-slate-600 shadow-sm"}`}
              >
                <span className="text-lg">{reg.icon}</span>
                {reg.title}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[rgb(7,81,89)]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="flex-1 z-10">
              <span className="text-6xl font-black text-[rgb(7,81,89)] mb-6 block opacity-20">0{activeStep + 1}</span>
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">{regimens[activeStep].title}</h3>
              <p className="text-slate-500 text-xl leading-relaxed mb-10 max-w-lg">{regimens[activeStep].desc}</p>
              <Link to={`/collections/Personal Care`} className="inline-flex items-center gap-3 bg-amber-500 text-slate-950 font-black px-8 py-4 rounded-full hover:scale-105 transition-all group">
                BROWSE {regimens[activeStep].title.toUpperCase()} <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="flex-1 z-10 grid grid-cols-2 gap-4">
               {products.slice(activeStep * 2, activeStep * 2 + 2).map((prod) => (
                 <div key={prod.id} className="bg-slate-50 p-4 rounded-3xl group border border-slate-100 hover:border-amber-400 transition-colors">
                    <img src={prod.img} className="w-full aspect-square object-contain mb-4 transform group-hover:scale-110 transition-transform duration-500" alt={prod.productName} />
                    <h4 className="font-bold text-xs text-slate-800 mb-2 truncate">{prod.productName}</h4>
                    <span className="text-amber-600 font-bold text-sm">₹{prod.price}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Ingredients Spotlight */}
      <section className="py-32 px-5 bg-[rgb(7,81,89)] text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
                <div className="aspect-[4/5] bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl relative group">
                    <img src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-[3s]" alt="Ingredients" />
                    <div className="absolute bottom-10 left-10 p-10 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20">
                        <h4 className="text-2xl font-black text-amber-400 mb-2">NEEM & TURMERIC</h4>
                        <p className="text-white/70 text-sm italic">"The Golden Healers of the East"</p>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500 rounded-full flex items-center justify-center p-8 text-slate-950 font-black text-center shadow-2xl leading-tight">
                    ESTD.<br/>1994<br/>HERITAGE
                </div>
            </div>
            <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">ONLY FROM <br/>THE EARTH</h2>
                <div className="space-y-12">
                    <div className="flex gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><FaMagic className="text-2xl text-amber-400" /></div>
                        <div>
                            <h4 className="text-xl font-black mb-2 uppercase tracking-wide">Sacred Sourcing</h4>
                            <p className="text-white/60 leading-relaxed">We pick herbs at the peak of their astrological potency, as prescribed in ancient Siddha manuscripts.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><FaClock className="text-2xl text-amber-400" /></div>
                        <div>
                            <h4 className="text-xl font-black mb-2 uppercase tracking-wide">Slow Extraction</h4>
                            <p className="text-white/60 leading-relaxed">No heat. No chemicals. Only the sun and time are used to extract the healing essence of our botanicals.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20"><FaCheckCircle className="text-2xl text-amber-400" /></div>
                        <div>
                            <h4 className="text-xl font-black mb-2 uppercase tracking-wide">Purity Certified</h4>
                            <p className="text-white/60 leading-relaxed">Every batch is tested to be 100% free of parabens, sulphates, and synthetic fragrances.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Modern Bestsellers */}
      <section className="py-32 px-5">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-4 tracking-tighter">BELOVED BY <br/>THE MODERN USER</h2>
                    <p className="text-slate-500 text-lg">Ancient solutions meeting the needs of today's urban lifestyle.</p>
                </div>
                <Link to="/collections/Personal Care" className="text-[rgb(7,81,89)] font-black flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b-2 border-slate-100 uppercase tracking-widest text-xs mb-4">
                    VIEW ALL <FaArrowRight />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0, 4).map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                        <div className="bg-slate-50 rounded-[3rem] p-10 mb-6 relative overflow-hidden flex items-center justify-center border border-transparent group-hover:border-amber-400 transition-all duration-500 aspect-[3/4]">
                            <Link to={`/ProductList/${product.id}`} className="absolute inset-0 z-0"></Link>
                            <img src={product.img} className="w-full h-full object-contain transform group-hover:scale-110 transition-all duration-700 z-10" alt={product.productName} />
                            <button 
                              onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
                              className="absolute bottom-8 right-8 bg-white hover:bg-amber-500 hover:text-white text-[rgb(7,81,89)] p-4 rounded-full shadow-2xl translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20"
                            >
                                <FaCartPlus className="text-xl" />
                            </button>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-black group-hover:text-[rgb(7,81,89)] transition-colors mb-2 truncate">{product.productName}</h3>
                            <div className="flex items-center justify-center gap-1 mb-2">
                                {[1,2,3,4,5].map(i => <FaStar key={i} className="text-amber-400 text-[10px]" />)}
                            </div>
                            <span className="text-2xl font-black text-slate-800">₹{product.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Aesthetic Testimonials */}
      <section className="py-32 px-5 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-3xl mx-auto">
                <FaQuoteLeft className="text-6xl text-amber-500/20 mx-auto mb-8" />
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">VOICES OF WELLNESS</h2>
                <p className="text-slate-500">How Siddha wisdom has transformed the lives of our global community.</p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {[
                    { name: "Sita R.", loc: "Kerala", txt: "The Kumkumadi Brightening Oil is light as water but nourishes like luxury. My pigmentation faded after only one month of nightly use." },
                    { name: "Michael V.", loc: "Sydney", txt: "As someone with sensitive skin, finding chemical-free products that actually work is hard. Siddha's Neem face wash is a game changer." },
                    { name: "Janani K.", loc: "Chennai", txt: "The Nilibhringadi hair oil stopped my postpartum hair fall almost overnight. The scent is calming and my hair has never felt thicker." }
                ].map((t, i) => (
                    <div key={i} className="break-inside-avoid bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex gap-1">
                              {[1,2,3,4,5].map(j => <FaStar key={j} className="text-amber-400 text-xs" />)}
                            </div>
                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{t.loc}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-8 italic text-lg">"{t.txt}"</p>
                        <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center font-black text-slate-950">{t.name.charAt(0)}</div>
                             <div>
                                 <h4 className="font-black text-slate-800 uppercase tracking-wider text-sm">{t.name}</h4>
                                 <span className="text-[10px] text-slate-400 font-bold uppercase">Verified Purchase</span>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Grand CTA */}
      <section className="py-40 px-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[rgb(7,81,89)] rounded-full animate-[pulse-slow_15s_infinite] opacity-10"></div>
        </div>
        
        <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black text-[rgb(7,81,89)] mb-10 tracking-tighter italic">START YOUR JOURNEY</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/e-consultation" className="bg-amber-500 text-slate-950 font-black px-12 py-5 rounded-full text-lg shadow-2xl hover:scale-105 transition-all uppercase">
                    BOOK FREE CONSULTATION
                </Link>
                <Link to="/collections" className="bg-[#075159] text-white font-black px-12 py-5 rounded-full text-lg hover:bg-[#064147] transition-all uppercase">
                    BROWSE RITUALS
                </Link>
            </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
        .animate-fade-in-down { animation: fadeInDown 1.2s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 1.2s ease-out forwards; }
        .animate-fade-in-up-delay { animation: fadeInUp 1.2s ease-out 0.3s forwards; opacity: 0; }
        .animate-fade-in-up-delay-2 { animation: fadeInUp 1.2s ease-out 0.6s forwards; opacity: 0; }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default PersonalCare;
