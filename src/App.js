import React from 'react';
import BrandHeader from './components/BrandHeader';
import ComingSoonBadge from './components/ComingSoonBadge';
import HeroContent from './components/HeroContent';
import RoboticsScene from './components/RoboticsScene';
import WebsiteDomain from './components/WebsiteDomain';

function App() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#F3F7FC] text-deep-navy overflow-x-hidden ambient-lighting tech-grid-pattern flex flex-col justify-between selection:bg-electric-blue selection:text-white">
      
      {/* Background Generative Wave Ribbons (matching reference design) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-Left Wave Lines */}
        <svg
          className="absolute -top-10 -left-10 w-[300px] sm:w-[440px] lg:w-[620px] h-auto opacity-35 text-cyan-accent"
          viewBox="0 0 600 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50 40C120 40 180 180 340 160C500 140 540 20 620 40"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          <path
            d="M-50 70C130 70 190 210 350 190C510 170 550 50 630 70"
            stroke="#0866E8"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <path
            d="M-50 100C140 100 200 240 360 220C520 200 560 80 640 100"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        </svg>

        {/* Bottom-Right Wave Lines */}
        <svg
          className="absolute -bottom-12 -right-12 w-[320px] sm:w-[480px] lg:w-[640px] h-auto opacity-35 text-electric-blue"
          viewBox="0 0 600 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-20 300C140 300 200 160 360 180C520 200 560 320 640 300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <path
            d="M-20 270C150 270 210 130 370 150C530 170 570 290 650 270"
            stroke="#12B8F5"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Soft Ambient Radial Illumination */}
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-cyan-accent/[0.05] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 w-[550px] h-[550px] bg-electric-blue/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Main Page Layout Container: Centered Single Column Hierarchy */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6 lg:py-8 flex-1 flex flex-col justify-between items-center text-center">
        
        {/* 1. Voxnop Logo */}
        <header className="flex-shrink-0 pt-1">
          <BrandHeader />
        </header>

        {/* Center Section: Badge, Main Headline, Supporting Headline & 3D Robotics Scene */}
        <div className="w-full flex-1 flex flex-col items-center justify-center my-auto py-2 sm:py-3 space-y-3 sm:space-y-4">
          
          {/* 2. Coming Soon Badge */}
          <div>
            <ComingSoonBadge />
          </div>

          {/* 3 & 4. Main Headline (+ Mobile Supporting Headline) */}
          <div className="w-full">
            <HeroContent showSupportingOnMobileOnly={true} />
          </div>

          {/* 5. 3D Robotic Arm & AI Processor Interactive Scene */}
          <div className="w-full relative flex items-center justify-center">
            <RoboticsScene />
          </div>

        </div>

        {/* 6. Website Domain Pill */}
        <footer className="w-full flex justify-center pt-2 pb-3">
          <WebsiteDomain />
        </footer>

      </main>
    </div>
  );
}

export default App;
