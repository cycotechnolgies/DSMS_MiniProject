import React from "react";
import Header from "../partials/homepage/Header";
import Footer from "../partials/homepage/Footer";
import AboutSection from "../partials/homepage/AboutSection";
import MissionVision from "../partials/homepage/MissionVision";
import AboutUs from "../partials/homepage/AboutUs";
import CoreValues from "../partials/homepage/CoreValues";
import TeamSection from "../partials/homepage/TeamSection";
import Gallery from "../partials/homepage/Gallery";

const HomePage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <AboutSection />
        <AboutUs/>
        <Gallery /> 
        <MissionVision />
        <CoreValues />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
