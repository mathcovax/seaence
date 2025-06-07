const createUserWarning = zod.object({
	makeUserBan: zod.boolean(),
	reason: zod.string(),
	authorId: zod.string(),
});

export const entrypointCreatePostWarning = createUserWarning.extend({
	postId: zod.string(),
});
