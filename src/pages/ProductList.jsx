import React, { useReducer, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import API from "../utils/axiosConfig";
import { FaHeart, FaShoppingCart, FaArrowLeft, FaShieldAlt, FaTruck, FaLeaf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { addToWishlist } from "../store/wishlistSlice";
import { useLang } from "../context/LangContext";

const COUNTER_ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

function reducer(state, action) {
  switch (action.type) {
    case COUNTER_ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case COUNTER_ACTION.DECREMENT:
      return { ...state, count: Math.max(1, state.count - 1) };
    default:
      return state;
  }
}

const ProductList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLang();

  const [productItem, setProductItem] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/products/${id}`);
        const rawImg = data.data.images?.[0]?.url || "";
        const formatted = {
          ...data.data,
          id: data.data._id,
          productName: data.data.name,
          productDescription: data.data.description,
          img: rawImg.startsWith('http') ? rawImg : `http://localhost:5000${rawImg}`,
          category: data.data.category?.name || "General",
          rating: data.data.ratings || 4,
          reviews: data.data.numOfReviews || 0
        };
        setProductItem(formatted);

        const res = await API.get('/products?limit=4');
        setRelatedProducts(res.data.data.map(p => {
            const relRawImg = p.images?.[0]?.url || "";
            return {
              ...p, 
              id: p._id, 
              productName: p.name, 
              img: relRawImg.startsWith('http') ? relRawImg : `http://localhost:5000${relRawImg}`, 
              category: p.category?.name || "General", 
              price: p.price
            }
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [state, dispatchCount] = useReducer(reducer, { count: 1 });
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const alreadyInWishlist = wishlistItems.some((i) => i.id === productItem?.id);
  const alreadyInCart = cartItems.some((i) => i.id === productItem?.id);

  const handleAddToCart = () => {
    if (productItem) {
      dispatch(addItem({ ...productItem, quantity: state.count }));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    }
  };

  const handleAddToWishlist = () => {
    if (productItem) {
      dispatch(addToWishlist(productItem));
      setIsWishlisted(true);
      setTimeout(() => setIsWishlisted(false), 2500);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[rgb(7,81,89)] border-t-transparent"></div></div>;
  }

  if (!productItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-5 text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-4">{t('pageNotFound')}</h2>
        <p className="text-slate-500 mb-6">{t('pageNotFoundSub')}</p>
        <Link to="/collections" className="bg-[rgb(7,81,89)] text-white px-6 py-3 rounded-full font-bold hover:-translate-y-0.5 transition-transform">
          {t('browseAllCollections')}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 px-5 md:px-10 lg:px-20 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-[rgb(7,81,89)] font-medium transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[rgb(7,81,89)] font-medium transition-colors">Collections</Link>
          <span>/</span>
          <Link to={`/collections/${productItem.category}`} className="hover:text-[rgb(7,81,89)] font-medium transition-colors">{productItem.category}</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold line-clamp-1">{productItem.productName}</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-[rgb(7,81,89)] font-bold mb-8 transition-colors">
          <FaArrowLeft /> {t('back')}
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Product Image */}
            <div className="md:w-1/2 bg-slate-50 p-10 flex items-center justify-center min-h-[350px] relative">
              <img
                src={productItem.img}
                alt={productItem.productName}
                className="max-h-80 w-full object-contain"
              />
              {/* Wishlist fab */}
              <button
                onClick={handleAddToWishlist}
                disabled={alreadyInWishlist}
                className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all ${
                  alreadyInWishlist || isWishlisted
                    ? "bg-rose-500 text-white"
                    : "bg-white text-slate-400 hover:bg-rose-500 hover:text-white"
                }`}
                title={alreadyInWishlist ? "In Wishlist" : "Add to Wishlist"}
              >
                <FaHeart />
              </button>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                  {productItem.category}
                </span>

                <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 leading-snug">
                  {productItem.productName}
                </h1>

                {/* Stars */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} sx={{ fontSize: 18 }} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-500">91 {t('reviews')}</span>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <span className="text-3xl font-black text-[rgb(7,81,89)]">
                    ₹{productItem.price}
                  </span>
                  <span className="text-sm text-slate-400 font-medium ml-2">{t('inclusiveTaxes')}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {productItem.productDescription}
                </p>

                {/* Info Tags */}
                <ul className="flex flex-wrap gap-2 mb-6">
                  <li className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    <FaLeaf className="text-xs" /> {t('inStock')}
                  </li>
                  <li className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    <FaShieldAlt className="text-xs" /> {t('gmpCertified')}
                  </li>
                  <li className="flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    <FaTruck className="text-xs" /> {t('freeShippingAbove')}
                  </li>
                </ul>

                {/* Quantity + Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden w-max">
                    <button
                      className="px-4 py-3 bg-slate-50 hover:bg-slate-100 font-bold text-lg text-slate-600 transition-colors"
                      onClick={() => dispatchCount({ type: COUNTER_ACTION.DECREMENT })}
                    >
                      −
                    </button>
                    <input
                      className="w-14 text-center font-bold text-slate-800 bg-white outline-none py-3"
                      value={state.count}
                      disabled
                      readOnly
                      type="text"
                    />
                    <button
                      className="px-4 py-3 bg-slate-50 hover:bg-slate-100 font-bold text-lg text-slate-600 transition-colors"
                      onClick={() => dispatchCount({ type: COUNTER_ACTION.INCREMENT })}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl uppercase tracking-wider transition-all text-sm ${
                      isAdded
                        ? "bg-green-500 text-white cursor-default"
                        : "bg-orange-500 hover:bg-orange-600 text-white hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
                    }`}
                  >
                    <FaShoppingCart />
                    {isAdded ? `✓ ${t('addedToCart')}` : t('addToCart')}
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={handleAddToWishlist}
                  disabled={alreadyInWishlist}
                  className={`mt-3 w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl uppercase tracking-wider transition-all text-sm border-2 ${
                    alreadyInWishlist || isWishlisted
                      ? "bg-rose-50 text-rose-500 border-rose-200 cursor-default"
                      : "bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-500 hover:bg-rose-50"
                  }`}
                >
                  <FaHeart />
                  {alreadyInWishlist || isWishlisted ? `❤ ${t('inWishlist')}` : t('addToWishlist')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest mb-6 pb-4 border-b-2 border-slate-100">
            {t('productDetails')}
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-[rgb(7,81,89)] uppercase tracking-widest text-sm mb-3">{t('aboutSection')} {productItem.productName}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{productItem.productDescription}</p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-bold text-[rgb(7,81,89)] uppercase tracking-widest text-sm mb-3">{t('keyBenefits')}</h3>
              <ul className="flex flex-col gap-2">
                {[
                  t('benefitNatural'),
                  t('benefitClassical'),
                  t('benefitGMP'),
                  t('benefitSafe'),
                  t('benefitHolistic'),
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="font-bold text-orange-500 shrink-0">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-bold text-[rgb(7,81,89)] uppercase tracking-widest text-sm mb-3">{t('policies')}</h3>
              <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-3 text-sm text-slate-700"><span>→</span> {t('exchangeReturn')}</li>
                <li className="flex items-start gap-3 text-sm text-slate-700"><span>→</span> {t('freeShippingPolicy')}</li>
                <li className="flex items-start gap-3 text-sm text-slate-700"><span>→</span> {t('internationalCall')}</li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-bold text-[rgb(7,81,89)] uppercase tracking-widest text-sm mb-3">{t('disclaimer')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t('disclaimerText')}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-black text-slate-800 mb-6">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/ProductList/${product.id}`}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="aspect-square overflow-hidden p-4 bg-slate-50">
                    <img
                      src={product.img}
                      alt={product.productName}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-[rgb(7,81,89)] transition-colors mb-2">
                      {product.productName}
                    </h3>
                    <p className="text-base font-black text-[rgb(7,81,89)]">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;
