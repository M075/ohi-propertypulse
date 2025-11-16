// assets/components/ChatWithSellerButton.jsx
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader2 } from "lucide-react";
import { toast } from "@/components/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function ChatWithSellerButton({ 
  sellerId, 
  productId, 
  storeId,
  productTitle,
  className = "",
  variant = "default",
  size = "default",
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStartChat = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to message sellers",
        variant: "destructive",
      });
      router.push("/auth/signin");
      return;
    }

    if (session.user.id === sellerId) {
      toast({
        title: "Cannot message yourself",
        description: "This is your own product/store",
        variant: "destructive",
      });
      return;
    }

    setOpen(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: sellerId,
          content: message.trim(),
          productId: productId || undefined,
          storeId: storeId || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast({
          title: "Message sent",
          description: "Your message has been sent successfully. See your messages on your profile.",
        });
        setOpen(false);
        setMessage("");
        // Redirect to messages with conversation selected
        // router.push(`/dashboard/messages?conversation=${data.conversation._id}`);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleStartChat}
        className={className}
        variant={variant}
        size={size}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Chat with Seller
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] sm:w-full max-h-[90vh] shadow-lg backdrop-blur-md bg-zinc-100/20 dark:bg-zinc-900/20 sm:max-h-none border-none rounded-lg sm:rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Send Message</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              {productTitle 
                ? `Send a message about "${productTitle}"`
                : "Send a message to the seller"
              }
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 max-h-[40vh] sm:max-h-none">
            <Textarea
              placeholder="Hi, I'm interested in this product..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none text-sm sm:text-base"
            />
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setMessage("");
              }}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendMessage} 
              disabled={loading || !message.trim()}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}