import { answerIdObjecter } from "@business/domains/common/answer";
import { postIdObjecter } from "@business/domains/common/post";
import { warningIdObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { notificationIdObjecter, processedObjecter } from "@business/domains/entities/notification/base";
import { registerNotificationTypeObjecter } from "@business/domains/entities/notification/register";
import { replyToPostNotificationTypeObjecter, summaryOfReplyPostObjecter } from "@business/domains/entities/notification/replyToPost";
import { userAnswerBanNotificationTypeObjecter } from "@business/domains/entities/notification/userAnswerBan";
import { userAnswerWarningNotificationTypeObjecter } from "@business/domains/entities/notification/userAnswerWarning";
import { userPostBanNotificationTypeObjecter } from "@business/domains/entities/notification/userPostBan";
import { userPostWarningNotificationTypeObjecter } from "@business/domains/entities/notification/userPostWarning";
import { userEmailObjecter, userIdObjecter, userLanguageObjecter, usernameObjecter } from "@business/domains/entities/user";
import { commonDateObjecter, intObjecter, positiveIntObjecter } from "@vendors/clean";

const baseNotificatinSchema = zod.object({
	id: notificationIdObjecter.zodSchema,
	user: zod.object({
		id: userIdObjecter.zodSchema,
		username: usernameObjecter.zodSchema,
		email: userEmailObjecter.zodSchema,
		language: userLanguageObjecter.zodSchema,
	}),
	processed: processedObjecter.zodSchema,
	createdAt: commonDateObjecter.zodSchema,
	deleteAt: commonDateObjecter.zodSchema,
});

const registerNotificationSchema = baseNotificatinSchema.extend({
	type: registerNotificationTypeObjecter.zodSchema,
});

const replyToPostNotificationSchema = baseNotificatinSchema.extend({
	postId: postIdObjecter.zodSchema,
	usernameOfReplyPost: usernameObjecter.zodSchema,
	summaryOfReplyPost: summaryOfReplyPostObjecter.zodSchema,
	type: replyToPostNotificationTypeObjecter.zodSchema,
});

const userPostBanNotificationSchema = baseNotificatinSchema.extend({
	type: userPostBanNotificationTypeObjecter.zodSchema,
	postId: postIdObjecter.zodSchema,
	reason: warningReasonObjecter.zodSchema,
	warningId: warningIdObjecter.zodSchema,
});

const userPostWarningNotificationSchema = baseNotificatinSchema.extend({
	type: userPostWarningNotificationTypeObjecter.zodSchema,
	postId: postIdObjecter.zodSchema,
	reason: warningReasonObjecter.zodSchema,
	warningId: warningIdObjecter.zodSchema,
});

const userAnswerBanNotificationSchema = baseNotificatinSchema.extend({
	type: userAnswerBanNotificationTypeObjecter.zodSchema,
	postId: postIdObjecter.zodSchema,
	answerId: answerIdObjecter.zodSchema,
	reason: warningReasonObjecter.zodSchema,
	warningId: warningIdObjecter.zodSchema,
});

const userAnswerWarningNotificationSchema = baseNotificatinSchema.extend({
	type: userAnswerWarningNotificationTypeObjecter.zodSchema,
	postId: postIdObjecter.zodSchema,
	answerId: answerIdObjecter.zodSchema,
	reason: warningReasonObjecter.zodSchema,
	warningId: warningIdObjecter.zodSchema,
});

export namespace EntrypointNotification {
	export const postWarning = zod.object({
		userId: userIdObjecter.toZodSchema(),
		warningId: warningIdObjecter.toZodSchema(),
		postId: postIdObjecter.toZodSchema(),
		reason: warningReasonObjecter.toZodSchema(),
	});

	export const postBan = zod.object({
		userId: userIdObjecter.toZodSchema(),
		warningId: warningIdObjecter.toZodSchema(),
		postId: postIdObjecter.toZodSchema(),
		reason: warningReasonObjecter.toZodSchema(),
	});

	export const answerWarning = zod.object({
		userId: userIdObjecter.toZodSchema(),
		warningId: warningIdObjecter.toZodSchema(),
		postId: postIdObjecter.toZodSchema(),
		answerId: answerIdObjecter.toZodSchema(),
		reason: warningReasonObjecter.toZodSchema(),
	});

	export const answerBan = zod.object({
		userId: userIdObjecter.toZodSchema(),
		warningId: warningIdObjecter.toZodSchema(),
		postId: postIdObjecter.toZodSchema(),
		answerId: answerIdObjecter.toZodSchema(),
		reason: warningReasonObjecter.toZodSchema(),
	});

	export const findMany = zod.object({
		userId: userIdObjecter.toZodSchema(),
		page: intObjecter.toZodSchema(),
		quantityPerPage: positiveIntObjecter.toZodSchema(),
	});

	export const count = zod.object({
		userId: userIdObjecter.toZodSchema(),
	});

	export const dateFindLast = zod.object({
		userId: userIdObjecter.toZodSchema(),
	});
}
export namespace EndpointNotification {
	export const findMany = zod.union([
		registerNotificationSchema,
		replyToPostNotificationSchema,
		userPostBanNotificationSchema,
		userPostWarningNotificationSchema,
		userAnswerBanNotificationSchema,
		userAnswerWarningNotificationSchema,
	]).array();

	export const count = zod.object({
		count: zod.number(),
	});

	export const dateFindLast = zod.object({
		dateOfLastNotification: zod.date(),
	});
}
