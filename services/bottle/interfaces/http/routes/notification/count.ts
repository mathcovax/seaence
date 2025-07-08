import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { EndpointNotification, EntrypointNotification } from "@interfaces/http/schemas/notification";
import { countNotificationToUserUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-count")
	.extract({
		body: EntrypointNotification.count,
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
		makeResponseContract(OkHttpResponse, "notifications.count", EndpointNotification.count),
	);
