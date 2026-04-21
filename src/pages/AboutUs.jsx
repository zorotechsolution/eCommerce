import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import {
  FaUserMd, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle,
  FaLeaf, FaHospital, FaStethoscope, FaClock, FaAmbulance,
  FaWhatsapp, FaEnvelope, FaAward, FaHeartbeat, FaShieldAlt,
  FaStar, FaBone, FaBrain, FaAllergies,
} from 'react-icons/fa';
import { MdVerified, MdLocalHospital } from 'react-icons/md';
import { GiHerbsBundle, GiMedicines } from 'react-icons/gi';

// ── Reusable Service Card ─────────────────────────────────────────────────────
const ServiceCard = ({ icon, title, desc, color }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-4">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ── Stat Box ──────────────────────────────────────────────────────────────────
const StatBox = ({ value, label, icon }) => (
  <div className="flex flex-col items-center text-center px-4">
    <div className="text-3xl font-black text-[rgb(7,81,89)]">{value}</div>
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{label}</div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const AboutUs = () => {
  const { t } = useLang();

  const SERVICES = [
    {
      icon: <FaBone className="text-2xl text-blue-600" />,
      title: t('jointPainTitle'),
      desc: t('jointPainDesc'),
      color: 'bg-blue-50',
    },
    {
      icon: <FaBrain className="text-2xl text-purple-600" />,
      title: t('nerveDisTitle'),
      desc: t('nerveDisDesc'),
      color: 'bg-purple-50',
    },
    {
      icon: <FaAllergies className="text-2xl text-rose-600" />,
      title: t('skinDisTitle'),
      desc: t('skinDisDesc'),
      color: 'bg-rose-50',
    },
    {
      icon: <GiMedicines className="text-2xl text-orange-600" />,
      title: t('pilesTitle'),
      desc: t('pilesDesc'),
      color: 'bg-orange-50',
    },
    {
      icon: <FaHeartbeat className="text-2xl text-red-600" />,
      title: t('chronicTitle'),
      desc: t('chronicDesc'),
      color: 'bg-red-50',
    },
    {
      icon: <GiHerbsBundle className="text-2xl text-green-600" />,
      title: t('herbalFormTitle'),
      desc: t('herbalFormDesc'),
      color: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans">

      {/* ── Hospital Hero Banner ──────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-r from-[rgb(7,81,89)] to-teal-600 text-white overflow-hidden">
        {/* Medical cross pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0h10v15h15v10H25v15H15V25H0V15h15z' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-15 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-16 flex flex-col md:flex-row items-center gap-10">
          {/* Left text */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
              <MdLocalHospital className="text-orange-400" /> {t('siddhaClinic')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-3">
              {t('clinicTitle')}
            </h1>
            <p className="text-white/70 text-base md:text-lg font-semibold tracking-wider uppercase mb-6">
              {t('clinicSubTitle')}
            </p>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mb-8">
              {t('clinicSlogan')}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href={`tel:${t('contactNumber')}`}
                className="flex items-center gap-2 bg-white text-[rgb(7,81,89)] font-bold px-6 py-3 rounded-full text-sm hover:bg-orange-50 transition-all shadow-lg hover:-translate-y-0.5"
              >
                <FaPhoneAlt /> {t('callNow')}
              </a>
              <a
                href="https://wa.me/919629297111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#20b858] transition-all shadow-lg hover:-translate-y-0.5"
              >
                <FaWhatsapp className="text-lg" /> {t('whatsapp')}
              </a>
            </div>
          </div>

          {/* Right — Doctor info card */}
          <div className="shrink-0 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
              <div className="w-28 h-28 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-5 shadow-inner">
                <FaUserMd className="text-6xl text-white" />
              </div>
              <div className="inline-flex items-center gap-1 bg-green-400/20 border border-green-400/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
                <MdVerified /> {t('verifiedSpecialist')}
              </div>
              <h3 className="text-2xl font-black text-white mb-1">{t('doctorName')}</h3>
              <p className="text-orange-300 text-xs font-bold uppercase tracking-widest mb-3">{t('doctorQual')}</p>
              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2">
                <p className="text-white/80 text-sm font-semibold">{t('doctorRole')}</p>
              </div>
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-orange-400 text-sm" />
                ))}
                <span className="text-white/60 text-xs ml-2">{t('ratingValue')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Bar ────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 md:px-10 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-slate-100">
            <StatBox value="7" label={t('genOfSiddhar')} icon={<FaLeaf />} />
            <StatBox value="12K+" label={t('patientsTreated')} icon={<FaHeartbeat />} />
            <StatBox value="7 Days" label={t('reliefGuaranteed')} icon={<FaCheckCircle />} />
            <StatBox value="200+" label={t('herbalFormulas')} icon={<GiHerbsBundle />} />
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-14 flex flex-col gap-14">

        {/* ── About the Clinic ──────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 text-[rgb(7,81,89)] bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
              <FaHospital /> {t('aboutTheClinic')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-snug mb-5">
              {t('healingAncient').split(' ').slice(0, 2).join(' ')}<br />
              <span className="text-[rgb(7,81,89)]">{t('healingAncient').split(' ').slice(2).join(' ')}</span>
            </h2>
            <div className="w-12 h-1 bg-orange-500 rounded-full mb-6" />
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{t('clinicDesc1')}</p>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">{t('clinicDesc2')}</p>
            {/* Highlight pills */}
            <div className="flex flex-wrap gap-3">
              {[t('rootCause'), t('noSideEffects'), t('traditionalHerbs'), t('certifiedPhysician')].map((tag, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-teal-50 border border-teal-100 text-[rgb(7,81,89)] text-xs font-bold px-3 py-1.5 rounded-full">
                  <FaCheckCircle className="text-teal-500" /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            {/* Treatment promise */}
            <div className="bg-[rgb(7,81,89)] text-white rounded-2xl p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <FaStethoscope className="text-white text-lg" />
                  </div>
                  <h3 className="font-black text-lg">{t('treatmentTimeframe')}</h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/85">
                      <FaCheckCircle className="text-green-400 shrink-0 text-xs" />
                      {t(`treatmentList${item}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-white/20 text-xs text-white/60 italic">
                  ✦ {t('treatmentDesc')}
                </div>
              </div>
            </div>

            {/* Working hours */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <FaClock className="text-amber-500 text-xl" />
              </div>
              <div>
                <h4 className="font-black text-slate-800 mb-3">{t('clinicTimings')}</h4>
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between gap-8">
                    <span className="text-slate-500">{t('monSat')}</span>
                    <span className="font-bold text-slate-800">9:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-slate-500">{t('sun')}</span>
                    <span className="font-bold text-red-500">{t('closed')}</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-slate-500">{t('emergency')}</span>
                    <span className="font-bold text-green-600">{t('whatsapp247')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Medical Services ──────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[rgb(7,81,89)] bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
              <FaStethoscope /> {t('conditionsWeTreat')}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{t('conditionsWeTreat')}</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">{t('conditionsSub')}</p>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
        <section className="bg-white border border-slate-100 rounded-3xl p-10 md:p-14 shadow-sm">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{t('whyChooseClinic')}</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaShieldAlt className="text-2xl text-[rgb(7,81,89)]" />, title: t('safeNatural'), desc: t('safeNaturalDesc'), bg: 'bg-teal-50' },
              { icon: <FaAward className="text-2xl text-orange-500" />, title: t('sevenGens'), desc: t('sevenGensDesc'), bg: 'bg-orange-50' },
              { icon: <FaHeartbeat className="text-2xl text-red-500" />, title: t('rootCure'), desc: t('rootCureDesc'), bg: 'bg-red-50' },
              { icon: <FaUserMd className="text-2xl text-blue-500" />, title: t('expertDoc'), desc: t('expertDocDesc'), bg: 'bg-blue-50' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-1`}>
                  {item.icon}
                </div>
                <h4 className="font-black text-slate-800 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact Section ────────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[rgb(7,81,89)] bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
              <FaAmbulance /> {t('reachUs')}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{t('contactInfo')}</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Phone */}
            <a href={`tel:${t('contactNumber')}`}
              className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all">
                <FaPhoneAlt className="text-2xl text-blue-500" />
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('contactLabel')}</h4>
              <p className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">+91 {t('contactNumber')}</p>
              <span className="mt-2 text-xs text-blue-500 font-semibold border border-blue-100 bg-blue-50 px-3 py-1 rounded-full">{t('tapToCall')}</span>
            </a>

            {/* Email */}
            <a href="mailto:velsiddhararakkattalai@gmail.com"
              className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-100 group-hover:scale-110 transition-all">
                <FaEnvelope className="text-2xl text-orange-500" />
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('email')}</h4>
              <p className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors break-all">{t('emailId')}</p>
              <span className="mt-2 text-xs text-orange-500 font-semibold border border-orange-100 bg-orange-50 px-3 py-1 rounded-full">{t('sendEmail')}</span>
            </a>

            {/* Address */}
            <div className="group bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-4 group-hover:bg-rose-100 group-hover:scale-110 transition-all">
                <FaMapMarkerAlt className="text-2xl text-rose-500" />
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('addressLabel')}</h4>
              <div className="text-sm text-slate-700 font-medium leading-relaxed">
                <p>{t('addressLine1')}</p>
                <p>{t('addressLine2')}</p>
                <p className="font-black text-slate-900 mt-1 uppercase text-xs tracking-wider">{t('addressLine3')}</p>
              </div>
              <span className="mt-2 text-xs text-rose-500 font-semibold border border-rose-100 bg-rose-50 px-3 py-1 rounded-full">{t('getDirections')}</span>
            </div>

          </div>
        </section>

        {/* ── Google Map Section ──────────────────────────────────────────────── */}
        <section>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[rgb(7,81,89)] bg-teal-50 border border-teal-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
              <FaMapMarkerAlt /> {t('findUsMap')}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">{t('ourLoc')}</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full mt-3" />
          </div>
          <div className="w-full h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group">
             <iframe
              title="Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.36423456789!2d77.4300000!3d8.1800000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f122822d1003%3A0x7d07936a9b4f2c0!2sAnnan%20Bus%20Stand%2C%20Nagercoil!5e0!3m2!1sen!2sin!4v1713690000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%] contrast-[110%] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-slate-200 px-6 py-4 rounded-2xl shadow-xl pointer-events-none hidden md:block animate-fade-in">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('clinicAddr')}</p>
                <p className="text-sm font-bold text-slate-800">{t('addressLine2')}, {t('addressLine3')}</p>
                <p className="text-xs text-slate-500">Tamil Nadu - 629001</p>
            </div>
          </div>
        </section>

        {/* ── Appointment CTA ───────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-br from-[rgb(7,81,89)] to-teal-700 rounded-3xl p-10 md:p-14 text-white overflow-hidden shadow-2xl">
          {/* Cross pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0h10v15h15v10H25v15H15V25H0V15h15z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
                <FaStethoscope className="text-orange-400" /> {t('bookAppointment')}
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-2">{t('startHealing')}</h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                {t('healingExp')}
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="https://wa.me/919487187384"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg text-sm"
              >
                <FaWhatsapp className="text-lg" /> {t('chatOnWhatsapp')}
              </a>
              <Link
                to="/e-consultation"
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg text-sm"
              >
                <FaStethoscope /> {t('bookEConsult')}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
