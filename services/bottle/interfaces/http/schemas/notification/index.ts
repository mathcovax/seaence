import { userIdObjecter } from "@business/domains/entities/user";
import { intObjecter, positiveIntObjecter } from "@vendors/clean";
import { RegisterNotificationSchema } from "./register";
import { ReplyToPostNotificationSchema } from "./replyToPost";
import { PostBanNotificationSchema } from "./postBan";
import { PostWarningNotificationRoute } from "./postWarning";
import { AnswerBanNotificationSchema } from "./answerBan";
import { AnswerWarningNotificationSchema } from "./answerWarning";

export namespace NotificationSchema {
	export const findMany = {
		entrypoint: zod.object({
			userId: userIdObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
		endpoint: zod.union([
			RegisterNotificationSchema.index,
			ReplyToPostNotificationSchema.index,
			PostBanNotificationSchema.index,
			PostWarningNotificationRoute.index,
			AnswerBanNotificationSchema.index,
			AnswerWarningNotificationSchema.index,
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
