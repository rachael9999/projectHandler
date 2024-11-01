"use client";

import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modals";
import { CardWithList } from "@/types";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";
import { ToDo } from "./to-do";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.skeleton /> : <Header data={cardData} />}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              <div>
                {cardData ? <ToDo data={cardData} /> : <ToDo.Skeleton />}
              </div>
              {!auditLogData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogData} />
              )}
            </div>
          </div>

          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};