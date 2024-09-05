"use client";

import React, { useEffect } from "react";
import Image from "next/image";

//Shadn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

//Icons
import { PencilLine, Upload } from "lucide-react";
import { useAuthContext } from "@/app/hooks/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

type Props = {};

const UserProfile = (props: Props) => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [notifyAbout, setNotifyAbout] = useState("all");
  const [emailSettings, setEmailSettings] = useState({
    communication: false,
    marketing: false,
    social: true,
    security: true,
  });
  const [mobileSettings, setMobileSettings] = useState(false);

  const handleEmailSettingChange = (setting: string) => {
    console.log("test");
  };
  const { user } = useAuthContext();

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get("/healthcheck", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [user]);

  return (
    <Tabs defaultValue="profile">
      <div className="flex flex-row w-full justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Profile</h2>
      </div>
      <section className="flex flex-wrap bg-white w-full rounded-lg p-4">
        <div className="grid grid-cols-[200px_1fr] w-full gap-4">
          <div className="">
            <TabsList className="flex flex-col h-auto items-stretch justify-start rounded-md bg-muted p-1 text-muted-foreground w-48 space-y-4">
              <TabsTrigger
                value="profile"
                className="justify-start px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm mb-1"
              >
                My Profile
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="justify-start px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm mb-1"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notification"
                className="justify-start px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Notification
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="justify-start px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="delete"
                className="justify-start px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Delete Account
              </TabsTrigger>
            </TabsList>
          </div>

          <div className=" w-full flex flex-col space-y-4">
            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 relative">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Profile picture"
                      />
                      <AvatarFallback>HB</AvatarFallback>
                    </Avatar>
                    <Button>Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        defaultValue={user?.firstName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        defaultValue={user?.lastName}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      defaultValue={user?.email}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and password here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notification" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Notify me about...
                      </h4>
                      <RadioGroup
                        value={notifyAbout}
                        onValueChange={setNotifyAbout}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">All new messages</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="direct" id="direct" />
                          <Label htmlFor="direct">
                            Direct messages and mentions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="none" />
                          <Label htmlFor="none">Nothing</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-4">
                        Email Notifications
                      </h4>
                      <div className="space-y-4">
                        {Object.entries(emailSettings).map(([key, value]) => (
                          <Card
                            key={key}
                            className="flex justify-between items-center p-4"
                          >
                            <div>
                              <Label
                                htmlFor={key}
                                className="text-sm font-medium"
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                                emails
                              </Label>
                              <p className="text-sm text-gray-500">
                                Receive emails about your account activity and
                                security.
                              </p>
                            </div>
                            <Switch
                              id={key}
                              checked={value}
                              onCheckedChange={() =>
                                handleEmailSettingChange(key)
                              }
                            />
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="">Update notifications</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </section>
    </Tabs>
  );
};

export default UserProfile;
