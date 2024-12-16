export interface Option {
  id: number;
  text: string;
  votes: number;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Which ESG initiative should we prioritize for Q2 2024?",
    options: [
      { id: 1, text: "Carbon Footprint Reduction", votes: 45 },
      { id: 2, text: "Sustainable Supply Chain", votes: 32 },
      { id: 3, text: "Renewable Energy Transition", votes: 28 },
      { id: 4, text: "Waste Management Program", votes: 15 },
    ],
  },
  {
    id: 2,
    question: "What should be our main investment focus?",
    options: [
      { id: 5, text: "Technology Infrastructure", votes: 50 },
      { id: 6, text: "Market Expansion", votes: 35 },
      { id: 7, text: "Research & Development", votes: 40 },
      { id: 8, text: "Human Capital", votes: 25 },
    ],
  },
  {
    id: 3,
    question: "Which market should we expand to next?",
    options: [
      { id: 9, text: "North America", votes: 38 },
      { id: 10, text: "Asia Pacific", votes: 42 },
      { id: 11, text: "Europe", votes: 30 },
      { id: 12, text: "South America", votes: 20 },
    ],
  },
];
