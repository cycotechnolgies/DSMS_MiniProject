import React from "react";
import m1 from "../../images/m1.jpg";
import m2 from "../../images/m2.jpg";
import m3 from "../../images/m3.jpg";

const TeamSection = () => {
  const team = [
    {
      name: "Michael Adams",
      role: "Founder & CEO",
      description:
        "Michael is the visionary behind the Driving School Management System, with over 20 years of experience in the education and transport industries.",
      img: m1,
    },
    {
      name: "Sarah Lee",
      role: "Chief Technology Officer",
      description:
        "Sarah oversees the tech development and ensures the platform provides seamless user experiences for both students and instructors.",
      img: m2,
    },
    {
      name: "David Johnson",
      role: "Head of Curriculum Development",
      description:
        "David is responsible for designing and updating driving courses, ensuring they align with the latest traffic regulations and driving standards.",
      img: m3,
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg transition-transform duration-300 ease-in-out"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4 group-hover:text-blue-600 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              {member.role}
            </p>
            <p className="text-sm mt-2 text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
              {member.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;