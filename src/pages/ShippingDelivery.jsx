import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTruck, FaBoxOpen, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaCheckCircle, FaClock, FaGlobe, FaShieldAlt, FaExchangeAlt,
  FaChevronDown, FaChevronUp, FaWhatsapp,
} from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";
import { useLang } from "../context/LangContext";

// ─── Accordion FAQ ─────────────────────────────────────────────────────────────
const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-[rgb(7,81,89)]" : "border-slate-200"}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-800 text-sm pr-4">{q}</span>
        {open
          ? <FaChevronUp className="shrink-0 text-[rgb(7,81,89)] text-xs" />
          : <FaChevronDown className="shrink-0 text-slate-400 text-xs" />}
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
};


const STEPS = (t) => [
  { icon: <FaBoxOpen className="text-xl" />, title: t('orderPlacedStep'), desc: t('orderPlacedDesc') },
  { icon: <FaShieldAlt className="text-xl" />, title: t('qualityCheckStep'), desc: t('qualityCheckDesc') },
  { icon: <FaTruck className="text-xl" />, title: t('dispatchedStep'), desc: t('dispatchedDesc') },
  { icon: <MdTrackChanges className="text-xl" />, title: t('inTransitStep'), desc: t('inTransitDesc') },
  { icon: <FaCheckCircle className="text-xl" />, title: t('deliveredStep'), desc: t('deliveredDesc') },
];

const FAQS = (t) => [
  {
    q: t('faqQ1'),
    a: t('faqA1'),
  },
  {
    q: t('faqQ2'),
    a: t('faqA2'),
  },
  {
    q: t('faqQ3'),
    a: t('faqA3'),
  },
  {
    q: t('faqQ4'),
    a: t('faqA4'),
  },
  {
    q: t('faqQ5'),
    a: t('faqA5'),
  },
  {
    q: t('faqQ6'),
    a: t('faqA6'),
  },
  {
    q: t('faqQ7'),
    a: t('faqA7'),
  },
  {
    q: t('faqQ8'),
    a: t('faqA8'),
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
const ShippingDelivery = () => {
  const { t } = useLang();
  return (
  <div className="min-h-screen bg-[#f7f8f5] font-sans">

    {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
    <div className="relative bg-[rgb(7,81,89)] text-white overflow-hidden py-16 px-6">
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-56 h-56 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
          <FaTruck className="text-orange-400" /> {t('shippingInfo')}
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          {t('shippingDelivery')}
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          {t('shippingHeroTag')}
        </p>
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-white/50 text-xs mt-6 font-medium">
          <Link to="/" className="hover:text-white transition-colors">{t('home')}</Link>
          <span>/</span>
          <span className="text-white">{t('shippingDelivery')}</span>
        </div>
      </div>
    </div>

    {/* ── Quick Promise Badges ─────────────────────────────────────────────── */}
    <div className="bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <FaTruck className="text-[rgb(7,81,89)] text-xl" />, label: t('freeShipping'), sub: t('freeShippingAbove900') },
          { icon: <FaClock className="text-orange-500 text-xl" />, label: t('sameDayDispatch'), sub: t('ordersBefore2PM') },
          { icon: <MdTrackChanges className="text-teal-500 text-xl" />, label: t('liveTracking'), sub: t('viaSMSWhatsapp') },
          { icon: <FaShieldAlt className="text-green-500 text-xl" />, label: t('safePackaging'), sub: t('tamperProofEco') },
        ].map((b, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
              {b.icon}
            </div>
            <div>
              <p className="text-xs font-black text-slate-800">{b.label}</p>
              <p className="text-[11px] text-slate-400">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="max-w-6xl mx-auto px-5 md:px-10 py-14 flex flex-col gap-14">


      {/* ── Delivery Process Timeline ─────────────────────────────────────────── */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{t('howOrderTravels')}</h2>
          <p className="text-slate-500 text-sm">{t('orderJourneySub')}</p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
        </div>
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-0.5 bg-slate-200 z-0" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {STEPS(t).map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg shrink-0 ${
                  i === 4 ? "bg-green-500" : "bg-[rgb(7,81,89)]"
                }`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm mb-1">{s.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Policies Grid ─────────────────────────────────────────────────── */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{t('ourShippingPolicies')}</h2>
          <p className="text-slate-500 text-sm">{t('shippingPoliciesSub')}</p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: <FaTruck className="text-[rgb(7,81,89)] text-2xl" />,
              title: t('domesticShippingTitle'),
              points: [
                t('standardDelivery'),
                t('expressDelivery'),
                t('freeShippingAbove900'),
                t('dispatchSameDay'),
                t('shipAllStates'),
              ],
            },
            {
              icon: <FaGlobe className="text-teal-500 text-2xl" />,
              title: t('intlShippingTitle'),
              points: [
                t('shipGlobal'),
                t('intlDeliveryTime'),
                t('dutyResponsibility'),
                t('herbalRestricted'),
                t('intlQueries'),
              ],
            },
            {
              icon: <FaBoxOpen className="text-orange-500 text-2xl" />,
              title: t('pkgStandardsTitle'),
              points: [
                t('ecoTamperPkg'),
                t('bubbleWrapPkg'),
                t('invoiceIncluded'),
                t('plainBoxPkg'),
                t('coldChainPkg'),
              ],
            },
            {
              icon: <FaExchangeAlt className="text-green-500 text-2xl" />,
              title: t('cancelAddressTitle'),
              points: [
                t('cancelWithin2h'),
                t('addrWithin2h'),
                t('prepaidRefund'),
                t('dispatchedNoCancel'),
                t('whatsappUrgent'),
              ],
            },
          ].map((block, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {block.icon}
                </div>
                <h3 className="font-black text-slate-800 text-base">{block.title}</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {block.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <FaCheckCircle className="text-[rgb(7,81,89)] text-xs mt-0.5 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────────── */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{t('faqTitle')}</h2>
          <p className="text-slate-500 text-sm">{t('faqSub')}</p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
        </div>
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {FAQS(t).map((faq, i) => <FAQ key={i} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[rgb(7,81,89)] to-teal-700 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">{t('stillHaveQuestions')}</h2>
            <p className="text-white/70 leading-relaxed max-w-md text-sm">
              {t('supportTeamHours')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-5 text-sm">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-orange-400 shrink-0" />
                <span>(044) 4859 9296</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-orange-400 shrink-0" />
                <span>sales@velsiddhararakkattalai.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-400 shrink-0" />
                <span>Anna Nagar East, Chennai – 600 102</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <a
              href="https://wa.me/919487187384"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold px-7 py-3.5 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg text-sm"
            >
              <FaWhatsapp className="text-lg" /> {t('chatOnWhatsapp')}
            </a>
            <Link
              to="/e-consultation"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg text-sm"
            >
              {t('bookEConsult')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  </div>
);
}

export default ShippingDelivery;
