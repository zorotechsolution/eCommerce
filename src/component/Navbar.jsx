import { FaHeart, FaPen, FaUser, FaSearch, FaGlobe, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Icon from "../../src/assets/image.png";
import { IoMdCall } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useLang } from "../context/LangContext";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const auth = useSelector((state) => state.auth);
  const { lang, toggleLang, t } = useLang();
  
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <nav>
        {/* Contact Strip */}
        <div className="bg-[rgb(7,81,89)] text-white text-[11px] md:text-sm hidden md:block">
          <div className="flex justify-between items-center px-10 lg:px-20 py-2">
            <div className="flex items-center gap-6 font-medium tracking-wide">
              <span className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <FaMapMarkerAlt className="text-orange-400" />
                {t('addressLine1')} {t('addressLine2')} {t('addressLine3')}
              </span>
              <a href={`tel:${t('contactNumber')}`} className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <IoMdCall className="text-orange-400" />
                +91 {t('contactNumber')}
              </a>
              <a href={`mailto:${t('emailId')}`} className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <FaEnvelope className="text-orange-400" />
                {t('emailId')}
              </a>
            </div>
            <div className="flex items-center gap-2 text-white/80 font-bold tracking-widest uppercase text-xs">
              Vel Siddhar Vaithiyasala
            </div>
          </div>
        </div>

        <div className="">
          <div className="bg-[rgb(233,237,215)] hidden md:block ">
            <div className=" flex justify-between  px-20">
              <ul className="flex items-center gap-6 pt-2">
                <li className="">
                  <Link to="/wishlist">
                    <FaHeart className="inline-block " /> {t('wishlist')} ({wishlistCount})
                  </Link>
                </li>
                {auth.isAuthenticated ? (
                   <>
                     <li>
                       <Link to="/profile" className="font-bold text-[rgb(7,81,89)] flex items-center gap-1">
                         <FaUser className="border border-[rgb(7,81,89)] rounded-full p-0.5 text-lg bg-[rgb(7,81,89)] text-white" />
                         {auth.user.username}
                       </Link>
                     </li>
                     {auth.user.role === 'admin' && (
                       <li>
                         <Link to="/admin/add-product" className="text-orange-600 font-black hover:text-orange-700 transition-colors">
                           + ADD PRODUCT
                         </Link>
                       </li>
                     )}
                   </>
                ) : (
                  <>
                    <li>
                      <Link to={"/Login"}>
                        <RiLoginBoxLine className="inline" /> {t('login')}
                      </Link>
                    </li>
                    <li>
                      <Link to={"/Signup"}>
                        <FaPen className="inline" /> {t('createAccount')}
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 bg-[rgb(7,81,89)] text-white text-xs font-black px-3 py-1.5 rounded-full hover:bg-orange-500 transition-colors"
                  title="Switch Language"
                >
                  <FaGlobe className="text-xs" />
                  {t('switchLang')}
                </button>
                <Link to={"/addcart"}>
                  <div className="bg-[rgb(7,81,89)] py-2 px-4 flex items-center justify-center">
                    <div className="text-white flex items-center font-bold">
                      <FaCartShopping className="inline text-lg" />
                      <span className="ps-2 bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                        {cartCount}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:px-30 text-sm md:text-lg  pt-1 ">
              <div className="flex items-center justify-center md:justify-start">
                <Link to={"/"} className="flex items-center gap-3">
                  <img src={Icon} alt="Vel Siddhar Arakkattalai Logo" className="w-12 h-12 object-contain" />
                  <div className="flex flex-col">
                    <span className="font-black text-[rgb(7,81,89)] text-lg md:text-xl leading-none uppercase tracking-widest">{t('brandVelSiddhar')}</span>
                    <span className="font-bold text-orange-600 text-xs md:text-sm tracking-widest">{t('brandArakkattalai')}</span>
                  </div>
                </Link>
              </div>
              <div className=" hidden lg:flex items-center justify-center">
                <div className="">
                  <CiDeliveryTruck className="text-4xl hidden md:inline " />
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="">{t('freeShipping')}</div>
                  <div className="">{t('onOrderAbove')}</div>
                  <div className="hidden md:inline text-sm ">
                    {" "}
                    {t('onlySelected')}
                  </div>
                </div>
              </div>
              <div className=" md:flex items-center  justify-center w-full">
                <div className="flex justify-between    ">
                  <input
                    type="search"
                    placeholder={t('searchPlaceholder')}
                    className="outline-0 w-full md:w-60 border  px-3 text-sm"
                  />
                  <button className="bg-amber-500 p-2 ">
                    <FaSearch style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="py-4 hidden md:block bg-[rgb(7,81,89)] sticky w-full top-0 font-bold text-white uppercase text-sm z-30 shadow-md">
        <div className="px-10 lg:px-30">
          <ul className="flex flex-wrap justify-center md:justify-between items-center gap-4">
             <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">{t('home')}</Link>
            </li>
            <li className="relative group py-2">
              <Link to="/about" className="hover:text-amber-400 transition-colors">{t('aboutUs')}</Link>
              <ul className="absolute hidden text-black group-hover:block top-full left-0 w-48 shadow-lg bg-white border border-gray-100 rounded-b-lg overflow-hidden">
                <li className="hover:bg-gray-100 transition-all duration-300 hover:text-[rgb(7,81,89)]">
                  <Link to="/company-profile" className="block w-full px-5 py-3">{t('companyProfileTitle')}</Link>
                </li>
                <li className="hover:bg-gray-100 transition-all duration-300 hover:text-[rgb(7,81,89)]">
                  <Link to="/about" className="block w-full px-5 py-3">{t('ourFounder')}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/siddhar" className="hover:text-amber-400 transition-colors">{t('siddhar')}</Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-amber-400 transition-colors">{t('collections')}</Link>
            </li>
            <li className="relative group py-2">
              <Link  className="hover:text-amber-400 transition-colors flex items-center gap-1">
                {t('personalCare')} <span className="text-[10px] opacity-70">▼</span>
              </Link>
              {/* Mega Dropdown */}
              <div className="absolute hidden group-hover:flex top-full left-1/2 -translate-x-1/2 w-[680px] bg-white shadow-2xl border-t-4 border-orange-500 z-50 text-black rounded-b-xl overflow-hidden">
                <div className="grid grid-cols-3 w-full divide-x divide-gray-100">
                  {/* Column 1 */}
                  <div className="p-6">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
                      {t('group1')}
                    </h4>
                    <ul className="flex flex-col gap-2 text-sm font-semibold normal-case">
                      {[
                        { label: t('coughAndCold'), slug: "cough-and-cold" },
                        { label: t('fever'), slug: "fever" },
                        { label: t('migraine'), slug: "migraine" },
                        { label: t('sinus'), slug: "sinus" },
                      ].map(item => (
                        <li key={item.slug}>
                          <Link to={`/personal-care/${item.slug}`} className="block py-1.5 text-slate-700 hover:text-orange-500 transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Column 2 */}
                  <div className="p-6">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
                      {t('group2')}
                    </h4>
                    <ul className="flex flex-col gap-2 text-sm font-semibold normal-case">
                      {[
                        { label: t('bodyCare'), slug: "body-care" },
                        { label: t('faceCare'), slug: "face-care" },
                        { label: t('ayurvedicHairOil'), slug: "hair-oil" },
                        { label: t('skinBeautyCare'), slug: "skin-beauty" },
                      ].map(item => (
                        <li key={item.slug}>
                          <Link to={`/personal-care/${item.slug}`} className="block py-1.5 text-slate-700 hover:text-orange-500 transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Column 3 */}
                  <div className="p-6">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">
                      {t('group3')}
                    </h4>
                    <ul className="flex flex-col gap-2 text-sm font-semibold normal-case">
                      {[
                        { label: t('constipation'), slug: "constipation" },
                        { label: t('diabetesControl'), slug: "diabetes" },
                        { label: t('digestion'), slug: "digestion" },
                        { label: t('gastroHealth'), slug: "gastro" },
                        { label: t('obesity'), slug: "obesity" },
                        { label: t('pilesHemorrhoid'), slug: "piles" },
                      ].map(item => (
                        <li key={item.slug}>
                          <Link to={`/personal-care/${item.slug}`} className="block py-1.5 text-slate-700 hover:text-orange-500 transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Link to="/collections/Health & Nutrition" className="hover:text-amber-400 transition-colors">{t('healthNutrition')}</Link>
            </li>
            <li>
              <Link to="/e-consultation" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 inline-block">
                {t('eConsultTitle')}
              </Link>
            </li>
            {auth.isAuthenticated && (
              <li>
                <Link to="/profile" className="hover:text-amber-400 transition-colors">{t('myOrders')}</Link>
              </li>
            )}
            {auth.isAuthenticated && auth.user.role === 'admin' && (
              <li>
                <Link to="/admin/add-product" className="bg-white text-[rgb(7,81,89)] px-4 py-1.5 rounded-lg font-black hover:bg-amber-400 transition-colors">{t('admin')}</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <nav className="bg-[rgb(7,81,89)] md:hidden sticky top-0 z-40 shadow-md">
        <div className="px-5 py-3">
          <ul className="flex justify-between items-center">
            <li>
              <Sidebar />
            </li>
            <li className="flex gap-4 items-center">
              <Link to={auth.isAuthenticated ? "/profile" : "/Login"}>
                <FaUser className={`text-xl transition-colors ${auth.isAuthenticated ? "text-amber-400" : "text-white"} hover:text-amber-400`} />
              </Link>
              <Link to="/wishlist" className="relative">
                <FaHeart className="text-xl text-white hover:text-amber-400 transition-colors" />
                {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{wishlistCount}</span>}
              </Link>
              <Link to={"/addcart"} className="relative">
                <FaCartShopping className="text-xl text-white hover:text-amber-400 transition-colors" />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

