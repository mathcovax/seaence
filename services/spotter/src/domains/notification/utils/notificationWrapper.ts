import type { NotificationList } from "@/lib/horizon/types/notification";
import { match } from "ts-pattern";
import RegisterNotificationCard from "../components/RegisterNotificationCard.vue";
import ReplyToPostNotificationCard from "../components/ReplyToPostNotificationCard.vue";

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
			() => null,
		)
		.with(
			{ type: "userAnswerWarningNotificationType" },
			() => null,
		)
		.with(
			{ type: "userPostBanNotificationType" },
			() => null,
		)
		.with(
			{ type: "userPostWarningNotificationType" },
			() => null,
		)
		.exhaustive();
}
