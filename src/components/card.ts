import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva("rounded-xl border shadow-sm p-4", {
  variants: {
    variant: {
      default: "bg-white text-slate-800 border-slate-200",
      dark: "bg-[#1c1f2a] text-[#dfe2f1] border-[#262a35]",
      outline: "bg-transparent border-dashed border-slate-300 text-slate-600",
    },
    size: {
      sm: "p-3 text-sm",
      default: "p-4",
      lg: "p-6 text-base",
    },
  },
  defaultVariants: {
    variant: "dark",
    size: "default",
  },
});

export type CardVariantProps = VariantProps<typeof cardVariants>;

export function renderCard(title: string, body: string, opts?: CardVariantProps): string {
  const className = cardVariants({ variant: opts?.variant, size: opts?.size });
  return `<article class="${className}"><h3 class="font-bold mb-1">${title}</h3><div>${body}</div></article>`;
}
