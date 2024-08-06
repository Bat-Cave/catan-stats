import { GameStatus } from "@/context/appwrite-schemas";
import { cva } from "class-variance-authority";
import { Badge } from "./ui/badge";

const gameStatusBadgeVariants = cva("", {
  variants: {
    status: {
      "in-progress": "bg-emerald-500 hover:bg-emerald-600 text-neutral-50",
      finished: "bg-violet-500 hover:bg-violet-600 text-neutral-50",
      "not-started": "bg-indigo-500 hover:bg-indigo-600 text-neutral-50",
      cancelled: "bg-red-500 hover:bg-red-600 text-neutral-50",
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
