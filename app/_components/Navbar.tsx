"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

//Next
import Link from "next/link";

//Shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    <div className="w-full bg-white border-b">
      <nav className="container flex items-center justify-between p-4 mx-auto">
        <div className=" items-center space-x-8 flex">
          <Link href="/" className="flex items-center space-x-2 ">
            <div className="w-8 h-8 bg-[#00263D] text-white hidden items-center justify-center font-bold rounded md:flex">
              F
            </div>

            <p className="text-3xl font-bold">Folkekraft</p>
          </Link>
          <div className=" space-x-6 flow-row items-center hidden md:flex">
            <Link
              href="/folkekraft"
              className="text-gray-600 hover:text-gray-900"
            >
              Folkekraft AS Emisjon
            </Link>
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
              <Button variant="ghost" onClick={handleSignIn}>
                <LogIn className="mr-2 h-4 w-4" />
                Logg inn
              </Button>
              <Link href="/sign-up">
                <Button>Lag profil</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
