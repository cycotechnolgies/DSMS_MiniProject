import React from "react";
import Header from "../components/homepage/Header";
import Footer from "../components/homepage/Footer";
import AboutSection from "../components/homepage/AboutSection";
import MissionVision from "../components/homepage/MissionVision";
import AboutUs from "../components/homepage/AboutUs";
//import CoreValues from "../components/homepage/CoreValues";
import TeamSection from "../components/homepage/TeamSection";
import Gallery from "../components/homepage/Gallery";
import PriceSection from "../components/homepage/PriceSection";



const HomePage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <AboutSection />
        <AboutUs/>
        <PriceSection/>
        <Gallery /> 
        <MissionVision />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
