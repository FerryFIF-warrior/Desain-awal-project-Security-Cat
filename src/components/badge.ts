import { cva, type VariantProps } from "class-variance-authority";

// Komponen Badge varian CVA pola ownership (Modul 3-4)
export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        LOW: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        MEDIUM: "border-transparent bg-amber-500/15 text-amber-700 border border-amber-500/30",
        HIGH: "border-transparent bg-destructive/15 text-destructive border border-destructive/30 font-bold",
      },
    },
    defaultVariants: {
      variant: "LOW",
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export function renderBadge(priority: "LOW" | "MEDIUM" | "HIGH"): string {
  const className = badgeVariants({ variant: priority });
  return `<span class="${className}">Prioritas: ${priority}</span>`;
}
