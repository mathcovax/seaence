import { z as zod } from "zod";
import { type GetValueObject } from "../valueObject";

export const intObjecter = zod
	.number()
	.int()
	.createValueObjecter("int");

export type Int = GetValueObject<typeof intObjecter>;
