import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBoxOpen, FaUpload, FaTags, FaDollarSign, FaInfoCircle, FaCheckCircle, FaExclamationCircle, FaList, FaPlus, FaClipboardList } from 'react-icons/fa';
import API from '../utils/axiosConfig';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Classical Medicines',
    brand: 'Kottakkal',
    type: 'General',
    price: '',
    originalPrice: '',
    productDescription: '',
    img: null,
    imgPreview: '',
    ailments: ''
  });
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/Login'); 
    }
  }, [user, isAuthenticated, navigate]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const CATEGORIES = ['Siddhar', 'Classical Medicines', 'Personal Care', 'Health & Nutrition', 'Herbal Oils'];
  const BRANDS = ['Kottakkal', 'AVP Ayurveda', 'Kerala Ayurveda', 'Santhigiri', 'Vel Siddhar'];
  const TYPES = ['General', 'Churnam', 'Tailam', 'Lehyam', 'Arishtam', 'Bhasma'];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData(prev => ({
          ...prev,
          img: file,
          imgPreview: URL.createObjectURL(file)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setTimeout(() => {
      if (formData.imgPreview) URL.revokeObjectURL(formData.imgPreview);
      setSuccess(false);
      setFormData({
        productName: '', category: 'Classical Medicines', brand: 'Kottakkal', type: 'General',
        price: '', originalPrice: '', productDescription: '', img: null, imgPreview: '', ailments: ''
      });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSend = new FormData();
      dataToSend.append('name', formData.productName);
      dataToSend.append('description', formData.productDescription);
      dataToSend.append('category', formData.category);
      dataToSend.append('brand', formData.brand);
      dataToSend.append('type', formData.type);
      dataToSend.append('ailments', formData.ailments);
      dataToSend.append('price', formData.price);
      dataToSend.append('stock', 100); 
      
      if (formData.img) {
        dataToSend.append('image', formData.img);
      }

      await API.post('/products', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(true);
      resetForm();

    } catch (error) {
      console.error("POST failed:", error);
      alert(error.response?.data?.error || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans mb-10">
      
      {/* Top Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Dashboard • Inventory Management</p>
          </div>
          <div className="flex gap-3 flex-wrap">
             <Link to="/admin/orders" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
               <FaClipboardList /> Orders
             </Link>
             <Link to="/admin/products" className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
               <FaList /> Products
             </Link>
             <Link to="/admin/add-product" className="inline-flex items-center gap-2 bg-[rgb(7,81,89)] text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
               <FaPlus /> Add New
             </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
          
          {/* Status Message */}
          {success && (
            <div className="bg-green-50 px-6 py-4 border-b border-green-200 flex items-center gap-2 text-green-700 font-medium">
              <FaCheckCircle className="text-green-500" /> Product successfully added to the database.
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column - Basics */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2 mb-4">
                    <FaInfoCircle className="text-gray-400" /> Basic Details
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                    <input required type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="e.g. Ashwagandha Root Churnam" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm text-gray-900" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Description <span className="text-red-500">*</span></label>
                    <textarea required name="productDescription" value={formData.productDescription} onChange={handleChange} rows="4" placeholder="Detailed description of the medicine/product..." className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm text-gray-900 resize-none" />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image <span className="text-red-500">*</span></label>
                    <div className="flex flex-col gap-3">
                      {formData.imgPreview && (
                        <div className="w-full h-40 bg-gray-50 rounded-md border border-gray-300 overflow-hidden flex items-center justify-center">
                          <img src={formData.imgPreview} alt="Preview" className="h-full object-contain mix-blend-multiply" />
                        </div>
                      )}
                      <input required={!formData.img} type="file" accept="image/*" name="img" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Classification & Pricing */}
              <div className="flex flex-col gap-6">
                
                {/* Classification */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2 mb-4">
                    <FaTags className="text-gray-400" /> Classification
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm text-gray-900">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                      <select name="brand" value={formData.brand} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm text-gray-900">
                        {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Form / Type</label>
                      <select name="type" value={formData.type} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm text-gray-900">
                        {TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ailments / Tags</label>
                      <input type="text" name="ailments" value={formData.ailments} onChange={handleChange} placeholder="Comma separated..." className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2 mb-4">
                    <FaDollarSign className="text-gray-400" /> Pricing
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Price (₹) <span className="text-red-500">*</span></label>
                      <input required type="number" min="0" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm font-bold text-gray-900" />
                     </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹) <span className="text-gray-400 font-normal ml-1">Optional</span></label>
                      <input type="number" min="0" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="0.00" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[rgb(7,81,89)] focus:ring-1 focus:ring-[rgb(7,81,89)] transition-colors text-sm text-gray-500 line-through" />
                     </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
               <button type="button" onClick={() => navigate('/admin/products')} className="px-5 py-2.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">
                 Cancel
               </button>
               <button disabled={loading} type="submit" className={`px-5 py-2.5 rounded-md text-sm font-medium text-white shadow-sm flex items-center gap-2 ${loading ? 'bg-[rgb(7,81,89)]/70 cursor-wait' : 'bg-[rgb(7,81,89)] hover:bg-teal-800 transition-colors'}`}>
                 {loading ? (
                    <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" /> Saving...</>
                 ) : (
                    <><FaPlus className="text-xs" /> Save Product</>
                 )}
               </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
