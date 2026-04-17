import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBoxOpen, FaMapMarkerAlt, FaCreditCard, FaTruck, FaCheckCircle, FaPrint, FaExclamationCircle } from 'react-icons/fa';
import { useLang } from '../context/LangContext';
import API from '../utils/axiosConfig';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const statusStyles = {
    Delivered: 'bg-green-100 text-green-700 border-green-200',
    Shipped: 'bg-blue-100 text-blue-700 border-blue-200',
    Processing: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'Delivered': return <FaCheckCircle className="text-green-500 text-3xl" />;
      case 'Shipped': return <FaTruck className="text-blue-500 text-3xl" />;
      case 'Processing': return <FaBoxOpen className="text-yellow-500 text-3xl" />;
      default: return <FaBoxOpen className="text-gray-500 text-3xl" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[rgb(7,81,89)] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="min-h-[85vh] bg-slate-50 py-10 px-4 md:px-10 lg:px-24 font-sans relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-5 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[rgb(7,81,89)] transition-colors mb-6"
        >
          <FaArrowLeft /> Back to Orders
        </button>

        {!order ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">Order not found.</p>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center gap-5">
                <StatusIcon status={order.orderStatus} />
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-gray-800">Order #{order._id.slice(-8).toUpperCase()}</h1>
                  <p className="text-sm text-gray-500 font-medium">Placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <span className={`px-4 py-2 rounded-full text-xs font-bold border flex-1 text-center md:flex-none ${statusStyles[order.orderStatus] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                  {order.orderStatus}
                </span>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-bold transition flex items-center justify-center gap-2">
                  <FaPrint /> Print
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - Items */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                  <h2 className="text-lg font-black text-gray-800 mb-6 uppercase tracking-wide border-b pb-4">Items Ordered</h2>
                  
                  <div className="flex flex-col gap-6">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-black text-[rgb(7,81,89)] text-lg">
                          ₹{item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
                   <h2 className="text-lg font-black text-gray-800 mb-6 uppercase tracking-wide border-b pb-4">Payment Summary</h2>
                   <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
                     <div className="flex justify-between">
                       <span>Subtotal</span>
                       <span>₹{order.totalPrice - order.shippingPrice}</span>
                     </div>
                     <div className="flex justify-between">
                       <span>Shipping Rate</span>
                       <span>₹{order.shippingPrice}</span>
                     </div>
                     <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-100">
                       <span className="font-bold text-gray-800 text-base">Total Amount</span>
                       <span className="font-black text-[rgb(7,81,89)] text-2xl">₹{order.totalPrice}</span>
                     </div>
                   </div>
                </div>
              </div>

              {/* Right Sidebar - Info */}
              <div className="flex flex-col gap-6">
                {/* Shipping Info */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[rgb(7,81,89)]/10 flex items-center justify-center text-[rgb(7,81,89)]">
                      <FaMapMarkerAlt />
                    </div>
                    <h3 className="font-bold text-gray-800">Shipping Address</h3>
                  </div>
                  <div className="text-sm text-gray-600 flex flex-col gap-1">
                    <p className="font-bold text-gray-800 pb-1">{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[rgb(7,81,89)]/10 flex items-center justify-center text-[rgb(7,81,89)]">
                      <FaCreditCard />
                    </div>
                    <h3 className="font-bold text-gray-800">Payment Information</h3>
                  </div>
                  <div className="text-sm text-gray-600 flex flex-col gap-1">
                    <p className="font-medium uppercase">{order.paymentInfo.method}</p>
                    <p className="mt-2 inline-flex">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">{order.paymentInfo.status}</span>
                    </p>
                  </div>
                </div>

                 {/* Help Block */}
                 <div className="bg-[rgb(7,81,89)] text-white rounded-3xl shadow-md p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 blur-xl translate-x-10 -translate-y-10"></div>
                    <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                    <p className="text-sm text-teal-100 mb-4 opacity-90">Have an issue with your order? Reach out to our customer support.</p>
                    <Link to="/e-consultation" className="block w-full text-center bg-white text-[rgb(7,81,89)] font-black text-sm uppercase py-3 rounded-xl hover:bg-orange-500 hover:text-white transition-colors">
                      Contact Support
                    </Link>
                 </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
