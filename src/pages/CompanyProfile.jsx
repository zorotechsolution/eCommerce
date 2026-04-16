import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaGlobe, FaTruck } from 'react-icons/fa';

const CompanyProfile = () => {
  return (
    <section className="min-h-screen bg-slate-50 py-12 px-5 md:px-10 lg:px-24 font-sans relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-5 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-6 text-center tracking-tight">
          Vel Siddhar Arakkattalai - Company Profile
        </h1>
        <p className="text-center text-slate-500 mb-12 font-bold tracking-wide uppercase">
          One of the Best Online Ayurvedic Stores in India
        </p>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-14 mb-10 text-slate-700 leading-relaxed space-y-8">
          
          <div className="flex gap-4 md:gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <FaLeaf className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800 mb-2">Quality ayurvedic products at a click!</p>
              <p className="text-lg text-slate-600">
                <strong className="text-[rgb(7,81,89)]">Vel Siddhar Arakkattalai</strong> aims to bring the world of authentic ayurvedic herbs and ayurvedic medicines to your doorstep within the shortest delivery time possible.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6"></div>

          <div className="flex gap-4 md:gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <FaGlobe className="text-[rgb(7,81,89)] text-xl" />
            </div>
            <div>
              <p className="text-lg">
                In recent years The Internet has revolutionized the way we purchase things. Because of the numerous advantages and benefits, more and more people these days prefer buying things online over the conventional method of going into shops. 
              </p>
              <p className="mt-4 text-slate-600">
                In 2017, an estimated 1.66 billion people worldwide have purchased goods online. So why not bring this revolution into our ancient traditional form of Ayurvedic medicines.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent my-6"></div>

          <div className="flex gap-4 md:gap-6 items-start">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <FaTruck className="text-orange-400 text-xl" />
            </div>
            <div>
              <p className="text-lg">
                Currently more and more people are switching to Ayurveda which is a natural way of heeling the mind body and soul and at many times after a diagnosis the patient are not able to purchase the medicines at a convenient location.
              </p>
              <p className="mt-4 text-slate-600 font-bold text-[rgb(7,81,89)]">
                This is the soul aim and purpose of Vel Siddhar Arakkattalai! We will deliver the medicines that you require at the utmost quality right to your door step within the shortest possible time….
              </p>
            </div>
          </div>

        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-3 bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] text-white font-black py-4 px-10 rounded-full transition-all uppercase tracking-widest shadow-xl shadow-[rgb(7,81,89)]/20 hover:-translate-y-1"
          >
            Explore Our Collections
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
