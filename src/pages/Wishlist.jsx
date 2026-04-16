import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaCartPlus, FaArrowRight } from 'react-icons/fa6';
import StarIcon from '@mui/icons-material/Star';
import { useLang } from '../context/LangContext';

const Wishlist = () => {
  const { t } = useLang();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const handleMoveToCart = (item) => {
    dispatch(addItem({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob"></div>
        <div className="text-center z-10 animate-fade-in relative">
          <FaHeart className="text-slate-200 text-9xl mx-auto mb-6 drop-shadow-sm" />
          <h2 className="text-3xl font-black text-slate-800 mb-3">{t('emptyWishlist') || 'Your Wishlist is Empty'}</h2>
          <p className="text-slate-500 mb-8 font-medium">Save your favorite Ayurvedic products here and review them later.</p>
          <Link
            to="/collections"
            className="bg-primary-900 hover:bg-primary-800 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 inline-flex items-center gap-2"
          >
            {t('continueShopping')} <FaArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-5 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-10 flex items-center gap-4 animate-slide-up">
          {t('yourWishlist') || 'My Wishlist'}
          <span className="bg-red-100 text-red-600 text-xl px-4 py-1 rounded-full flex items-center gap-2"><FaHeart /> {wishlistItems.length}</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:shadow-primary-900/10 transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col animate-fade-in hover:-translate-y-2"
              style={{ animationDelay: `${(idx % 4) * 100}ms` }}
            >
              <div className="relative overflow-hidden w-full pt-[100%] bg-slate-50 m-2 rounded-2xl">
                <Link to={`/ProductList/${item.id}`}>
                  <img
                    src={item.img}
                    alt={item.productName}
                    className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
                <button
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                  title="Remove"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50/50">
                <div>
                  <Link to={`/ProductList/${item.id}`}>
                    <h3 className="font-bold text-slate-800 text-lg hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                      {item.productName}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-4 bg-amber-50 w-max px-2 py-1 rounded-md">
                    {[...Array(4)].map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 16 }} className="text-amber-500" />
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-1">91 {t('reviews')}</span>
                  </div>
                  
                  <div className="mb-6 flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">{t('price')}</span>
                    <p className="text-2xl font-black text-primary-900">₹{item.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleMoveToCart(item)}
                  disabled={isInCart(item.id)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 border-2 ${
                    isInCart(item.id)
                      ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                      : 'border-accent-500 bg-accent-50 text-accent-600 hover:bg-accent-500 hover:text-white shadow-sm hover:shadow-accent-500/20'
                  }`}
                >
                  <FaCartPlus className={isInCart(item.id) ? '' : 'text-lg'} />
                  {isInCart(item.id) ? 'In Cart' : t('addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
