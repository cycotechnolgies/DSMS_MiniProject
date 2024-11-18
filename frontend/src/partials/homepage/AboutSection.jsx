import React from "react";

const AboutSection = () => {
  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-6">
          <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            At [LMS Name], we are innovators in the field of online education.
            Our platform bridges the gap between learners and educators,
            fostering a vibrant community where knowledge is shared seamlessly.
            We prioritize user experience and cutting-edge technology to ensure
            learning is accessible and engaging.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://via.placeholder.com/600x400"
            alt="About Us Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
