import { zod } from "@vendors/clean";
import { endpointArticleSchema } from "./article";
import { endpointUserSchema } from "./user";

export const endpointPostSchema = zod.object({
	id: zod.string(),
	topic: zod.string(),
	content: zod.string(),
	article: endpointArticleSchema,
	author: endpointUserSchema,
});
