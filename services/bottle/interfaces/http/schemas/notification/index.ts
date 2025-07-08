import { userIdObjecter } from "@business/domains/entities/user";
import { intObjecter, positiveIntObjecter } from "@vendors/clean";
import { registerNotificationSchema } from "./register";
import { replyToPostNotificationSchema } from "./replyToPost";
import { userPostBanNotificationSchema } from "./postBan";
import { userPostWarningNotificationSchema } from "./postWarning";
import { userAnswerBanNotificationSchema } from "./answerBan";
import { userAnswerWarningNotificationSchema } from "./answerWarning";

export namespace NotificationRoute {
	export const findMany = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
		endpoint: zod.union([
			registerNotificationSchema,
			replyToPostNotificationSchema,
			userPostBanNotificationSchema,
			userPostWarningNotificationSchema,
			userAnswerBanNotificationSchema,
			userAnswerWarningNotificationSchema,
		]).array(),
	};

	export const count = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
		}),
		endpoint: zod.object({
			count: zod.number(),
		}),
	};

	export const findLastDate = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
		}),
		endpoint: zod.object({
			dateOfLastNotification: zod.date(),
		}),
	};
}
