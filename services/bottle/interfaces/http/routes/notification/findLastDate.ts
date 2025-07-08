import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { NotificationRoute } from "@interfaces/http/schemas/notification";
import { findUserLastNotificationDateUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-date-find-last")
	.extract({
		body: NotificationRoute.findLastDate.entrypoint,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { user } = pickup(["user"]);

			const result = await findUserLastNotificationDateUsecase.execute({
				user,
			});

			if (!result) {
				return new NoContentHttpResponse("notification.noNotification");
			}

			return dropper({ dateOfLastNotification: result });
		},
		["dateOfLastNotification"],
		makeResponseContract(NoContentHttpResponse, "notification.noNotification"),
	)
	.handler(
		(pickup) => {
			const { dateOfLastNotification } = pickup(["dateOfLastNotification"]);

			return new OkHttpResponse(
				"dateOfLastNotification.found",
				{
					dateOfLastNotification,
				},
			);
		},
		makeResponseContract(OkHttpResponse, "dateOfLastNotification.found", NotificationRoute.findLastDate.endpoint),
	);
