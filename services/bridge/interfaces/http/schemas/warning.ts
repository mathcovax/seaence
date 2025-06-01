export const createWarningSchema = zod.object({
	makeUserBan: zod.boolean(),
	reason: zod.string(),
});

export const createPostWarningSchema = createWarningSchema.extend({
	type: zod.literal("post"),
	postId: zod.string(),
});

export const entrypointCreateWarning = zod.union([
	createPostWarningSchema,
	zod.never(),
]);
