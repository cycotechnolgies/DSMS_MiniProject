import React from "react";
import { motion } from "framer-motion"; // Import motion for animation
import main from "../../images/main.jpg";

const AboutSection = () => {
  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-4 md:mb-0 md:pr-6"> {/* Reduced mb-8 to mb-4 */}
          {/* Add animation to the first h1 */}
          <motion.h1
            className="max-w-2xl mb-4 text-6xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl"
            initial={{ opacity: 0, x: -50 }} // Start with 0 opacity and slightly off to the left
            animate={{ opacity: 1, x: 0 }} // Animate to full opacity and bring to normal position
            transition={{ duration: 1 }}
          >
            Welcome to
          </motion.h1>
          
          {/* Add animation to the second h1 */}
          <motion.h1
            className="max-w-2xl mb-4 text-6xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl"
            initial={{ opacity: 0, x: -50 }} // Same starting point for smooth effect
            animate={{ opacity: 1, x: 0 }} // Animate to normal state
            transition={{ duration: 1, delay: 0.3 }} // Slight delay for a staggered effect
          >
            Driving School
          </motion.h1>

          <p className="max-w-2xl mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl "> {/* Reduced mb-6 to mb-4 */}
            Your trusted partner in starting your journey on the road.
          </p>

        </div>

        {/* Modify the image animation */}
        <div className="md:w-1/2">
          <motion.img
            src={main}
            alt="About Us Image"
            className="rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }} // Start with 0 opacity and scaled down
            animate={{ opacity: 1, scale: 1 }} // Animate to full opacity and normal scale
            transition={{ duration: 1, ease: "easeOut" }} // Smooth scaling transition
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
