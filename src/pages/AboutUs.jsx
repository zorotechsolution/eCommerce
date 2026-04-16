import React from 'react';
import { FaUserMd, FaHospitalAlt, FaLeaf } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-slate-50 py-12 px-5 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-10 text-center uppercase tracking-wider">
          About Us
        </h1>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-14 mb-10 flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaLeaf className="text-green-500" /> Our Heritage
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We bring to you the traditional wisdom of Ayurveda combined with modern science. 
              Our mission is to provide 100% natural, safe, and effective Ayurvedic medicines and personal care products. 
              For over three decades, we have been a trusted name in healthcare, focusing on holistic healing and well-being.
            </p>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaHospitalAlt className="text-blue-500" /> Quality First
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Every product in our store is carefully curated. We partner with top Ayurvedic brands 
              like Kottakkal Arya Vaidya Sala and others to ensure authenticity. From farm to shelf, 
              we ensure strict hygiene and quality protocols.
            </p>
          </div>
          <div className="flex-1 bg-slate-100 rounded-2xl flex items-center justify-center p-10 relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
             <div className="text-center relative z-10">
               <FaUserMd className="text-7xl text-[rgb(7,81,89)] mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-800">Expert Ayurvedic Doctors</h3>
               <p className="text-sm text-slate-500 mt-2">Consult with our specialists for a healthier life.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
