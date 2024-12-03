import React from "react";

//Nextjs
import Link from "next/link";
import Image from "next/image";

//Icons
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  DollarSign,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600">
          © 2024 Folkekraft. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
