import { FaHeart, FaPen, FaUser, FaSearch } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Icon from "../../src/assets/image.png";
import { IoMdCall } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const auth = useSelector((state) => state.auth);
  
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <nav>
        <div className="">
          <div className="bg-[rgb(233,237,215)] hidden md:block ">
            <div className=" flex justify-between  px-20">
              <ul className="flex items-center gap-6 pt-2">
                <li className="">
                  <Link to="/wishlist">
                    <FaHeart className="inline-block " /> Wishlist ({wishlistCount})
                  </Link>
                </li>
                {auth.isAuthenticated ? (
                   <li>
                     <Link to="/profile" className="font-bold text-[rgb(7,81,89)] flex items-center gap-1">
                       <FaUser className="border border-[rgb(7,81,89)] rounded-full p-0.5 text-lg bg-[rgb(7,81,89)] text-white" />
                       {auth.user.username}
                     </Link>
                   </li>
                ) : (
                  <>
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
                  </>
                )}
              </ul>

              <Link to={"/addcart"}>
                <div className="bg-[rgb(7,81,89)] py-2 px-4 flex items-center justify-center">
                  <div className="text-white flex items-center font-bold">
                    <FaCartShopping className="inline text-lg" />
                    <span className="ps-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                      {cartCount}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 lg:px-30 text-sm md:text-lg  pt-1 ">
              <div className="flex items-center justify-center md:justify-start">
                <Link to={"/"} className="flex items-center gap-3">
                  <img src={Icon} alt="Vel Siddhar Arakkattalai Logo" className="w-12 h-12 object-contain" />
                  <div className="flex flex-col">
                    <span className="font-black text-[rgb(7,81,89)] text-lg md:text-xl leading-none uppercase tracking-widest">Vel Siddhar</span>
                    <span className="font-bold text-orange-500 text-xs md:text-sm tracking-widest">Arakkattalai</span>
                  </div>
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
              <div className=" hidden lg:flex  items-center ">
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
                    type="search"
                    placeholder="Search"
                    className="outline-0 w-full md:w-60 border  px-3 text-sm"
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
      <nav className="py-4 hidden md:block bg-[rgb(7,81,89)] sticky w-full top-0 font-bold text-white uppercase text-sm z-30 shadow-md">
        <div className="px-10 lg:px-30">
          <ul className="flex flex-wrap justify-center md:justify-between items-center gap-4">
            <li className="relative group py-2">
              <Link to="/about" className="hover:text-amber-400 transition-colors">ABOUT US</Link>
              <ul className="absolute hidden text-black group-hover:block top-full left-0 w-48 shadow-lg bg-white border border-gray-100 rounded-b-lg overflow-hidden">
                <li className="hover:bg-gray-100 transition-all duration-300 hover:text-[rgb(7,81,89)]">
                  <Link to="/company-profile" className="block w-full px-5 py-3">Company Profile</Link>
                </li>
                <li className="hover:bg-gray-100 transition-all duration-300 hover:text-[rgb(7,81,89)]">
                  <Link to="/about" className="block w-full px-5 py-3">Heritage & Reviews</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/siddhar" className="hover:text-amber-400 transition-colors">Siddhar</Link>
            </li>
            <li>
              <Link to="/collections" className="hover:text-amber-400 transition-colors">Collections</Link>
            </li>
            <li>
              <Link to="/collections/Personal Care" className="hover:text-amber-400 transition-colors">Personal Care</Link>
            </li>
            <li>
              <Link to="/collections/Brands" className="hover:text-amber-400 transition-colors">Brands</Link>
            </li>
            <li>
              <Link to="/collections/Health & Nutrition" className="hover:text-amber-400 transition-colors">Health & Nutrition</Link>
            </li>
            <li>
              <Link to="/collections/General" className="hover:text-amber-400 transition-colors">General</Link>
            </li>
            <li>
              <Link to="/e-consultation" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:-translate-y-0.5 inline-block">
                E-Consultation (Book Now)
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="bg-[rgb(7,81,89)] md:hidden sticky top-0 z-40 shadow-md">
        <div className="px-5 py-3">
          <ul className="flex justify-between items-center">
            <li>
              <Sidebar />
            </li>
            <li className="flex gap-4 items-center">
              <Link to={auth.isAuthenticated ? "/profile" : "/Login"}>
                <FaUser className={`text-xl transition-colors ${auth.isAuthenticated ? "text-amber-400" : "text-white"} hover:text-amber-400`} />
              </Link>
              <Link to="/wishlist" className="relative">
                <FaHeart className="text-xl text-white hover:text-amber-400 transition-colors" />
                {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{wishlistCount}</span>}
              </Link>
              <Link to={"/addcart"} className="relative">
                <FaCartShopping className="text-xl text-white hover:text-amber-400 transition-colors" />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

