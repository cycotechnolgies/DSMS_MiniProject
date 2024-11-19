import React from "react";

const TeamSection = () => {
  const team = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      description:
        "John is the visionary behind [LMS Name], with over 15 years of experience in educational technology.",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "Chief Technology Officer",
      description:
        "Jane leads our tech team, ensuring the platform remains state-of-the-art and secure.",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Alice Johnson",
      role: "Head of Product Design",
      description:
        "Alice is responsible for making [LMS Name] intuitive and visually appealing.",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-8">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
            <p className="text-sm mt-2">{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
