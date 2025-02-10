import React from "react";

const CoreValues = () => {
  const values = [
    {
      title: "Innovation",
      description:
        "We embrace change and encourage creativity to push the boundaries of online learning.",
    },
    {
      title: "Integrity",
      description:
        "Trust is at the core of what we do. We are committed to transparency and honesty in all our dealings.",
    },
    {
      title: "Community",
      description:
        "Our platform thrives on collaboration. We foster a strong, supportive network for learners and educators.",
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-4">Core Values</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-blue-50 p-6 rounded-lg shadow-sm text-center"
          >
            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
            <p className="text-base">{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
