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
      const { data } = await API.get('/products?limit=100'); 
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans mb-10">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Products</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Dashboard • Inventory Management</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link to="/admin/orders" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <FaClipboardList /> Orders
            </Link>
            <Link to="/admin/products" className="inline-flex items-center gap-2 bg-[rgb(7,81,89)] text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
              <FaList /> Products
            </Link>
            <Link to="/admin/add-product" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
              <FaPlus /> Add New
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="w-10 h-10 border-4 border-gray-200 border-t-[rgb(7,81,89)] rounded-full animate-spin"></div>
             </div>
          ) : products.length === 0 ? (
             <div className="text-center py-16">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 mb-4 mx-auto">
                 <FaBoxOpen className="text-2xl text-gray-300" />
               </div>
               <h3 className="text-base font-semibold text-gray-900 mb-1">No products found</h3>
               <p className="text-sm text-gray-500 mb-4">Your store inventory is currently empty.</p>
               <Link to="/admin/add-product" className="px-5 py-2.5 bg-[rgb(7,81,89)] text-white text-sm font-medium rounded-md hover:bg-teal-800 transition-colors inline-block">
                 Add Your First Product
               </Link>
             </div>
          ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-gray-50/50 border-b border-gray-200">
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                     <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-200">
                   {products.map(product => (
                     <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
                             <img src={product.img} alt={product.productName} className="h-full object-contain mix-blend-multiply" />
                           </div>
                           <div className="min-w-0">
                             <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.productName}</p>
                             <p className="text-xs text-gray-500">{product.brand}</p>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                           {product.categoryName}
                         </span>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center gap-1.5 text-sm">
                           <span className="font-medium text-[rgb(7,81,89)]">₹{product.price}</span>
                           {product.originalPrice && product.originalPrice > product.price && (
                             <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                           )}
                         </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <div className="flex items-center justify-end gap-2">
                           <Link to={`/admin/edit-product/${product.id}`} className="text-gray-400 hover:text-[rgb(7,81,89)] bg-gray-50 hover:bg-[rgb(7,81,89)]/10 p-2 rounded-md transition-colors border border-transparent hover:border-[rgb(7,81,89)]/20" title="Edit">
                             <FaEdit />
                           </Link>
                           <button onClick={() => handleDelete(product.id, product.productName)} className="text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 p-2 rounded-md transition-colors border border-transparent hover:border-red-200" title="Delete">
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
