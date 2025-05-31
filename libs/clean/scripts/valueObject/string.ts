import { z as zod } from "zod";
import { type GetValueObject } from "../valueObject";

export const urlObjecter = zod
	.string()
	.url()
	.createValueObjecter("url");

export type Url = GetValueObject<typeof urlObjecter>;

export const emailObjecter = zod
	.string()
	.email()
	.createValueObjecter("email");

export type Email = GetValueObject<typeof emailObjecter>;

export const textObjecter = zod
	.string()
	.createValueObjecter("text");

export type Text = GetValueObject<typeof textObjecter>;

