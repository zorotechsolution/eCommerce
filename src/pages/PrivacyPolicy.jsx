import React from 'react';
import { useLang } from '../context/LangContext';

const PrivacyPolicy = () => {
  const { t } = useLang();
  return (
    <section className="bg-slate-50 min-h-screen py-16 px-5 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-8 tracking-tight">{t('privacyPageTitle')}</h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{t('privacySection1Head')}</h2>
            <p>{t('privacySection1Body')}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{t('privacySection2Head')}</h2>
            <p>{t('privacySection2Body')}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{t('privacySection3Head')}</h2>
            <p>{t('privacySection3Body')}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">{t('privacySection4Head')}</h2>
            <p>{t('privacySection4Body')}</p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <p className="font-bold text-[rgb(7,81,89)]">{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>
            <p className="text-sm mt-2">{t('privacyContact')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
