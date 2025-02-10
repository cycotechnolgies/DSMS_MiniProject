import React from "react";

const MissionVision = () => {
  return (
    <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Our Mission & Vision</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
          <p className="text-lg leading-relaxed">
            Our mission is to democratize education by offering tools that
            simplify course management and enhance the learning journey. We
            believe in supporting educators and students alike, creating a
            harmonious space for development.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
          <p className="text-lg leading-relaxed">
            We envision a world where technology acts as an enabler for quality
            education, fostering inclusivity and continuous improvement. Our
            goal is to become the go-to platform for learning, trusted by
            educators and students worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
