import React from "react";
import { ayurvedicMedicines } from "../db/data";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

console.log(ayurvedicMedicines);

const Product = () => {
  return (
    <>
      <section className="">
        <div className="px-5 lg:flex py-10 md:py-20 md:px-10 lg:px-30 lg:py-20">
          <div classNamen="">
            <div className=""></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {ayurvedicMedicines.map((product, id) => {
              return (
                <Link to={`/ProductList/${product.id}`} key={id}>
                  <div className="border border-gray-300   hover:shadow-xl">
                    <div className="overflow-hidden">
                      <img
                        src={product.img}
                        className="w-100 hover:scale-105 transition-all duration-500 hover:opacity-65 "
                        alt=""
                      />
                    </div>
                    <div className=" bg-gray-50 py-3 px-10">
                      <h2 className=" ">{product.productName}</h2>
                      <div>
                        <span>
                          <StarIcon className="text-amber-400 " />
                          <StarIcon className="text-amber-400 " />
                          <StarIcon className="text-amber-400 " />
                          <StarIcon className="text-amber-400 " />
                        </span>
                        <span className="align-middle text-xs">
                          {" "}
                          (91 reviews)
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold">
                        Rs : {product.price}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
