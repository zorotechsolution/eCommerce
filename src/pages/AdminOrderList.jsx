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
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans mb-10">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Orders</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Dashboard • Order Fulfillment</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/admin/orders" className="inline-flex items-center gap-2 bg-[rgb(7,81,89)] text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
              <FaClipboardList /> Orders
            </Link>
            <Link to="/admin/products" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <FaList /> Products
            </Link>
            <Link to="/admin/add-product" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <FaPlus /> Add New
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="w-10 h-10 border-4 border-gray-200 border-t-[rgb(7,81,89)] rounded-full animate-spin"></div>
             </div>
          ) : orders.length === 0 ? (
             <div className="text-center py-16">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mb-4 mx-auto">
                 <FaBoxOpen className="text-2xl text-gray-300" />
               </div>
               <h3 className="text-base font-semibold text-gray-900 mb-1">No orders found</h3>
               <p className="text-sm text-gray-500">You currently do not have any orders in the system.</p>
             </div>
          ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-gray-50/50 border-b border-gray-200">
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Amount</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200">
                   {orders.map(order => (
                     <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                         #{order._id.substring(order._id.length - 8).toUpperCase()}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <p className="text-sm font-medium text-gray-900 leading-tight">{order.user?.name || "Unknown Customer"}</p>
                         <p className="text-xs text-gray-500">{order.shippingAddress?.city || "No City Provided"}</p>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                         ₹{order.totalPrice.toLocaleString()}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.orderStatus)}`}>
                           {order.orderStatus}
                         </span>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <Link to={`/admin/orders/${order._id}`} className="text-[rgb(7,81,89)] hover:text-teal-700 flex justify-end items-center gap-1 group-hover:underline">
                           <FaEye /> View
                         </Link>
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
