import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTrash, FaEdit, FaBoxOpen, FaList, FaPlus, FaClipboardList } from 'react-icons/fa';
import API from '../utils/axiosConfig';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/Login');
    } else {
      fetchProducts();
    }
  }, [user, isAuthenticated, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products?limit=100'); // Fetch max to show in table
      const formatted = data.data.map(p => {
        const rawImg = p.images?.[0]?.url || "";
        return {
          ...p,
          id: p._id,
          productName: p.name,
          img: rawImg.startsWith('http') ? rawImg : `http://localhost:5000${rawImg}`,
          categoryName: p.category?.name || "General",
        };
      });
      setProducts(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        await API.delete(`/products/${id}`);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert(error.response?.data?.error || "Failed to delete product");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Options */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Manage Products</h1>
            <p className="text-slate-500 font-medium mt-2">Admin Dashboard • Inventory Management</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/admin/orders" className="inline-flex items-center gap-2 bg-white text-[rgb(7,81,89)] border border-[rgb(7,81,89)] px-4 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-[rgb(7,81,89)] hover:text-white transition-colors">
              <FaClipboardList /> Orders
            </Link>
            <Link to="/admin/products" className="inline-flex items-center gap-2 bg-[rgb(7,81,89)] text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow">
              <FaList /> Products
            </Link>
            <Link to="/admin/add-product" className="inline-flex items-center gap-2 bg-white text-[rgb(7,81,89)] border border-[rgb(7,81,89)] px-4 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-[rgb(7,81,89)] hover:text-white transition-colors">
              <FaPlus /> Add New
            </Link>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-6 md:p-10">
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-[rgb(7,81,89)] rounded-full animate-spin"></div>
             </div>
          ) : products.length === 0 ? (
             <div className="text-center py-16">
               <FaBoxOpen className="text-6xl text-slate-200 mx-auto mb-4" />
               <p className="text-lg font-bold text-slate-500">No products found</p>
             </div>
          ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     <th className="p-4 rounded-tl-xl">Product</th>
                     <th className="p-4">Category</th>
                     <th className="p-4">Price</th>
                     <th className="p-4 text-center rounded-tr-xl">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {products.map(product => (
                     <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                       <td className="p-4">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                             <img src={product.img} alt={product.productName} className="h-full object-contain" />
                           </div>
                           <div>
                             <p className="font-bold text-slate-800 text-sm line-clamp-2 leading-tight">{product.productName}</p>
                             <p className="text-xs text-slate-400 font-medium">{product.brand}</p>
                           </div>
                         </div>
                       </td>
                       <td className="p-4">
                         <span className="inline-block bg-orange-100 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                           {product.categoryName}
                         </span>
                       </td>
                       <td className="p-4">
                         <div className="flex items-center gap-2">
                           <span className="font-black text-[rgb(7,81,89)] text-sm">₹{product.price}</span>
                           {product.originalPrice && product.originalPrice > product.price && (
                             <span className="text-xs text-slate-400 line-through font-medium">₹{product.originalPrice}</span>
                           )}
                         </div>
                       </td>
                       <td className="p-4">
                         <div className="flex items-center justify-center gap-3">
                           <Link to={`/admin/edit-product/${product.id}`} className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors cursor-pointer" title="Edit">
                             <FaEdit />
                           </Link>
                           <button onClick={() => handleDelete(product.id, product.productName)} className="text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 p-2 rounded-lg transition-colors cursor-pointer" title="Delete">
                             <FaTrash />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;
