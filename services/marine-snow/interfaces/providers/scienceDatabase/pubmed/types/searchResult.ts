import { ZodAccelerator, type ZodSpace, zod } from "@duplojs/core";

export const searchResultPayloadSchema = zod.object({
	esearchresult: zod.object({
		idlist: zod.string().array(),
	}),
});

export const searchResultPayloadBuildedSchema = ZodAccelerator.build(searchResultPayloadSchema);

export type SearchResultPayload = ZodSpace.infer<typeof searchResultPayloadSchema>;
