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
import { Copy, Check, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function ReferralDialog() {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const referralCode = "8fad7094";
  const referralLink = "https://firi.com/ref/8fad7094";

  const copyToClipboard = async (text: string, isLink: boolean = false) => {
    await navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] hover:text-[#59C9B9]/80"
        >
          Verv en venn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Verv en venn</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <p className="text-center text-muted-foreground">
            Få 100 kr i bitcoin og gi din venn 55 kr i velkomstbonus
          </p>
          <p className="text-sm text-center text-muted-foreground">
            Du mottar vervebonusen når den du verver har registrert seg med
            koden din og verifisert seg med BankID.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Les mer her
            </a>
          </p>

          <div className="flex justify-center">
            <Image
              src="/qr-code.png"
              alt="QR Code"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Din vervekode</p>
              <div className="flex-1 flex items-center justify-end space-x-2">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {referralCode}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(referralCode)}
                >
                  <AnimatePresence>
                    {copied ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => copyToClipboard(referralLink, true)}
          >
            <AnimatePresence>
              {copiedLink ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Kopiert!
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Kopier vervelenke
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
