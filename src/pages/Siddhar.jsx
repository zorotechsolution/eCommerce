import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { FaLeaf, FaOm, FaMedkit, FaStar, FaBookOpen, FaYinYang } from 'react-icons/fa';

const siddhars = [
  {
    name: 'Thirumoolar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Thirumoolar.jpg/220px-Thirumoolar.jpg',
    desc: 'One of the eighteen Siddhars who composed the Thirumandiram — a classic work of Tamil literature containing 3000 verses on yoga, tantra, and Shaiva philosophy.',
    speciality: 'Yoga & Tantra',
  },
  {
    name: 'Agathiyar (Agastya)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Agastya_sculpture.jpg/220px-Agastya_sculpture.jpg',
    desc: 'The most revered Siddhar, considered the father of Siddha medicine and Tamil language. His contributions to herbal medicine, astrology, and spiritual knowledge are unparalleled.',
    speciality: 'Siddha Medicine & Tamil Grammar',
  },
  {
    name: 'Bogar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Bogar_Siddhar.jpg/220px-Bogar_Siddhar.jpg',
    desc: 'A great Siddhar who is believed to have created the famous Murugan idol at Palani using nava pashanam (nine poisonous herbs) with rare medicinal properties.',
    speciality: 'Alchemy & Chemistry',
  },
  {
    name: 'Patanjali',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Patanjali.jpg/220px-Patanjali.jpg',
    desc: 'The author of Yoga Sutras, Patanjali is celebrated for his systematic exposition of yoga as a path to spiritual liberation and physical health.',
    speciality: 'Yoga Philosophy',
  },
];

const principles = [
  { icon: <FaLeaf className="text-green-500 text-3xl" />, title: 'Natural Healing', desc: 'Using herbs, minerals and spiritual practices to achieve complete wellness' },
  { icon: <FaOm className="text-orange-500 text-3xl" />, title: 'Spiritual Wisdom', desc: 'Integrating meditation, mantra and pranayama for mind-body balance' },
  { icon: <FaMedkit className="text-teal-600 text-3xl" />, title: 'Siddha Medicine', desc: 'One of the oldest traditional medical systems, dating back over 5000 years' },
  { icon: <FaYinYang className="text-purple-500 text-3xl" />, title: 'Balance of Elements', desc: 'The five elements — earth, water, fire, air, ether — govern all life' },
  { icon: <FaBookOpen className="text-blue-500 text-3xl" />, title: 'Ancient Literature', desc: 'Thousands of verses on health, spirituality, and yoga preserved in Tamil' },
  { icon: <FaStar className="text-yellow-500 text-3xl" />, title: 'Siddhi Powers', desc: 'Extraordinary abilities attained through disciplined spiritual practice' },
];

const Siddhar = () => {
  const { t } = useLang();

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[rgb(7,81,89)] to-[rgb(12,103,104)] py-16 px-6 text-center text-white">
        <div className="text-5xl mb-4">🕉️</div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-wide">
          {t('siddhar')}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          The ancient Tamil tradition of spiritually enlightened sages who attained higher knowledge through meditation, yoga, and disciplined living
        </p>
      </div>

      {/* What is a Siddhar */}
      <div className="px-6 md:px-16 lg:px-32 py-14">
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-bold text-[rgb(7,81,89)] uppercase tracking-wide mb-5 border-b border-gray-100 pb-4">
            What is a Siddhar?
          </h2>
          <div className="flex flex-col gap-4 text-gray-600 text-sm leading-relaxed">
            <p>
              A <strong className="text-gray-800">Siddhar</strong> is a spiritually enlightened person or sage in the ancient Tamil spiritual tradition who has attained higher knowledge, wisdom, and special abilities through meditation, yoga, and disciplined living. Siddhars are believed to have deep understanding of nature, the human body, and the universe.
            </p>
            <p>
              In Tamil culture, Siddhars are highly respected because they contributed greatly to the development of <strong className="text-[rgb(7,81,89)]">Siddha Medicine</strong>, one of the oldest traditional medical systems in India. This system uses natural herbs, minerals, and lifestyle practices to treat diseases and maintain overall health.
            </p>
            <p>
              The teachings of Siddhars emphasize the balance between <strong>body, mind, and spirit</strong> as the key to a healthy life. Siddhars were also known for their deep meditation practices and yogic powers. Through intense spiritual practice they achieved a state called <em>"Siddhi"</em>, meaning spiritual perfection or extraordinary abilities.
            </p>
            <p>
              Siddhars composed their wisdom in the form of poems and verses, preserving vast knowledge of medicine, philosophy, yoga, and alchemy in the <strong>Tamil language</strong>. These texts continue to guide practitioners of alternative medicine and spirituality across the world today.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide mb-6 text-center">
          Core Principles of Siddha Tradition
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {principles.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition flex flex-col gap-3">
              <div className="bg-gray-50 rounded-full w-14 h-14 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="font-bold text-gray-800">{p.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* The 18 Siddhars */}
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide mb-6 text-center">
          The Famous Siddhars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {siddhars.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition flex gap-5 p-5">
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = 'https://via.placeholder.com/80x80?text=Siddhar'; }}
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{s.name}</h3>
                <span className="inline-block text-xs bg-orange-50 text-orange-500 font-bold px-2 py-0.5 rounded-full mt-0.5 mb-2">
                  {s.speciality}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Siddha Medicine Banner */}
        <div className="bg-gradient-to-r from-[rgb(7,81,89)] to-teal-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3">Experience Siddha Healing Today</h3>
          <p className="text-white/80 text-sm mb-6 max-w-xl mx-auto">
            Explore our range of authentic Siddha medicines and Ayurvedic products sourced from trusted manufacturers following age-old traditions
          </p>
          <Link
            to="/collections"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition shadow-lg"
          >
            {t('collections')} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Siddhar;