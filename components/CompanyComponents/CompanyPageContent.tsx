'use client';

import React from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import TimelineSection from './TimelineSection';
import TeamSection from './TeamSection';
import PrinciplesSection from './PrinciplesSection';
import ClientLogos from './ClientLogos';
import "../../app/globals.css";


const CompanyPageContent: React.FC = () => {
  return (
    <div className="relative py-16 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <StatsSection />
      </div>
      
      <TimelineSection />
      <TeamSection />
      <PrinciplesSection />
      <ClientLogos />
    </div>
  );
};

export default CompanyPageContent;

