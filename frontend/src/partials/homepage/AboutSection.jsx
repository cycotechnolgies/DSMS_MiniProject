import React from "react";
import About from "../../images/about.jpg";

const AboutSection = () => {
  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-6">
        <h1 class="max-w-2xl mb-4 text-6xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome to</h1>
        <h1 class="max-w-2xl mb-4 text-6xl font-extrabold  tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Driving School </h1>

        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"> your trusted partner in starting your journey on the road.</p>

        <div>
          <button class = "px-4 py-2 bg-blue-600 text-white rounded-md">
            Get Started
          </button>
        </div>

        </div>
        
        <div className="md:w-1/2">
          <img
            src={About}
            alt="About Us Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
