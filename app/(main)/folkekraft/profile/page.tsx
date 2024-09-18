import Image from "next/image";
import { Settings, Facebook, Instagram, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="bg-white">
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="h-[100px] w-[100px] bg-blue-600 border-4 border-white rounded-md"></div>
              <div>
                <h1 className="text-6xl font-bold">
                  Hans-Eirik Breyholtz-Mott
                </h1>
                <p className="text-sm my-4">
                  <span>Investor & kunde siden 2023</span>
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-[#00a86b] text-white">INVESTOR</Badge>
                  <Button variant="ghost" size="icon">
                    <Facebook size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Instagram size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Link size={20} />
                  </Button>
                </div>
                <div className="mt-4">
                  <h2 className="font-semibold">Bio</h2>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-[#0a2351] bg-blue-600"
            >
              <Settings className="mr-2 h-4 w-4" /> Rediger profil
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 mb-14">
        <h2 className="text-2xl font-bold mb-4">
          Investeringer & kundeforhold
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="w-full h-[200px] bg-blue-600 rounded-md"></div>

              <div className="mt-4">
                <h3 className="font-bold text-lg flex flex-row items-center gap-2">
                  Folkeinvest <Badge>1st</Badge>
                </h3>
                <p className="text-sm text-gray-600">
                  Advanced savings tool helping our customers +...
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Republic Funding Portal · Reg CF
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="w-full h-[200px] bg-blue-600 rounded-md"></div>

              <div className="mt-4">
                <h3 className="font-bold text-lg flex flex-row items-center gap-2">
                  Folkeinvest <Badge>1st</Badge>
                </h3>
                <p className="text-sm text-gray-600">
                  Advanced savings tool helping our customers +...
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Republic Funding Portal · Reg CF
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
