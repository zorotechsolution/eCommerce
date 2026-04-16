import React from 'react';

const RefundPolicy = () => {
  return (
    <section className="bg-slate-50 min-h-screen py-16 px-5 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-8 tracking-tight">Refund Policy</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">1. Returns</h2>
            <p>Our return policy lasts 7 days. If 7 days have gone by since your purchase was delivered, unfortunately, we can’t offer you a refund or exchange. Due to the health and safety regulations surrounding Siddha and Ayurvedic medicinal products, items must be entirely unused, sealed, and in the same condition that you received them to be eligible for a return.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">2. Refunds</h2>
            <p>Once your return is received and inspected, we will send you an email notification. We will also notify you of the approval or rejection of your refund. If you are approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">3. Damaged or Defective Items</h2>
            <p>We only replace items if they are defective, damaged, or expired upon arrival. If you need to exchange a damaged item for the same product, please send us an email immediately at support@velsiddhararakkattalai.com with photo evidence of the packaging and product.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">4. Shipping</h2>
            <p>You will be responsible for paying for your own shipping costs for returning your item unless the return is due to an error on our part (e.g. damaged goods). Return shipping costs are non-refundable.</p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <p className="font-bold text-[rgb(7,81,89)]">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefundPolicy;
