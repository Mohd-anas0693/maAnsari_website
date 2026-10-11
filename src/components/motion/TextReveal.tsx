import { cn } from "@/lib/cn";

/**
 * A heading whose lines rise from behind their own baseline.
 *
 * Server-rendered, with the motion carried by a named `view()` timeline on
 * each line's clipping box (see `.mask-line` in globals.css). The timeline is
 * named on the wrapper rather than read from the moving span, because the
 * span travels further than its own height.
 *
 * Lines are real text nodes in the HTML — nothing is injected on the client,
 * so crawlers and screen readers see the complete heading whether or not the
 * animation ever runs.
 */
export function TextReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  id,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  id?: string;
}) {
  return (
    <Tag id={id} data-reveal-mask className={className}>
      {lines.map((line, index) => (
        <span key={index} className={cn("mask-line", lineClassName)}>
          <span data-mask-line>
            {line}
            {/* A trailing space keeps the accessible text readable when a
                screen reader concatenates the lines. */}
            {index < lines.length - 1 ? " " : null}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Splits a sentence into lines at a marker, for convenience in content. */
export function splitLines(text: string, marker = " / "): string[] {
  return text.split(marker).map((line) => line.trim()).filter(Boolean);
}
