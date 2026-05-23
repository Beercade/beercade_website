import { cn } from "@/lib/utils/cn";

type MachineStatus = "working" | "maintenance" | "down";
type EventStatus = "upcoming" | "live" | "wrapped" | "cancelled";

const machineLabels: Record<MachineStatus, string> = {
  working: "Working",
  maintenance: "Under maintenance",
  down: "Down",
};

const eventLabels: Record<EventStatus, string> = {
  upcoming: "Upcoming",
  live: "On now",
  wrapped: "Wrapped",
  cancelled: "Cancelled",
};

const machineStyles: Record<MachineStatus, string> = {
  working: "bg-tilt-purple/20 text-crema",
  maintenance: "bg-high-score-orange/20 text-high-score-orange",
  down: "bg-after-dark text-crema/50",
};

const eventStyles: Record<EventStatus, string> = {
  upcoming: "bg-tilt-purple/20 text-crema",
  live: "bg-high-score-orange text-after-dark",
  wrapped: "bg-after-dark text-crema/50",
  cancelled: "bg-after-dark text-crema/50",
};

interface StatusPillProps {
  status: MachineStatus | EventStatus;
  kind?: "machine" | "event";
  className?: string;
}

export function StatusPill({
  status,
  kind = "machine",
  className,
}: StatusPillProps) {
  const label =
    kind === "machine"
      ? machineLabels[status as MachineStatus]
      : eventLabels[status as EventStatus];

  const style =
    kind === "machine"
      ? machineStyles[status as MachineStatus]
      : eventStyles[status as EventStatus];

  return (
    <span
      className={cn(
        "inline-block rounded-sm px-2 py-0.5 font-body text-xs font-medium",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
