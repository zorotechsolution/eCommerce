import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ayurvedicMedicines } from "../db/data";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useLang } from "../context/LangContext";
import StarIcon from "@mui/icons-material/Star";
import {
  FaLeaf, FaCartPlus, FaSearch, FaChevronRight, FaStar,
  FaRecycle, FaShieldAlt, FaCertificate, FaTint,
  FaSmile, FaCut, FaBath, FaSoap,
  FaSun, FaMoon, FaSeedling,
} from "react-icons/fa";

const PersonalCare = () => {
  const dispatch = useDispatch();
  const { t } = useLang();
  const [search, setSearch] = useState("");

  const personalCareProducts = ayurvedicMedicines.filter(
    (p) => p.category === "Personal Care"
  );
  const filteredProducts = search
    ? personalCareProducts.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      )
    : personalCareProducts;

  const categories = [
    { nameKey: "faceCareCat", descKey: "faceCareDesc", icon: <FaSmile className="text-3xl" />, circleBg: "bg-pink-100", iconColor: "text-pink-500", border: "border-pink-200", accent: "bg-pink-500", link: "/personal-care/face-care" },
    { nameKey: "hairCareCat", descKey: "hairCareDesc", icon: <FaCut className="text-3xl" />, circleBg: "bg-teal-100", iconColor: "text-teal-500", border: "border-teal-200", accent: "bg-teal-500", link: "/personal-care/hair-oil" },
    { nameKey: "bodyCareCat", descKey: "bodyCareDesc", icon: <FaBath className="text-3xl" />, circleBg: "bg-blue-100", iconColor: "text-blue-500", border: "border-blue-200", accent: "bg-blue-500", link: "/personal-care/body-care" },
    { nameKey: "herbalOilsCat", descKey: "herbalOilsDesc", icon: <FaTint className="text-3xl" />, circleBg: "bg-orange-100", iconColor: "text-orange-500", border: "border-orange-200", accent: "bg-orange-500", link: "/personal-care/skin-beauty" },
  ];

  const benefits = [
    {
      icon: <FaSeedling className="text-3xl text-green-500" />,
      titleEn: "100% Natural Ingredients",
      titleTa: "100% இயற்கை பொருட்கள்",
      descEn: "All our personal care products are crafted from herbs, botanical extracts, and natural oils — free from parabens, sulphates, and harmful chemicals.",
      descTa: "எங்கள் அனைத்து தனிப்பட்ட பராமரிப்பு பொருட்களும் மூலிகைகள், தாவர சாறுகள் மற்றும் இயற்கை எண்ணெய்களால் தயாரிக்கப்படுகின்றன — தீங்கான இரசாயனங்கள் இல்லாதவை.",
    },
    {
      icon: <FaLeaf className="text-3xl text-teal-500" />,
      titleEn: "Gentle on Skin",
      titleTa: "சருமத்திற்கு மென்மையானது",
      descEn: "Formulated using ancient Siddha and Ayurvedic recipes that have been used for centuries to nourish, protect, and heal skin and hair naturally.",
      descTa: "பழங்கால சித்த மற்றும் ஆயுர்வேத செய்முறைகளை பயன்படுத்தி தயாரிக்கப்பட்டது — சருமம் மற்றும் முடியை இயற்கையாக ஊட்டி, பாதுகாத்து, குணப்படுத்துகிறது.",
    },
    {
      icon: <FaRecycle className="text-3xl text-lime-500" />,
      titleEn: "Sustainably Sourced",
      titleTa: "நிலையான மூலங்களிலிருந்து",
      descEn: "We work directly with certified organic farms and sustainable suppliers across Tamil Nadu and Kerala to bring you the freshest ingredients.",
      descTa: "தமிழ்நாடு மற்றும் கேரளா முழுவதும் சான்றளிக்கப்பட்ட கரிம பண்ணைகள் மற்றும் நிலையான சப்ளையர்களுடன் நேரடியாக பணியாற்றுகிறோம்.",
    },
    {
      icon: <FaCertificate className="text-3xl text-purple-500" />,
      titleEn: "Dermatologically Tested",
      titleTa: "சரும நிபுணர்களால் சோதிக்கப்பட்டது",
      descEn: "Every product undergoes rigorous quality testing to ensure it is safe, effective, and suitable for all skin and hair types.",
      descTa: "ஒவ்வொரு பொருளும் கடுமையான தர சோதனைக்கு உட்படுத்தப்படுகிறது — அனைத்து வகை சரும மற்றும் முடி வகைகளுக்கும் பாதுகாப்பானது.",
    },
  ];

  const tips = [
    {
      icon: <FaSun className="text-2xl text-pink-400" />,
      titleEn: "Morning Skincare Ritual",
      titleTa: "காலை சரும பராமரிப்பு",
      contentEn: "Start your day with a gentle cleanse using neem-based face wash, follow up with kumkumadi oil drops on damp skin, and finish with a light herbal moisturiser to lock in hydration.",
      contentTa: "வேப்ப சரும சுத்தப்படுத்தியால் மென்மையான சுத்தமாக தொடங்கி, ஈர சருமத்தில் குமகுமடி எண்ணெய் தொட்டு, நீரேற்றத்தை பூட்ட இலகுவான மூலிகை ஈரப்பதமூட்டியுடன் முடிக்கவும்.",
      tagEn: "FACE CARE",
      tagTa: "சரும பராமரிப்பு",
      tagColor: "bg-pink-100 text-pink-600",
    },
    {
      icon: <FaCut className="text-2xl text-teal-400" />,
      titleEn: "Weekly Hair Nourishment",
      titleTa: "வாராந்திர முடி ஊட்டம்",
      contentEn: "Warm Nilibhringadi or Brahmi oil and gently massage into scalp and hair. Leave for 30–60 minutes or overnight, then wash with herbal shampoo for best results.",
      contentTa: "நீலிபிரிங்காடி அல்லது பிரம்மி எண்ணெயை சூடாக்கி, தலை மற்றும் முடியில் மெதுவாக தேய்க்கவும். 30–60 நிமிடங்கள் அல்லது இரவு முழுவதும் வைத்திருந்து, மூலிகை ஷாம்பூவால் கழுவுங்கள்.",
      tagEn: "HAIR CARE",
      tagTa: "முடி பராமரிப்பு",
      tagColor: "bg-teal-100 text-teal-600",
    },
    {
      icon: <FaMoon className="text-2xl text-orange-400" />,
      titleEn: "Pre-Bath Body Ritual",
      titleTa: "குளிக்கும் முன் உடல் பராமரிப்பு",
      contentEn: "Use a natural herbal scrub 2–3 times a week on damp skin before bathing. Follow with sesame or coconut oil massage for deep nourishment and smooth, glowing skin.",
      contentTa: "வாரம் 2–3 முறை குளிக்கும் முன் ஈரமான சருமத்தில் இயற்கை மூலிகை ஸ்க்ரப் பயன்படுத்துங்கள். ஆழமான ஊட்டத்திற்கு எள்ளெண்ணெய் அல்லது தேங்காய் எண்ணெய் மசாஜ் செய்யுங்கள்.",
      tagEn: "BODY CARE",
      tagTa: "உடல் பராமரிப்பு",
      tagColor: "bg-orange-100 text-orange-600",
    },
  ];

  const testimonials = [
    { name: "Priya S.", location: "Chennai", rating: 5, review: "The Kumkumadi oil transformed my skin in just 2 weeks! Completely natural and effective. Will never go back to chemical products." },
    { name: "Rajeshwari K.", location: "Coimbatore", rating: 5, review: "The herbal face wash is so gentle. My sensitive skin finally found its perfect match. Love the brand and the quality." },
    { name: "Anandhi M.", location: "Madurai", rating: 5, review: "Nilibhringadi oil stopped my hair fall within a month! Unbelievable results. Pure, natural, and worth every rupee." },
  ];

  const stats = [
    { statKey: "fivePlusProd" },
    { statKey: "hundredNatural" },
    { statKey: "happyCustomers" },
    { statKey: "yearsHeritage" },
  ];
  const statValues = ["50+", "100%", "2500+", "30+"];

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      {/* Hero Banner */}
      <section className="relative bg-[rgb(7,81,89)] text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                <FaLeaf className="text-xs" /> {t("naturalAndAuthentic")}
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-5">
                {t("personalCare")}<br />
                <span className="text-orange-400">{t("theSiddhaWay")}</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-8">
                {t("notSureConsult")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/collections/Personal Care" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg inline-flex items-center gap-2">
                  {t("shopPersonalCare")} <FaChevronRight className="text-xs" />
                </Link>
                <Link to="/e-consultation" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-wider transition-all border border-white/30 inline-flex items-center gap-2">
                  {t("freeSkinConsultation")}
                </Link>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 max-w-md">
              {stats.map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-black text-orange-400">{statValues[i]}</p>
                  <p className="text-xs text-white/70 font-medium mt-1 leading-snug">{t(s.statKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-14 px-5 md:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-3">{t("browseByCategory")}</h2>
            <p className="text-slate-500">{t("findPerfectCare")}</p>
            <div className="w-14 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link key={i} to={cat.link}
                className={`relative flex flex-col items-center gap-4 pt-10 pb-7 px-5 rounded-[2rem] border ${cat.border} bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden`}
              >
                {/* Coloured top accent bar */}
                <span className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-[2rem] ${cat.accent}`} />
                {/* Big circular icon */}
                <div className={`w-20 h-20 rounded-full ${cat.circleBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <span className={cat.iconColor}>{cat.icon}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-black text-slate-800 group-hover:text-[rgb(7,81,89)] transition-colors text-sm mb-1">{t(cat.nameKey)}</h3>
                  <p className="text-xs text-slate-400 leading-snug">{t(cat.descKey)}</p>
                </div>
                {/* Pill CTA */}
                <span className={`mt-1 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white ${cat.accent}`}>
                  Shop Now <FaChevronRight className="text-[8px]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-14 px-5 md:px-10 lg:px-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-2">{t("ourProducts")}</h2>
              <p className="text-slate-500">{t("authenticProducts")}</p>
            </div>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                placeholder={t("searchProducts")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-2 border-slate-200 bg-white rounded-full pl-10 pr-5 py-3 text-sm font-medium outline-none focus:border-[rgb(7,81,89)] transition-colors w-64"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100">
              <FaSearch className="text-4xl text-slate-300 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-lg">No products found for "{search}"</p>
              <button onClick={() => setSearch("")} className="mt-4 text-[rgb(7,81,89)] font-bold hover:underline">Clear Search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col shadow-sm">
                  <Link to={`/ProductList/${product.id}`}>
                    <div className="aspect-square overflow-hidden p-6 bg-slate-50 rounded-t-[2rem]">
                      <img src={product.img} alt={product.productName} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <Link to={`/ProductList/${product.id}`}>
                      <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-[rgb(7,81,89)] transition-colors mb-2 line-clamp-2">{product.productName}</h3>
                    </Link>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">{product.productDescription}</p>
                    <div className="flex items-center gap-1 mb-4">
                      {[1,2,3,4,5].map(i => <StarIcon key={i} sx={{ fontSize: 15 }} className="text-amber-400" />)}
                      <span className="text-xs text-slate-400 ml-1 font-medium">91 {t("reviews")}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-black text-[rgb(7,81,89)]">₹{product.price}</span>
                      <button
                        onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5 text-sm shadow-md shadow-orange-500/20"
                      >
                        <FaCartPlus /> {t("addToCartBtn")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/collections/Personal Care"
              className="inline-flex items-center gap-2 bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] text-white font-bold px-10 py-4 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg"
            >
              {t("viewAllPersonalCare")} <FaChevronRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-14 px-5 md:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-3">{t("whyChoosePersonalCare")}</h2>
            <p className="text-slate-500">{t("siddhaAdvantage")}</p>
            <div className="w-14 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center mb-5 shadow-sm">
                  {b.icon}
                </div>
                <h3 className="font-black text-slate-800 text-base mb-3">{b.titleEn}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-14 px-5 md:px-10 lg:px-20 bg-[rgb(7,81,89)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3">{t("wellnessTips")}</h2>
            <p className="text-white/60">{t("ancientRoutines")}</p>
            <div className="w-14 h-1 bg-orange-400 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-[2rem] p-8 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    {tip.icon}
                  </div>
                  <span className={`inline-block text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest ${tip.tagColor}`}>
                    {tip.tagEn}
                  </span>
                </div>
                <h3 className="font-black text-white text-xl mb-4">{tip.titleEn}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{tip.contentEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 px-5 md:px-10 lg:px-20 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-3">{t("customersSay")}</h2>
            <p className="text-slate-500">{t("realResults")}</p>
            <div className="w-14 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t2, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(t2.rating)].map((_, j) => <FaStar key={j} className="text-sm" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t2.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(7,81,89)] to-teal-400 flex items-center justify-center text-white font-black text-base shadow-md">
                    {t2.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t2.name}</p>
                    <p className="text-xs text-slate-400">{t2.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 px-5 md:px-10 lg:px-20 bg-white">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[rgb(7,81,89)] to-teal-700 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none"></div>
          <div className="relative z-10">
            <FaLeaf className="text-4xl text-orange-400 mx-auto mb-5" />
            <h2 className="text-2xl md:text-4xl font-black mb-4">{t("naturalJourney")}</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">{t("notSureConsult")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/e-consultation" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg">
                {t("bookFreeConsultation")}
              </Link>
              <Link to="/collections/Personal Care" className="bg-white/15 hover:bg-white/25 text-white font-bold px-10 py-4 rounded-full uppercase tracking-wider border border-white/30 transition-all">
                {t("browseProducts")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalCare;
