import { baseInputSchema } from "../input";

export const scienceDirectArticleSchema = baseInputSchema.extend({
	source: zod.literal("ScienceDirect"),
});
