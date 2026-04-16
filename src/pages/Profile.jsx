import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import {
  FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaEdit, FaShieldAlt, FaSignOutAlt
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Profile = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const auth = useSelector((state) => state.auth);
  const cartCount = useSelector(state => state.cart.items.length);
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const cartTotal = useSelector(state =>
    state.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  );

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/Login');
    }
  }, [auth.isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const mockOrders = [
    { id: 'AYU100234', date: '12 Apr 2026', status: 'Delivered', total: 450, items: 2 },
    { id: 'AYU099891', date: '05 Apr 2026', status: 'Shipped', total: 780, items: 3 },
    { id: 'AYU098001', date: '25 Mar 2026', status: 'Delivered', total: 310, items: 1 },
  ];

  const statusColor = {
    Delivered: 'bg-green-100 text-green-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  if (!auth.isAuthenticated || !auth.user) return null;

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 lg:px-24">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase flex items-center gap-3">
          <FaUser className="text-[rgb(7,81,89)]" /> {t('profile')}
        </h1>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left — User Info */}
        <div className="flex flex-col gap-6">
          {/* Avatar Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[rgb(7,81,89)] to-teal-400 rounded-full flex items-center justify-center mb-4 shadow-lg uppercase text-white text-3xl font-black">
              {auth.user.username.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{auth.user.username}</h2>
            <p className="text-sm text-gray-500 mt-1">Vel Siddhar Arakkattalai Member since 2024</p>
            <div className="flex items-center gap-1 mt-2">
              <FaShieldAlt className="text-orange-400 text-xs" />
              <span className="text-xs text-orange-500 font-semibold">Verified Customer</span>
            </div>
            <button className="mt-4 flex items-center gap-2 text-sm text-[rgb(7,81,89)] border border-[rgb(7,81,89)] px-4 py-2 rounded-full hover:bg-[rgb(7,81,89)] hover:text-white transition-colors">
              <FaEdit className="text-xs" /> Edit Profile
            </button>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest mb-4">Contact Information</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <FaPhone className="text-[rgb(7,81,89)] shrink-0" />
                <span>+91 96292 97111</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[rgb(7,81,89)] shrink-0" />
                <span>{auth.user.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[rgb(7,81,89)] shrink-0 mt-0.5" />
                <span>123 Temple Street, Nagercoil, Tamil Nadu - 629001</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest mb-4">My Account Stats</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/addcart" className="flex flex-col items-center bg-orange-50 rounded-xl p-4 hover:shadow-md transition">
                <FaShoppingBag className="text-orange-500 text-2xl mb-1" />
                <span className="text-2xl font-bold text-gray-800">{cartCount}</span>
                <span className="text-xs text-gray-500">{t('cart')}</span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center bg-red-50 rounded-xl p-4 hover:shadow-md transition">
                <FaHeart className="text-red-400 text-2xl mb-1" />
                <span className="text-2xl font-bold text-gray-800">{wishlistCount}</span>
                <span className="text-xs text-gray-500">{t('wishlist')}</span>
              </Link>
              <div className="flex flex-col items-center bg-teal-50 rounded-xl p-4">
                <span className="text-lg font-bold text-[rgb(7,81,89)]">₹{cartTotal.toLocaleString()}</span>
                <span className="text-xs text-gray-500">Cart Value</span>
              </div>
              <div className="flex flex-col items-center bg-green-50 rounded-xl p-4">
                <span className="text-2xl font-bold text-gray-800">3</span>
                <span className="text-xs text-gray-500">Total Orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Orders */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* About Siddhar Store */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-3">
              Siddhar — One of the Best Online Ayurvedic Stores in India
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Quality{' '}
              <Link to="/Siddhar" className="text-[rgb(7,81,89)] font-bold underline hover:text-orange-500 transition">
                Siddhar products
              </Link>{' '}
              at a click! Siddhar aims to bring the world of authentic Siddha herbs and Siddha medicines
              to your doorstep within the shortest delivery time possible.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Siddhar is one of the leading online platforms in India offering a wide range of traditional Siddha-based
              products focused on natural health, wellness, and spiritual living. Inspired by the ancient knowledge of the
              Tamil Siddhars, the store makes authentic Siddha-related products easily accessible across the country.
            </p>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest mb-4">Recent Orders</h3>
            <div className="flex flex-col gap-3">
              {mockOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
                  <div>
                    <p className="font-bold text-sm text-gray-800">#{order.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{order.date} · {order.items} items</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                    <span className="text-sm font-bold text-[rgb(7,81,89)]">₹{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { to: '/collections', label: t('collections'), bg: 'bg-orange-50 text-orange-600' },
                { to: '/addcart', label: t('cart'), bg: 'bg-teal-50 text-teal-700' },
                { to: '/wishlist', label: t('wishlist'), bg: 'bg-red-50 text-red-600' },
                { to: '/Siddhar', label: t('siddhar'), bg: 'bg-green-50 text-green-700' },
                { to: '/', label: t('home'), bg: 'bg-gray-50 text-gray-700' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${link.bg} text-center text-xs font-bold py-3 px-2 rounded-xl hover:shadow-md transition-shadow`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;