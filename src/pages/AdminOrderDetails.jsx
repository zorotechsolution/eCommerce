import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaBox, FaUser, FaMapMarkerAlt, FaCreditCard, FaCheckCircle, FaTruck } from 'react-icons/fa';
import API from '../utils/axiosConfig';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/Login');
    } else {
      fetchOrderDetails();
    }
  }, [id, user, isAuthenticated, navigate]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load order details");
      navigate('/admin/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === order.orderStatus) return;
    
    setUpdating(true);
    try {
      const { data } = await API.put(`/orders/${id}/status`, { status: newStatus });
      setOrder(data.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
     return (
       <div className="min-h-screen bg-slate-50 flex justify-center items-center">
         <div className="w-12 h-12 border-4 border-slate-200 border-t-[rgb(7,81,89)] rounded-full animate-spin"></div>
       </div>
     );
  }

  if (!order) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-8 px-5 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Top Nav */}
        <div className="flex items-center justify-between">
          <Link to="/admin/orders" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-[rgb(7,81,89)] transition-colors">
            <FaArrowLeft /> Back to Orders
          </Link>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-400">ORDER ID</p>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">#{order._id.toUpperCase()}</h1>
          </div>
        </div>

        {/* Status Update Banner */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
           {success && (
             <div className="absolute inset-0 bg-green-500 flex items-center justify-center text-white font-bold gap-2 z-10 animate-fade-in">
               <FaCheckCircle className="text-xl" /> Status Successfully Updated!
             </div>
           )}
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-[rgb(7,81,89)]/10 text-[rgb(7,81,89)] flex items-center justify-center text-xl">
               <FaTruck />
             </div>
             <div>
               <h2 className="text-lg font-black text-slate-800">Fulfillment Status</h2>
               <p className="text-xs font-medium text-slate-500">Update the current phase of this order.</p>
             </div>
           </div>
           
           <div className="relative w-full sm:w-64">
             <select 
               value={order.orderStatus} 
               onChange={handleStatusChange}
               disabled={updating}
               className={`w-full appearance-none border-2 rounded-xl px-4 py-3 outline-none font-bold text-sm tracking-wide transition-all cursor-pointer ${updating ? 'opacity-50 cursor-wait' : ''} ${
                 order.orderStatus === 'Delivered' ? 'border-green-500 bg-green-50 text-green-700' :
                 order.orderStatus === 'Shipped' ? 'border-blue-500 bg-blue-50 text-blue-700' :
                 order.orderStatus === 'Processing' ? 'border-amber-500 bg-amber-50 text-amber-700' :
                 'border-rose-500 bg-rose-50 text-rose-700'
               }`}
             >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
             </select>
             {updating && <div className="absolute right-4 top-4 w-4 h-4 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin"></div>}
           </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
           {/* Left/Main Column - Products */}
           <div className="md:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                 <h3 className="flex items-center gap-2 text-base font-black text-slate-800 mb-6 uppercase tracking-widest border-b border-slate-100 pb-4">
                   <FaBox className="text-[rgb(7,81,89)]" /> Order Items ({order.orderItems.length})
                 </h3>
                 <div className="flex flex-col gap-4 divide-y divide-slate-100">
                    {order.orderItems.map((item, index) => {
                       const rawImg = item.image || item.product?.images?.[0]?.url || "";
                       const imgUrl = rawImg.startsWith('http') ? rawImg : `http://localhost:5000${rawImg}`;
                       return (
                         <div key={index} className="flex items-center gap-4 pt-4 first:pt-0">
                           <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                             {rawImg ? <img src={imgUrl} alt={item.name} className="h-full object-contain" /> : <FaBox className="text-slate-300 text-xl" />}
                           </div>
                           <div className="flex-1 min-w-0">
                             <h4 className="font-bold text-slate-800 text-sm line-clamp-2 md:pr-4">{item.name}</h4>
                             <p className="text-xs font-bold text-slate-400 mt-1">Qty: <span className="text-slate-700">{item.quantity}</span></p>
                           </div>
                           <div className="text-right shrink-0">
                             <p className="font-black text-[rgb(7,81,89)]">₹{(item.price * item.quantity).toFixed(2)}</p>
                             <p className="text-xs font-medium text-slate-400">₹{item.price.toFixed(2)} each</p>
                           </div>
                         </div>
                       );
                    })}
                 </div>
              </div>
           </div>

           {/* Right Column - Info */}
           <div className="flex flex-col gap-6">
              
              {/* Customer Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                 <h3 className="flex items-center gap-2 text-sm font-black text-slate-800 mb-4 uppercase tracking-widest border-b border-slate-100 pb-3">
                   <FaUser className="text-orange-500" /> Customer Details
                 </h3>
                 <div className="text-sm font-medium text-slate-600 flex flex-col gap-2">
                   <p className="font-bold text-slate-800 text-base">{order.user?.name}</p>
                   <p>{order.user?.email}</p>
                   <p>{order.shippingAddress?.phoneNum}</p>
                 </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                 <h3 className="flex items-center gap-2 text-sm font-black text-slate-800 mb-4 uppercase tracking-widest border-b border-slate-100 pb-3">
                   <FaMapMarkerAlt className="text-blue-500" /> Shipping Address
                 </h3>
                 <div className="text-sm font-medium text-slate-600 flex flex-col gap-1.5 leading-relaxed">
                   <p>{order.shippingAddress?.address}</p>
                   <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                   <p>{order.shippingAddress?.country}</p>
                 </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                 <h3 className="flex items-center gap-2 text-sm font-black text-slate-800 mb-4 uppercase tracking-widest border-b border-slate-100 pb-3">
                   <FaCreditCard className="text-green-500" /> Payment Summary
                 </h3>
                 <div className="flex flex-col gap-3 text-sm">
                   <div className="flex justify-between items-center text-slate-500 font-medium">
                     <span>Subtotal</span>
                     <span>₹{(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-slate-500 font-medium">
                     <span>Shipping</span>
                     <span>₹{(order.shippingPrice || 0).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-slate-500 font-medium">
                     <span>Tax (GST)</span>
                     <span>₹{(order.taxPrice || 0).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center text-base font-black text-slate-800 pt-3 border-t border-slate-100 mt-1">
                     <span>Total</span>
                     <span className="text-[rgb(7,81,89)]">₹{order.totalPrice.toFixed(2)}</span>
                   </div>
                   <div className="mt-2 pt-3 border-t border-slate-100 text-xs font-bold uppercase tracking-widest text-center">
                     Payment: <span className={order.paymentStatus === 'Completed' ? 'text-green-600' : 'text-amber-500'}>{order.paymentStatus || 'Pending'}</span>
                   </div>
                 </div>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
