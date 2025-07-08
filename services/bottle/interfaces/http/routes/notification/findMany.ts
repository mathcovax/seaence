import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { EndpointNotification, EntrypointNotification } from "@interfaces/http/schemas/notification";
import { findManyNotificationToUserUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-find-many")
	.extract({
		body: EntrypointNotification.findMany,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const { body: { page, quantityPerPage }, user } = pickup(["body", "user"]);

			const notifications = await findManyNotificationToUserUsecase.execute({
				user,
				page,
				quantityPerPage,
			});

			const simpleNotifications = notifications
				.map(
					(processedNotification) => processedNotification.toSimpleObject(),
				);

			return new OkHttpResponse("notifications.found", simpleNotifications);
		},
		makeResponseContract(OkHttpResponse, "notifications.found", EndpointNotification.findMany),
	);
