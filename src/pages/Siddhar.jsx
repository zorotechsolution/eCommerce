import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { FaLeaf, FaOm, FaMedkit, FaStar, FaBookOpen, FaYinYang } from 'react-icons/fa';

const siddhars = [
  {
    name: 'Thirumoolar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Thirumoolar.jpg/220px-Thirumoolar.jpg',
    desc: 'Thirumoolar was a great Siddhar whose teachings still feel alive today. Through his Thirumandiram—3000 simple Tamil verses—he shared deep ideas about yoga, tantra, and how to live with peace and balance. Even now, his words continue to guide people looking for a calmer, more meaningful life.',
    speciality: 'Yoga & Tantra',
  },
  {
    name: 'Agathiyar (Agastya)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Agastya_sculpture.jpg/220px-Agastya_sculpture.jpg',
    desc: 'Agathiyar was a great Siddhar who lived very close to nature. He spent his time observing plants, people, and life around him, learning how everything is connected. From that simple way of living, he shared useful knowledge about healing with herbs and living a balanced life. Even today, people remember him with respect for the natural wisdom he passed on.',
    speciality: 'Siddha Medicine & Tamil Grammar',
  },
  {
    name: 'Bogar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Bogar_Siddhar.jpg/220px-Bogar_Siddhar.jpg',
    desc: 'Bogar was a fascinating Siddhar who spent his life exploring the secrets of herbs and nature. People say he understood things far beyond ordinary knowledge. One of the most talked-about stories about him is the Murugan idol at Palani, believed to be made by him using “nava pashanam,” a special mix of nine powerful herbs. Even today, his name brings curiosity and respect, as his life feels like a blend of mystery, wisdom, and ancient healing.',
    speciality: 'Alchemy & Chemistry',
  },
  {
    name: 'Patanjali',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Patanjali.jpg/220px-Patanjali.jpg',
    desc: 'Patanjali is the sage who made yoga easy to understand. He took deep knowledge and shared it as simple steps called the Yoga Sutras. He showed that yoga is not just exercise, but a way to calm the mind, stay focused, and live a peaceful, happy life.',
    speciality: 'Yoga Philosophy',
  },
];

const principles = [
  { icon: <FaLeaf className="text-green-500 text-3xl" />, title: 'Natural Healing', desc: 'A gentle way to take care of your body using herbs, natural minerals, and trusted practices—helping you feel better, stay balanced, and enjoy a healthier life, one day at a time.' },
  { icon: <FaOm className="text-orange-500 text-3xl" />, title: 'Spiritual Wisdom', desc: 'A gentle way to calm your mind and body through meditation, mantras, and breathing practices—helping you feel peaceful, balanced, and more connected every day.' },
  { icon: <FaMedkit className="text-teal-600 text-3xl" />, title: 'Siddha Medicine', desc: 'Siddha medicine has been trusted for over 5000 years, passed down from generation to generation. It’s not just about treating illness—it’s about understanding your body and caring for it in a natural, balanced way that lasts over time.' },
  { icon: <FaYinYang className="text-purple-500 text-3xl" />, title: 'Balance of Elements', desc: 'Life is shaped by five natural elements—earth, water, fire, air, and space. When these stay in balance, your body feels healthy, your mind feels calm, and everything just works the way it should.' },
  { icon: <FaBookOpen className="text-blue-500 text-3xl" />, title: 'Ancient Literature', desc: 'Long ago, wisdom wasn’t written in books—it was shared through heartfelt Tamil verses, passed from one generation to the next. These words carried deep knowledge about health, yoga, and spiritual living, and even today, they continue to guide those seeking a better, more balanced life.' },
  { icon: <FaStar className="text-yellow-500 text-3xl" />, title: 'Siddhi Powers', desc: 'With deep meditation, strong focus, and simple living, Siddhars were believed to reach a higher level of awareness and abilities—showing what a calm and peaceful mind can truly achieve.' },
];

const Siddhar = () => {
  const { t } = useLang();

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[rgb(7,81,89)] to-[rgb(12,103,104)] py-16 px-6 text-center text-white">
        <div className="text-5xl mb-4"></div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-wide">
          {t('siddhar')}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Ancient Tamil wise people who lived simple lives and gained deep knowledge through meditation and yoga, helping others live a healthy and peaceful life.
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
            Imagine a way of healing that has been trusted for generations—simple, natural, and rooted in tradition. That’s the world of Siddha and Ayurveda. Explore authentic medicines and herbal products made using age-old methods and trusted care, helping you support your health the natural way, just like it was meant to be.
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