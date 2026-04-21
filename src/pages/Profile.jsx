import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import {
  FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaEdit, FaShieldAlt, FaSignOutAlt,
  FaBoxOpen, FaRupeeSign, FaShoppingCart, FaAngleRight, FaCheckCircle
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../store/authSlice';
import API from '../utils/axiosConfig';

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

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/Login');
    } else {
      const fetchOrders = async () => {
        try {
          const res = await API.get('/orders/myorders');
          setOrders(res.data.data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [auth.isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const openEditModal = () => {
    setEditForm({ name: auth.user.username || '', email: auth.user.email || '' });
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const res = await API.put('/auth/updatedetails', editForm);
      const updatedUser = res.data.data;
      
      dispatch(login({
        username: updatedUser.name,
        email: updatedUser.email,
        token: auth.user.token, // Preserve token
        role: updatedUser.role || auth.user.role,
        id: updatedUser.id || auth.user.id
      }));
      
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  const statusColor = {
    Delivered: 'bg-green-100 text-green-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  if (!auth.isAuthenticated || !auth.user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans mb-10">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t('myProfile') || 'Account Dashboard'}</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your account preferences and track your orders.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
          >
            <FaSignOutAlt /> {t('logout') || 'Sign Out'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-2xl font-bold uppercase mb-4">
                {auth.user.username.charAt(0)}
              </div>
              <h2 className="text-lg font-bold text-gray-900 leading-tight">{auth.user.username}</h2>
              <div className="flex items-center justify-center gap-1 mt-1 mb-6 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <FaCheckCircle /> Verified Customer
              </div>
              
              <button 
                onClick={openEditModal} 
                className="w-full flex justify-center items-center gap-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 py-2 rounded-md transition-colors"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Account Details</h3>
              </div>
              <div className="p-5 flex flex-col gap-4 text-sm text-gray-600">
                <div>
                  <dt className="text-xs font-medium text-gray-400 mb-1">Email</dt>
                  <dd className="font-medium text-gray-900">{auth.user.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-400 mb-1">Phone</dt>
                  <dd className="font-medium text-gray-900">+91 96292 97111</dd>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Activity</h3>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <Link to="/addcart" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors">
                  <FaShoppingCart className="text-gray-400 text-lg mb-2" />
                  <span className="text-xl font-bold text-gray-900">{cartCount}</span>
                  <span className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide">Cart Items</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors">
                  <FaHeart className="text-gray-400 text-lg mb-2" />
                  <span className="text-xl font-bold text-gray-900">{wishlistCount}</span>
                  <span className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide">Wishlist</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Main Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Orders Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">{t('orderHistory') || 'Order History'}</h2>
                <span className="text-sm text-gray-500 font-medium">Total Orders: {orders.length}</span>
              </div>
              
              <div className="overflow-x-auto">
                {loadingOrders ? (
                  <div className="px-6 py-12 flex justify-center text-sm font-medium text-gray-500">
                    Loading your orders...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mb-4">
                      <FaBoxOpen className="text-2xl text-gray-300" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{t('noOrders') || 'No orders yet'}</h3>
                    <p className="text-sm text-gray-500 mb-4">When you place an order, it will appear here.</p>
                    <Link to="/collections" className="text-sm font-medium text-[rgb(7,81,89)] hover:text-teal-700 bg-[rgb(7,81,89)]/10 px-4 py-2 rounded-md transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-200">
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{order._id.slice(-8).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ₹{order.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.orderItems.length}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor[order.orderStatus] || 'bg-gray-100 text-gray-800'}`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link to={`/order/${order._id}`} className="text-[rgb(7,81,89)] hover:text-teal-700 flex justify-end items-center gap-1 group-hover:underline">
                              View <FaAngleRight className="text-xs" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Helper Banner */}
            <div className="bg-[rgb(7,81,89)] rounded-lg p-6 flex flex-col md:flex-row items-center justify-between text-white shadow-sm border border-[rgb(6,70,80)]">
               <div>
                 <h3 className="font-bold text-lg">Need help with an order?</h3>
                 <p className="text-sm text-white/80 mt-1 max-w-lg">Our customer support team is available during standard business hours to assist you with tracking or modifications.</p>
               </div>
               <Link to="/about" className="mt-4 md:mt-0 px-6 py-2 bg-white text-[rgb(7,81,89)] font-bold text-sm rounded-md hover:bg-gray-100 transition-colors">
                  Contact Support
               </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Structured Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Edit Profile Information</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgb(7,81,89)] focus:border-[rgb(7,81,89)] text-gray-900" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[rgb(7,81,89)] focus:border-[rgb(7,81,89)] text-gray-900" 
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={editLoading} 
                  className="px-4 py-2 text-sm font-medium text-white bg-[rgb(7,81,89)] border border-[rgb(7,81,89)] rounded-md hover:bg-teal-800 transition-colors"
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;