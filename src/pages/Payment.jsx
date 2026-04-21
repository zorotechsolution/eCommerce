import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import API from '../utils/axiosConfig';
import { useLang } from '../context/LangContext';
import { FaCheckCircle, FaCreditCard, FaTruck, FaShieldAlt } from 'react-icons/fa';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const { t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { cartItems = [], grandTotal = 0, subtotal = 0, shipping = 0, shippingInfo = {} } = location.state || {};

  const [payMethod, setPayMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate dummy order ID for temporary state before API response 
    setOrderId('ORD' + Date.now().toString().slice(-6));
  }, []);

  const createOrderRecord = async (paymentDetails) => {
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.productName,
          quantity: item.quantity,
          image: item.img,
          price: item.price,
          product: item.id
        })),
        shippingAddress: {
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.pincode,
          country: 'India',
          phoneNum: shippingInfo.phone
        },
        paymentInfo: {
          id: paymentDetails.id || `cod_${Date.now()}`,
          status: paymentDetails.status || 'Success',
          method: payMethod
        },
        taxPrice: 0,
        shippingPrice: shipping,
        totalPrice: grandTotal
      };
      
      const res = await API.post('/orders', orderData);
      setOrderId(res.data.data._id); // Update to actual DB ID
    } catch (error) {
      console.error('Failed to save order to backend:', error);
    }
  };

  if (cartItems.length === 0 && !success) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-center p-5"><p>No items to pay for. <br/><Link to="/collections" className="text-accent-500 underline">Shop Now</Link></p></div>;
  }

  const handleRazorpay = async () => {
    setLoading(true);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert("Razorpay SDK failed to load. Are you offline?");
      setLoading(false);
      return;
    }

    try {
      // 1. Fetch Razorpay key
      const keyRes = await API.get('/payment/key');
      const rzpKey = keyRes.data.key || import.meta.env.VITE_RAZORPAY_TEST_KEY;

      // 2. Create Order on Backend
      const orderRes = await API.post('/payment/process', {
        amount: grandTotal * 100,
        currency: "INR"
      });

      if (!orderRes.data.success) {
        alert("Server error. Could not place order with Razorpay.");
        setLoading(false);
        return;
      }

      const orderData = orderRes.data.data;

      // 3. Setup Razorpay Options
      const options = {
        key: rzpKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vel Siddhar Arakkattalai",
        description: "Ayurvedic & Siddha Medicine Purchase",
        image: "https://example.com/your_logo.png", // Optional
        order_id: orderData.id,
        handler: async function (response) {
          try {
            // 4. Verify payment signature
            const verifyRes = await API.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              setLoading(false);
              setSuccess(true);
              dispatch(clearCart());
              if (auth?.isAuthenticated) {
                await createOrderRecord({ id: response.razorpay_payment_id, status: 'Success' });
              }
            } else {
              alert(verifyRes.data.error || "Payment verification failed!");
              setLoading(false);
            }
          } catch(error) {
             console.error("Verification error:", error);
             alert("Error during payment verification.");
             setLoading(false);
          }
        },
        prefill: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email || "test@example.com",
          contact: shippingInfo.phone || "9999999999",
        },
        notes: {
          address: "Ayurvedic Store Office",
        },
        theme: {
          color: "#075159", // primary-900
        },
        modal: {
          ondismiss: function() {
             setLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Razorpay Error:", error);
      alert("Error communicating with servers for payment.");
      setLoading(false);
    }
  };

  const handleCOD = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      setSuccess(true);
      dispatch(clearCart());
      if (auth?.isAuthenticated) {
        await createOrderRecord({ id: 'cod', status: 'Pending Validation' });
      }
    }, 2000);
  };

  const handlePay = () => {
    if (payMethod === 'razorpay') {
      handleRazorpay();
    } else {
      handleCOD();
    }
  };

  if (success) {
    const isOnlinePayment = payMethod === 'razorpay';

    return (
      <section className="min-h-screen bg-slate-50 py-10 px-5 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-2xl mx-auto relative z-10">

          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-60"></div>
                <FaCheckCircle className="text-green-500 text-7xl relative z-10 drop-shadow-md" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-2">
              {t('orderPlaced') || 'Payment Successful!'}
            </h1>
            <p className="text-slate-500 font-medium">
              {t('thankYou') || 'Thank you for shopping with Vel Siddhar Arakkattalai.'}
            </p>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden mb-6">

            {/* Payment Method Banner */}
            <div className={`px-8 py-4 flex items-center gap-3 ${isOnlinePayment ? 'bg-green-50 border-b border-green-100' : 'bg-orange-50 border-b border-orange-100'}`}>
              {isOnlinePayment ? (
                <>
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <p className="font-black text-green-700 text-sm uppercase tracking-widest">Online Payment — Success</p>
                    <p className="text-xs text-green-600 mt-0.5">Paid securely via Razorpay · UPI / Card / NetBanking</p>
                  </div>
                </>
              ) : (
                <>
                  <FaTruck className="text-orange-500 text-xl" />
                  <div>
                    <p className="font-black text-orange-700 text-sm uppercase tracking-widest">Cash on Delivery</p>
                    <p className="text-xs text-orange-600 mt-0.5">Pay when your order arrives at your door</p>
                  </div>
                </>
              )}
            </div>

            <div className="p-8">

              {/* Order ID */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-slate-200">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Order ID</span>
                <span className="font-black text-[rgb(7,81,89)] text-lg">#{orderId}</span>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Items Ordered</p>
                <div className="flex flex-col gap-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl p-1.5 border border-slate-100 shrink-0">
                        <img src={item.img} alt={item.productName} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm truncate">{item.productName}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-black text-slate-800 shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t-2 border-dashed border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-500">{t('subtotal') || 'Subtotal'}</span>
                  <span className="font-bold text-slate-700">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-slate-500">{t('shipping') || 'Shipping'}</span>
                  <span className={`font-black text-sm ${shipping === 0 ? 'text-green-600' : 'text-slate-700'}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-2">
                  <span className="font-black text-slate-800 text-lg">{t('grandTotal') || 'Total'}</span>
                  <span className={`text-2xl font-black ${isOnlinePayment ? 'text-green-600' : 'text-orange-500'}`}>
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
                {isOnlinePayment && (
                  <p className="text-xs text-center text-green-600 font-bold pt-1">
                    ✓ Amount deducted from your account
                  </p>
                )}
              </div>

              {/* Shipping Address */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-200">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Delivering To</p>
                <p className="font-bold text-slate-800">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                <p className="text-sm text-slate-500 mt-1">{shippingInfo.address},</p>
                <p className="text-sm text-slate-500">{shippingInfo.city}, {shippingInfo.state} — {shippingInfo.pincode}</p>
                {shippingInfo.phone && <p className="text-sm text-slate-500 mt-1">📞 {shippingInfo.phone}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 text-center bg-[rgb(7,81,89)] hover:bg-teal-800 text-white font-black py-4 rounded-xl transition-all uppercase tracking-widest shadow-lg hover:-translate-y-1"
            >
              {t('backHome') || 'Back to Home'}
            </Link>
            <Link
              to="/collections"
              className="flex-1 text-center bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold py-4 rounded-xl transition-all uppercase tracking-wide border border-slate-200"
            >
              {t('continueShopping') || 'Continue Shopping'}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-5 md:px-10 lg:px-20 font-sans relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-10 tracking-tight text-center">
          {t('payment') || 'Secure Payment'}
        </h1>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden lg:flex flex-row-reverse animate-fade-in">
          
          {/* Order Summary Sidebar via right side */}
          <div className="w-full lg:w-[400px] bg-slate-50 p-8 md:p-12 border-b lg:border-b-0 lg:border-l border-slate-200 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-8 border-b-2 border-slate-200 pb-4">
                 Summary
              </h2>
              
              <div className="flex flex-col gap-5 mb-8">
                 {cartItems.map(item => (
                   <div key={item.id} className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-white rounded-xl p-2 border border-slate-100 shrink-0">
                         <img src={item.img} alt={item.productName} className="w-full h-full object-contain" />
                     </div>
                     <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm line-clamp-2">{item.productName}</p>
                        <p className="text-xs font-bold text-slate-400 mt-1">Qty: {item.quantity}</p>
                     </div>
                     <span className="font-black text-slate-800 shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-200">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-500">{t('subtotal')}</span>
                  <span className="font-bold text-slate-800">₹{subtotal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-slate-500">{t('shipping')}</span>
                  <span className={`text-sm font-black ${shipping === 0 ? 'text-accent-500 uppercase tracking-widest' : 'text-slate-800'}`}>{shipping === 0 ? t('free') : `₹${shipping}`}</span>
               </div>
               <div className="flex justify-between items-end">
                  <span className="text-lg font-black text-slate-800">{t('grandTotal') || 'Total'}</span>
                  <span className="text-3xl font-black text-primary-900 flex items-start gap-1"><span className="text-lg mt-1">₹</span>{grandTotal.toLocaleString()}</span>
               </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex-1 p-8 md:p-12">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-8">
               {t('selectPayment') || 'Payment Method'}
            </h2>

            <div className="flex flex-col gap-4 mb-10">
               {/* Razorpay Option */}
               <label className={`relative cursor-pointer rounded-2xl border-2 p-5 flex items-center gap-4 transition-all duration-300 ${payMethod === 'razorpay' ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-slate-200 hover:border-primary-300 bg-white'}`}>
                 <input type="radio" name="payment" value="razorpay" checked={payMethod === 'razorpay'} onChange={() => setPayMethod('razorpay')} className="peer sr-only" />
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${payMethod === 'razorpay' ? 'border-primary-500 bg-primary-500' : 'border-slate-300'}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                 </div>
                 <div className="flex-1">
                    <p className="font-bold text-slate-800 text-lg">Razorpay</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Cards, UPI, NetBanking, Wallets</p>
                 </div>
                 <FaCreditCard className={`text-3xl ${payMethod === 'razorpay' ? 'text-primary-500' : 'text-slate-300'}`} />
               </label>

               {/* COD Option */}
               <label className={`relative cursor-pointer rounded-2xl border-2 p-5 flex items-center gap-4 transition-all duration-300 ${payMethod === 'cod' ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-slate-200 hover:border-primary-300 bg-white'}`}>
                 <input type="radio" name="payment" value="cod" checked={payMethod === 'cod'} onChange={() => setPayMethod('cod')} className="peer sr-only" />
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${payMethod === 'cod' ? 'border-primary-500 bg-primary-500' : 'border-slate-300'}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                 </div>
                 <div className="flex-1">
                    <p className="font-bold text-slate-800 text-lg">{t('cod') || 'Cash on Delivery'}</p>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Pay seamlessly at your doorstep</p>
                 </div>
                 <FaTruck className={`text-3xl ${payMethod === 'cod' ? 'text-primary-500' : 'text-slate-300'}`} />
               </label>
            </div>

            <button
               onClick={handlePay}
               disabled={loading}
               className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-3 ${
                  loading
                     ? 'bg-slate-200 text-slate-400 cursor-wait'
                     : 'bg-accent-500 hover:bg-accent-600 text-white shadow-xl hover:shadow-accent-500/30 hover:-translate-y-1 border-b-4 border-accent-700'
               }`}
            >
               {loading ? (
                  <>
                     <div className="w-5 h-5 border-4 border-slate-400 border-t-white rounded-full animate-spin"></div>
                     Processing...
                  </>
               ) : (
                  <>
                     <FaShieldAlt /> {t('payNow') || 'Pay'} ₹{grandTotal.toLocaleString()}
                  </>
               )}
            </button>
            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6">
               <FaShieldAlt className="inline mr-1 text-primary-400" /> 100% Secure & Encrypted by Razorpay
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
