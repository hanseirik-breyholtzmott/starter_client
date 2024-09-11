"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

//Shadcn
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

//Icons
import {
  ChevronRight,
  User,
  SunMoon,
  LogOut,
  Bell,
  ChevronDown,
  MessageSquare,
  Menu,
  CheckCheck,
  ArrowLeftRight,
  Settings,
} from "lucide-react";
import axiosInstance, { setAuthorizationHeader } from "@/lib/axiosInstance";

//Context
import { useAuthContext } from "@/app/hooks/AuthContext";

//Types
import { Notification } from "@/app/types";

//Helper
import { dateHelper } from "@/lib/helperFunctions";

import { navLinks } from "@/config/contants";

type Props = {};

const Header = (props: Props) => {
  const { logout, user, loading } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (user) {
          const response = await axiosInstance.get(
            "/api/notifications/" + user.id
          );
          const notificationsData = response.data.data.notifications;
          console.log(response.data.data.notifications);

          if (Array.isArray(notificationsData)) {
            setNotifications(notificationsData);
          } else {
            console.error(
              "Expected an array of notifications, but got:",
              notificationsData
            );
            setNotifications([]); // Ensure notifications is always an array
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [user]);

  return (
    <header className="bg-white h-[64px] fixed w-full z-10">
      <div className="w-full md:w-[calc(100%-96px)] lg:w-[calc(100%-256px)] h-[64px] flex flex-row items-center px-4 justify-between">
        <div className="">
          <h2 className="text-2xl font-bold md:block hidden">
            Hei, Velkommen til Folkekraft AS emisjon 👋
          </h2>
          <Sheet>
            <SheetTrigger className="block md:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
              <nav>
                <ul className="flex flex-col space-y-2">
                  {["Menu", "Financial", "Tools"].map((category) => (
                    <React.Fragment key={category}>
                      <p className="text-sm text-slate-700">{category}</p>
                      {navLinks
                        .filter((link) => link.category === category)
                        .map((link) => (
                          <React.Fragment key={link.name}>
                            <Link href={link.href}>
                              <li className="flex flex-row lg:justify-start justify-between w-full hover:bg-stone-300 p-2 rounded-lg text-slate-900">
                                <div className="flex items-center">
                                  <link.icon className="mr-2" />
                                  <p className="md:hidden lg:block text-black">
                                    {link.name}
                                  </p>
                                </div>
                                {link.subMenu && <ChevronRight size={16} />}
                              </li>
                            </Link>
                            {link.subMenu && (
                              <ul className="ml-4">
                                {link.subMenu.map((subLink) => (
                                  <Link key={subLink.name} href={subLink.href}>
                                    <li className="flex flex-row justify-start w-full hover:bg-stone-300 p-2 rounded-lg text-slate-900">
                                      <subLink.icon className="mr-2" />
                                      <p className="md:hidden lg:block text-black">
                                        {subLink.name}
                                      </p>
                                    </li>
                                  </Link>
                                ))}
                              </ul>
                            )}
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-row relative items-center space-x-4">
          <div className=" h-[30px] w-[30px]  items-center justify-center relative hidden">
            <div className="bg-red-500 w-[8px] h-[8px] absolute top-[3px] right-[3px] rounded-full"></div>
            <Sheet>
              <SheetTrigger>
                <MessageSquare size={20} />
              </SheetTrigger>
              <SheetContent className="flex flex-col justify-between">
                <SheetHeader>
                  <SheetTitle>Your chats</SheetTitle>
                </SheetHeader>
                <Command className="">
                  <CommandInput placeholder="Search name ..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandSeparator />

                    <CommandItem className="">
                      <div className="flex flex-row gap-4 p-4 w-full">
                        <div className="block h-[40px] max-w-[40px] w-full bg-red-200 rounded-full">
                          {/** Profile pic */}
                        </div>
                        <div className="flex flex-row w-full justify-between">
                          <div>
                            <span className="font-semibold text-slate-950">
                              Hans-Eirik
                            </span>
                            <br />
                            <small className="font-bold">
                              Hey! How are things going?
                            </small>
                          </div>
                          <span>9:16 AM</span>
                        </div>
                      </div>
                    </CommandItem>
                    <CommandItem className="">
                      <div className="flex flex-row gap-4 p-4 w-full">
                        <div className="block h-[40px] max-w-[40px] w-full bg-red-200 rounded-full">
                          {/** Profile pic */}
                        </div>
                        <div className="flex flex-row w-full justify-between">
                          <div>
                            <span className="font-semibold text-slate-950">
                              Krishan
                            </span>
                            <br />
                            <small className="">Fuckkk Lasse!</small>
                          </div>
                          <span>9:16 AM</span>
                        </div>
                      </div>
                    </CommandItem>
                  </CommandList>
                </Command>
              </SheetContent>
            </Sheet>
          </div>
          <div className=" h-[30px] w-[30px] flex items-center justify-center relative">
            {notifications && notifications.length > 0 && (
              <div className="bg-red-500 w-[8px] h-[8px] absolute top-[3px] right-[6px] rounded-full"></div>
            )}
            <div className="bg-red-500 w-[8px] h-[8px] absolute top-[3px] right-[6px] rounded-full"></div>
            <Sheet>
              <SheetTrigger>
                <Bell size={20} />
              </SheetTrigger>
              <SheetContent className="flex flex-col justify-between">
                <SheetHeader>
                  <SheetTitle>Your notifications</SheetTitle>
                  <Tabs defaultValue="account" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="account" className="w-full">
                        View all (10)
                      </TabsTrigger>
                      <TabsTrigger value="password" className="w-full">
                        Actions
                      </TabsTrigger>
                      <TabsTrigger value="password2" className="w-full">
                        Mentions
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                      <div>
                        {notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className="flex p-4 hover:bg-slate-100 transition-all ease-in-out"
                          >
                            <div className="relative w-[60px]">
                              <div className="rounded-full h-[8px] w-[8px] bg-green-300 absolute border-white border"></div>
                              <div className="block h-[40px] w-[40px] bg-red-200 rounded-full">
                                {/** Profile pic */}
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold">
                                {notification.title}
                              </p>
                              <p className="text-sm">{notification.message}</p>
                              <small className="m-0 p-0 text-xs text-slate-500">
                                {dateHelper(notification.createdAt)}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="password">No actions</TabsContent>
                    <TabsContent value="password2">No mentions</TabsContent>
                  </Tabs>
                </SheetHeader>

                <SheetFooter>
                  <div className="w-full border-t py-2 flex flex-row justify-between">
                    <Button>Close</Button>
                    <Button>
                      <CheckCheck size={20} className="mr-2" />
                      Mark all as Read
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <Separator orientation="vertical" className="h-[32px]" />
          <Popover>
            <PopoverTrigger>
              <div className="flex flex-row space-x-5 items-center p-1 rounded-lg">
                <Avatar>
                  <AvatarImage src="https://play-lh.googleusercontent.com/imVxwK62k8Fe_XOyWB81MPSPm5Km-Q5V1av2i_jTYjtaoUEG4Xw_UyXkPMIL8uKPp0Q=w240-h480" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-row items-center">
                  <p className="text-sm font-medium">{user?.firstName}</p>
                  <ChevronDown size={20} />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-4">
              <div>
                <ul className="flex flex-col gap-2">
                  <Link href={"/dashboard/profile"} className={"hidden"}>
                    <li className="flex flex-row text-sm">
                      <User size={20} /> <p className="ml-2">Profile</p>
                    </li>
                  </Link>
                  <Link href={"/dashboard/transactions"}>
                    <li className="flex flex-row text-sm">
                      <ArrowLeftRight size={20} />{" "}
                      <p className="ml-2">Transactions</p>
                    </li>
                  </Link>
                  <Link href={"/dashboard"} className="hidden">
                    <li className="flex flex-row text-sm">
                      <Settings size={20} /> <p className="ml-2">Settings</p>
                    </li>
                  </Link>
                  <a href="" className="text-sm hidden">
                    <li className="flex flex-row justify-between items-center text-sm">
                      <div className="flex flex-row">
                        <SunMoon size={20} /> <p className="ml-2">Dark mode</p>
                      </div>
                      <Switch checked={true} />
                    </li>
                  </a>
                  <button onClick={() => logout()}>
                    <li className="flex flex-row text-sm text-red-500">
                      <LogOut size={20} /> <p className="ml-2">Log out</p>
                    </li>
                  </button>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
