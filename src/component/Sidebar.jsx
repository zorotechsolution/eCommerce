import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome, FaInfoCircle, FaShoppingBag, FaLeaf, FaUser, FaHeart, FaPhone, FaTimes, FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLang } from "../context/LangContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { t } = useLang();

  const close = () => setOpen(false);

  const navLinks = [
    { to: "/", labelKey: "home", icon: <FaHome /> },
    { to: "/siddhar", labelKey: "siddhar", icon: <FaLeaf /> },
    { to: "/personal-care", labelKey: "personalCare", icon: <FaLeaf /> },
    { to: "/e-consultation", label: "E-Consultation", icon: <FaPhone /> },
    { to: auth.isAuthenticated ? "/profile" : "/Login", label: auth.isAuthenticated ? auth.user?.username || t('myProfile') : t('login'), icon: <FaUser /> },
    { to: "/wishlist", labelKey: "wishlist", icon: <FaHeart /> },
  ];

  const collectionLinks = [
    { to: "/collections", label: "All Collections" },
    { to: "/collections/Siddhar", label: "Siddhar" },
    { to: "/collections/Classical Medicines", label: "Classical Medicines" },
    { to: "/collections/Personal Care", label: "Personal Care" },
    { to: "/collections/Brands", label: "Brands" },
    { to: "/collections/Health & Nutrition", label: "Health & Nutrition" },
    { to: "/collections/General", label: "General" },
  ];

  const aboutLinks = [
    { to: "/about", label: "About Us" },
    { to: "/company-profile", label: "Company Profile" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-1">
        <FaBars className="text-2xl text-white" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Slide-in Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[rgb(7,81,89)]">
          <div>
            <p className="font-black text-white text-base uppercase tracking-widest leading-tight">Vel Siddhar</p>
            <p className="text-orange-400 text-xs font-bold tracking-widest">Arakkattalai</p>
          </div>
          <button onClick={close} className="text-white/80 hover:text-white p-1 transition-colors">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} onClick={close} className="flex items-center gap-3 px-6 py-3.5 font-bold text-slate-700 hover:bg-[rgb(7,81,89)]/5 hover:text-[rgb(7,81,89)] transition-colors text-sm">
                  <span className="text-[rgb(7,81,89)] text-base">{link.icon}</span>
                  {link.labelKey ? t(link.labelKey) : link.label}
                </Link>
              </li>
            ))}

            {/* About Us Accordion */}
            <li>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="w-full flex items-center justify-between gap-3 px-6 py-3.5 font-bold text-slate-700 hover:bg-[rgb(7,81,89)]/5 hover:text-[rgb(7,81,89)] transition-colors text-sm"
              >
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-[rgb(7,81,89)] text-base" />
                  {t('aboutUs')}
                </div>
                <FaChevronDown className={`text-xs transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              {aboutOpen && (
                <ul className="bg-slate-50 border-l-2 border-[rgb(7,81,89)]/20 ml-6">
                  {aboutLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={close}
                        className="block px-6 py-2.5 text-sm text-slate-600 hover:text-[rgb(7,81,89)] font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Collections Accordion */}
            <li>
              <button
                onClick={() => setCollectionsOpen(!collectionsOpen)}
                className="w-full flex items-center justify-between gap-3 px-6 py-3.5 font-bold text-slate-700 hover:bg-[rgb(7,81,89)]/5 hover:text-[rgb(7,81,89)] transition-colors text-sm"
              >
                <div className="flex items-center gap-3">
                  <FaShoppingBag className="text-[rgb(7,81,89)] text-base" />
                  {t('collections')}
                </div>
                <FaChevronDown className={`text-xs transition-transform ${collectionsOpen ? "rotate-180" : ""}`} />
              </button>
              {collectionsOpen && (
                <ul className="bg-slate-50 border-l-2 border-[rgb(7,81,89)]/20 ml-6">
                  {collectionLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={close}
                        className="block px-6 py-2.5 text-sm text-slate-600 hover:text-[rgb(7,81,89)] font-medium transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
          <Link
            to="/e-consultation"
            onClick={close}
            className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl uppercase tracking-wider text-sm transition-colors"
          >
            {t('bookFreeConsultation')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
