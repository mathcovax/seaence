import { userIdObjecter } from "@business/domains/entities/user";
import { userWarningBaseMakeUserBanObjecter, userWarningBaseReasonObjecter } from "@business/domains/entities/warning/base";
import { postUserWarningPostIdObjecter } from "@business/domains/entities/warning/post";

const createUserWarning = zod.object({
	makeUserBan: userWarningBaseMakeUserBanObjecter.toZodSchema(),
	reason: userWarningBaseReasonObjecter.toZodSchema(),
	authorId: userIdObjecter.toZodSchema(),
});

export const entrypointCreatePostUserWarning = createUserWarning.extend({
	postId: postUserWarningPostIdObjecter.toZodSchema(),
});
