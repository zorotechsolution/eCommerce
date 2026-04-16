import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { FaArrowLeft, FaShieldHalved } from 'react-icons/fa6';

const Checkout = () => {
  const { t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], grandTotal = 0, shipping = 0, subtotal = 0 } = location.state || {};

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
  });

  const [errors, setErrors] = useState({});

  if (cartItems.length === 0) {
     return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-center p-5"><p>No items to checkout. <br/><Link to="/collections" className="text-accent-500 underline">Shop Now</Link></p></div>;
  }

  const validate = () => {
    let newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) newErrors.phone = '10 digit number required';
    if (!form.address.trim()) newErrors.address = 'Required';
    if (!form.city.trim()) newErrors.city = 'Required';
    if (!form.state.trim()) newErrors.state = 'Required';
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) newErrors.pincode = '6 digit pincode required';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    navigate('/payment', { state: { cartItems, grandTotal, shipping, subtotal, shippingInfo: form } });
  };

  const fields = [
    { name: 'firstName', label: t('firstName'), type: 'text', half: true },
    { name: 'lastName', label: t('lastName'), type: 'text', half: true },
    { name: 'email', label: t('email'), type: 'email', half: false },
    { name: 'phone', label: t('phone'), type: 'tel', half: true },
    { name: 'pincode', label: t('pincode'), type: 'text', half: true },
    { name: 'address', label: t('address'), type: 'text', half: false },
    { name: 'city', label: t('city'), type: 'text', half: true },
    { name: 'state', label: t('state'), type: 'text', half: true },
  ];

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-5 md:px-10 lg:px-20 font-sans relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-primary-100 rounded-full mix-blend-multiply blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-primary-700 transition font-bold tracking-wide mb-6 py-2 px-4 rounded-full hover:bg-slate-200/50 w-max">
           <FaArrowLeft /> Back to Cart
        </button>

        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-10 tracking-tight">
          {t('checkout') || 'Checkout'}
        </h1>

        <form onSubmit={handleSubmit} className="lg:flex gap-10">
          {/* Shipping Form */}
          <div className="flex-1 animate-slide-up">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 md:p-10 mb-6">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">1</div>
                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t('shippingInfo') || 'Shipping Information'}</h2>
              </div>
              
              <div className="flex flex-wrap gap-5">
                {fields.map(field => (
                  <div key={field.name} className={`flex flex-col gap-1.5 ${field.half ? 'w-full sm:w-[calc(50%-10px)]' : 'w-full'}`}>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.label}
                      className={`border-2 ${errors[field.name] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'} rounded-2xl px-5 py-3.5 text-sm md:text-base outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium text-slate-800`}
                    />
                    {errors[field.name] && (
                      <span className="text-xs font-bold text-red-500 pl-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500"></span> {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[420px] mt-8 lg:mt-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-gradient-to-br from-slate-900 to-primary-950 text-white rounded-[2rem] shadow-xl p-8 sticky top-28 border border-primary-800">
              <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest mb-6 pb-4 border-b border-white/10">
                {t('orderSummary') || 'Order Summary'}
              </h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
                    <div className="w-14 h-14 rounded-xl bg-white p-1 overflow-hidden shrink-0">
                       <img src={item.img} alt={item.productName} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white line-clamp-1 text-sm md:text-base">{item.productName}</p>
                      <p className="text-xs font-medium text-primary-200">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-black text-white ml-2 shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 flex flex-col gap-4">
                <div className="flex justify-between text-sm md:text-base text-primary-200 font-medium">
                  <span>{t('subtotal')}</span><span className="text-white">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base text-primary-200 font-medium">
                  <span>{t('shipping')}</span>
                  <span className={shipping === 0 ? 'text-accent-400 font-bold tracking-widest uppercase text-xs self-center' : 'text-white'}>
                    {shipping === 0 ? t('free') : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-black text-2xl text-white pt-4 mt-2 border-t border-white/10">
                  <span>{t('grandTotal') || 'Total'}</span><span className="text-accent-400">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full bg-accent-500 hover:bg-accent-400 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {t('continueToPayment') || 'Continue'} <FaArrowLeft className="rotate-180" />
              </button>
              
              <div className="mt-6 flex flex-col items-center gap-2">
                 <FaShieldHalved className="text-primary-400 text-2xl mb-1" />
                 <p className="text-[10px] text-center text-primary-300 uppercase tracking-widest font-bold">256-bit Encrypted Checkout</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
