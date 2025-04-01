import React from "react";
import HerroSection from "./herro-section";
import FeatureSection from "./feature-section";
import HowItWorksSection from "./hiw-section";
import StatsSection from "./stats-section";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center w-screen h-fit mt-20">
      <HerroSection />
      <FeatureSection />
      <HowItWorksSection />
      <StatsSection />
    </div>

  );
};

export default LandingPage;
