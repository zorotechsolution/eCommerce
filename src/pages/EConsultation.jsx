import React, { useState } from 'react';
import { FaCalendarAlt, FaUserMd, FaVideo, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { useLang } from '../context/LangContext';

// ─── Your WhatsApp business number (include country code, no +, no spaces) ──
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "919629297111";

const TIME_SLOTS = [
  { value: "morning",   label: "Morning (10 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (2 PM – 5 PM)" },
  { value: "evening",   label: "Evening (6 PM – 8 PM)" },
];

const EConsultation = () => {
  const { t } = useLang();

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name:        "",
    phone:       "",
    email:       "",
    date:        "",
    time:        "",
    concern:     "",
    healthIssue: "",
  });

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the WhatsApp message
    const slotLabel = TIME_SLOTS.find(s => s.value === form.time)?.label || form.time;

    const message =
`
Vel Siddhar Arakkattalai  
E-Consultation Booking Request  
━━━━━━━━━━━━━━━━━━━━━━

Name:        ${form.name}  
Phone:       ${form.phone}  
Email:       ${form.email || "Not Provided"}  

Appointment Date:   ${form.date}  
Time Slot:          ${slotLabel}  

Concern:     ${form.concern || "Not Specified"}  

Health Issue:  
${form.healthIssue}

━━━━━━━━━━━━━━━━━━━━━━  
Kindly confirm the availability for this consultation.`;

    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waURL, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-5 font-sans">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 text-center max-w-md w-full">
          {/* Animated check */}
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5 border-4 border-green-100">
            <FaCheckCircle className="text-4xl text-green-500" />
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-2">{t('bookingConfirmed')}</h2>
          <p className="text-slate-500 mb-6 font-medium">{t('bookingConfirmedMsg')}</p>

          {/* WhatsApp reminder CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-green-500/20 text-sm uppercase tracking-wider"
          >
            <FaWhatsapp className="text-xl" />
            Open WhatsApp
          </a>

          <button
            onClick={() => { setSubmitted(false); setForm({ name:"",phone:"",email:"",date:"",time:"",concern:"",healthIssue:"" }); }}
            className="mt-4 block w-full text-center text-sm text-slate-400 hover:text-[rgb(7,81,89)] font-medium transition-colors"
          >
            ← Book another appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-5 md:px-10 lg:px-20 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-[rgb(7,81,89)] mb-3 uppercase tracking-wider">
            {t('eConsultTitle')}
          </h1>
          <p className="text-slate-500 font-medium">{t('eConsultSub')}</p>

          {/* WhatsApp badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-2 rounded-full">
            <FaWhatsapp className="text-[#25D366] text-base" />
            Your booking details will be sent via WhatsApp
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">

          {/* Card header */}
          <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
              <FaUserMd className="text-2xl text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{t('bookAppointment')}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{t('fillDetails')}</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#20b858] transition-colors shadow-sm"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Row 1 – Name & Phone */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                  {t('fullNameLabel')} <span className="text-rose-400">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="eg. Arjun Kumar"
                  className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                  {t('phoneLabel')} <span className="text-rose-400">*</span>
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Row 2 – Email */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                Email Address <span className="text-slate-300 font-normal">(optional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800"
              />
            </div>

            {/* Row 3 – Date & Time */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                  {t('preferredDate')} <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800"
                  />
                  <FaCalendarAlt className="absolute right-4 top-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                  {t('preferredTime')} <span className="text-rose-400">*</span>
                </label>
                <select
                  required
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800"
                >
                  <option value="">{t('selectSlot')}</option>
                  {TIME_SLOTS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4 – Health Concern category */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                Health Concern Category
              </label>
              <select
                name="concern"
                value={form.concern}
                onChange={handleChange}
                className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all font-medium text-slate-800"
              >
                <option value="">Select a category</option>
                <option>Digestive Health</option>
                <option>Skin & Hair</option>
                <option>Joint & Bone Pain</option>
                <option>Respiratory / Cold</option>
                <option>Diabetes & Blood Sugar</option>
                <option>Stress & Mental Health</option>
                <option>Women's Health</option>
                <option>Immunity Boost</option>
                <option>General Wellness</option>
                <option>Other</option>
              </select>
            </div>

            {/* Row 5 – Health issue description */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5 block">
                {t('healthIssue')} <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows="4"
                name="healthIssue"
                value={form.healthIssue}
                onChange={handleChange}
                placeholder={t('healthIssuePlaceholder')}
                className="w-full border-2 border-slate-200 bg-slate-50 focus:bg-white rounded-xl px-4 py-3 outline-none focus:border-[rgb(7,81,89)] focus:ring-4 focus:ring-[rgb(7,81,89)]/10 transition-all resize-none font-medium text-slate-800"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-green-500/20 text-base uppercase tracking-widest mt-2 hover:-translate-y-0.5"
            >
              <FaWhatsapp className="text-2xl" />
              {t('confirmBooking')} via WhatsApp
            </button>

            <p className="text-center text-xs text-slate-400 -mt-2">
              Clicking the button will open WhatsApp with your booking details pre-filled.
            </p>
          </form>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            {title: "Quick Response",   desc: "Our team responds within 30 minutes during working hours." },
            {title: "Expert Doctors",   desc: "Consult certified Siddha & Ayurvedic physicians." },
            {title: "100% Private",      desc: "Your health data is kept completely confidential." },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm text-center">
              <h3 className="font-bold text-slate-800 mb-1 text-sm">{c.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EConsultation;
