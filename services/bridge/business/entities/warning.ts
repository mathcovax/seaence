import { zod } from "@vendors/clean";

export namespace Warning {
	const base = zod.object({
		makeUserBan: zod.boolean(),
		reason: zod.string(),
		userId: zod.string(),
	});

	export const entrypointCreate = base.extend({
		postId: zod.string(),
	});
}
