import React from 'react';
import voxnopLogo from '../assets/voxnop-logo.png';

export default function BrandHeader() {
  return (
    <div className="flex items-center justify-center w-full">
      <img
        src={voxnopLogo}
        alt="Voxnop – Beyond Imagination"
        className="h-14 sm:h-16 md:h-20 lg:h-22 w-auto object-contain select-none"
        loading="eager"
      />
    </div>
  );
}
