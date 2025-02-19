import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Aboutus from "../../images/about.jpg";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <h6
                  className="text-gray-400 text-base font-normal leading-relaxed"
                  data-aos="fade-up"
                >
                  About Us
                </h6>
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2
                    className="text-indigo-700 text-4xl font-bold font-manrope leading-normal lg:text-start text-center"
                    data-aos="fade-up"
                    data-aos-delay="80" // Reduced delay
                  >
                    The Tale of Our Achievement Story
                  </h2>
                  <p
                    className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center"
                    data-aos="fade-up"
                    data-aos-delay="100" // Reduced delay
                  >
                    We are proud of the milestones we’ve achieved in shaping
                    confident, skilled, and responsible drivers. Here are some
                    of our noteworthy accomplishments:
                  </p>
                </div>
              </div>

              <div className="w-full flex-col justify-center items-start gap-6 flex">
                <div
                  className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1"
                  data-aos="fade-up"
                  data-aos-delay="200" // Reduced delay
                >
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      33+ Years
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Building Confident Drivers for Safer Roads
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      125+ Projects
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Excellence Achieved Through Skillful Guidance
                    </p>
                  </div>
                </div>

                <div
                  className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1"
                  data-aos="fade-up"
                  data-aos-delay="300" // Reduced delay
                >
                  <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      26+ Awards
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Our Commitment to Safety and Excellence Earns Respect
                    </p>
                  </div>
                  <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      99% Happy Clients
                    </h4>
                    <p className="text-gray-500 text-base font-normal leading-relaxed">
                      Reflecting Our Dedication to Learner Success and
                      Satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image with AOS */}
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div
              className="sm:w-[864px] w-full sm:h-[546px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative"
              data-aos="fade-left"
              data-aos-delay="400" // Reduced delay
            >
              <img
                className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src={Aboutus}
                alt="about Us image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
