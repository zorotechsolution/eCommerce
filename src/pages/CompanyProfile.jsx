import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaGlobe, FaTruck } from 'react-icons/fa';
import { useLang } from '../context/LangContext';

const CompanyProfile = () => {
  const { t } = useLang();

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-5 md:px-10 lg:px-24 font-sans relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-5 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-6 text-center tracking-tight">
          {t('cpHeading')}
        </h1>
        <p className="text-center text-slate-500 mb-12 font-bold tracking-wide uppercase">
          {t('cpSubheading')}
        </p>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-14 mb-10 text-slate-700 leading-relaxed space-y-8">
          
          <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
            <p>
              {t('cpP1')}
            </p>
            <p>
              {t('cpP2')}
            </p>
            
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 flex items-start gap-4">
              <div className="mt-1 shrink-0">
                <FaLeaf className="text-orange-500 text-2xl drop-shadow-sm" />
              </div>
              <div>
                <p>
                  {t('cpP3')}
                </p>
              </div>
            </div>

            <p>
              {t('cpP4')}
            </p>

            <div className="bg-[rgb(7,81,89)]/5 p-6 rounded-2xl border border-[rgb(7,81,89)]/10">
              <p className="font-medium">
                {t('cpP5')}
              </p>
            </div>
          </div>

        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-3 bg-[rgb(7,81,89)] hover:bg-[rgb(6,65,71)] text-white font-black py-4 px-10 rounded-full transition-all uppercase tracking-widest shadow-xl shadow-[rgb(7,81,89)]/20 hover:-translate-y-1"
          >
            {t('exploreCollections')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
