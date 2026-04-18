import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBoxOpen, FaUpload, FaTags, FaDollarSign, FaInfoCircle, FaCheckCircle, FaList, FaClipboardList } from 'react-icons/fa';
import API from '../utils/axiosConfig';

const AdminEditProduct = () => {
  const { id } = useParams();
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
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const CATEGORIES = ['Siddhar', 'Classical Medicines', 'Personal Care', 'Health & Nutrition', 'Herbal Oils'];
  const BRANDS = ['Kottakkal', 'AVP Ayurveda', 'Kerala Ayurveda', 'Santhigiri', 'Vel Siddhar'];
  const TYPES = ['General', 'Churnam', 'Tailam', 'Lehyam', 'Arishtam', 'Bhasma'];

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/Login');
    } else {
      fetchProduct();
    }
  }, [user, isAuthenticated, navigate, id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/products/${id}`);
      const p = data.data;
      const rawImg = p.images?.[0]?.url || "";
      const imgUrl = rawImg.startsWith('http') ? rawImg : `http://localhost:5000${rawImg}`;
      
      setFormData({
        productName: p.name || '',
        category: p.category?.name || 'Classical Medicines',
        brand: p.brand || 'Kottakkal',
        type: p.type || 'General',
        price: p.price || '',
        originalPrice: p.originalPrice || '',
        productDescription: p.description || '',
        img: null,
        imgPreview: imgUrl,
        ailments: Array.isArray(p.ailments) ? p.ailments.join(', ') : (p.ailments || '')
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load product details");
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const dataToSend = new FormData();
      dataToSend.append('name', formData.productName);
      dataToSend.append('description', formData.productDescription);
      dataToSend.append('category', formData.category);
      dataToSend.append('brand', formData.brand);
      dataToSend.append('type', formData.type);
      dataToSend.append('ailments', formData.ailments);
      dataToSend.append('price', formData.price);
      if (formData.originalPrice) {
        dataToSend.append('originalPrice', formData.originalPrice);
      }
      
      if (formData.img) {
        dataToSend.append('image', formData.img);
      }

      await API.put(`/products/${id}`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      console.error("PUT failed:", error);
      alert(error.response?.data?.error || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[rgb(7,81,89)] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-5 md:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Edit Product</h1>
            <p className="text-slate-500 font-medium mt-2">Admin Dashboard • Update Inventory</p>
          </div>
          <div className="flex gap-3 flex-wrap">
             <Link to="/admin/orders" className="inline-flex items-center gap-2 bg-white text-[rgb(7,81,89)] border border-[rgb(7,81,89)] px-4 py-2 rounded-full font-bold text-sm tracking-wide hover:bg-[rgb(7,81,89)] hover:text-white transition-colors">
               <FaClipboardList /> Orders
             </Link>
             <Link to="/admin/products" className="inline-flex items-center gap-2 bg-[rgb(7,81,89)] text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide shadow">
               <FaList /> Products
             </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          
          {success && (
            <div className="bg-green-500 p-4 text-white text-center font-bold flex items-center justify-center gap-2 animate-fade-in relative z-10">
              <FaCheckCircle className="text-xl" /> Product successfully updated!
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column - Basics */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">
                    <FaInfoCircle className="text-teal-500" /> Basic Details
                  </h3>
                  
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Product Name <span className="text-rose-500">*</span></label>
                    <input required type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="e.g. Ashwagandha Root Churnam" className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800" />
                  </div>

                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Product Description <span className="text-rose-500">*</span></label>
                    <textarea required name="productDescription" value={formData.productDescription} onChange={handleChange} rows="4" placeholder="Detailed description..." className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800 resize-none" />
                  </div>

                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Product Image (File)</label>
                    <div className="flex flex-col gap-4">
                      {formData.imgPreview && (
                        <div className="w-full h-48 bg-slate-100 rounded-xl border-2 border-slate-200 overflow-hidden flex items-center justify-center relative">
                          <img src={formData.imgPreview} alt="Preview" className="h-full object-contain" />
                        </div>
                      )}
                      <div className="relative">
                         <div className="absolute left-4 top-3.5 text-slate-400"><FaUpload /></div>
                         <input type="file" accept="image/*" name="img" onChange={handleChange} className="w-full border-2 border-slate-200 bg-slate-50 hover:bg-white rounded-xl pl-12 pr-4 py-2.5 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer" />
                      </div>
                      <p className="text-xs text-slate-400 font-medium pl-1">Leave blank to keep existing image</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Classification & Pricing */}
              <div className="flex flex-col gap-6">
                {/* Classification */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">
                    <FaTags className="text-orange-500" /> Classification
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Brand</label>
                      <select name="brand" value={formData.brand} onChange={handleChange} className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800">
                        {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Form / Type</label>
                      <select name="type" value={formData.type} onChange={handleChange} className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800">
                        {TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Ailments / Tags</label>
                      <input type="text" name="ailments" value={formData.ailments} onChange={handleChange} placeholder="Comma separated..." className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-4">
                  <h3 className="flex items-center gap-2 text-lg font-black text-slate-800 mb-4 border-b border-slate-100 pb-2">
                    <FaDollarSign className="text-green-500" /> Pricing
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">Current Price (₹) <span className="text-rose-500">*</span></label>
                      <input required type="number" min="0" name="price" value={formData.price} onChange={handleChange} className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all text-xl font-black text-slate-800" />
                     </div>
                     <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">MRP / Original (₹)</label>
                      <input type="number" min="0" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all text-xl font-black text-slate-400 line-through" />
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-end gap-4">
               <button type="button" onClick={() => navigate('/admin/products')} className="px-8 py-3 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                 Cancel
               </button>
               <button disabled={saving} type="submit" className={`px-10 py-3 rounded-xl font-black text-white uppercase tracking-widest shadow-lg transition-all flex items-center gap-2 ${saving ? 'bg-slate-400 cursor-wait' : 'bg-[rgb(7,81,89)] hover:bg-teal-700 hover:-translate-y-0.5 shadow-[rgb(7,81,89)]/30'}`}>
                 {saving ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                 ) : (
                    <><FaBoxOpen /> Save Changes</>
                 )}
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
