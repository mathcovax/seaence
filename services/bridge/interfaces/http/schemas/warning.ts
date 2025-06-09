const createUserWarning = zod.object({
	makeUserBan: zod.boolean(),
	reason: zod.string(),
	userId: zod.string(),
});

export const entrypointCreatePostWarning = createUserWarning.extend({
	postId: zod.string(),
});
