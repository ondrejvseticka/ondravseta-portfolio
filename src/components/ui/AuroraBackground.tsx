import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("aurora-bg", className)} aria-hidden>
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
