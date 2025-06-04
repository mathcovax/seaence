import { type VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
	`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
	 ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 
	 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
	 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground hover:bg-primary/80",
				destructive:
					"bg-destructive text-primary-foreground hover:bg-destructive/60",
				outline:
					"border border-primary bg-background text-primary hover:bg-accent",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				seaence:
					"bg-blue-seaence text-primary-foreground hover:bg-seaence/80",
				ghost: "bg-transparent text-muted-foreground hover:bg-accent/40",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-4 py-2",
				full: "w-full h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
