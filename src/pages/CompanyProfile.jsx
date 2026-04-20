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
          
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              Looking for Ayurvedic medicines shouldn’t feel like a full-day task. Going from one shop to another, asking around, and still not finding what you need… it can honestly get frustrating. Most of us have faced that at some point.
            </p>
            <p>
              That’s exactly why <strong className="text-[rgb(7,81,89)]">Vel Siddhar Arakkattalai</strong> keeps things simple and easy. Instead of wasting time searching outside, you can just tell us what you’re looking for, and we’ll make sure it reaches your home. No running around, no confusion, no last-minute stress.
            </p>
            
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4">
              <div className="mt-1 shrink-0">
                <FaLeaf className="text-orange-500 text-2xl drop-shadow-sm" />
              </div>
              <div>
                <p>
                  Ayurveda is a natural way to take care of your health, helping your body and mind in a gentle and balanced way. Many people choose it because it is generally safe when taken properly and focuses on long-term wellness. Even people with sugar problems can use Ayurvedic support along with their regular medicines, with the right guidance and timing.
                </p>
              </div>
            </div>

            <p>
              Another good thing is that Ayurvedic treatments often focus on overall health, so they can help manage more than one issue at the same time. We also believe in giving back, which is why we have conducted more than four free medical camps and provided medicines to people in need.
            </p>

            <div className="bg-[rgb(7,81,89)]/5 p-6 rounded-2xl border border-[rgb(7,81,89)]/10">
              <p className="font-medium">
                We focus on providing good quality products, delivering them on time, and making the whole process comfortable for you. Nothing complicated here—just a simple idea: helping you get the right medicines, at the right time, without all the extra effort.
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
