import React from 'react';
import { useLang } from '../context/LangContext';
import { FaUserMd, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaLeaf, FaMedkit } from 'react-icons/fa';

const AboutUs = () => {
  const { t } = useLang();

  return (
    <section className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[rgb(7,81,89)] rounded-full mix-blend-multiply blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-orange-300 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-20 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 shadow-inner">
             <FaLeaf className="text-3xl text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[rgb(7,81,89)] mb-4 tracking-tight uppercase">
            {t('clinicTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-bold tracking-widest uppercase">
            {t('clinicSubTitle')}
          </p>
        </div>

        {/* About Us Description */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-lg mb-12 text-center max-w-4xl mx-auto hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-black text-[rgb(7,81,89)] mb-6 uppercase tracking-widest relative inline-block">
            {t('aboutUsClinic')}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-orange-400 rounded-full"></div>
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-4">{t('clinicDesc1')}</p>
          <p className="text-lg text-slate-700 leading-relaxed">{t('clinicDesc2')}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Treatments */}
          <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
               <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                 <FaMedkit className="text-3xl text-teal-600" />
               </div>
               <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                 {t('treatmentTimeframe')}
               </h2>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <FaCheckCircle className="text-xl text-green-500 shrink-0 mt-0.5 drop-shadow-sm" />
                  <span className="text-lg text-slate-700 font-medium">{t(`treatmentList${item}`)}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[rgb(7,81,89)]/5 p-6 rounded-2xl border border-[rgb(7,81,89)]/10 text-center shadow-inner">
              <p className="text-lg font-bold text-[rgb(7,81,89)] italic">
                "{t('treatmentDesc')}"
              </p>
            </div>
          </div>

          {/* Right Column: Doctor & Contact Info */}
          <div className="space-y-8">
            {/* Doctor Info */}
            <div className="bg-gradient-to-br from-[rgb(7,81,89)] to-[rgb(12,103,104)] p-8 md:p-10 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-white/30 transition-colors">
                  <FaUserMd className="text-5xl text-white drop-shadow-md" />
                </div>
                <div>
                  <h3 className="text-3xl font-black mb-2 tracking-wide text-white">{t('doctorName')}</h3>
                  <p className="text-orange-300 font-bold mb-4 tracking-widest text-sm uppercase drop-shadow-sm">{t('doctorQual')}</p>
                  <div className="inline-block bg-white/10 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-default">
                    <p className="text-white/95 font-bold text-sm tracking-wide">{t('doctorRole')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Address Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-8 rounded-[2rem] shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer" onClick={() => window.location.href=`tel:${t('contactNumber')}`}>
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:bg-blue-100">
                  <FaPhoneAlt className="text-2xl text-blue-500 drop-shadow-sm" />
                </div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t('contactLabel')}</h4>
                <a href={`tel:${t('contactNumber')}`} className="text-2xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                  {t('contactNumber')}
                </a>
              </div>

              {/* Address */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-8 rounded-[2rem] shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform group-hover:bg-rose-100">
                  <FaMapMarkerAlt className="text-2xl text-rose-500 drop-shadow-sm" />
                </div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t('addressLabel')}</h4>
                <div className="text-slate-700 font-medium leading-relaxed">
                  <p>{t('addressLine1')}</p>
                  <p>{t('addressLine2')}</p>
                  <p className="font-black text-slate-900 mt-1 uppercase text-sm tracking-wide">{t('addressLine3')}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
