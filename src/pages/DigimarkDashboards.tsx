import { useEffect } from "react";
import type { ReactNode } from "react";
import DashboardCard from "../components/DashboardCard";

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const GradCapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const SupportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const GlobeBg = () => (
  <svg viewBox="0 0 120 120" className="w-36 h-36 absolute right-4 top-4 opacity-10" fill="none" stroke="#7c2d12" strokeWidth="1.5">
    <circle cx="60" cy="60" r="55" />
    <path d="M5 60h110M60 5a85 85 0 0 1 20 55 85 85 0 0 1-20 55 85 85 0 0 1-20-55A85 85 0 0 1 60 5z" />
    <ellipse cx="60" cy="60" rx="30" ry="55" />
  </svg>
);

const GradCapBg = () => (
  <svg viewBox="0 0 120 120" className="w-36 h-36 absolute right-4 top-4 opacity-10" fill="none" stroke="#92400e" strokeWidth="1.5">
    <path d="M10 55 60 30 110 55 60 80 10 55z" />
    <path d="M35 67v25c14 14 36 14 50 0V67" />
    <line x1="110" y1="55" x2="110" y2="85" />
  </svg>
);

const ServerBg = () => (
  <svg viewBox="0 0 120 120" className="w-36 h-36 absolute right-4 top-4 opacity-10" fill="none" stroke="#3b0764" strokeWidth="1.5">
    <rect x="10" y="15" width="100" height="35" rx="6" />
    <rect x="10" y="65" width="100" height="35" rx="6" />
    <circle cx="30" cy="32" r="5" />
    <circle cx="30" cy="82" r="5" />
    <line x1="50" y1="32" x2="90" y2="32" />
    <line x1="50" y1="82" x2="90" y2="82" />
  </svg>
);

const DashboardMockup = () => (
  <div className="w-full h-full bg-gray-900 rounded-lg p-4 font-mono text-xs overflow-hidden">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
      <div className="flex-1 bg-gray-700 rounded h-4 ml-2"></div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2 space-y-2">
        {[
          { label: "Content Sync Status", w: "w-3/4" },
          { label: "Database Origin Detected", w: "w-1/2" },
          { label: "3 Modules Require Attention", w: "w-2/3" },
          { label: "Validation Complete", w: "w-1/2" },
          { label: "Archive Manifest Ready", w: "w-3/5" },
          { label: "Export Queue Running", w: "w-2/3" },
          { label: "CDN Cache Refreshed", w: "w-1/2" },
          { label: "Redundancy Pipeline Active", w: "w-3/4" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className={`bg-gray-700 rounded h-2.5 ${item.w}`}></div>
            <div className="bg-gray-600 rounded h-2.5 w-8 shrink-0"></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#374151" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#06b6d4" strokeWidth="3"
              strokeDasharray="62 38" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm">24%</span>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-3 border-t border-gray-700 pt-3 space-y-1.5">
      {["Database Dispatch Overview", "Translation Results Pending", "Authority File status..."].map((_, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0"></div>
          <div className="bg-gray-600 rounded h-2 flex-1"></div>
        </div>
      ))}
    </div>
    <div className="mt-3 flex justify-between items-center border-t border-gray-700 pt-2">
      <div className="flex gap-2">
        <div className="bg-gray-700 rounded h-5 w-16"></div>
        <div className="bg-gray-700 rounded h-5 w-16"></div>
      </div>
      <div className="bg-cyan-800 rounded h-5 w-12"></div>
    </div>
  </div>
);

/* CARD TYPE */
interface Card {
  key: string;
  icon: ReactNode;
  bg: () => ReactNode;
  iconBg: string;
  btnBg: string;
  titleColor: string;
  title: string;
  desc: string;
} 

/* CARD DATA */
const cards: Card[] = [
  {
    key: "website",
    icon: <GlobeIcon />,
    bg: GlobeBg,
    iconBg: "bg-[#7c2d12]",
    btnBg: "bg-[#7c2d12] hover:bg-[#991b1b]",
    titleColor: "text-[#7c2d12]",
    title: "Website Dashboard",
    desc: "Manage your primary web presence, analyze traffic patterns, and curate front-facing content with precision.",
  },
  {
    key: "dlearn",
    icon: <GradCapIcon />,
    bg: GradCapBg,
    iconBg: "bg-[#b45309]",
    btnBg: "bg-[#b45309] hover:bg-[#92400e]",
    titleColor: "text-[#92400e]",
    title: "DLearn Dashboard",
    desc: "Education-centric management for courses, student engagement metrics, and academic resource distribution.",
  },
  {
    key: "dims",
    icon: <ServerIcon />,
    bg: ServerBg,
    iconBg: "bg-[#4E2022]",
    btnBg: "bg-[#4E2022] hover:bg-[#4E2022]",
    titleColor: "text-[#4E2022]",
    title: "Dims Dashboard",
    desc: "Digital Inventory Management System. Track assets, manage files, and monitor storage health.",
  },
];

export default function DigimarkDashboards() {
  /* OPTIONAL: check session on load */
  useEffect(() => {
    const saved = sessionStorage.getItem("dashboard");
    if (saved) {
      console.log("Previously selected:", saved);
    }
  }, []);

  const handleSelect = (card: Card) => {
    sessionStorage.setItem("dashboard", card.key);
    console.log("Saved:", card.key);

    // 👉 Optional navigation
    // window.location.href = `/dashboard/${card.key}`;
  };

  return (
    <div className="min-h-screen bg-[#F9F9FE] flex flex-col">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-[30px] py-4">
        <span className="text-[#7c2d12] font-bold text-2xl">The Archivist</span>

        <div className="flex gap-6">
          <button className="flex items-center gap-1.5 text-gray-600">
            <SupportIcon /> Support
          </button>
          <button className="flex items-center gap-1.5 text-gray-800 font-semibold">
            <LogoutIcon /> Logout
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="text-center pt-14 pb-10">
        <h1 className="text-6xl font-bold text-[#610714]">
          Digimark Dashboards
        </h1>
        <p className="text-gray-500 text-xl mt-4">
          Select a dashboard to continue
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-[1400px] mx-auto w-full px-6 pb-10">
        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((card) => (
            <DashboardCard
              {...card}
              onClick={() => handleSelect(card)}
            />
          ))}
        </div>
      </div>
      {/* Editorial Feature */}
      <div className="max-w-[1500px] mx-auto w-full px-6 pb-16">
        <div className="bg-[#F3F3F8] rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[10px] font-bold tracking-widest text-[#A04100] bg-[#A041001A] rounded px-2 py-1 mb-4 font-sans uppercase">
              Editorial Update
            </span>
            <h2 className="text-4xl font-bold text-[#610714] mb-4 leading-snug" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Centralized Access Control for The Modern Archivist
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed font-sans mb-5">
              Our multi-dashboard architecture ensures that each department operates within a focused toolset, reducing cognitive load and maximizing editorial efficiency across the entire organization.
            </p>
            <div className="flex items-center gap-6 font-sans">
              <span className="flex items-center gap-1.5 text-sm text-[#7c2d12] font-medium">
                <CheckCircleIcon /> Secure Auth
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[#7c2d12] font-medium">
                <CheckCircleIcon /> Real-time Data
              </span>
            </div>
          </div>
          <div className="w-full md:w-[620px] h-[320px] rounded-xl overflow-hidden shrink-0 shadow-md border border-gray-800">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-100 py-20 px-8">
        <div className="flex flex-col items-center gap-[15px]">
          <div className="flex gap-6 text-xs text-gray-400 font-sans tracking-widest uppercase">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 transition-colors">System Status</a>
          </div>
          <p className="text-xs text-gray-400 font-sans">© 2024 Digimark Editorial. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}