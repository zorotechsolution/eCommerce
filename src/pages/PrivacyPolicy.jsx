import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="bg-slate-50 min-h-screen py-16 px-5 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">1. Information Collection</h2>
            <p>At Vel Siddhar Arakkattalai, we collect personal information such as your name, email address, phone number, and shipping details when you create an account, place an order, or interact with our services. We also collect non-identifiable data such as browser type and IP address to improve our website experience.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">2. How We Use Your Information</h2>
            <p>Your information is primarily used to process and fulfill your orders, provide customer support, and communicate important updates regarding your purchases. With your consent, we may also send you promotional materials about new Siddha medicines and Ayurvedic products.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">3. Data Security</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your explicit consent, excepting trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">4. Cookies</h2>
            <p>Our website uses "cookies" to enhance your shopping experience, remember your preferences, and maintain items in your shopping cart. You can choose to turn off all cookies via your browser settings, though some functionality of our site may not operate properly.</p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <p className="font-bold text-[rgb(7,81,89)]">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-sm mt-2">If you have any questions about this Privacy Policy, please contact us at support@velsiddhararakkattalai.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
