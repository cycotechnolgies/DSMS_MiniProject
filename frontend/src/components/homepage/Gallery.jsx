import React, { useEffect } from "react";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos";
import "flowbite";
import M1 from "../../images/m1.jpg";
import M2 from "../../images/m2.jpg";
import M3 from "../../images/m3.jpg";
import M4 from "../../images/p1.jpg";
import M5 from "../../images/logo.png";

const images = [M1, M2, M3, M4, M5, M1, M2, M3, M4, M5, M1, M2];

const Gallery = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Ensures animations run smoothly
      easing: "ease-in-out",
      once: true, // Runs only once per scroll
    });
    AOS.refresh(); // Ensures animations trigger correctly
  }, []);

  return (
    <div className="p-6">
      {/* Animated Heading Wrapper */}
      <div className="flex justify-center" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          This is our Gallery
        </h2>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="grid gap-4">
            <div data-aos="fade-up">
              <img
                className="h-auto max-w-full rounded-lg transition-transform transform hover:scale-110 shadow-lg hover:shadow-2xl duration-300 cursor-pointer"
                src={image}
                alt={`Gallery Image ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
