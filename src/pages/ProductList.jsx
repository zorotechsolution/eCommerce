import React from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { ayurvedicMedicines } from "../db/data";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const ProductList = () => {
  let dataValue = ayurvedicMedicines;

  let [count, setCount] = useState(1);

  let { id } = useParams();

  let productItem = dataValue.find((product) => product.id === Number(id));

  let increment = () => {
    setCount((count += 1));
  };
  let decrement = () => {
    if (!(count === 1)) {
      setCount((count -= 1));
    }
  };

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

            <ul className="flex flex-col gap-2 text-xs">
              <li>Availability:Available</li>
              <li>Product Type:Ayurvedic Oil / Thailam / Kuzhampu</li>
              <li>Product Vendor:Kottakkal Arya Vaidya Sala</li>
              <li>Product SKU:AK-A404A</li>
            </ul>
            <div className="">
              <h6 className="text-sm font-semibold my-2">Bundle</h6>
              <div className="flex gap-3 my-2">
                <div className="border border-gray-300 ">
                  <label htmlFor="200" className="cursor-pointer">
                    <input
                      type="radio"
                      id="200"
                      className="hidden peer"
                      name="ml"
                      value={"200ml"}
                    />
                    <span
                      className=" peer-checked:bg-orange-500 p-0.5
                 peer-checked:text-white 
                 peer-checked:border-black"
                    >
                      200ml
                    </span>
                  </label>
                </div>
                <div className="border border-gray-300 ">
                  <label htmlFor="600" className="cursor-pointer">
                    <input
                      type="radio"
                      id="600"
                      className="hidden peer"
                      name="ml"
                      value={"600ml"}
                    />
                    <span
                      className=" peer-checked:bg-orange-500 p-0.5
                 peer-checked:text-white 
                 peer-checked:border-orange-500"
                    >
                      600 ml (3x200ml)
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row my-2 gap-2">
              <div className=" flex">
                <button className="bg-gray-200 px-4 py-2 " onClick={decrement}>
                  -
                </button>
                <input
                  className="bg-gray-100 px-4 py-2 w-13"
                  value={count}
                  disabled
                  type="text"
                  name=""
                  id=""
                />
                {/* <button >{}</button> */}
                <button className="bg-gray-200 px-4 py-2 " onClick={increment}>
                  +
                </button>
              </div>

              <div className=" flex gap-2">
                <button className="bg-orange-400 p-2 font-bold text-white">
                  ADD TO CART
                </button>
                <div className="bg-[rgb(7,81,89)] px-2">
                  <button>
                    <FaHeart className="text-white text-2xl mt-2 " />
                  </button>
                </div>
              </div>
            </div>
            <div className="px-5">
              <ul className="list-disc">
                <li>Ayurvedic Medicine</li>
                <li>Exchange or Return within 7 days of a delivery</li>
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
              <li><span className="font-extrabold text-orange-500">✓ </span>Controls hair fall and strengthens hair roots</li>
              <li><span className="font-extrabold text-orange-500">✓ </span>Prevents dandruff, scalp dryness, and itchiness</li>
              <li><span className="font-extrabold text-orange-500">✓ </span>Promotes hair growth and improves hair texture</li>
              <li><span className="font-extrabold text-orange-500">✓ </span>Helps delay premature greying</li>
              <li><span className="font-extrabold text-orange-500">✓ </span>100% herbal, free from mineral oils and harsh chemicals</li>

            </ul>
          </div>
                  
                  <div className=" border-t border-gray-300"></div>

          <div className="">
            <h3 className="font-semibold text-lg">Usage Instructions:</h3>
            <ul className="ps-4">
              <li><span>→ </span> Warm the oil slightly and apply to the scalp.</li>
              <li><span>→ </span> Warm the oil slightly and apply to the scalp.</li>
              <li><span>→ </span> Warm the oil slightly and apply to the scalp.</li>
              <li><span>→ </span> Warm the oil slightly and apply to the scalp.</li>
            </ul>
          </div>

          <div className=" border-t border-gray-300"></div>

          <div className="">
            <h3 className="font-semibold text-lg">Indication of {productItem.productName} :</h3>
            <ul className="ps-4">
                <li><span className="font-extrabold text-orange-500 ">✓ </span>Controls hair fall and strengthens hair roots</li>
                <li><span className="font-extrabold text-orange-500">✓ </span>Controls hair fall and strengthens hair roots</li>
                <li><span className="font-extrabold text-orange-500">✓ </span>Controls hair fall and strengthens hair roots</li>
                <li><span className="font-extrabold text-orange-500">✓ </span>Controls hair fall and strengthens hair roots</li>
                <li><span className="font-extrabold text-orange-500">✓ </span>Controls hair fall and strengthens hair roots</li>

            </ul>
          </div>

            <div className=" border-t border-gray-300"></div>

          <div >
            <h3 className="font-semibold text-lg">Product Details:</h3>
            <ul>
              <li><span className="font-extrabold text-orange-500 ">✓ </span><b>Brand:</b> Kottakkal Arya Vaidya Sala</li>
              <li><span className="font-extrabold text-orange-500 ">✓ </span><b>Quantity:</b> 200 ML</li>
              <li><span className="font-extrabold text-orange-500 ">✓ </span><b>Base Oil:</b> Pure Coconut Oil</li>
              <li><span className="font-extrabold text-orange-500 ">✓ </span><b>Form:</b> Medicated Ayurvedic Oil</li>
              <li><span className="font-extrabold text-orange-500 ">✓ </span><b>For External Use Only</b></li>
            </ul>
          </div>

            <div className=" border-t border-gray-300"></div>

        <div className="">
          <h3 className="font-semibold text-lg">Disclaimer:</h3>
          <p className="mt-2">For external use only. Store in a cool, dry place. Use under the guidance of an Ayurvedic physician if you have scalp conditions or allergies.</p>
        </div>



        </div>
      </section>
    </div>
  );
};

export default ProductList;
