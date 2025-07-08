import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { countNotificationToUserUsecase } from "@interfaces/usecases";
import { NotificationRoute } from "@interfaces/http/schemas/notification";

useBuilder()
	.createRoute("POST", "/notification-count")
	.extract({
		body: NotificationRoute.count.entrypoint,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const { user } = pickup(["user"]);

			const countNotification = await countNotificationToUserUsecase.execute({ user });

			return new OkHttpResponse("notifications.count", { count: countNotification.value });
		},
		makeResponseContract(OkHttpResponse, "notifications.count", NotificationRoute.count.endpoint),
	);
