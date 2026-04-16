import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaShieldAlt, FaHeartbeat } from 'react-icons/fa';

const AyurvedaInfo = () => {
  return (
    <section className="min-h-screen bg-slate-50 py-12 px-5 md:px-10 lg:px-24 font-sans relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-5 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-6 text-center uppercase tracking-wider">
          What is Ayurveda?
        </h1>
        <p className="text-center text-slate-500 mb-12 font-medium tracking-wide">
          The Ancient Science of Life and Longevity
        </p>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-14 mb-10 text-slate-700 leading-relaxed space-y-8">
          
          <div className="flex gap-4 md:gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-1">
              <FaLeaf className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-lg">
                <strong className="text-[rgb(7,81,89)]">Ayurveda</strong> is the oldest school of medicine which helped our Indian king’s health even at the time of war. Ayurveda is a system of medicine that is over <span className="font-bold text-orange-500">5000 years old</span> still lives and help you to lead better life with nature. 
              </p>
              <p className="mt-4 text-slate-600">
                We promise you longevity of your health. <em>Prevention is better than cure.</em> Prevention starts with a life that is harmony in changing cycles of nature.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6"></div>

          <div className="flex gap-4 md:gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-1">
              <FaHeartbeat className="text-[rgb(7,81,89)] text-xl" />
            </div>
            <div>
              <p className="text-lg">
                In the situation of our polluted cities the modern technologies with side effects helps us only to pay more for the lifetime. We are in a modern age with new diseases which not even named. 
              </p>
              <p className="mt-4 text-slate-600">
                Modern medicines are not prescribed according to your unique body type but our ayurvedic medicines are from the <strong className="text-[rgb(7,81,89)]">nature’s plate</strong>. The ancient culture and medicine are dug back by us which are presented in this website.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6"></div>

          <div className="flex gap-4 md:gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-1">
              <FaShieldAlt className="text-rose-400 text-xl" />
            </div>
            <div>
              <p className="text-lg">
                Ayurveda understand the cycle of nature, it provides what you need and makes the rhythm of life enjoyable in this dynamic circumstances.
              </p>
            </div>
          </div>

        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <Link 
            to="/collections/Ayurveda" 
            className="inline-flex items-center gap-3 bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] text-white font-black py-4 px-10 rounded-full transition-all uppercase tracking-widest shadow-xl shadow-[rgb(7,81,89)]/20 hover:-translate-y-1"
          >
            Please click here to Know more about Ayurveda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AyurvedaInfo;
