"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareDialogProps {
  title: string;
  url: string;
}

export function ShareDialog({ title, url }: ShareDialogProps) {
  const { toast } = useToast();

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard.",
    });
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  };

  const shareByEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(url)}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <LinkIcon className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this post</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={shareToFacebook}
          >
            <Facebook className="h-6 w-6" />
            <span className="text-sm">Facebook</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={shareToLinkedIn}
          >
            <Linkedin className="h-6 w-6" />
            <span className="text-sm">LinkedIn</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4"
            onClick={shareByEmail}
          >
            <Mail className="h-6 w-6" />
            <span className="text-sm">Email</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleCopyLink}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Copy link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
