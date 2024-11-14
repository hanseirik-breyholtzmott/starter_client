"use client";

import React from "react";

//Nextjs
import Link from "next/link";

//Auth
import { useAuth } from "@/app/hooks/AuthContext";

//Shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//Icons
import { ImageIcon, Settings, User } from "lucide-react";

type Props = {};

export default function DashboardCompany({}: Props) {
  //Auth
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAF9F9]">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            U
          </Link>
          <div className="flex items-center gap-2">
            <span>Hans-Eirik</span>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-serif mb-2">
              Velkommen {user?.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Her kan du administrere dine selskaper og aksjer.
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            + Legg til et nytt selskap
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Card */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100" />
                  <div>
                    <h2 className="text-xl font-serif">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  View my portfolio
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company Card */}
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-start gap-4">
                <div className="h-16 w-16 rounded-lg border flex items-center justify-center bg-gray-50">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>

                <h2 className="text-xl font-serif">Breyholtz Holding AS</h2>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-6 w-6 rounded-full border flex items-center justify-center">
                    <Settings size={14} />
                  </div>
                  <div>
                    <p>0 agreements</p>
                    <p>0 shares on agreements</p>
                  </div>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full">
                  Manage company
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
