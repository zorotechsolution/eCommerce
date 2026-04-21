import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { FaMap, FaAngleRight, FaHome, FaShoppingBag, FaInfoCircle, FaGavel, FaUserShield } from 'react-icons/fa';

const Sitemap = () => {
  const { t } = useLang();

  const sitemapData = [
    {
      title: "Main Store",
      icon: <FaHome className="text-[rgb(7,81,89)]" />,
      links: [
        { name: t('home') || "Home", path: "/" },
        { name: t('collections') || "All Collections", path: "/collections" },
        { name: t('siddhar') || "Siddhar Framework", path: "/siddhar" },
        { name: "Personal Care", path: "/personal-care" },
        { name: t('eConsultation') || "E-Consultation", path: "/e-consultation" },
      ]
    },
    {
      title: "Shopping",
      icon: <FaShoppingBag className="text-orange-500" />,
      links: [
        { name: t('cart') || "Shopping Cart", path: "/addcart" },
        { name: t('wishlist') || "My Wishlist", path: "/wishlist" },
        { name: "Checkout", path: "/checkout" },
        { name: t('myProfile') || "Account Dashboard", path: "/profile" },
      ]
    },
    {
      title: "Company",
      icon: <FaInfoCircle className="text-blue-500" />,
      links: [
        { name: t('aboutUs') || "About Us", path: "/about" },
        { name: "Company Profile", path: "/company-profile" },
        { name: "Sign In", path: "/Login" },
        { name: "Register", path: "/Signup" },
      ]
    },
    {
      title: "Legal & Support",
      icon: <FaGavel className="text-gray-500" />,
      links: [
        { name: t('privacyPolicy') || "Privacy Policy", path: "/privacy-policy" },
        { name: t('termsOfService') || "Terms & Conditions", path: "/terms" },
        { name: t('refundSettings') || "Refund Policy", path: "/refund-policy" },
        { name: t('shippingPolicy') || "Shipping & Delivery", path: "/shipping-delivery" },
      ]
    },
    {
      title: "Administration",
      icon: <FaUserShield className="text-red-500" />,
      links: [
        { name: "Manage Orders", path: "/admin/orders" },
        { name: "Manage Inventory", path: "/admin/products" },
        { name: "Add New Product", path: "/admin/add-product" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      {/* Hero Banner */}
      <div className="bg-[rgb(7,81,89)] py-16 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-5 blur-xl -translate-x-10 -translate-y-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400 rounded-full mix-blend-overlay opacity-10 blur-3xl translate-x-10 translate-y-20 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <FaMap className="text-5xl text-orange-400 mb-4 drop-shadow-md" />
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">Sitemap</h1>
          <p className="text-teal-100 font-medium max-w-lg mx-auto text-sm md:text-base">
            Navigate through all sections of Vel Siddhar Arakkattalai. Find our collections, company information, and support pages below.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 mt-10 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapData.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <span className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                  {section.icon}
                </span>
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <Link 
                      to={link.path} 
                      className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[rgb(7,81,89)] group transition-colors"
                    >
                      <FaAngleRight className="text-gray-300 group-hover:text-orange-500 transition-colors" />
                      <span className="group-hover:underline">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
