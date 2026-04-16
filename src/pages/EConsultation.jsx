import React, { useState } from 'react';
import { FaCalendarAlt, FaUserMd, FaVideo } from 'react-icons/fa';

const EConsultation = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-5 md:px-10 lg:px-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-6 text-center uppercase tracking-wider">
          E-Consultation (Book Now)
        </h1>
        <p className="text-center text-slate-500 mb-10 font-medium">Get personalized health advice from expert Ayurvedic physicians entirely online.</p>

        {submitted ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 text-center">
            <FaVideo className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-600">We have sent the consultation link to your email. Our doctor will be with you shortly.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-slate-100">
               <FaUserMd className="text-3xl text-orange-500" />
               <div>
                  <h2 className="text-xl font-bold text-slate-800">Book an Appointment</h2>
                  <p className="text-xs text-slate-400">Fill out details below</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Full Name</label>
                  <input required type="text" className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors" placeholder="John Doe" />
                </div>
                <div className="w-full">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Phone Number</label>
                  <input required type="tel" className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors" placeholder="+91 9876543210" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Preferred Date</label>
                  <div className="relative">
                    <input required type="date" className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors" />
                    <FaCalendarAlt className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Preferred Time</label>
                  <select required className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors">
                    <option value="">Select a slot</option>
                    <option value="morning">Morning (10 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (2 PM - 5 PM)</option>
                    <option value="evening">Evening (6 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2 mb-1 block">Describe Your Health Issue</label>
                <textarea required rows="4" className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-orange-500 transition-colors resize-none" placeholder="e.g. Seeking consultation for joint pain and fatigue..."></textarea>
              </div>

              <button type="submit" className="w-full bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] text-white font-bold py-4 rounded-xl transition-all shadow-md mt-4 text-lg">
                Confirm Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default EConsultation;
