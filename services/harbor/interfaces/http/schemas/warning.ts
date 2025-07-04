import { postIdObjecter } from "@business/domains/common/post";
import { userIdObjecter } from "@business/domains/entities/user";
import { answerUserWarningAnswerIdObjecter } from "@business/domains/entities/warning/answer";
import { userWarningMakeUserBanObjecter, userWarningReasonObjecter } from "@business/domains/entities/warning/base";

const createUserWarning = zod.object({
	makeUserBan: userWarningMakeUserBanObjecter.toZodSchema(),
	reason: userWarningReasonObjecter.toZodSchema(),
	userId: userIdObjecter.toZodSchema(),
});

export const entrypointCreatePostUserWarning = createUserWarning.extend({
	postId: postIdObjecter.toZodSchema(),
});

export const entrypointCreateAnswerUserWarning = createUserWarning.extend({
	postId: postIdObjecter.toZodSchema(),
	answerId: answerUserWarningAnswerIdObjecter.toZodSchema(),
});
