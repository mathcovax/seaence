import type { NotificationList } from "@/lib/horizon/types/notification";
import { match } from "ts-pattern";
import RegisterNotificationCard from "../components/RegisterNotificationCard.vue";
import ReplyToPostNotificationCard from "../components/ReplyToPostNotificationCard.vue";
import AnswerBanNotificationCard from "../components/AnswerBanNotificationCard.vue";
import AnswerWarningNotificationCard from "../components/AnswerWarningNotificationCard.vue";
import PostBanNotificationCard from "../components/PostBanNotificationCard.vue";
import PostWarningNotificationCard from "../components/PostWarningNotificationCard.vue";

export function notificationWrapper(notification: NotificationList[number]) {
	return match(notification)
		.with(
			{ type: "registerNotificationType" },
			(registerNotification) => h(
				RegisterNotificationCard,
				{ registerNotification },
			),
		)
		.with(
			{ type: "replyToPostNotificationType" },
			(replyToPostNotification) => h(
				ReplyToPostNotificationCard,
				{ replyToPostNotification },
			),
		)
		.with(
			{ type: "userAnswerBanNotificationType" },
			(answerBanNotification) => h(
				AnswerBanNotificationCard,
				{ answerBanNotification },
			),
		)
		.with(
			{ type: "userAnswerWarningNotificationType" },
			(answerWarningNotification) => h(
				AnswerWarningNotificationCard,
				{ answerWarningNotification },
			),
		)
		.with(
			{ type: "userPostBanNotificationType" },
			(postBanNotification) => h(
				PostBanNotificationCard,
				{ postBanNotification },
			),
		)
		.with(
			{ type: "userPostWarningNotificationType" },
			(postWarningNotification) => h(
				PostWarningNotificationCard,
				{ postWarningNotification },
			),
		)
		.exhaustive();
}
