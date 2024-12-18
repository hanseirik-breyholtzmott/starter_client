"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface SidebarNavigationProps {
  sections: Section[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function SidebarNavigation({
  sections,
  activeSection,
  scrollToSection,
}: SidebarNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Card className="md:sticky transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-full flex justify-between items-center p-2 bg-muted rounded-md transition-all duration-200 ease-in-out"
        >
          <span>Sections</span>
          {isMobileMenuOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        <nav
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:block mt-4 md:mt-0`}
        >
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    scrollToSection(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ease-in-out ${
                    activeSection === section.id
                      ? "bg-[#00263D] text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}
