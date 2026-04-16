import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram, FaTumblr, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCcPaypal, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#021319] text-gray-300 pt-16 pb-6 font-sans">
      <div className="max-w-[85rem] mx-auto px-5 md:px-10 lg:px-16">
        
        {/* Footer Brand Logo */}
        <div className="mb-6 flex flex-col md:items-start text-center md:text-left">
          <Link to="/" className="inline-block">
            <h2 className="text-sm font-bold text-white tracking-wider uppercase">
              Vel Siddhar <span className="text-orange-500">Arakkattalai</span>
            </h2>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* INFORMATIONS */}
          <div>
            <h3 className="text-orange-500 text-sm font-bold uppercase mb-6 tracking-wide">
              Informations
            </h3>
            <ul className="text-sm flex flex-col gap-3">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/siddhar" className="hover:text-white transition-colors">What Is Siddhar ?</Link></li>
              <li><Link to="/siddhar" className="hover:text-white transition-colors">Siddhar Wellness</Link></li>
              <li><Link to="/collections" className="hover:text-white transition-colors">Search</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* CUSTOMER SERVICES */}
          <div>
            <h3 className="text-orange-500 text-sm font-bold uppercase mb-6 tracking-wide">
              Customer Services
            </h3>
            <ul className="text-sm flex flex-col gap-3">
              <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">International Shipping</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
            </ul>
          </div>

          {/* QUICK SHOP */}
          <div>
            <h3 className="text-orange-500 text-sm font-bold uppercase mb-6 tracking-wide">
              Quick Shop
            </h3>
            <ul className="text-sm flex flex-col gap-3">
              <li><Link to="/Login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/Signup" className="hover:text-white transition-colors">Create an Account</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="text-orange-500 text-sm font-bold uppercase mb-6 tracking-wide">
              Contact Us
            </h3>
            <ul className="text-[13px] flex flex-col gap-4 mb-8">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-gray-400" />
                <span className="leading-relaxed">New No.19, Old No.61, 27th Street,<br/>L-Block, Anna nagar East,<br/>Chennai - 600 102. India</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-gray-400" />
                <span>(044) 4859 9296</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="shrink-0 text-gray-400" />
                <span>sales@velsiddhararakkattalai.com</span>
              </li>
            </ul>

            <h3 className="text-orange-500 text-sm font-bold uppercase mb-4 tracking-wide">
              Stay Connected
            </h3>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors text-xs">
                <FaFacebookF />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors text-xs">
                <FaTwitter />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors text-xs">
                <FaPinterestP />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors text-xs">
                <FaInstagram />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors text-xs">
                <FaTumblr />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition-colors text-xs">
                <FaYoutube />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#11232b] pt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-400">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-gray-300">© {new Date().getFullYear()} Vel Siddhar Arakkattalai. All Rights Reserved.</p>
            <div className="flex gap-4 font-medium">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
          </div>
          <div className="flex items-center gap-2 text-2xl text-white bg-white p-1 rounded mt-2 md:mt-0">
            <FaCcPaypal className="text-[#003087]" />
            <FaCcVisa className="text-[#1A1F71]" />
            <FaCcMastercard className="text-[#EB001B]" />
            <FaCcAmex className="text-[#002663]" />
            <FaCcDiscover className="text-[#E55C20]" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

