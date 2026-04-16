import React from 'react';

const Terms = () => {
  return (
    <section className="bg-slate-50 min-h-screen py-16 px-5 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-8 tracking-tight">Terms of Service</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">1. Agreement to Terms</h2>
            <p>By accessing or using the Vel Siddhar Arakkattalai website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">2. Medical Disclaimer</h2>
            <p>The content provided on Vel Siddhar Arakkattalai, including information on Siddha medicines and Ayurvedic products, is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified health provider with any questions you may have regarding a medical condition.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">3. Products and Pricing</h2>
            <p>All products listed are subject to availability. We reserve the right to limit quantities of any products or services. Pricing for our products is subject to change without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of products.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">4. User Accounts</h2>
            <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <p className="font-bold text-[rgb(7,81,89)]">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
