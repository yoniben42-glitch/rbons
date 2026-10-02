import React from 'react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      id="skip-to-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#191817] focus:text-[#FAF8F5] focus:text-xs focus:uppercase focus:tracking-widest focus:ring-2 focus:ring-[#FAF8F5] transition-all"
    >
      Skip to content
    </a>
  );
};
