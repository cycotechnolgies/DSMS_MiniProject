import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import mission from "../../images/mission.webp";
import vision from "../../images/vision.webp";

const MissionVision = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  return (
    <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-center">Our Mission & Vision</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div data-aos="fade-right">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To become the leading online platform empowering individuals 
            with the knowledge, skills, and confidence to become responsible, safe, and skilled drivers.
            Our vision is to transform how people learn to drive by
            offering an accessible, user-friendly, and engaging digital experience,
            making driving education available to everyone, anywhere, anytime.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img 
            src={mission} 
            alt="Mission" 
            className="max-w-full h-auto rounded-lg shadow-lg"
            data-aos="fade-left"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-8 items-center">
        <div className="flex justify-center items-center">
          <img 
            src={vision} 
            alt="Vision" 
            className="max-w-full h-auto rounded-lg shadow-lg"
            data-aos="fade-right"
          />
        </div>
        <div data-aos="fade-left">
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to provide a comprehensive, interactive, and personalized online learning experience for aspiring drivers.
            By offering structured courses, practical lessons, real-time road safety simulations, and expert-driven resources,
            we aim to equip our users with the essential driving skills needed for both passing their driving tests and becoming safe,
            confident, and responsible drivers. We are committed to making driving education easy to access, fun to learn, and effective
            for everyone in their journey to becoming skilled drivers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
