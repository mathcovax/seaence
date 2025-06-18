import { createEnum, zod } from "@vendors/clean";

export namespace Provider {
	export const indexEnum = createEnum(["pubmed"]);

	export const index = zod
		.enum(indexEnum.toTuple());
}
