import { userIdObjecter } from "@business/domains/entities/user";
import { countNotificationToUserUsecase, findManyNotificationToUserUsecase } from "@interfaces/usecases";
import { intObjecter, positiveIntObjecter } from "@vendors/clean";
import { endpointCountNotification, endpointFindNotification } from "../schemas/notification";
import { IWantUserExistsById } from "../checkers/user";

useBuilder()
	.createRoute("POST", "/find-notifications")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
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

			return new OkHttpResponse("notications.found", simpleNotifications);
		},
		makeResponseContract(OkHttpResponse, "notications.found", endpointFindNotification),
	);

useBuilder()
	.createRoute("POST", "/count-notification")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const { user } = pickup(["user"]);

			const countNotification = await countNotificationToUserUsecase.execute({ user });

			return new OkHttpResponse("notications.count", { count: countNotification.value });
		},
		makeResponseContract(OkHttpResponse, "notications.count", endpointCountNotification),
	);
