import { type GetValueObject, zod } from "..";

export const booleanObjecter = zod
	.boolean()
	.createValueObjecter("boolean");

export type Boolean = GetValueObject<typeof booleanObjecter>;
