import { userIdObjecter } from "@business/domains/entities/user";
import { countNotificationToUserUsecase, createUserPostBanNotificationUsecase, createUserPostWarningNotificationUsecase, findManyNotificationToUserUsecase } from "@interfaces/usecases";
import { intObjecter, positiveIntObjecter } from "@vendors/clean";
import { endpointCountNotification, endpointFindNotification, entrypointPostNotification } from "../schemas/notification";
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

			return new OkHttpResponse("notifications.found", simpleNotifications);
		},
		makeResponseContract(OkHttpResponse, "notifications.found", endpointFindNotification),
	);

useBuilder()
	.createRoute("POST", "/count-notifications")
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

			return new OkHttpResponse("notifications.count", { count: countNotification.value });
		},
		makeResponseContract(OkHttpResponse, "notifications.count", endpointCountNotification),
	);

useBuilder()
	.createRoute("POST", "/create-post-warning-notification")
	.extract({
		body: entrypointPostNotification,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const {
				body: {
					warningId,
					postId,
					reason,
				},
				user,
			} = pickup(["body", "user"]);

			await createUserPostWarningNotificationUsecase.execute({
				user,
				warningId,
				postId,
				reason,
			});

			return new CreatedHttpResponse(
				"notification.postWarning.created",
			);
		},
		makeResponseContract(CreatedHttpResponse, "notification.postWarning.created"),
	);

useBuilder()
	.createRoute("POST", "/create-post-ban-notification")
	.extract({
		body: entrypointPostNotification,
	})
	.presetCheck(
		IWantUserExistsById,
		(pickup) => pickup("body").userId,
	)
	.handler(
		async(pickup) => {
			const {
				body: {
					warningId,
					postId,
					reason,
				},
				user,
			} = pickup(["body", "user"]);

			await createUserPostBanNotificationUsecase.execute({
				user,
				warningId,
				postId,
				reason,
			});

			return new CreatedHttpResponse(
				"notification.postBan.created",
			);
		},
		makeResponseContract(CreatedHttpResponse, "notification.postBan.created"),
	);
