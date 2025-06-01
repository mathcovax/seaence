import { type GetValueObject } from "@vendors/clean";
import { operatorContentSchema } from "@vendors/types-advanced-query";

export const equationObjecter = operatorContentSchema.createValueObjecter("equation");
export type Equation = GetValueObject<typeof equationObjecter>;
