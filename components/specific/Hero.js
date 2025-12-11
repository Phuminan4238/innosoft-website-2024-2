// components/specific/Hero.jsx
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20 bg-white">
      {/* background blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-10 w-[480px] h-[480px] rounded-full bg-[#FCDCC7] blur-3xl opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 right-0 w-[520px] h-[520px] rounded-full bg-[#E5EEFF] blur-3xl opacity-60"
        aria-hidden="true"
      />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* banner */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-x-2 border border-primary/40 bg-white/80 backdrop-blur px-4 py-1 rounded-full text-xs text-primary">
            Innosoft KMUTT • Digital & Software Services
          </div>
        </div>

        {/* title */}
        <div className="mt-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            We build software and
            <br className="hidden md:block" />
            high-performance services
          </h1>
          <p className="mt-5 text-gray-600 md:text-lg">
        ศูนย์นวัตกรรมซอฟต์แวร์และการประมวลผล
            สังกัดภาควิชาวิศวกรรมคอมพิวเตอร์
            <br></br>
            มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
            <br></br><br></br>
            ให้บริการพัฒนาระบบสารสนเทศทั้งโครงการภายในและโครงการภายนอก
            <br></br>
            ครอบคลุมงานมหาวิทยาลัย ภาครัฐ และอุตสาหกรรม.
          </p>
        </div>

        {/* buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-7 py-3 text-sm font-medium"
          >
            ดูบริการ
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path d="m9 18 6-6-6-6" strokeWidth="2" />
            </svg>
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-200 rounded-full px-7 py-3 text-sm text-gray-700 hover:bg-white"
          >
            ติดต่อโครงการ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
