import { FaHeart } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Icon from "../../src/assets/react.svg";
import { IoMdCall } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { FaUser } from "react-icons/fa";


const Navbar = () => {

  
  return (
    <>
      <nav>
        <div className="">
          <div className="bg-[rgb(233,237,215)] hidden md:block ">
            <div className=" flex justify-between  px-20">
              <ul className="flex  w-80 justify-between pt-2">
                <li className="">
                  <Link>
                    <FaHeart className="inline-block " /> Wishlist
                  </Link>
                </li>
                <li>
                  <Link to={"/Login"}>
                    <RiLoginBoxLine className="inline" /> Login 
                  </Link>
                </li>
                <li>
                  <Link to={"/Signup"}>
                    <FaPen className="inline" /> Create An Account
                  </Link>
                </li>
              </ul>

              <div className="bg-[rgb(7,81,89)] py-2">
                <div className="p-1 text-white">
                  <Link>
                    <FaCartShopping className="inline " />
                    <span className="ps-2">{"0"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:px-30 text-sm md:text-lg  pt-1">
              <div className="flex items-center justify-center">
                <Link to={"/"}>
                  <img src={Icon} alt="" className="" />
                </Link>
              </div>
              <div className="flex gap-4 items-center ">
                <div className="">
                  <IoMdCall
                    className="bg-orange-300 text-4xl p-1 rounded-lg hidden md:inline"
                    style={{ color: "white" }}
                  />
                </div>
                <div className=" flex md:block">
                  <div className="">Order Online or Call Us &nbsp;</div>
                  <div className="font-bold md:font-normal text-[rgb(7,81,89)]">
                    044 4859888888
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="">
                  <CiDeliveryTruck className="text-4xl hidden md:inline " />
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="">FREE Shipping</div>
                  <div className="">ON ORDER ABOVE ₹900**</div>
                  <div className="hidden md:inline text-sm ">
                    {" "}
                    (Only On Selected Items)
                  </div>
                </div>
              </div>
              <div className=" md:flex items-center  justify-center w-full">
                <div className="flex justify-between    ">
                  <input
                    type="text"
                    placeholder="hooooo"
                    className="outline-0 md:w-full border w-full"
                  />
                  <button className="bg-amber-500 p-2 ">
                    <FaSearch style={{ color: "white" }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="py-4 hidden md:block bg-[rgb(7,81,89)] sticky w-full top-0 font-bold text-white  z-30">
        <div className="px-30">
          <ul className="flex justify-between">
            <li className="relative group">
              <Link className="" >ABOUT US</Link>
              <ul className="absolute hidden text-black group-hover:block ">
                <li className="bg-gray-500 py-1 px-5 hover:bg-gray-600 transition-all duration-300   hover:scale-125  ">profile</li>
                <li className="bg-gray-500 py-1 px-5 hover:bg-gray-600 transition-all duration-300  hover:scale-125">Reviews</li>
                
              </ul>
            </li>
            <li>
              <Link>list-2</Link>
            </li>
            <li>
              <Link>list-3</Link>
            </li>
            <li>
              <Link>list-4</Link>
            </li>
            <li>
              <Link>list-5</Link>
            </li>
            <li>
              <Link>list-6</Link>
            </li>
            <li>
              <Link>list-7</Link>
            </li>
            <li>
              <Link>list-8</Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="bg-[rgb(7,81,89)] md:hidden">
        <div className="px-10">
          <ul className="flex justify-between items-center">
          <li ><Sidebar/> </li>
          <li className="text-white "><Link to={"/Login"}><FaUser className="text-2xl" style={{color:"white"}}/></Link></li>
          <li className="text-white "><FaCartShopping className="text-2xl" style={{color:"white"}} /></li>
        </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
