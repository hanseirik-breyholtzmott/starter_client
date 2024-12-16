"use client";

import { motion } from "framer-motion";
import {
  Share2,
  TrendingUp,
  Users,
  Smartphone,
  Code,
  UserCircle,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

//MagicUI
import HyperText from "@/components/ui/hyper-text";

import { AnimatedBeamDemo } from "@/app/_components/AnimatedBeam";

export default function InvestmentHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-[70vh] flex items-center overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Invester i
              <HyperText
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                text="medeierskap"
              />
              <span className="relative">
                noe du kan stole på
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-1 bg-[#57C7B7]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                />
              </span>
            </h1>
            <p className="text-slate-800 text-lg md:text-xl">
              Fremtidens investeringsplattform for unoterte selskaper
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-slate-800 hover:bg-slate-700 text-white"
              >
                Se investeringsmuligheter
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated Network */}
          <div className="relative hidden lg:block ">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square relative w-full max-w-[500px] flex justify-center items-center"
            >
              {/* Background Circle */}
              <div className="absolute inset-0 rounded-full bg-[#00263D]" />
              <div className="relative z-10 w-full">
                <AnimatedBeamDemo />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
