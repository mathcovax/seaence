import { baseInputSchema } from "../base";
import { zod } from "@vendors/clean";

export const scienceDirectArticleSchema = baseInputSchema.extend({
	source: zod.literal("ScienceDirect"),
});
