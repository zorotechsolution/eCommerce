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
    Delivered: 'bg-green-100 text-green-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'Delivered': return <FaCheckCircle className="text-green-500 text-2xl" />;
      case 'Shipped': return <FaTruck className="text-blue-500 text-2xl" />;
      case 'Processing': return <FaBoxOpen className="text-yellow-500 text-2xl" />;
      default: return <FaBoxOpen className="text-gray-400 text-2xl" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[rgb(7,81,89)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans mb-10">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <button 
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
           >
             <FaArrowLeft /> Back to Orders
           </button>
           <div className="flex items-center gap-3 w-full sm:w-auto">
             <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm">
               <FaPrint /> Print Receipt
             </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {!order ? (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <FaExclamationCircle className="text-5xl text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-500 mb-6">The order you are looking for does not exist or you do not have permission to view it.</p>
            <Link to="/profile" className="px-5 py-2.5 bg-[rgb(7,81,89)] text-white text-sm font-medium rounded-md hover:bg-teal-800 transition-colors">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content List */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Order Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                    <StatusIcon status={order.orderStatus} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</h1>
                    <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-transparent ${statusStyles[order.orderStatus] || 'bg-gray-100 text-gray-800'}`}>
                  {order.orderStatus}
                </span>
              </div>

              {/* Order Items Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Items Ordered</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-md overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end mt-2 sm:mt-0">
                        <p className="text-sm text-gray-500 sm:mb-1">Price</p>
                        <p className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                  <h2 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Payment Summary</h2>
                </div>
                <div className="p-6">
                  <dl className="space-y-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="font-medium text-gray-900">₹{(order.totalPrice - order.shippingPrice).toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd className="font-medium text-gray-900">
                        {order.shippingPrice === 0 ? (
                          <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
                        ) : (
                          `₹${order.shippingPrice}`
                        )}
                      </dd>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                      <dt className="text-base font-bold text-gray-900">Total</dt>
                      <dd className="text-2xl font-bold text-[rgb(7,81,89)]">₹{order.totalPrice.toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>
              </div>

            </div>

            {/* Sidebar Data */}
            <div className="space-y-6">
              
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Shipping Address</h3>
                </div>
                <div className="p-5 text-sm text-gray-600 flex flex-col gap-1.5">
                  <p className="font-bold text-gray-900 mb-1">{order.shippingAddress.fullName || "Customer Name"}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-5 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center gap-2">
                  <FaCreditCard className="text-gray-400" />
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Details</h3>
                </div>
                <div className="p-5 text-sm text-gray-600">
                  <div className="mb-4 text-center p-3 border border-gray-200 rounded-md bg-gray-50">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Method</p>
                    <p className="font-bold text-gray-900">{order.paymentInfo.method === 'razorpay' ? 'Online Payment (Razorpay)' : 'Cash on Delivery'}</p>
                  </div>
                  <div>
                    <span className={`inline-flex w-full items-center justify-center px-2.5 py-1.5 rounded-md text-xs font-bold border ${
                      order.paymentInfo.status === 'COMPLETED' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {order.paymentInfo.status === 'COMPLETED' ? 'Payment Completed' : 'Pending Payment'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Support Panel */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-2">Need assistance?</h3>
                <p className="text-sm text-gray-600 mb-4">If you have any issues with this order, please contact our support team providing your Order ID.</p>
                <Link to="/about" className="block w-full text-center py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Contact Support
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
