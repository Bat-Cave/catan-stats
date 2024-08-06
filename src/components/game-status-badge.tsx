import { GameStatus } from "@/context/appwrite-schemas";
import { cva } from "class-variance-authority";
import { Badge } from "./ui/badge";

const gameStatusBadgeVariants = cva("", {
  variants: {
    status: {
      "in-progress": "bg-green-500 text-neutral-50",
      finished: "bg-blue-500 text-neutral-50",
      "not-started": "bg-neutral-500 text-neutral-50",
      cancelled: "bg-red-500 text-neutral-50",
    },
  },
  defaultVariants: {
    status: "not-started",
  },
});

const statusLabels: Record<GameStatus, string> = {
  cancelled: "Cancelled",
  "in-progress": "In Progress",
  finished: "Finished",
  "not-started": "Not Started",
};

const GameStatusBadge = ({ status }: { status: GameStatus }) => {
  return (
    <Badge className={gameStatusBadgeVariants({ status })}>
      {statusLabels[status]}
    </Badge>
  );
};

export { GameStatusBadge };
