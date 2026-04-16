import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowRight } from 'react-icons/fa6';
import { useLang } from '../context/LangContext';

const AddCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLang();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 900 ? 0 : 50;
  const grandTotal = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems, grandTotal, subtotal, shipping } });
  };

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-5">
        <h2 className="text-3xl font-black text-slate-800 mb-4">{t('cartEmpty')}</h2>
        <p className="text-slate-500 mb-8 font-medium">{t('cartEmptySub')}</p>
        <Link to="/" className="bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1">
          {t('continueShopping')}
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-5 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-black uppercase text-[rgb(7,81,89)] mb-8 border-b-2 border-slate-100 pb-4">
            {t('yourCart')}
          </h1>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="uppercase text-xs font-bold text-slate-400 border-b border-slate-200">
                  <th className="pb-4 pr-4">{t('product')}</th>
                  <th className="pb-4 text-center px-4">{t('price')}</th>
                  <th className="pb-4 text-center px-4">{t('quantity')}</th>
                  <th className="pb-4 text-right px-4">{t('total')}</th>
                  <th className="pb-4 text-center pl-4">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 border-dashed hover:bg-slate-50 transition-colors">
                    <td className="py-4 md:py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl border border-slate-100 p-2 shrink-0">
                          <img className="w-full h-full object-contain" src={item.img} alt={item.productName} />
                        </div>
                        <div className="font-bold text-slate-800 line-clamp-2 text-sm md:text-base">
                          {item.productName}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center font-bold text-slate-600">
                      ₹{item.price}
                    </td>
                    <td className="py-4">
                      <div className="flex justify-center items-center gap-2">
                        <button onClick={() => dispatch(decrementQuantity(item.id))} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600 transition-colors">
                          -
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => dispatch(incrementQuantity(item.id))} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600 transition-colors">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-right font-black text-[rgb(7,81,89)]">
                      ₹{item.price * item.quantity}
                    </td>
                    <td className="py-4 text-center">
                      <button onClick={() => dispatch(removeItem(item.id))} className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors" title="Remove Item">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-8">
             <Link to="/" className="text-slate-500 font-bold hover:text-[rgb(7,81,89)] transition-colors text-sm">
                ← {t('continueShopping')}
             </Link>
          </div>
        </div>

        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-[rgb(7,81,89)] rounded-[2rem] p-8 text-white sticky top-28 shadow-xl">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-white/20 pb-4">{t('orderSummary')}</h2>
            
            <div className="flex justify-between items-center mb-4 text-emerald-100 font-medium">
               <span>{t('subtotal')}</span>
               <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-emerald-100 font-medium">
               <span>{t('shipping')}</span>
               <span className={shipping === 0 ? "text-orange-400 font-bold uppercase text-xs" : ""}>
                 {shipping === 0 ? t('free') : `₹${shipping}`}
               </span>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/20 font-black text-2xl">
               <span>{t('grandTotal')}</span>
               <span className="text-orange-400">₹{grandTotal.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 font-black uppercase tracking-widest py-4 rounded-xl transition-all hover:-translate-y-1"
            >
               {t('proceedCheckout')} <FaArrowRight />
            </button>
            <p className="mt-4 text-[10px] text-center uppercase tracking-widest text-emerald-200 font-bold opacity-80 border-t border-white/10 pt-4">
              Secure Checkout • Fast Delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCart;