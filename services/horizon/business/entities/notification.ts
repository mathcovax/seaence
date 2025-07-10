import { zod } from "@vendors/clean";

export namespace Notification {
	export const base = zod.object({
		id: zod.string(),
		processed: zod.boolean(),
		createdAt: zod.string(),
		deleteAt: zod.string(),
	});

	export const register = base.extend({
		type: zod.literal("registerNotificationType"),
	});

	export const replyToPost = base.extend({
		type: zod.literal("replyToPostNotificationType"),
		postId: zod.string(),
		usernameOfReplyPost: zod.string(),
		summaryOfReplyPost: zod.string(),
	});

	export const postBan = base.extend({
		type: zod.literal("userPostBanNotificationType"),
		postId: zod.string(),
		reason: zod.string(),
		warningId: zod.string(),
	});

	export const postWarning = base.extend({
		type: zod.literal("userPostWarningNotificationType"),
		postId: zod.string(),
		reason: zod.string(),
		warningId: zod.string(),
	});

	export const answerBan = base.extend({
		type: zod.literal("userAnswerBanNotificationType"),
		postId: zod.string(),
		answerId: zod.string(),
		reason: zod.string(),
		warningId: zod.string(),
	});

	export const answerWarning = base.extend({
		type: zod.literal("userAnswerWarningNotificationType"),
		postId: zod.string(),
		answerId: zod.string(),
		reason: zod.string(),
		warningId: zod.string(),
	});

	export const index = zod.union([
		register,
		replyToPost,
		postBan,
		postWarning,
		answerBan,
		answerWarning,
	]);

	export const dateOfLastNotification = zod.object({
		dateOfLastNotification: zod.string(),
	});
}
