import { type PrimitiveProps } from "reka-ui";
import { type HTMLAttributes } from "vue";
import { type iconSizeMapper, type iconsMapper } from "../icon";
import { type VariantProps, cva } from "class-variance-authority";

export interface DSButtonProps extends PrimitiveProps {
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
	class?: HTMLAttributes["class"];
	type?: string;
	icon?: keyof typeof iconsMapper;
	square?: boolean;
	rounded?: boolean;
}

export const buttonVariants = cva(
	`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
	 ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2
	 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
	 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
	{
		variants: {
			variant: {
				seaence:
					"bg-blue-seaence text-primary-foreground hover:bg-seaence/80",
				primary: "bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				outline:
					"border border-primary bg-background text-primary hover:bg-accent",
				destructive:
					"bg-destructive text-primary-foreground hover:bg-destructive/60",
				ghost: "bg-transparent text-muted-foreground hover:bg-accent/40",
			},
			size: {
				default: "h-10 px-4 py-2",
				full: "w-full h-10 px-4 py-2",
				small: "h-9 rounded-md px-3",
				large: "h-11 rounded-md px-8",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export const buttonIconSizeMapper: Record<Extract<ButtonVariants["size"], string>, keyof typeof iconSizeMapper> = {
	default: "default",
	full: "default",
	small: "small",
	large: "large",
};

export type ButtonVariants = VariantProps<typeof buttonVariants>;
