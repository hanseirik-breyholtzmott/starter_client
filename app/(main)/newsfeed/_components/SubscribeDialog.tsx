"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function SubscribeDialog() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the subscription
    toast({
      title: "Subscription successful",
      description: "You will now receive updates from Elmera Group.",
    });
    setEmail("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Follow
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to Elmera Group Updates</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubscribe} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email address
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            You can unsubscribe at any time.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
