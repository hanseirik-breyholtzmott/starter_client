import React from "react";

type Props = {};

export default function Team({}: Props) {
  const team = [
    {
      name: "James Patterson",
      role: "CEO",
      image: "/placeholder.svg",
    },
    {
      name: "Sophia Martinez",
      role: "Marketing Manager",
      image: "/placeholder.svg",
    },
    {
      name: "Liam Johnson",
      role: "Financial Analyst",
      image: "/placeholder.svg",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our team</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know the professionals who bring expertise and passion to
            every project.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className="relative group">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-xl mb-1">
                    {member.name}
                  </h3>
                  <p className="text-white/80">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
