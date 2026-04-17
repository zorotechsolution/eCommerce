import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import API from "../utils/axiosConfig";
import { useLang } from "../context/LangContext";
import StarIcon from "@mui/icons-material/Star";
import {
  FaCartPlus, FaChevronRight, FaLeaf, FaArrowLeft,
  FaShieldAlt, FaBrain, FaFire, FaBalanceScale, FaSyringe,
  FaUtensils, FaBath, FaSmile, FaCut, FaGem, FaPills,
  FaWind, FaThermometerHalf, FaTint,
} from "react-icons/fa";

// ─── Icon Map ────────────────────────────────────────────────────────────────


// ─── Category Data ────────────────────────────────────────────────────────────
const categoryData = {
  "cough-and-cold": {
    titleEn: "Cough and Cold", titleTa: "இருமல் மற்றும் சளி",
    group: "group1",
    bannerEn: "Natural Ayurvedic remedies to soothe cough, congestion, and cold symptoms",
    bannerTa: "இருமல், மூக்கடைப்பு மற்றும் சளி அறிகுறிகளை தணிக்கும் இயற்கை ஆயுர்வேத மருந்துகள்",
    banner: "https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Cough and cold are among the most common seasonal ailments. Ayurveda has a rich tradition of using herbal combinations like Tulsi, Ginger, Pippali, and Vasaka to relieve respiratory discomfort, reduce mucus, and strengthen the immune system against seasonal infections.",
    aboutTa: "இருமல் மற்றும் சளி பொதுவான பருவகால நோய்களில் ஒன்றாகும். துளசி, இஞ்சி, பிப்பலி மற்றும் வாசகா போன்ற மூலிகை கலவைகளை பயன்படுத்தி சுவாச அசௌகரியத்தை குறைத்து, நோய் எதிர்ப்பு சக்தியை மேம்படுத்துகின்றன.",
    benefitsEn: ["Clears nasal and chest congestion naturally", "Reduces inflammation in the respiratory tract", "Boosts immunity against seasonal infections", "Soothes irritated throat and reduces cough"],
    benefitsTa: ["மூக்கு மற்றும் நெஞ்சு அடைப்பை இயற்கையாக சுத்தப்படுத்துகிறது", "சுவாச மண்டலத்தில் வீக்கத்தை குறைக்கிறது", "பருவகால தொற்றுகளுக்கு எதிர்ப்பு சக்தியை அதிகரிக்கிறது", "கரகரப்பான தொண்டையை சமாதானப்படுத்துகிறது"],
    tipsEn: ["Add a few drops of Tulsi ark to warm water and drink twice daily.", "Steam inhalation with eucalyptus oil provides quick relief.", "Consume warm soups with ginger and pepper to ease congestion."],
    tipsTa: ["சிறிது துளசி அர்க்கை சூடான நீரில் சேர்த்து தினமும் இரண்டு முறை குடிக்கவும்.", "யூகாலிப்டஸ் எண்ணெயுடன் நீராவி சுவாசிக்கவும்.", "இஞ்சி மற்றும் மிளகுடன் சூடான சூப்பை குடிக்கவும்."],
  },
  "fever": {
    titleEn: "Fever", titleTa: "காய்ச்சல்",
    group: "group1",
    bannerEn: "Classical Ayurvedic formulations to reduce fever and restore balance",
    bannerTa: "காய்ச்சலை குறைக்கவும் சமநிலையை மீட்கவும் கிளாசிக்கல் ஆயுர்வேத மருந்துகள்",
    banner: "https://images.pexels.com/photos/8329969/pexels-photo-8329969.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "In Ayurveda, fever (Jwara) is considered a sign of the body fighting toxins. Classical formulations like Sudarshana Churna, Guduchi (Giloy), and Trikatu are used to clear ama (toxins), reduce temperature naturally, and restore dosha balance.",
    aboutTa: "ஆயுர்வேதத்தில், காய்ச்சல் உடல் நஞ்சுகளை எதிர்க்கும் அறிகுறியாக கருதப்படுகிறது. சுதர்சன சூரணம், குடூசி மற்றும் திரிகடு ஆகியவை வெப்பநிலையை குறைத்து, தோஷ சமன்பாட்டை மீட்டெடுக்கும்.",
    benefitsEn: ["Reduces body temperature through natural antipyretic herbs", "Eliminates toxins (ama) from the system", "Restores energy and vitality after fever", "Strengthens immune response"],
    benefitsTa: ["இயற்கை மூலிகைகள் மூலம் உடல் வெப்பநிலையை குறைக்கிறது", "அமா (நஞ்சுகள்) அகற்றுகிறது", "காய்ச்சலுக்கு பிறகு சக்தியை மீட்டெடுக்கிறது", "நோய் எதிர்ப்பு சக்தியை வலுப்படுத்துகிறது"],
    tipsEn: ["Giloy (Guduchi) juice with honey is a classic Ayurvedic fever remedy.", "Stay well hydrated with warm water, herbal teas, and light soups.", "Avoid heavy, oily foods during fever — eat light, easily digestible meals."],
    tipsTa: ["தேனுடன் குடூசி சாறு ஒரு கிளாசிக்கல் ஆயுர்வேத காய்ச்சல் மருந்து.", "சூடான நீர், மூலிகை தேயிலைகள் மற்றும் லேசான சூப்புகளால் நீரேற்றமாக இருங்கள்.", "காய்ச்சலின் போது கனரகமான, எண்ணெய் உணவுகளை தவிர்க்கவும்."],
  },
  "migraine": {
    titleEn: "Migraine", titleTa: "ஒற்றைத் தலைவலி",
    group: "group1",
    bannerEn: "Siddha & Ayurvedic approaches to managing and preventing migraines",
    bannerTa: "ஒற்றைத் தலைவலியை நிர்வகிக்க சித்த மற்றும் ஆயுர்வேத அணுகுமுறைகள்",
    banner: "https://images.pexels.com/photos/5938244/pexels-photo-5938244.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Migraine is classified in Ayurveda under Ardhavabhedaka — a Vata-Pitta disorder. Treatments focus on herbs like Brahmi, Shankhpushpi, Jatamansi, and therapeutic oils to calm the nervous system and prevent recurring episodes.",
    aboutTa: "ஒற்றைத் தலைவலி ஆயுர்வேதத்தில் அர்தவபேதக என வகைப்படுத்தப்படுகிறது. பிரம்மி, சங்கபுஷ்பி, ஜடாமன்சி போன்ற மூலிகைகள் நரம்பு மண்டலத்தை அமைதிப்படுத்தும்.",
    benefitsEn: ["Reduces frequency and intensity of migraine attacks", "Calms an overactive nervous system", "Reduces Pitta-induced inflammation in the head", "Improves sleep quality"],
    benefitsTa: ["ஒற்றைத் தலைவலி தாக்குதல்களின் அதிர்வெண்ணை குறைக்கிறது", "அதிக சுறுசுறுப்பான நரம்பு மண்டலத்தை அமைதிப்படுத்துகிறது", "தலையில் வீக்கத்தை குறைக்கிறது", "தூக்கத்தின் தரத்தை மேம்படுத்துகிறது"],
    tipsEn: ["Apply Brahmi or Bhringraj oil to the scalp and massage gently before sleep.", "Avoid triggers: excess heat, spicy food, screen time, and irregular meals.", "Nasya therapy (nasal oil drops) is highly effective for chronic migraines."],
    tipsTa: ["தூக்கத்திற்கு முன் பிரம்மி அல்லது பிரிங்கராஜ் எண்ணெயை தலையில் தேய்க்கவும்.", "அதிக வெப்பம், காரமான உணவு, திரை நேரம் ஆகியவற்றை தவிர்க்கவும்.", "நஸ்ய சிகிச்சை (மூக்கு எண்ணெய்) நாட்பட்ட ஒற்றைத் தலைவலிக்கு மிகவும் பயனுள்ளது."],
  },
  "sinus": {
    titleEn: "Sinus", titleTa: "சைனஸ்",
    group: "group1",
    bannerEn: "Herbal solutions for sinusitis, congestion, and nasal inflammation",
    bannerTa: "சைனசிடிஸ், மூக்கடைப்பு மற்றும் மூக்கு வீக்கத்திற்கான மூலிகை தீர்வுகள்",
    banner: "https://images.pexels.com/photos/7615621/pexels-photo-7615621.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Sinusitis in Ayurveda is a Kapha and Vata disorder. Herbs like Haridra (Turmeric), Pippali, Trikatu, and Anu Tailam are used to clear blocked sinuses, reduce inflammation, and restore healthy nasal passages.",
    aboutTa: "சைனசிடிஸ் ஆயுர்வேதத்தில் கபா மற்றும் வாதா கோளாறாகும். மஞ்சள், பிப்பலி, திரிகடு மற்றும் அணு தைலம் ஆகியவை அடைத்த சைனஸை சுத்தம் செய்யவும், வீக்கத்தை குறைக்கவும் பயன்படுகின்றன.",
    benefitsEn: ["Clears blocked sinus passages and reduces pressure", "Reduces nasal inflammation and polyps", "Prevents recurring sinus infections", "Improves breathing and reduces headaches"],
    benefitsTa: ["அடைத்த சைனஸ் பாதைகளை சுத்தம் செய்கிறது", "மூக்கு வீக்கம் மற்றும் பாலிப்ஸை குறைக்கிறது", "மீண்டும் வரும் சைனஸ் தொற்றுகளை தடுக்கிறது", "சுவாசத்தை மேம்படுத்துகிறது"],
    tipsEn: ["Steam inhalation with Eucalyptus or Ajwain is highly effective for sinus relief.", "Apply warm sesame oil in the nostrils (Nasya) daily to prevent dry sinus.", "Avoid cold beverages, dairy at night, and exposure to dust."],
    tipsTa: ["யூகாலிப்டஸ் அல்லது அஜ்வைன் உடன் நீராவி சுவாசிக்கவும்.", "நஸ்ய முறையில் மூக்கில் வெதுவெதுப்பான எள்ளெண்ணெய் இடவும்.", "குளிர் பானங்கள், இரவு வேளையில் பால் பொருட்கள் மற்றும் தூசியை தவிர்க்கவும்."],
  },
  "body-care": {
    titleEn: "Body Care", titleTa: "உடல் பராமரிப்பு",
    group: "group2",
    bannerEn: "Nourish and protect your body with authentic Ayurvedic formulas",
    bannerTa: "நம்பகமான ஆயுர்வேத சூத்திரங்களால் உங்கள் உடலை ஊட்டுங்கள்",
    banner: "https://images.pexels.com/photos/4041001/pexels-photo-4041001.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Body care in Ayurveda goes beyond surface cleansing. Abhyanga (oil massage), herbal scrubs (Ubtan), and medicated soaps using herbs like Neem, Sandalwood, and Turmeric detoxify skin, improve circulation, and promote deep hydration.",
    aboutTa: "ஆயுர்வேதத்தில் உடல் பராமரிப்பு மேல் மட்ட சுத்தத்திற்கு அப்பால் செல்கிறது. அபியங்கா, மூலிகை ஸ்க்ரப் மற்றும் வேப்பம், சந்தனம் மற்றும் மஞ்சள் போன்ற மருந்திட்ட சோப்புகள் சருமத்தை நஞ்சு நீக்கி, ஆழமான நீரேற்றம் செய்கின்றன.",
    benefitsEn: ["Deep hydration and nourishment for all skin types", "Detoxifies skin and improves circulation", "Natural fragrance from herbs and essential oils", "Protects against environmental damage and dryness"],
    benefitsTa: ["அனைத்து சரும வகைகளுக்கும் ஆழமான நீரேற்றம்", "சரும நஞ்சு நீக்கல் மற்றும் இரத்த ஓட்டம் மேம்படுகிறது", "மூலிகைகள் மற்றும் அத்தியாவசிய எண்ணெய்களின் இயற்கை வாசனை", "சுற்றுச்சூழல் சேதம் மற்றும் வறட்சிக்கு எதிராக பாதுகாப்பு"],
    tipsEn: ["Perform Abhyanga (self oil massage) with warm sesame oil before your bath.", "Use herbal ubtan as a body scrub twice a week.", "Apply coconut oil mixed with sandalwood immediately after bathing."],
    tipsTa: ["குளிக்கும் முன் வெதுவெதுப்பான எள்ளெண்ணெயால் அபியங்கா செய்யுங்கள்.", "வாரம் இரு முறை மூலிகை உப்த்தன் ஸ்க்ரப் பயன்படுத்துங்கள்.", "குளித்த உடனே சந்தனம் கலந்த தேங்காய் எண்ணெய் தடவுங்கள்."],
  },
  "face-care": {
    titleEn: "Face Care", titleTa: "சரும பராமரிப்பு",
    group: "group2",
    bannerEn: "Radiant, glowing skin the natural Siddha way",
    bannerTa: "இயற்கையான சித்த வழியில் பொலிவான சருமம்",
    banner: "https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Siddha medicine has centuries of wisdom for skin health using Saffron (Kumkuma), Sandalwood, Rose water, Turmeric, and Neem. These formulations treat acne, pigmentation, dullness, and dryness without harsh chemicals.",
    aboutTa: "சித்த மருத்துவம் சரும ஆரோக்கியத்திற்கு குங்குமப்பூ, சந்தனம், ரோஸ் வாட்டர், மஞ்சள் மற்றும் வேப்பம் ஆகியவற்றை பயன்படுத்தும் நூற்றாண்டு கால ஞானத்தை கொண்டுள்ளது.",
    benefitsEn: ["Brightens and evens skin tone naturally", "Reduces acne, blemishes, and pigmentation", "Deep cleanses without stripping natural oils", "Reduces signs of ageing with antioxidant-rich herbs"],
    benefitsTa: ["சரும நிறத்தை இயற்கையாக பொலிவூட்டுகிறது", "முகப்பரு, கரும்புள்ளிகள் மற்றும் நிற ஏற்றத்தாழ்வை குறைக்கிறது", "இயற்கை எண்ணெய்களை நீக்காமல் ஆழமாக சுத்தம் செய்கிறது", "ஆக்ஸிஜனேற்ற மூலிகைகளால் வயோதிக அறிகுறிகளை குறைக்கிறது"],
    tipsEn: ["Use Kumkumadi oil as a serum on damp skin for visible glow in 2–4 weeks.", "Apply rose water toner after cleansing to balance skin pH.", "A neem and turmeric face mask twice a week keeps acne and oiliness in check."],
    tipsTa: ["குமகுமடி எண்ணெயை ஈர சரும்மில் சீரம் போல் பயன்படுத்துங்கள்.", "கழுவிய பிறகு ரோஸ் வாட்டர் டோனர் பயன்படுத்துங்கள்.", "வாரம் இரு முறை வேப்ப மற்றும் மஞ்சள் முக பேக் பயன்படுத்துங்கள்."],
  },
  "hair-oil": {
    titleEn: "Ayurvedic Hair Oil", titleTa: "ஆயுர்வேத முடி எண்ணெய்",
    group: "group2",
    bannerEn: "Classical Ayurvedic oils for strong, thick, and lustrous hair",
    bannerTa: "வலிமையான, அடர்த்தியான மற்றும் பளபளப்பான முடிக்கு கிளாசிக்கல் ஆயுர்வேத எண்ணெய்கள்",
    banner: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Hair oiling (Shiro Abhyanga) is one of the most important Ayurvedic daily rituals. Medicated oils like Nilibhringadi, Brahmi, and Bhringraj deeply nourish the scalp, prevent hairfall, and promote thick, lustrous hair growth.",
    aboutTa: "முடி எண்ணெய் தேய்த்தல் (சிரோ அபியங்கா) மிக முக்கியமான ஆயுர்வேத தினசரி சடங்குகளில் ஒன்றாகும். நீலிபிரிங்காடி, பிரம்மி மற்றும் பிரிங்கராஜ் போன்ற மருந்திட்ட எண்ணெய்கள் தலைமுடியை ஆழமாக ஊட்டுகின்றன.",
    benefitsEn: ["Prevents hairfall and strengthens hair roots", "Prevents dandruff, scalp dryness, and itchiness", "Promotes new hair growth and improves texture", "Delays premature greying with natural pigmentation herbs"],
    benefitsTa: ["முடி உதிர்வை தடுத்து முடி வேர்களை வலுப்படுத்துகிறது", "பொடுகு, தலைப்பகுதி வறட்சி மற்றும் அரிப்பை தடுக்கிறது", "புதிய முடி வளர்ச்சியை ஊக்குவிக்கிறது", "இயற்கை நிற மூலிகைகளால் நரை ஆகுவதை தாமதப்படுத்துகிறது"],
    tipsEn: ["Heat the oil slightly and massage into scalp with fingertips in circular motions.", "Leave the oil for at least 45 minutes or overnight for best results.", "Wash with a mild herbal shampoo — avoid hot water as it strips nourishment."],
    tipsTa: ["எண்ணெயை சிறிது சூடாக்கி, விரல் நுனிகளால் வட்டமாக தலையில் மசாஜ் செய்யுங்கள்.", "சிறந்த முடிவுகளுக்கு குறைந்தது 45 நிமிடம் அல்லது இரவு முழுவதும் வைத்திருங்கள்.", "லேசான மூலிகை ஷாம்பூவால் கழுவுங்கள் — சூடான தண்ணீர் ஊட்டத்தை நீக்கும்."],
  },
  "skin-beauty": {
    titleEn: "Skin & Beauty Care", titleTa: "சரும & அழகு பராமரிப்பு",
    group: "group2",
    bannerEn: "Ancient Siddha beauty secrets for timeless, radiant skin",
    bannerTa: "காலத்தால் அழியாத, ஒளிரும் சருமத்திற்கான பழங்கால சித்த அழகு ரகசியங்கள்",
    banner: "https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "The Siddha tradition includes Kayakalpa Chikitsa dedicated to rejuvenation and beauty. Formulations using Kesar, Nagakesar, Rose, Jasmine, and Sandalwood maintain youthful, glowing skin.",
    aboutTa: "சித்த மரபில் கயகல்பா சிகிச்சை என்ற மறுபடையெடுப்பு மற்றும் அழகுக்கான கிளை உள்ளது. குங்குமப்பூ, நாககேசரம், ரோஜா, மல்லிகை மற்றும் சந்தனம் பயன்படுத்தும் சூத்திரங்கள் இளமையான, ஒளிரும் சருமத்தை பராமரிக்கின்றன.",
    benefitsEn: ["Rejuvenates and revitalises dull, tired skin", "Reduces wrinkles, fine lines, and dark circles", "Natural fragrance and glow from botanical extracts", "Balances all three doshas for holistic beauty"],
    benefitsTa: ["மந்தமான, சோர்வடைந்த சருமத்தை புத்துணர்வூட்டுகிறது", "சுருக்கங்கள், மெல்லிய கோடுகள் மற்றும் கருவளையங்களை குறைக்கிறது", "தாவர சாறுகளிலிருந்து இயற்கை வாசனை மற்றும் பொலிவு", "முழுமையான அழகிற்காக மூன்று தோஷங்களையும் சமன் செய்கிறது"],
    tipsEn: ["Use chilled rose water on a cotton pad to de-puff eyes and brighten skin.", "Apply a mixture of sandalwood paste and rosewater as an overnight mask.", "Stay hydrated and eat amla daily for natural inner skin glow."],
    tipsTa: ["குளிர்ந்த ரோஸ் வாட்டரை பருத்தி துண்டில் வைத்து கண்களின் வீக்கத்தை குறைக்கவும்.", "சந்தன பேஸ்ட் மற்றும் ரோஸ் வாட்டர் கலவையை இரவு முழுவதும் முகத்தில் வைக்கவும்.", "நீரேற்றமாக இருங்கள் மற்றும் இயற்கை சரும பொலிவிற்கு தினமும் நெல்லிக்காய் சாப்பிடுங்கள்."],
  },
  "constipation": {
    titleEn: "Constipation", titleTa: "மலச்சிக்கல்",
    group: "group3",
    bannerEn: "Natural Ayurvedic remedies for gentle and effective constipation relief",
    bannerTa: "மலச்சிக்கலுக்கு மென்மையான மற்றும் பயனுள்ள இயற்கை ஆயுர்வேத தீர்வுகள்",
    banner: "https://images.pexels.com/photos/8329969/pexels-photo-8329969.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Constipation (Vibandha) in Ayurveda is predominantly a Vata disorder. Classical remedies include Triphala Churna, Castor Oil (Eranda), and Isabgol which gently stimulate bowel movements without dependency.",
    aboutTa: "ஆயுர்வேதத்தில் மலச்சிக்கல் (விபந்த) முக்கியமாக வாதா கோளாறாகும். திரிபலா சூரணம், ஆமணக்கு எண்ணெய் மற்றும் இஸப்கோல் ஆகியவை மலர்ச்சியை மெதுவாக தூண்டுகின்றன.",
    benefitsEn: ["Gently stimulates bowel movements without cramping", "Softens stools for comfortable passage", "Restores healthy gut flora and digestion", "Long-term gut health improvement without side effects"],
    benefitsTa: ["பிடிப்பு இல்லாமல் மலர்ச்சியை மெதுவாக தூண்டுகிறது", "வசதியான கழிவுக்காக மலத்தை மென்மையாக்குகிறது", "ஆரோக்கியமான குடல் தாவரங்களை மீட்டெடுக்கிறது", "பக்க விளைவுகள் இல்லாமல் நீண்ட கால குடல் ஆரோக்கியம்"],
    tipsEn: ["Take Triphala churna with warm water at bedtime for consistent results.", "Drink warm water with a teaspoon of castor oil on empty stomach once a week.", "Increase fibre intake with fruits, vegetables, and whole grains."],
    tipsTa: ["நிலையான முடிவுகளுக்கு படுக்கைக்கு போவதற்கு முன் திரிபலா சூரணத்தை சூடான நீரில் எடுக்கவும்.", "வாரம் ஒரு முறை வெறும் வயிற்றில் ஒரு தேக்கரண்டி ஆமணக்கு எண்ணெயுடன் சூடான நீர் குடிக்கவும்.", "பழங்கள், காய்கறிகள் மற்றும் முழு தானியங்களுடன் நார்ச்சத்து உட்கொள்ளலை அதிகரிக்கவும்."],
  },
  "diabetes": {
    titleEn: "Diabetes / Sugar Control", titleTa: "நீரிழிவு / சர்க்கரை கட்டுப்பாடு",
    group: "group3",
    bannerEn: "Siddha and Ayurvedic herbs to support healthy blood sugar levels",
    bannerTa: "ஆரோக்கியமான இரத்தச் சர்க்கரை அளவை ஆதரிக்கும் சித்த மற்றும் ஆயுர்வேத மூலிகைகள்",
    banner: "https://images.pexels.com/photos/5938244/pexels-photo-5938244.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Madhumega (Diabetes) is a Vata-Kapha disorder in Ayurveda. Herbs like Karela (Bitter Gourd), Vijaysar, Gurmar, Fenugreek (Methi), and Jamun Seed help maintain healthy blood sugar levels.",
    aboutTa: "மதுமேக (நீரிழிவு) ஆயுர்வேதத்தில் வாதா-கபா கோளாறாகும். பாகற்காய், விஜயசார், குர்மார், வெந்தயம் மற்றும் நாவல் விதை போன்ற மூலிகைகள் இரத்தச் சர்க்கரை அளவை கட்டுப்படுத்த உதவுகின்றன.",
    benefitsEn: ["Helps regulate and stabilise blood sugar levels", "Improves insulin sensitivity naturally", "Reduces sugar cravings and appetite", "Supports pancreatic health and function"],
    benefitsTa: ["இரத்தச் சர்க்கரை அளவை கட்டுப்படுத்துகிறது", "இன்சுலின் உணர்திறனை இயற்கையாக மேம்படுத்துகிறது", "சர்க்கரை ஆசை மற்றும் பசியை குறைக்கிறது", "கணையத்தின் ஆரோக்கியத்தை ஆதரிக்கிறது"],
    tipsEn: ["Drink bitter gourd (karela) juice on empty stomach every morning.", "Soak fenugreek seeds overnight and drink the water first thing in the morning.", "Avoid refined sugars, white rice, and processed foods completely."],
    tipsTa: ["ஒவ்வொரு காலையும் வெறும் வயிற்றில் பாகற்காய் சாறு குடிக்கவும்.", "வெந்தயத்தை இரவு ஊற வைத்து காலையில் தண்ணீர் குடிக்கவும்.", "சுத்திகரிக்கப்பட்ட சர்க்கரை, வெள்ளை அரிசி மற்றும் பதப்படுத்தப்பட்ட உணவுகளை முற்றிலும் தவிர்க்கவும்."],
  },
  "digestion": {
    titleEn: "Digestion", titleTa: "செரிமானம்",
    group: "group3",
    bannerEn: "Strengthen your Agni — the digestive fire — with Ayurvedic wisdom",
    bannerTa: "ஆயுர்வேத ஞானத்துடன் செரிமான நெருப்பான அக்னியை வலுப்படுத்துங்கள்",
    banner: "https://images.pexels.com/photos/4041001/pexels-photo-4041001.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "In Ayurveda, Agni (digestive fire) is central to all health. Weak Agni leads to accumulation of Ama (toxins). Trikatu, Triphala, Chitrakadi Vati, and Hingvashtak Churna rekindle Agni and restore healthy digestion.",
    aboutTa: "ஆயுர்வேதத்தில், அக்னி (செரிமான நெருப்பு) அனைத்து ஆரோக்கியத்திற்கும் மையமாகும். திரிகடு, திரிபலா, சித்ரகாடி வடி மற்றும் ஹிங்வாஷ்டக சூரணம் செரிமான திறனை மீட்டெடுக்கும்.",
    benefitsEn: ["Improves nutrient absorption from food", "Reduces bloating, gas, and indigestion", "Stimulates digestive enzymes and liver function", "Clears accumulated toxins from the digestive tract"],
    benefitsTa: ["உணவிலிருந்து ஊட்டச்சத்து உறிஞ்சுதலை மேம்படுத்துகிறது", "வீக்கம், வாயு மற்றும் அஜீரணத்தை குறைக்கிறது", "செரிமான என்சைம்கள் மற்றும் கல்லீரல் செயல்பாட்டை தூண்டுகிறது", "செரிமான மண்டலத்திலிருந்து நஞ்சுகளை அகற்றுகிறது"],
    tipsEn: ["Drink warm water with a slice of ginger and lemon before meals.", "Avoid ice-cold beverages which dampen the digestive fire.", "Eat at regular times and avoid snacking between meals."],
    tipsTa: ["உணவுக்கு முன் இஞ்சி மற்றும் எலுமிச்சை சாறுடன் சூடான நீர் குடிக்கவும்.", "செரிமான நெருப்பை குறைக்கும் ஐஸ் குளிர் பானங்களை தவிர்க்கவும்.", "சரியான நேரத்தில் சாப்பிடுங்கள் மற்றும் உணவுக்கு இடையில் சாப்பிடுவதை தவிர்க்கவும்."],
  },
  "gastro": {
    titleEn: "Gastro Health & Acidity", titleTa: "இரைப்பை ஆரோக்கியம் & அமிலத்தன்மை",
    group: "group3",
    bannerEn: "Cool the fire within — natural Ayurvedic solutions for acidity and gastric health",
    bannerTa: "உள்ளிருந்த நெருப்பை குளிர்விக்கவும் — அமிலத்தன்மை மற்றும் இரைப்பை ஆரோக்கியத்திற்கு இயற்கை ஆயுர்வேத தீர்வுகள்",
    banner: "https://images.pexels.com/photos/7615621/pexels-photo-7615621.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Acidity (Amlapitta) is a Pitta disorder. Natural remedies include Yashtimadhu (Licorice), Shatavari, Amalaki, and Avipattikar Churna which neutralise excess acid and heal gastric lining.",
    aboutTa: "வயிற்று அமிலம் (அம்லபித்தா) ஒரு பித்தா கோளாறாகும். யஷ்டிமது, சதாவரி, ஆமலகி மற்றும் அவிபட்டிகார சூரணம் ஆகியவை அதிகப்படியான அமிலத்தை நடுநிலைப்படுத்தி இரைப்பை புறணியை குணப்படுத்துகின்றன.",
    benefitsEn: ["Neutralises stomach acid naturally without side effects", "Heals and protects the gastric lining", "Reduces heartburn, bloating, and nausea", "Prevents long-term complications of chronic acidity"],
    benefitsTa: ["பக்க விளைவுகள் இல்லாமல் வயிற்று அமிலத்தை இயற்கையாக நடுநிலைப்படுத்துகிறது", "இரைப்பை புறணியை குணப்படுத்துகிறது", "நெஞ்செரிச்சல், வீக்கம் மற்றும் குமட்டலை குறைக்கிறது", "நாட்பட்ட அமிலத்தன்மையின் சிக்கல்களை தடுக்கிறது"],
    tipsEn: ["Drink cold milk or eat a banana after meals to neutralise excess acid.", "Avoid spicy, fried, and acidic foods, especially at night.", "Consume Yashtimadhu (licorice) tea after meals for soothing relief."],
    tipsTa: ["அதிக அமிலத்தை நடுநிலைப்படுத்த உணவுக்கு பிறகு குளிர்ந்த பால் குடிக்கவும் அல்லது வாழைப்பழம் சாப்பிடவும்.", "காரமான, வறுத்த மற்றும் அமிலமான உணவுகளை, குறிப்பாக இரவில் தவிர்க்கவும்.", "ஆறுதலான நிவாரணத்திற்கு உணவுக்கு பிறகு யஷ்டிமது தேயிலை குடிக்கவும்."],
  },
  "obesity": {
    titleEn: "Obesity", titleTa: "உடல் பருமன்",
    group: "group3",
    bannerEn: "Ayurvedic approach to healthy weight management and metabolism",
    bannerTa: "ஆரோக்கியமான எடை மேலாண்மை மற்றும் வளர்சிதை மாற்றத்திற்கு ஆயுர்வேத அணுகுமுறை",
    banner: "https://images.pexels.com/photos/4174743/pexels-photo-4174743.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Sthaulya (Obesity) in Ayurveda is a Kapha disorder involving excess Medas (fat tissue). Medohar Guggulu, Triphala, Vrikshamla (Garcinia), and Pepper-based churnas help boost metabolism and reduce fat accumulation.",
    aboutTa: "ஸ்தௌல்ய (உடல் பருமன்) ஆயுர்வேதத்தில் கபா கோளாறு ஆகும். மேதோஹர் குக்குலு, திரிபலா, விருட்சாம்ல மற்றும் மிளகு சூரணங்கள் வளர்சிதை மாற்றத்தை அதிகரித்து கொழுப்பு குவிவதை குறைக்கின்றன.",
    benefitsEn: ["Boosts metabolic rate naturally", "Reduces fat accumulation, especially around the abdomen", "Suppresses appetite and reduces cravings", "Improves energy levels and reduces lethargy"],
    benefitsTa: ["வளர்சிதை மாற்ற விகிதத்தை இயற்கையாக அதிகரிக்கிறது", "குறிப்பாக வயிற்றைச் சுற்றிய கொழுப்பு குவிவதை குறைக்கிறது", "பசியை அடக்குகிறது மற்றும் ஆசைகளை குறைக்கிறது", "சக்தி அளவை மேம்படுத்துகிறது"],
    tipsEn: ["Drink warm water with honey and lemon on empty stomach every morning.", "Include Triphala churna in your nightly routine for metabolism support.", "Practice yoga and pranayama daily — even 20 minutes makes a big difference."],
    tipsTa: ["ஒவ்வொரு காலையும் வெறும் வயிற்றில் தேன் மற்றும் எலுமிச்சை சாறுடன் சூடான நீர் குடிக்கவும்.", "வளர்சிதை மாற்ற ஆதரவிற்கு இரவு நித்திரையில் திரிபலா சூரணம் சேர்க்கவும்.", "தினமும் யோகா மற்றும் பிராணாயாமம் பயிற்சி செய்யுங்கள்."],
  },
  "piles": {
    titleEn: "Piles & Hemorrhoid", titleTa: "மூல வியாதி & ஹெமோராய்டு",
    group: "group3",
    bannerEn: "Classical Ayurvedic remedies for piles, fissures, and hemorrhoid relief",
    bannerTa: "மூல வியாதி, பிளவுகள் மற்றும் ஹெமோராய்டு நிவாரணத்திற்கான கிளாசிக்கல் ஆயுர்வேத மருந்துகள்",
    banner: "https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1200",
    aboutEn: "Arshas (Piles/Haemorrhoids) is often linked to chronic constipation and Vata-Pitta aggravation. Kankayan Vati, Arshakuthar Rasa, Haritaki, and Nagakeshar shrink piles, reduce bleeding, and prevent recurrence.",
    aboutTa: "அர்ஷா (மூல வியாதி) பெரும்பாலும் நாட்பட்ட மலச்சிக்கல் மற்றும் வாதா-பித்தா கோளாறுடன் தொடர்புடையது. கங்காயன் வடி, அர்ஷகுடார் ரச, ஹரிதகி மற்றும் நாககேஷர ஆகியவை மூல வியாதியை சுருக்கி, இரத்தப்போக்கை கட்டுப்படுத்துகின்றன.",
    benefitsEn: ["Reduces swelling and inflammation of hemorrhoids", "Controls bleeding and relieves pain during passing stools", "Treats underlying constipation, the root cause", "Prevents recurrence with long-term gut health support"],
    benefitsTa: ["ஹெமோராய்டுகளின் வீக்கம் மற்றும் வீக்கத்தை குறைக்கிறது", "மலம் கழிக்கும் போது இரத்தப்போக்கை கட்டுப்படுத்தி வலியை குறைக்கிறது", "மூல காரணமான மலச்சிக்கலை சிகிச்சையளிக்கிறது", "நீண்ட கால குடல் ஆரோக்கியத்துடன் மீண்டும் வருவதை தடுக்கிறது"],
    tipsEn: ["Sit in warm salt water (Sitz bath) for 15 minutes twice daily for relief.", "Eat high-fibre foods and stay well hydrated to prevent straining.", "Apply Jatyadi oil or Pilex ointment externally for soothing relief."],
    tipsTa: ["நிவாரணத்திற்கு தினமும் இரு முறை 15 நிமிடங்கள் சூடான உப்பு நீரில் (சிட்ஸ் குளியல்) அமருங்கள்.", "அழுத்தத்தை தடுக்க அதிக நார்ச்சத்துள்ள உணவுகளை சாப்பிட்டு நீரேற்றமாக இருங்கள்.", "ஆறுதலான நிவாரணத்திற்கு ஜட்யாடி எண்ணெய் அல்லது பைலக்ஸ் களிம்பை வெளிப்புறமாக தடவுங்கள்."],
  },
};

const groupColors = {
  group1: "bg-blue-100 text-blue-700",
  group2: "bg-orange-100 text-orange-700",
  group3: "bg-green-100 text-green-700",
};

const allSubcategories = [
  {
    groupKey: "group1",
    items: [
      { labelEn: "Cough and Cold", labelTa: "இருமல் மற்றும் சளி", slug: "cough-and-cold" },
      { labelEn: "Fever", labelTa: "காய்ச்சல்", slug: "fever" },
      { labelEn: "Migraine", labelTa: "ஒற்றைத் தலைவலி", slug: "migraine" },
      { labelEn: "Sinus", labelTa: "சைனஸ்", slug: "sinus" },
    ],
  },
  {
    groupKey: "group2",
    items: [
      { labelEn: "Body Care", labelTa: "உடல் பராமரிப்பு", slug: "body-care" },
      { labelEn: "Face Care", labelTa: "சரும பராமரிப்பு", slug: "face-care" },
      { labelEn: "Ayurvedic Hair Oil", labelTa: "ஆயுர்வேத முடி எண்ணெய்", slug: "hair-oil" },
      { labelEn: "Skin & Beauty Care", labelTa: "சரும & அழகு பராமரிப்பு", slug: "skin-beauty" },
    ],
  },
  {
    groupKey: "group3",
    items: [
      { labelEn: "Constipation", labelTa: "மலச்சிக்கல்", slug: "constipation" },
      { labelEn: "Diabetes / Sugar Control", labelTa: "நீரிழிவு / சர்க்கரை கட்டுப்பாடு", slug: "diabetes" },
      { labelEn: "Digestion", labelTa: "செரிமானம்", slug: "digestion" },
      { labelEn: "Gastro Health & Acidity", labelTa: "இரைப்பை & அமிலத்தன்மை", slug: "gastro" },
      { labelEn: "Obesity", labelTa: "உடல் பருமன்", slug: "obesity" },
      { labelEn: "Piles & Hemorrhoid", labelTa: "மூல வியாதி", slug: "piles" },
    ],
  },
];

const PersonalCareCategory = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { lang, t } = useLang();
  const data = categoryData[slug];

  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await API.get('/products?limit=50');
        const formatted = res.data.data
          .filter(p => p.category?.name === "Personal Care")
          .map(p => {
            const rawImg = p.images?.[0]?.url || "";
            return {
              ...p,
              id: p._id,
              productName: p.name,
              productDescription: p.description,
              img: rawImg.startsWith('http') ? rawImg : `http://localhost:5000${rawImg}`,
              category: p.category?.name || "General",
              price: p.price
            };
          });
        setProducts(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-5 text-center">
        <FaShieldAlt className="text-5xl text-slate-300 mb-4" />
        <h2 className="text-2xl font-black text-slate-800 mb-4">Category Not Found</h2>
        <Link to="/personal-care" className="bg-[rgb(7,81,89)] text-white px-6 py-3 rounded-full font-bold">
          {t("allPersonalCare")}
        </Link>
      </div>
    );
  }

  const title = lang === "ta" ? data.titleTa : data.titleEn;
  const tagline = lang === "ta" ? data.bannerTa : data.bannerEn;
  const about = lang === "ta" ? data.aboutTa : data.aboutEn;
  const benefits = lang === "ta" ? data.benefitsTa : data.benefitsEn;
  const tips = lang === "ta" ? data.tipsTa : data.tipsEn;
  const groupColor = groupColors[data.group] || "bg-slate-100 text-slate-600";

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={data.banner} alt={title} className="w-full h-full object-cover brightness-40" />
        <div className="absolute inset-0 flex flex-col justify-center px-5 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-4 font-medium">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <FaChevronRight className="text-[10px]" />
              <Link to="/personal-care" className="hover:text-white transition-colors">{t("personalCare")}</Link>
              <FaChevronRight className="text-[10px]" />
              <span className="text-white">{title}</span>
            </div>
            <span className={`inline-block text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 ${groupColor}`}>
              {t(data.group)}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-4">
              {/* <span className="text-white/90">{icon}</span> {title} */}
            </h1>
            <p className="text-white/70 mt-3 text-sm md:text-base max-w-xl font-medium">{tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 py-10 flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <Link to="/personal-care" className="flex items-center gap-2 text-slate-500 hover:text-[rgb(7,81,89)] font-bold mb-6 text-sm transition-colors">
            <FaArrowLeft /> {t("allPersonalCare")}
          </Link>
          {allSubcategories.map((group) => (
            <div key={group.groupKey} className="bg-white rounded-2xl border border-slate-100 mb-4 overflow-hidden shadow-sm">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t(group.groupKey)}</p>
              </div>
              <ul className="py-2">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/personal-care/${item.slug}`}
                      className={`flex items-center justify-between px-5 py-2.5 text-sm font-bold transition-colors ${
                        slug === item.slug ? "bg-[rgb(7,81,89)] text-white" : "text-slate-600 hover:bg-slate-50 hover:text-[rgb(7,81,89)]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`text-xs opacity-70 ${slug === item.slug ? "text-white" : "text-[rgb(7,81,89)]"}`}>
                        </span>
                        {lang === "ta" ? item.labelTa : item.labelEn}
                      </span>
                      {slug === item.slug && <FaChevronRight className="text-xs opacity-60" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* About + Benefits + Tips */}
          <div className="bg-white rounded-3xl border border-slate-100 p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
             
              <div>
                <h2 className="text-2xl font-black text-slate-800 mb-1">
                   {title}
                </h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${groupColor}`}>
                  {t(data.group)}
                </span>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">{about}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FaLeaf className="text-green-500" /> {t("keyBenefits")}
                </h3>
                <ul className="flex flex-col gap-3">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-green-500 font-black shrink-0">✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50 rounded-2xl p-6">
                <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FaShieldAlt className="text-orange-500" /> {t("ayurvedicTips")}
                </h3>
                <ul className="flex flex-col gap-3">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-orange-500 font-black shrink-0">→</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="bg-gradient-to-r from-[rgb(7,81,89)] to-teal-600 rounded-3xl p-8 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="font-black text-xl mb-1">{t("notSureWhatsRight")}</h3>
              <p className="text-white/70 text-sm">{t("getFreeConsultation")}</p>
            </div>
            <Link
              to="/e-consultation"
              className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full uppercase tracking-wider transition-all hover:-translate-y-0.5 shadow-lg text-sm whitespace-nowrap"
            >
              {t("bookFreeConsultation")}
            </Link>
          </div>

          {/* Products */}
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-6">{t("recommendedProducts")}</h2>
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
                <FaLeaf className="text-4xl text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">{t("noProductsYet")}</p>
                <Link to="/collections" className="mt-4 inline-block bg-[rgb(7,81,89)] text-white px-6 py-2 rounded-full font-bold text-sm">
                  {t("browseAllCollections")}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col shadow-sm">
                    <Link to={`/ProductList/${product.id}`}>
                      <div className="aspect-square overflow-hidden p-5 bg-slate-50">
                        <img src={product.img} alt={product.productName} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <Link to={`/ProductList/${product.id}`}>
                        <h3 className="font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[rgb(7,81,89)] transition-colors mb-2 text-sm">{product.productName}</h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-3">
                        {[1,2,3,4,5].map(i => <StarIcon key={i} sx={{ fontSize: 14 }} className="text-amber-400" />)}
                        <span className="text-xs text-slate-400 ml-1">91 {t("reviews")}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-xl font-black text-[rgb(7,81,89)]">₹{product.price}</span>
                        <button
                          onClick={() => dispatch(addItem({ ...product, quantity: 1 }))}
                          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all hover:-translate-y-0.5 shadow-md shadow-orange-500/20"
                        >
                          <FaCartPlus /> {t("addToCartBtn")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalCareCategory;
