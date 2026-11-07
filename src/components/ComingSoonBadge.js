import React from 'react';

export default function ComingSoonBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 border border-[#0866E8]/20 shadow-[0_4px_20px_rgba(8,102,232,0.10)] backdrop-blur-md select-none transition-transform">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric-blue" />
      </span>
      <span className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-electric-blue font-poppins">
        Coming Soon
      </span>
    </div>
  );
}
