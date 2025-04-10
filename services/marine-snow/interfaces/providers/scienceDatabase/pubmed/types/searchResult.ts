import { ZodAccelerator, zod } from "@duplojs/core";
import { type zodInfer } from "./XML";

export const searchResultPayloadSchema = zod.object({
	esearchresult: zod.object({
		idlist: zod.string().array(),
	}),
});

export const searchResultPayloadBuildedSchema = ZodAccelerator.build(searchResultPayloadSchema);

export type SearchResultPayload = zodInfer<typeof searchResultPayloadSchema>;
