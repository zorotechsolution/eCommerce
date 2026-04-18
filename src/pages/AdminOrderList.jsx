import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaClipboardList, FaBoxOpen, FaList, FaPlus, FaEye } from 'react-icons/fa';
import API from '../utils/axiosConfig';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/Login');
    } else {
      fetchOrders();
    }
  }, [user, isAuthenticated, navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/orders');
      setOrders(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Processing': return 'bg-amber-100 text-amber-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Options */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Manage Orders</h1>
            <p className="text-slate-500 font-medium mt-2">Admin Dashboard • Order Fulfillment</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/admin/orders" className="inline-flex items-center gap-2 bg-[rgb(7,81,89)] text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow">
              <FaClipboardList /> Orders
            </Link>
            <Link to="/admin/products" className="inline-flex items-center gap-2 bg-white text-[rgb(7,81,89)] border border-[rgb(7,81,89)] px-4 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-[rgb(7,81,89)] hover:text-white transition-colors">
              <FaList /> Products
            </Link>
            <Link to="/admin/add-product" className="inline-flex items-center gap-2 bg-white text-[rgb(7,81,89)] border border-[rgb(7,81,89)] px-4 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-[rgb(7,81,89)] hover:text-white transition-colors">
              <FaPlus /> Add New
            </Link>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-6 md:p-10">
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-[rgb(7,81,89)] rounded-full animate-spin"></div>
             </div>
          ) : orders.length === 0 ? (
             <div className="text-center py-16">
               <FaBoxOpen className="text-6xl text-slate-200 mx-auto mb-4" />
               <p className="text-lg font-bold text-slate-500">No orders found</p>
             </div>
          ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     <th className="p-4 rounded-tl-xl whitespace-nowrap">Order ID</th>
                     <th className="p-4">Customer</th>
                     <th className="p-4">Date</th>
                     <th className="p-4">Total Amount</th>
                     <th className="p-4">Status</th>
                     <th className="p-4 text-center rounded-tr-xl">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {orders.map(order => (
                     <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                       <td className="p-4">
                         <span className="font-bold text-slate-800 text-sm">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                       </td>
                       <td className="p-4">
                         <p className="font-bold text-slate-800 text-sm leading-tight">{order.user?.name || "Unknown"}</p>
                         <p className="text-xs text-slate-400 font-medium">{order.shippingAddress?.city}</p>
                       </td>
                       <td className="p-4">
                         <span className="text-sm font-medium text-slate-600">
                           {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                         </span>
                       </td>
                       <td className="p-4">
                         <span className="font-black text-[rgb(7,81,89)] text-sm">₹{order.totalPrice.toFixed(2)}</span>
                       </td>
                       <td className="p-4">
                         <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(order.orderStatus)}`}>
                           {order.orderStatus}
                         </span>
                       </td>
                       <td className="p-4">
                         <div className="flex items-center justify-center">
                           <Link to={`/admin/orders/${order._id}`} className="flex items-center gap-2 text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors font-bold text-xs uppercase tracking-wider">
                             <FaEye /> View
                           </Link>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderList;
