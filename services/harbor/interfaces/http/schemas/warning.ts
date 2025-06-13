import { userIdObjecter } from "@business/domains/entities/user";
import { userWarningMakeUserBanObjecter, userWarningReasonObjecter } from "@business/domains/entities/warning/base";
import { postUserWarningPostIdObjecter } from "@business/domains/entities/warning/post";

const createUserWarning = zod.object({
	makeUserBan: userWarningMakeUserBanObjecter.toZodSchema(),
	reason: userWarningReasonObjecter.toZodSchema(),
	userId: userIdObjecter.toZodSchema(),
});

export const entrypointCreatePostUserWarning = createUserWarning.extend({
	postId: postUserWarningPostIdObjecter.toZodSchema(),
});
