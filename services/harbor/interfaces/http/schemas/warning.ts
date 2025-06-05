import { userIdObjecter } from "@business/domains/entities/user";
import { baseUserWarningMakeUserBanObjecter, baseUserWarningReasonObjecter } from "@business/domains/entities/warning/base";
import { postUserWarningPostIdObjecter } from "@business/domains/entities/warning/post";

const createUserWarning = zod.object({
	makeUserBan: baseUserWarningMakeUserBanObjecter.toZodSchema(),
	reason: baseUserWarningReasonObjecter.toZodSchema(),
	authorId: userIdObjecter.toZodSchema(),
});

export const entrypointCreatePostUserWarning = createUserWarning.extend({
	postId: postUserWarningPostIdObjecter.toZodSchema(),
});
