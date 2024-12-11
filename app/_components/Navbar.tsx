"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

//Next
import Link from "next/link";
import Image from "next/image";

//Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//Icons
import {
  Globe,
  Search,
  Zap,
  ChartPie,
  User,
  LogOut,
  Settings,
  ChevronDown,
  LogIn,
  Wallet,
} from "lucide-react";

import { useAuth } from "@/app/hooks/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const { signOut, user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = () => {
    if (!mounted) return;
    localStorage.setItem("postLoginRedirect", pathname);
    router.push("/sign-in");
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <nav className="container flex items-center justify-between p-4 mx-auto">
        <div className=" items-center space-x-8 flex">
          <Link
            href="/"
            className="mr-8 flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <Image
              src="https://utfs.io/f/1c66qeb7SCm5YmfZi4ybcQKOgLiwrEyTUDXzp5sHV1kNR4d9"
              alt="Folkekraft logo"
              width={156}
              height={128}
              quality={90}
              priority
            />
          </Link>

          <div className=" space-x-6 flow-row items-center hidden md:flex">
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Om Emisjon</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Folkekraft AS Emisjon
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Lær mer om vår emisjonsprosess og hvordan du kan
                              bli en del av Folkekraft.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/kontakt"
                    className={navigationMenuTriggerStyle()}
                  >
                    Kontakt
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex-1 max-w-xl px-4 hidden">
          <div className="relative">
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-[#59C9B9] focus:ring-2 focus:ring-[#00263D]"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <Link href={"/folkekraft/invest"}>
                <Button variant="ghost" size="icon">
                  <Zap size={20} />
                </Button>
              </Link>

              <Link href={"/folkekraft/portfolio"}>
                <Button variant="ghost" size="icon">
                  <ChartPie size={20} />
                </Button>
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {user?.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {user?.firstName}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <Link href="/folkekraft/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Min profil</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/folkekraft/portfolio">
                    <DropdownMenuItem>
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Min portefølje</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  className="hidden sm:flex"
                  onClick={handleSignIn}
                >
                  Logg inn
                </Button>
              </motion.div>

              <Link href="/sign-up">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button>
                    Lag profil
                    <User className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
