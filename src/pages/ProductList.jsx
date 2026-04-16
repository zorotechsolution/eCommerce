import React, { useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { ayurvedicMedicines } from "../db/data";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { addToWishlist } from "../store/wishlistSlice";

const ProductList = () => {
  let dataValue = ayurvedicMedicines;
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let productItem = dataValue.find((product) => product.id === Number(id));

  let COUNTER_ACTION = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
  };

  let reducer = (state, counterAction) => {
    switch (counterAction.type) {
      case COUNTER_ACTION.INCREMENT:
        return { ...state, count: state.count + 1 };
      case COUNTER_ACTION.DECREMENT:
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  };

  let [state, dispatchCount] = useReducer(reducer, { count: 1 });
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  let DECREMENT = () => {
    if (state.count > 1) {
      return dispatchCount({ type: COUNTER_ACTION.DECREMENT });
    }
  };

  const handleAddToCart = () => {
    if(productItem) {
      dispatch(addItem({ ...productItem, quantity: state.count }));
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleAddToWishlist = () => {
     if(productItem) {
      dispatch(addToWishlist(productItem));
      setIsWishlisted(true);
      setTimeout(() => setIsWishlisted(false), 2000);
     }
  };

  if(!productItem) {
    return <div className="text-center py-20 text-xl font-bold">Product not found</div>;
  }

  return (
    <div>
      <section>
        <div className="md:flex gap-10 py-10 px-5 md:px-20 lg:px-50">
          <div className=" border border-gray-200">
            <img src={productItem.img} alt="" />
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-xl uppercase font-bold">
              {productItem.productName}
            </h1>
            <div>
              <span>
                <StarIcon className="text-amber-300" />
                <StarIcon className="text-amber-300" />
                <StarIcon className="text-amber-300" />
                <StarIcon className="text-amber-300" />
              </span>
              <span className="align-middle"> 91 reviews</span>
            </div>
            <h2 className="text-2xl font-semibold ">Rs. {productItem.price}</h2>

            <ul className="flex flex-col gap-2 text-xs mt-2 mb-2">
              <li>Availability: Available</li>
              <li>Product Type: {productItem.category || 'Ayurvedic Medicine'}</li>
              <li>Product Vendor: Kottakkal Arya Vaidya Sala</li>
            </ul>

            <div className="flex flex-col md:flex-row my-2 gap-4">
              <div className=" flex">
                <button
                  className="bg-gray-200 px-4 py-2 font-bold text-lg hover:bg-gray-300"
                  onClick={DECREMENT}
                >
                  -
                </button>
                <input
                  className="bg-gray-100 px-4 py-2 w-16 text-center font-bold"
                  value={state.count}
                  disabled
                  type="text"
                />

                <button
                  className="bg-gray-200 px-4 py-2 font-bold text-lg hover:bg-gray-300"
                  onClick={() => dispatchCount({ type: COUNTER_ACTION.INCREMENT })}
                >
                  +
                </button>
              </div>

              <div className=" flex gap-2 w-full md:w-auto">
                <button 
                  onClick={handleAddToCart}
                  className={`${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'} px-6 py-2 font-bold text-white transition-colors w-full md:w-auto flex justify-center items-center`}
                  disabled={isAdded}
                >
                  {isAdded ? '✓ ADDED' : 'ADD TO CART'}
                </button>
                <button
                  onClick={handleAddToWishlist}
                  disabled={isWishlisted}
                  className={`${isWishlisted ? 'bg-rose-500' : 'bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)]'} px-4 flex items-center justify-center transition-colors cursor-pointer w-full md:w-auto`}
                >
                  <FaHeart className={`${isWishlisted ? 'text-white scale-110' : 'text-white'} text-2xl transition-transform`} />
                </button>
              </div>
            </div>
            <div className="px-5 mt-4">
              <ul className="list-disc text-sm text-slate-600">
                <li>Ayurvedic Medicine securely packaged.</li>
                <li>Exchange or Return within 7 days of a delivery.</li>
                <li>
                  For Shipping other than India Please Contact: +91 96292 97111
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="Product Details py-2 md:py-10">
        <div className="px-5 md:px-50 flex flex-col gap-5">
          <div className="">
            <h2 className="text-xl font-semibold uppercase">
              {productItem.productName}
            </h2>
            <p className="mt-2">
              Nilibhringadi Kera (Coconut Oil) Tailam by Kottakkal Arya Vaidya
              Sala is a classical Ayurvedic hair oil prepared using pure coconut
              oil as a base and infused with potent herbs like Nili (Indigo),
              Bhringraj, Amla, and Yashtimadhu. This nourishing oil is known to
              prevent hair fall, dandruff, and premature greying, while
              promoting natural hair growth.
            </p>
            <p className="mt-2">
              Regular scalp massage with Nilibhringadi oil improves circulation,
              strengthens hair follicles, and soothes the scalp, leaving your
              hair healthy, shiny, and thick. Suitable for all hair types and
              ideal for daily or weekly application.
            </p>
          </div>
          <div className=" border-t border-gray-300"></div>

          <div className="">
            <h3 className="font-semibold text-lg">Key Benefits:</h3>
            <ul className="ps-4">
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>
                Controls hair fall and strengthens hair roots
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>
                Prevents dandruff, scalp dryness, and itchiness
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>
                Promotes hair growth and improves hair texture
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>Helps
                delay premature greying
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>100%
                herbal, free from mineral oils and harsh chemicals
              </li>
            </ul>
          </div>

          <div className=" border-t border-gray-300"></div>

          <div className="">
            <h3 className="font-semibold text-lg">Usage Instructions:</h3>
            <ul className="ps-4">
              <li>
                <span>→ </span> Warm the oil slightly and apply to the scalp.
              </li>
              <li>
                <span>→ </span> Warm the oil slightly and apply to the scalp.
              </li>
              <li>
                <span>→ </span> Warm the oil slightly and apply to the scalp.
              </li>
              <li>
                <span>→ </span> Warm the oil slightly and apply to the scalp.
              </li>
            </ul>
          </div>

          <div className=" border-t border-gray-300"></div>

          <div className="">
            <h3 className="font-semibold text-lg">
              Indication of {productItem.productName} :
            </h3>
            <ul className="ps-4">
              <li>
                <span className="font-extrabold text-orange-500 ">✓ </span>
                Controls hair fall and strengthens hair roots
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>
                Controls hair fall and strengthens hair roots
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>
                Controls hair fall and strengthens hair roots
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>
                Controls hair fall and strengthens hair roots
              </li>
              <li>
                <span className="font-extrabold text-orange-500">✓ </span>
                Controls hair fall and strengthens hair roots
              </li>
            </ul>
          </div>

          <div className=" border-t border-gray-300"></div>

          <div>
            <h3 className="font-semibold text-lg">Product Details:</h3>
            <ul>
              <li>
                <span className="font-extrabold text-orange-500 ">✓ </span>
                <b>Brand:</b> Kottakkal Arya Vaidya Sala
              </li>
              <li>
                <span className="font-extrabold text-orange-500 ">✓ </span>
                <b>Quantity:</b> 200 ML
              </li>
              <li>
                <span className="font-extrabold text-orange-500 ">✓ </span>
                <b>Base Oil:</b> Pure Coconut Oil
              </li>
              <li>
                <span className="font-extrabold text-orange-500 ">✓ </span>
                <b>Form:</b> Medicated Ayurvedic Oil
              </li>
              <li>
                <span className="font-extrabold text-orange-500 ">✓ </span>
                <b>For External Use Only</b>
              </li>
            </ul>
          </div>

          <div className=" border-t border-gray-300"></div>

          <div className="">
            <h3 className="font-semibold text-lg">Disclaimer:</h3>
            <p className="mt-2">
              For external use only. Store in a cool, dry place. Use under the
              guidance of an Ayurvedic physician if you have scalp conditions or
              allergies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
