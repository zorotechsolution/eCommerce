import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {



  

  function AccordionBtn(){

  }



  return (
    <div>
      <footer className="bg-black text-white py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 md:px-20 ">
          <div className=" ">
            <h2 className="text-xs uppercase font-bold text-orange-300 ">
              Informations
            </h2>

            <ul className="text-xs flex flex-col gap-1 pt-3">
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-xs uppercase font-bold text-orange-300">
              CUSTOMER SERVICES
            </h2>
              <ul className="text-xs flex flex-col gap-1 pt-3">
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
            </ul>

          </div>
          <div className="">
            <h2 className="text-xs uppercase font-bold text-orange-300">
              Quick Shop
            </h2>
              <ul className="text-xs flex flex-col gap-1 pt-3">
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
              <li className="">
                <Link to={"/"}>Link</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <div className="">Contact Us</div>
            <div className="">Stay Connected</div>
          </div>
        </div>
          <div className="px-5 lg:px-20 my-5">
            <div className="border-t border-dotted "></div>
            <div className="flex justify-between pt-4">
              <div className="text-xs text-blue-50">@ {new Date().getFullYear()}  All Rights Reserved.</div>
              <div className="">***************</div>
            </div>
          </div>

      </footer>
    </div>
  );
};

export default Footer;

