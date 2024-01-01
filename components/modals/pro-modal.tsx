"use client";
import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
export const ProModal = () => {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative">
          <Image src="/pro.png" alt="pro" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-4 p-0 mt-0 text-xl mb-4">
          <h2>Upgrade to Streamline Pro Today</h2>
        </div>
        <Button
          disabled={isLoading}
          onClick={onClick}
          className="w-full"
          variant="primary"
        >
          Upgrade
        </Button>
      </DialogContent>
    </Dialog>
  );
};
