import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Dispatch, SetStateAction } from "react";

export function DetailCard({
  showCard,
  setShowCard,
  mission,
}: {
  showCard: boolean;
  setShowCard: Dispatch<SetStateAction<boolean>>;
  mission: any;
}) {
  return (
    <Dialog open={showCard} onOpenChange={setShowCard}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {mission?.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this launch
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {mission?.links.patch.large && (
            <img
              src={mission?.links.patch.large}
              alt={`${mission?.name} patch`}
              className="w-40 h-40 object-contain mx-auto"
            />
          )}

          <p className="text-sm dark:text-gray-300 text-zinc-800">
            {mission?.details || "No details available."}
          </p>

          <p className="text-sm">
            <strong>Rocket:</strong> {mission?.rocket}
          </p>

          <div className="flex gap-4">
            {mission?.links.wikipedia && (
              <a
                href={mission?.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Wikipedia
              </a>
            )}
            {mission?.links.webcast && (
              <a
                href={mission?.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Webcast
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
