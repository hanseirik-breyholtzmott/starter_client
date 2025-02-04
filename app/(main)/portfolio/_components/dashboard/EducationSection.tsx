"use client";

import { EducationCard } from "./EducationCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

type EducationCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
};

export function EducationSection() {
  const educationCards: EducationCard[] = [
    {
      id: "1",
      title: "Hvordan investere i Folkekraft?",
      description:
        "Lær hvordan du kan bli medeier i Folkekraft og være med på det grønne skiftet. Vi går gjennom prosessen steg for steg.",
      icon: "/images/mana-icon.svg",
      color: "bg-red-100",
      link: "#",
    },
    {
      id: "2",
      title: "Investering i unoterte aksjer",
      description:
        "Forstå mulighetene og risikoen ved å investere i unoterte aksjer. Vi forklarer alt du trenger å vite for å komme i gang.",
      icon: "/images/sand-icon.svg",
      color: "bg-blue-100",
      link: "#",
    },
    {
      id: "3",
      title: "Grønn energi investering",
      description:
        "Oppdag hvordan du kan investere i fremtidens energiløsninger og bidra til et mer bærekraftig samfunn gjennom aksjer i fornybar energi.",
      icon: "/images/bitcoin-icon.svg",
      color: "bg-orange-400",
      link: "#",
    },
  ];
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Lær deg mer om aksjer</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-3"
      >
        {educationCards.map((card) => (
          <motion.div key={card.id} variants={item}>
            <EducationCard card={card} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
