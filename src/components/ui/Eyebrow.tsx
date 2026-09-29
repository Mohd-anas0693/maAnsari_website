import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label. The counterweight to the oversized display type. */
export function Eyebrow({
  children,
  className,
  withRule = true,
}: {
  children: ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-4", className)}>
      {withRule ? (
        <span aria-hidden="true" className="h-px w-8 bg-brass/60" />
      ) : null}
      {children}
    </p>
  );
}
