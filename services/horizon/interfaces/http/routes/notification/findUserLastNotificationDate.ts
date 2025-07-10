import { Notification } from "@business/entities/notification";
import { useMustBeConnectedBuilder } from "@interfaces/http/security/authentication";
import { BottleAPI } from "@interfaces/providers/bottle";
import { match } from "ts-pattern";

useMustBeConnectedBuilder()
	.createRoute("POST", "/notification-last-date-find")
	.cut(
		async({ pickup, dropper }) => {
			const { user } = pickup(["user"]);

			const result = await BottleAPI.findUserLastNotificationDate({
				userId: user.id,
			});

			return match(result)
				.with(
					{ information: "user.notfound" },
					() => new ForbiddenHttpResponse("user.notfound"),
				)
				.with(
					{ information: "notification.noNotification" },
					() => new NoContentHttpResponse("notification.noNotification"),
				)
				.with(
					{ information: "dateOfLastNotification.found" },
					({ body }) => dropper(body),
				)
				.exhaustive();
		},
		["dateOfLastNotification"],
		[
			...makeResponseContract(NoContentHttpResponse, "notification.noNotification"),
			...makeResponseContract(ForbiddenHttpResponse, "user.notfound"),
		],
	)
	.handler(
		(pickup) => {
			const { dateOfLastNotification } = pickup(["dateOfLastNotification"]);

			return new OkHttpResponse("notification.lastDate", { dateOfLastNotification });
		},
		makeResponseContract(OkHttpResponse, "notification.lastDate", Notification.dateOfLastNotification),
	);
