import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTruck, FaBoxOpen, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope,
  FaCheckCircle, FaClock, FaGlobe, FaShieldAlt, FaExchangeAlt,
  FaChevronDown, FaChevronUp, FaWhatsapp,
} from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";

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


const STEPS = [
  { icon: <FaBoxOpen className="text-xl" />, title: "Order Placed", desc: "Your order is confirmed and payment received." },
  { icon: <FaShieldAlt className="text-xl" />, title: "Quality Check", desc: "Products are verified and carefully packed." },
  { icon: <FaTruck className="text-xl" />, title: "Dispatched", desc: "Handed over to our logistics partner." },
  { icon: <MdTrackChanges className="text-xl" />, title: "In Transit", desc: "Tracking updates sent to your email/WhatsApp." },
  { icon: <FaCheckCircle className="text-xl" />, title: "Delivered", desc: "Package delivered to your doorstep." },
];

const FAQS = [
  {
    q: "How long does delivery take within India?",
    a: "Standard delivery takes 5–7 business days. Express delivery takes 2–3 business days. Remote/hilly areas may take 1–2 extra days. Orders placed before 2 PM are dispatched the same day (Mon–Sat).",
  },
  {
    q: "Is there free shipping?",
    a: "Yes! We offer FREE standard shipping on all orders above ₹900. This applies to selected items and is valid for delivery within India only.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to most countries worldwide. International shipping charges are calculated at checkout based on destination country and package weight. Estimated delivery is 10–15 business days after dispatch.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is dispatched, you will receive a tracking number via SMS/WhatsApp and email. You can track your package on the carrier's website or by contacting us directly.",
  },
  {
    q: "What happens if my package is damaged or lost?",
    a: "If your order arrives damaged or is lost in transit, please contact us within 48 hours of the expected delivery date. We will either reship the product or issue a full refund after investigation.",
  },
  {
    q: "Can I change my delivery address after placing the order?",
    a: "Address changes can only be made within 2 hours of placing the order, before it is dispatched. Please contact us immediately via phone or WhatsApp to request a change.",
  },
  {
    q: "Are there any items that cannot be shipped?",
    a: "Some liquid herbal preparations may be restricted by certain couriers or international customs regulations. If any item in your order cannot be shipped to your location, we will notify you and offer a full refund.",
  },
  {
    q: "How are products packed?",
    a: "All products are packed in tamper-proof, eco-friendly packaging to ensure they arrive in perfect condition. Fragile items like glass bottles are individually bubble-wrapped.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
const ShippingDelivery = () => (
  <div className="min-h-screen bg-[#f7f8f5] font-sans">

    {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
    <div className="relative bg-[rgb(7,81,89)] text-white overflow-hidden py-16 px-6">
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-56 h-56 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
          <FaTruck className="text-orange-400" /> Shipping Information
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          Shipping &amp; Delivery
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Fast, safe, and reliable delivery of Ayurvedic &amp; Siddha medicines across India and worldwide.
        </p>
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-white/50 text-xs mt-6 font-medium">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Shipping &amp; Delivery</span>
        </div>
      </div>
    </div>

    {/* ── Quick Promise Badges ─────────────────────────────────────────────── */}
    <div className="bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <FaTruck className="text-[rgb(7,81,89)] text-xl" />, label: "Free Shipping", sub: "On orders above ₹900" },
          { icon: <FaClock className="text-orange-500 text-xl" />, label: "Same Day Dispatch", sub: "Orders before 2 PM" },
          { icon: <MdTrackChanges className="text-teal-500 text-xl" />, label: "Live Tracking", sub: "Via SMS & WhatsApp" },
          { icon: <FaShieldAlt className="text-green-500 text-xl" />, label: "Safe Packaging", sub: "Tamper-proof & eco-friendly" },
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
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">How Your Order Travels</h2>
          <p className="text-slate-500 text-sm">From our warehouse to your doorstep — every step tracked.</p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
        </div>
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-0.5 bg-slate-200 z-0" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {STEPS.map((s, i) => (
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
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">Our Shipping Policies</h2>
          <p className="text-slate-500 text-sm">Everything you need to know before you order.</p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: <FaTruck className="text-[rgb(7,81,89)] text-2xl" />,
              title: "Domestic Shipping (India)",
              points: [
                "Standard delivery: 5–7 business days across India",
                "Express delivery: 2–3 business days (metro cities)",
                "Free shipping on orders above ₹900 (selected items)",
                "Orders placed before 2 PM are dispatched the same day",
                "We ship to all 28 states and 8 Union Territories",
              ],
            },
            {
              icon: <FaGlobe className="text-teal-500 text-2xl" />,
              title: "International Shipping",
              points: [
                "We ship to 50+ countries worldwide",
                "Delivery takes 10–15 business days after dispatch",
                "Customs duties and taxes are the buyer's responsibility",
                "Some herbal liquids may be restricted by customs regulations",
                "For international queries, call: +91 96292 97111",
              ],
            },
            {
              icon: <FaBoxOpen className="text-orange-500 text-2xl" />,
              title: "Packaging Standards",
              points: [
                "All items packed in eco-friendly, tamper-proof packaging",
                "Liquid & glass items are individually bubble-wrapped",
                "Invoice included inside every package",
                "Outer box is plain — no product branding for privacy",
                "Cold-chain packaging available for sensitive formulations",
              ],
            },
            {
              icon: <FaExchangeAlt className="text-green-500 text-2xl" />,
              title: "Cancellations & Address Changes",
              points: [
                "Orders can be cancelled within 2 hours of placing",
                "Address changes must be requested within 2 hours",
                "Prepaid orders: refund within 5–7 business days",
                "Once dispatched, cancellations are not possible",
                "Contact us immediately via WhatsApp for urgent changes",
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
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-sm">Common shipping questions answered for you.</p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
        </div>
        <div className="flex flex-col gap-3 max-w-3xl mx-auto">
          {FAQS.map((faq, i) => <FAQ key={i} q={faq.q} a={faq.a} />)}
        </div>
      </section>

      {/* ── Contact CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[rgb(7,81,89)] to-teal-700 rounded-3xl p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply blur-3xl opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">Still have questions?</h2>
            <p className="text-white/70 leading-relaxed max-w-md text-sm">
              Our team is available Monday to Saturday, 10 AM – 7 PM IST. Reach us via phone, email, or WhatsApp for instant support.
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
              href="https://wa.me/919629297111"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold px-7 py-3.5 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg text-sm"
            >
              <FaWhatsapp className="text-lg" /> Chat on WhatsApp
            </a>
            <Link
              to="/e-consultation"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg text-sm"
            >
              Book E-Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  </div>
);

export default ShippingDelivery;
