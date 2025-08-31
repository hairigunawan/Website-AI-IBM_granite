'use client'

import AnnouncementBanner from "./Home/AnnouncementBanner";
import HeroContent from "./Home/HeroContent";
import PreviewImage from "./Home/PreviewImage";
import "../app/globals.css";

const NewHeroSection = () => {
  return (
    <div className="flex justify-center px-6 pt-14 lg:px-8 ">
      <div className="mx-10 max-w-full sm:py-10 lg:py-10">
        <AnnouncementBanner />
        <HeroContent />
        <PreviewImage />
      </div>
    </div>
  );
};

export default NewHeroSection;