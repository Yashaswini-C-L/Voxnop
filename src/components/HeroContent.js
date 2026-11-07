import React from 'react';

export default function HeroContent({ showSupportingOnMobileOnly = false }) {
  return (
    <div className="space-y-3 sm:space-y-4 text-center select-none flex flex-col items-center">
      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-extrabold tracking-tight text-deep-navy leading-[1.14] font-sans">
        The Future of <br />
        Learning Is <br />
        <span className="relative inline-block text-electric-blue mt-1">
          Taking Shape.
          {/* Elegant cyan curved underline swoop matching reference image */}
          <svg
            className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-cyan-accent overflow-visible pointer-events-none"
            viewBox="0 0 260 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 14C65 4 175 3 257 11"
              stroke="#12B8F5"
              strokeWidth="3.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </h1>

      {/* Supporting Headline for Mobile (centered right beneath main headline) */}
      <div className={`pt-2 sm:pt-3 max-w-md mx-auto ${showSupportingOnMobileOnly ? 'lg:hidden' : ''}`}>
        <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-grey/90 tracking-wide font-sans leading-relaxed text-center">
          Robotics. Artificial Intelligence. <br className="inline sm:hidden" />
          Beyond Imagination.
        </p>
      </div>
    </div>
  );
}
