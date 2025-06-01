import { warningMakeUserBanObjecter, warningReasonObjecter } from "@business/domains/entities/warning";
import { postWarningPostIdObjecter } from "@business/domains/entities/warning/postWarning";

export const createPostWarning = zod.object({
	type: zod.literal("post"),
	makeUserBan: warningMakeUserBanObjecter.toZodSchema(),
	reason: warningReasonObjecter.toZodSchema(),
	postId: postWarningPostIdObjecter.toZodSchema(),
});

export const entrypointCreateWarning = zod.union([
	createPostWarning,
	zod.never(),
]);
