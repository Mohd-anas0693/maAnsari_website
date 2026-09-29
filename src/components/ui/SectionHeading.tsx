import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The standard section opening: label, oversized heading, optional standfirst.
 * Headings are passed as an array of lines so the reveal can treat each line
 * as its own typeset unit. The full text is present in the DOM either way.
 */
export function SectionHeading({
  eyebrow,
  lines,
  as = "h2",
  standfirst,
  align = "left",
  size = "base",
  className,
  children,
}: {
  eyebrow?: string;
  lines: string[];
  as?: "h1" | "h2" | "h3";
  standfirst?: ReactNode;
  align?: "left" | "center";
  size?: "base" | "large" | "small";
  className?: string;
  children?: ReactNode;
}) {
  const sizeClass =
    size === "large" ? "fluid-display" : size === "small" ? "fluid-h3" : "fluid-h2";

  return (
    <div
      className={cn(
        align === "center" ? "text-center items-center" : "items-start",
        "flex flex-col",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal className="mb-8" delay={0}>
          <Eyebrow withRule={align !== "center"}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <TextReveal as={as} lines={lines} className={sizeClass} delay={80} />

      {standfirst ? (
        <Reveal
          className={cn(
            "prose-editorial mt-8 max-w-[46ch]",
            align === "center" && "mx-auto",
          )}
          delay={220}
        >
          {standfirst}
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
