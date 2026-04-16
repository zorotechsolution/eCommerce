import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { GrPrevious, GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { ayurvedicMedicines } from "../db/data";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { FaCartPlus, FaLeaf, FaTruck, FaShieldAlt, FaCertificate } from "react-icons/fa";
import { useLang } from "../context/LangContext";

function Home() {
  let [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const dispatch = useDispatch();
  const { t } = useLang();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const homeCarouselImages = [
    {
      id: 1,
      imgLink: "https://images.pexels.com/photos/7615621/pexels-photo-7615621.jpeg",
      alt: "Ayurvedic herbs and spices",
      headline: "Ancient Wisdom,\nModern Wellness",
      sub: "Authentic Siddha & Ayurvedic medicines delivered to your door",
    },
    {
      id: 2,
      imgLink: "https://images.pexels.com/photos/4174743/pexels-photo-4174743.jpeg",
      alt: "Natural healthcare",
      headline: "Pure. Natural.\nAuthentic.",
      sub: "Shop India's finest Ayurvedic products from trusted brands",
    },
    {
      id: 3,
      imgLink: "https://images.pexels.com/photos/6978215/pexels-photo-6978215.jpeg",
      alt: "Herbal wellness",
      headline: "Heal Naturally,\nLive Fully",
      sub: "Certified Ayurvedic medicines for every need",
    },
  ];

  const categories = [
    { name: "Siddhar", path: "/collections/Siddhar", icon: "🌿" },
    { name: "Classical Medicines", path: "/collections/Classical Medicines", icon: "⚗️" },
    { name: "Personal Care", path: "/collections/Personal Care", icon: "✨" },
    { name: "Brands", path: "/collections/Brands", icon: "🏷️" },
    { name: "Health & Nutrition", path: "/collections/Health & Nutrition", icon: "💊" },
    { name: "General", path: "/collections/General", icon: "🌱" },
  ];

  const features = [
    { icon: <FaLeaf className="text-3xl" />, titleKey: "hundredNaturalFeat", descKey: "hundredNaturalDesc" },
    { icon: <FaTruck className="text-3xl" />, titleKey: "fastDelivery", descKey: "fastDeliveryDesc" },
    { icon: <FaShieldAlt className="text-3xl" />, titleKey: "trustedQuality", descKey: "trustedQualityDesc" },
    { icon: <FaCertificate className="text-3xl" />, titleKey: "certifiedProducts", descKey: "certifiedProductsDesc" },
  ];

  return (
    <>
      {/* Hero Carousel */}
      <div className="w-full h-[60vh] md:h-[70vh] relative">
        <Carousel
          autoPlay
          infiniteLoop
          interval={4000}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={onClickHandler}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <GrPrevious className="text-[rgb(7,81,89)]" />
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={onClickHandler}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110"
              >
                <GrNext className="text-[rgb(7,81,89)]" />
              </button>
            )
          }
        >
          {homeCarouselImages.map((item) => (
            <div key={item.id} className="h-[60vh] md:h-[70vh] relative">
              <img
                src={item.imgLink}
                alt={item.alt}
                className="w-full h-full object-cover block brightness-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-5 z-10">
                <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight mb-4 whitespace-pre-line">
                  {item.headline}
                </h1>
                <p className="text-base md:text-xl text-white/80 font-medium max-w-xl mb-8">
                  {item.sub}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/collections" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg">
                    {t('shopNow')}
                  </Link>
                  <Link to="/e-consultation" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all border border-white/40">
                    {t('bookConsultation')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Brand Banner */}
      <div className="w-full bg-[rgb(7,81,89)] px-6 py-10 flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug max-w-3xl">
          {t('buyAyurvedic')}
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
          {t('buyAyurvedicSub')}
        </p>
        <Link to="/collections" className="mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5">
          {t('exploreAllProducts')}
        </Link>
      </div>

      {/* Features Section */}
      <div className="py-14 px-5 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="text-[rgb(7,81,89)]">{f.icon}</div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">{t(f.titleKey)}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="py-14 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight mb-3">
              {t('topSelling')}
            </h2>
            <p className="text-slate-500 font-medium">{t('exploreMore')}</p>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
            centerMode={true}
            centerSlidePercentage={isMobile ? 100 : 25}
          >
            {ayurvedicMedicines.map((product) => (
              <div key={product.id} className="px-3 pb-4">
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <Link to={`/ProductList/${product.id}`}>
                    <div className="aspect-square overflow-hidden p-4 bg-slate-50">
                      <img
                        src={product.img}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                        alt={product.productName}
                      />
                    </div>
                    <div className="p-4 text-left">
                      <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">{product.category}</p>
                      <h3 className="font-bold text-slate-800 line-clamp-2 text-sm leading-snug group-hover:text-[rgb(7,81,89)] transition-colors mb-2">
                        {product.productName}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-[rgb(7,81,89)]">₹{product.price}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <button
                      onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
                      className="w-full flex items-center justify-center gap-2 bg-[rgb(7,81,89)] hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                    >
                      <FaCartPlus /> {t('addToCartBtn')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Shop by Category */}
      <div className="py-14 px-5 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight mb-3">
              {t('shopByCategory')}
            </h2>
            <p className="text-slate-500 font-medium">{t('shopByCategorySub')}</p>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.path}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-slate-100 hover:border-[rgb(7,81,89)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs md:text-sm font-bold text-slate-700 text-center group-hover:text-[rgb(7,81,89)] transition-colors leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* About Ayurveda Section */}
      <div className="py-14 px-5 bg-[rgb(7,81,89)] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">
            {t('naturalHealthcare')}
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-white/80 leading-relaxed text-sm md:text-base max-w-3xl mx-auto mb-4">
            {t('naturalHealthcareSub')}
          </p>
          <p className="text-white/70 leading-relaxed text-sm md:text-base max-w-3xl mx-auto">
            {t('naturalHealthcareSub2')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/siddhar" className="bg-white text-[rgb(7,81,89)] font-bold px-8 py-3 rounded-full uppercase tracking-wider hover:-translate-y-0.5 transition-all shadow-lg">
              {t('learnAboutSiddhar')}
            </Link>
            <Link to="/collections" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full uppercase tracking-wider hover:-translate-y-0.5 transition-all shadow-lg">
              {t('browseProducts')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
