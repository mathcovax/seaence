import { type GetValueObject, zod } from "@vendors/clean";

export const answerIdObjecter = zod.string().createValueObjecter("answerId");
export type AnswerId = GetValueObject<typeof answerIdObjecter>;
