import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The house button. Square corners, hairline borders, generous letter-spacing.
 * No shadows, no gradients, no rounded pills — those read as software, and
 * this is a tailoring house.
 */

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "base" | "large" | "small";

const base =
  "group relative inline-flex items-center justify-center gap-3 " +
  "font-sans font-medium uppercase tracking-[0.16em] " +
  "transition-colors duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ivory text-ink-950 hover:bg-champagne border border-ivory hover:border-champagne",
  outline:
    "border border-hairline-strong text-ivory hover:border-champagne hover:text-champagne",
  ghost: "text-bone hover:text-ivory",
  link:
    "text-champagne underline underline-offset-[0.35em] decoration-1 " +
    "decoration-champagne/40 hover:decoration-champagne px-0 py-0 tracking-[0.12em]",
};

const sizes: Record<Size, string> = {
  small: "px-5 py-2.5 text-[0.6875rem]",
  base: "px-7 py-4 text-[0.75rem]",
  large: "px-9 py-5 text-[0.8125rem]",
};

export interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Trailing rule that extends on hover. Omit for compact contexts. */
  withRule?: boolean;
}

function content(children: ReactNode, withRule: boolean) {
  return (
    <>
      <span>{children}</span>
      {withRule ? (
        <span
          aria-hidden="true"
          className="h-px w-5 bg-current opacity-50 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-8 group-hover:opacity-100"
        />
      ) : null}
    </>
  );
}

export type ButtonLinkProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export function ButtonLink({
  variant = "primary",
  size = "base",
  className,
  children,
  withRule = false,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "link" ? "" : sizes[size],
    className,
  );

  // External links and anchors bypass the router.
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {content(children, withRule)}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content(children, withRule)}
    </Link>
  );
}

export type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "base",
  className,
  children,
  withRule = false,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {content(children, withRule)}
    </button>
  );
}
