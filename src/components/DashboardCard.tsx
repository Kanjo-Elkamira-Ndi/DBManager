import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  bg: () => ReactNode;
  iconBg: string;
  btnBg: string;
  titleColor: string;
  title: string;
  desc: string;
  onClick: () => void;
}

export default function DashboardCard({
  icon,
  bg: BgIcon,
  iconBg,
  btnBg,
  titleColor,
  title,
  desc,
  onClick,
}: Props) {
  return (
    <div className="relative bg-[#FFFFFF] rounded-2xl shadow-sm border border-gray-100 p-[15px] overflow-hidden flex flex-col gap-6 hover:shadow-md min-h-[400px]">
      <BgIcon />

      <div className={`w-14 h-14 rounded-xl ${iconBg} text-white flex items-center justify-center z-10`}>
        <span className="scale-150 block">{icon}</span>
      </div>

      <div className="z-10">
        <h2 className={`text-2xl font-bold mb-3 ${titleColor}`}>
          {title}
        </h2>
        <p className="text-gray-500 text-xl leading-relaxed">{desc}</p>
      </div>

      <div className="mt-auto z-10">
        <button
          onClick={onClick }
          className={`w-full py-4 px-6 rounded-xl text-white font-semibold ${btnBg}`}
        >
          Enter Dashboard →
        </button>
      </div>
    </div>
  );
}