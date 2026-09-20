"use client";

import { useEffect, useState } from "react";

// Festival data
const festivals = [
  {
    id: "durga-puja",
    name: "দুর্গাপূজা",
    date: "2026-10-18",
    duration: "৭ দিন",
    color: "from-red-600 via-orange-600 to-amber-600",
    icon: "🛕",
    description: "শারদীয় দুর্গোৎসব - বাঙালিদের সবচেয়ে বড় ধর্মীয় উৎসব",
    specialMusic: "দুর্গা সঙ্গীত",
    days: [
      { name: "মহালয়া", date: "২ অক্টোবর" },
      { name: "ষষ্ঠী", date: "১৬ অক্টোবর" },
      { name: "সপ্তমী", date: "১৭ অক্টোবর" },
      { name: "অষ্টমী", date: "১৮ অক্টোবর" },
      { name: "নবমী", date: "১৯ অক্টোবর" },
      { name: "দশমী", date: "২০ অক্টোবর" },
    ],
    checklist: [
      "ধুনো, ধূপকাঠি",
      "ফুল, মালা",
      "সিঁদুর, আলতা",
      "ভোগের উপকরণ",
      "ঘট, কলসি",
      "প্রদীপ, মোমবাতি",
    ],
    spotify: "https://open.spotify.com/search/durga%20puja%20songs",
    youtube: "https://www.youtube.com/results?search_query=durga+puja+songs",
  },
  {
    id: "lakshmi-puja",
    name: "লক্ষ্মীপূজা",
    date: "2026-11-04",
    duration: "১ দিন",
    color: "from-yellow-600 via-amber-600 to-orange-600",
    icon: "🪔",
    description: "মা লক্ষ্মীর পূজা - সমৃদ্ধি ও ঐশ্বর্যের দেবী",
    specialMusic: "লক্ষ্মী ভজন",
    days: [{ name: "লক্ষ্মীপূজা", date: "৪ নভেম্বর" }],
    checklist: [
      "পদ্মফুল",
      "আলপনা",
      "মিষ্টি, পিঠা",
      "প্রদীপ",
      "লক্ষ্মী মূর্তি/ছবি",
      "পুঁথি, খাতা",
    ],
    spotify: "https://open.spotify.com/search/lakshmi%20puja%20songs",
    youtube: "https://www.youtube.com/results?search_query=lakshmi+puja+songs",
  },
  {
    id: "kali-puja",
    name: "কালীপূজা",
    date: "2026-11-05",
    duration: "১ দিন",
    color: "from-purple-800 via-indigo-700 to-slate-900",
    icon: "🕉️",
    description: "মা কালীর পূজা - শক্তি ও রক্ষার দেবী",
    specialMusic: "কালী নাম",
    days: [{ name: "কালীপূজা", date: "৫ নভেম্বর" }],
    checklist: [
      "জবাফুল",
      "সিঁদুর",
      "ভোগ",
      "প্রদীপ",
      "কালী মূর্তি/ছবি",
      "ধূপ, ধুনো",
    ],
    spotify: "https://open.spotify.com/search/kali%20puja%20songs",
    youtube: "https://www.youtube.com/results?search_query=kali+puja+songs",
  },
  {
    id: "saraswati-puja",
    name: "সরস্বতীপূজা",
    date: "2027-01-26",
    duration: "১ দিন",
    color: "from-yellow-200 via-white to-amber-200",
    icon: "📖",
    description: "মা সরস্বতীর পূজা - জ্ঞান ও বিদ্যার দেবী",
    specialMusic: "সরস্বতী মন্ত্র",
    days: [{ name: "সরস্বতীপূজা", date: "২৬ জানুয়ারি" }],
    checklist: [
      "বই, খাতা, কলম",
      "সাদা ফুল",
      "সাদা কাপড়",
      "খই, মুড়কি",
      "সরস্বতী মূর্তি/ছবি",
      "প্রদীপ",
    ],
    spotify: "https://open.spotify.com/search/saraswati%20puja%20mantra",
    youtube: "https://www.youtube.com/results?search_query=saraswati+puja+mantra",
  },
  {
    id: "dol-jatra",
    name: "দোলযাত্রা",
    date: "2027-03-13",
    duration: "১ দিন",
    color: "from-pink-600 via-purple-600 to-indigo-600",
    icon: "🎨",
    description: "হোলি উৎসব - রঙের উৎসব",
    specialMusic: "হোলি গান",
    days: [{ name: "দোলযাত্রা", date: "১৩ মার্চ" }],
    checklist: [
      "আবির, গুলাল",
      "পিচকারি",
      "মিষ্টি",
      "থাক",
      "কীর্তন",
    ],
    spotify: "https://open.spotify.com/search/holi%20songs",
    youtube: "https://www.youtube.com/results?search_query=holi+songs",
  },
];

// Time zones
const timeZones = [
  { id: "local", name: "Local Time", zone: undefined },
  { id: "bd", name: "বাংলাদেশ Time", zone: "Asia/Dhaka" },
  { id: "in", name: "Indian Time", zone: "Asia/Kolkata" },
];

// Background images
const bgImages = {
  "early-morning": "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?w=1920&q=80",
  "morning": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80",
  "afternoon": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80",
  "evening": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1920&q=80",
  "night": "https://images.unsplash.com/photo-1534239697882-9a250e6ad3e7?w=1920&q=80",
};

export default function Home() {
  const [timeOfDay, setTimeOfDay] = useState("night");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZones[0]);
  const [selectedFestival, setSelectedFestival] = useState(festivals[0]);
  const [daysLeft, setDaysLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [todaySpecial, setTodaySpecial] = useState<any>(null);
  const [bgImage, setBgImage] = useState("");

  const getCurrentTime = () => {
    if (selectedTimeZone.zone) {
      return new Date(new Date().toLocaleString("en-US", { timeZone: selectedTimeZone.zone }));
    }
    return new Date();
  };

  // Check if today is a special festival
  useEffect(() => {
    const now = getCurrentTime();
    const today = now.toLocaleDateString("en-GB");

    const special = festivals.find((festival) => {
      const festivalDate = new Date(festival.date + "T00:00:00");
      const festivalDay = festivalDate.toLocaleDateString("en-GB");
      return today === festivalDay;
    });

    if (special) {
      setTodaySpecial(special);
    } else {
      setTodaySpecial(null);
    }
  }, [selectedTimeZone]);

  // Calculate countdown
  useEffect(() => {
    const festivalDate = new Date(selectedFestival.date + "T00:00:00");

    const timer = setInterval(() => {
      const now = getCurrentTime();
      setCurrentDate(now);

      const difference = festivalDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setDaysLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedFestival, selectedTimeZone]);

  // Time of day + background image
  useEffect(() => {
    const updateTime = () => {
      const now = getCurrentTime();
      const hour = now.getHours();

      if (hour >= 4 && hour < 7) {
        setTimeOfDay("early-morning");
        setBgImage(bgImages["early-morning"]);
      } else if (hour >= 7 && hour < 12) {
        setTimeOfDay("morning");
        setBgImage(bgImages["morning"]);
      } else if (hour >= 12 && hour < 16) {
        setTimeOfDay("afternoon");
        setBgImage(bgImages["afternoon"]);
      } else if (hour >= 16 && hour < 19) {
        setTimeOfDay("evening");
        setBgImage(bgImages["evening"]);
      } else {
        setTimeOfDay("night");
        setBgImage(bgImages["night"]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [selectedTimeZone]);

  const formatDateEnglish = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDayName = (date: Date) => {
    return date.toLocaleDateString("bn-BD", {
      weekday: "long",
    });
  };

  const formatDateBangla = (date: Date) => {
    const banglaMonths = [
      "পৌষ",
      "মাঘ",
      "ফাল্গুন",
      "চৈত্র",
      "বৈশাখ",
      "জ্যৈষ্ঠ",
      "আষাঢ়",
      "শ্রাবণ",
      "ভাদ্র",
      "আশ্বিন",
      "কার্তিক",
      "অগ্রহায়ণ",
    ];

    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    let banglaMonthIndex = month + 8;
    if (banglaMonthIndex >= 12) banglaMonthIndex -= 12;

    const banglaDay = day;
    const banglaYear = year - 593;

    return `${banglaDay} ${banglaMonths[banglaMonthIndex]} ${banglaYear}`;
  };

  const durgaPujaDate = new Date("2026-10-18T00:00:00");
  const durgaPujaDiff = durgaPujaDate.getTime() - new Date().getTime();
  const durgaPujaDaysLeft = Math.max(0, Math.ceil(durgaPujaDiff / (1000 * 60 * 60 * 24)));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">১২ মাসে ১৩ পার্বণ</h1>

            <div className="flex items-center gap-4">
              <select
                value={selectedTimeZone.id}
                onChange={(e) => {
                  const tz = timeZones.find((t) => t.id === e.target.value);
                  if (tz) setSelectedTimeZone(tz);
                }}
                className="bg-white/10 text-white text-sm px-3 py-1 rounded-lg border border-white/20 focus:outline-none focus:border-orange-400"
              >
                {timeZones.map((tz) => (
                  <option key={tz.id} value={tz.id} className="bg-gray-800">
                    {tz.name}
                  </option>
                ))}
              </select>

              <div className="text-white text-sm">
                {getCurrentTime().toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" })}
              </div>

              <div className="flex items-center gap-2">
                <a href="#" className="text-gray-400 hover:text-blue-500 transition text-xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-pink-500 transition text-xl">📸</a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition text-xl">▶️</a>
              </div>
            </div>
          </div>
        </header>

        {/* Special Day Notification */}
        {todaySpecial && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-center">
            <p className="font-bold">🎉 আজ {todaySpecial.name}!</p>
            <p className="text-xs opacity-90">আজকের বিশেষ সঙ্গীত: {todaySpecial.specialMusic}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar - Compact */}
          <aside className="lg:col-span-2 space-y-3">
            {/* Durga Puja Countdown */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-4 text-center shadow-lg">
              <p className="text-white/90 text-xs mb-1">পূজা আসছে</p>
              <p className="text-3xl font-bold text-white">{durgaPujaDaysLeft}</p>
              <p className="text-white/80 text-xs">দিন</p>
            </div>

            {/* Upcoming Festivals - Scrollable */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 max-h-96 overflow-y-auto">
              <h2 className="text-sm font-bold text-white mb-2">আসন্ন উৎসব</h2>
              
              <div className="space-y-1">
                {festivals.map((festival) => (
                  <button
                    key={festival.id}
                    onClick={() => setSelectedFestival(festival)}
                    className={`w-full text-left p-2 rounded-lg transition-all text-xs ${
                      selectedFestival.id === festival.id
                        ? "bg-white/20 border-l-2 border-orange-400"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-sm">{festival.icon}</span>
                      <div>
                        <p className="font-semibold text-white">{festival.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-7 space-y-4">
            <section className={`rounded-2xl bg-gradient-to-br ${selectedFestival.color} p-6 shadow-2xl`}>
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl">{selectedFestival.icon}</span>
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedFestival.name}</h2>
                  <p className="text-white/90 text-sm">{selectedFestival.description}</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                <p className="text-xs text-white/90 mb-2">উৎসব আসতে বাকি</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{daysLeft.days}</p>
                    <p className="text-xs text-white/80">দিন</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{daysLeft.hours}</p>
                    <p className="text-xs text-white/80">ঘণ্টা</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{daysLeft.minutes}</p>
                    <p className="text-xs text-white/80">মিনিট</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{daysLeft.seconds}</p>
                    <p className="text-xs text-white/80">সেকেন্ড</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">উৎসবের দিনগুলো</h3>
                <div className="space-y-1">
                  {selectedFestival.days.map((day, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex justify-between items-center text-sm">
                      <span className="text-white">{day.name}</span>
                      <span className="text-white/80">{day.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* Right Panel */}
          <aside className="lg:col-span-3 space-y-3">
            <section className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h2 className="text-sm font-bold text-white mb-2">আজকের পঞ্জিকা</h2>
              <div className="space-y-1 text-gray-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-300">ইংরেজি</span>
                  <span className="font-semibold">{formatDateEnglish(currentDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">বাংলা</span>
                  <span className="font-semibold">{formatDateBangla(currentDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">বার</span>
                  <span className="font-semibold">{formatDayName(currentDate)}</span>
                </div>
              </div>
            </section>

            <section className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h2 className="text-sm font-bold text-white mb-2">পূজার প্রস্তুতি</h2>
              <div className="space-y-1">
                {selectedFestival.checklist.slice(0, 4).map((item, index) => (
                  <label key={index} className="flex items-center gap-2 text-gray-100 text-xs cursor-pointer">
                    <input type="checkbox" className="w-3 h-3 rounded" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </section>
          </aside>
        </div>

        {/* Music Section - Compact */}
        <section className="bg-black/60 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-white">🎵 পুজো রেডিও</h2>
              <div className="flex items-center gap-2">
                <a
                  href={todaySpecial ? todaySpecial.spotify : selectedFestival.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition"
                >
                  Spotify
                </a>
                <a
                  href={todaySpecial ? todaySpecial.youtube : selectedFestival.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition"
                >
                  YouTube
                </a>
              </div>
            </div>
            
            {todaySpecial && (
              <p className="text-green-300 text-xs">🎉 আজ {todaySpecial.name}! বিশেষ সঙ্গীত: {todaySpecial.specialMusic}</p>
            )}

            <div className="text-center text-gray-400 text-xs mt-2">
              <p>© ২০২৬ ১২ মাসে ১৩ পার্বণ | Made with Love by Utsob Bangla Team</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
