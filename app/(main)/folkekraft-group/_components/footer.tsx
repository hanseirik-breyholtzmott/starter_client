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
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white text-gray-900 flex items-center justify-center font-bold rounded">
                F
              </div>
              <span className="text-xl font-semibold text-white">
                Folkekraft
              </span>
            </Link>
            <p className="text-sm mb-4">
              Opplev medeierskap med Folkekraft - mer enn bare strøm.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/folkekraft"
                className="hover:text-white"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/folkekraft"
                className="hover:text-white"
              >
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white hidden">
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/folkekraft/"
                className="hover:text-white"
              >
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="hover:text-white hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5.8 11.3 2 22l10.7-3.79" />
                  <path d="M4 3h.01" />
                  <path d="M22 8h.01" />
                  <path d="M15 2h.01" />
                  <path d="M22 20h.01" />
                  <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
                  <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
                  <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
                  <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="hidden">
            <h3 className="text-white font-semibold mb-4">For investorer</h3>
            <ul className="space-y-2">
              {[
                "Konsept: strømkunde og medeier",
                "Utfordring i strømbransjen",
                "Markedsmulighet for Folkekraft",
                "Strømavtalen i Folkekraft",
                "Privacy policy",
                "Restrukturering av Folkekraft",
                "Cookie Preferences",
                "Kapital og exit",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden">
            <h3 className="text-white font-semibold mb-4">Dokumenter</h3>
            <ul className="space-y-2">
              {["doc1", "doc2", "doc3", "doc4", "doc5"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden">
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Journal", "Events", "Contact", "We're hiring!"].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-white">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <DollarSign className="mr-2 hidden" size={24} />
            <span className="text-white font-semibold">Sjekk ut vår app</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden">Invest in the app</span>
            <Link
              href="https://apps.apple.com/no/app/folkekraft/id6482291097?l=nb"
              target="_blank"
              className="bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
            >
              <Image
                src="https://utfs.io/f/1c66qeb7SCm5Et1bh7mKfVgdAmMa5tkqFhlrIi7SDGB9n6vj"
                alt="App Store"
                width={150}
                height={125}
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.utilitycloud.folkekraft.mypage.prod&hl=NO"
              target="_blank"
              className="bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
            >
              <Image
                src="https://utfs.io/f/1c66qeb7SCm5Paa0X8jhC8L3oIdGxkT4DARaBrcs0EqvWiOn"
                alt="Google Play"
                width={150}
                height={125}
              />
            </Link>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-500 hidden">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequuntur dolores perferendis aliquid aut omnis vel ut quam
            eaque, earum rem nisi sapiente. Itaque repellendus doloribus
            architecto veritatis, quod facilis perspiciatis?
          </p>
        </div>
      </div>
    </footer>
  );
}
