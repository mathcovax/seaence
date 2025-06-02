import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { ReplyToPostNotificationEntity } from "@business/domains/entities/notification/replyToPost";
import { userIdObjecter } from "@business/domains/entities/user";
import { findProcessedNotificationToUserUsecase } from "@interfaces/usecases";
import { type EntityToSimpleObject, intObjecter, positiveIntObjecter } from "@vendors/clean";
import { match, P } from "ts-pattern";
import { endpointFindProcessedNotification } from "../schemas/notification";

// revoir avec @mathcovax

type SimpleNotification =
	| EntityToSimpleObject<typeof RegisterNotificationEntity>
	| EntityToSimpleObject<typeof ReplyToPostNotificationEntity>;

useBuilder()
	.createRoute("POST", "/find-processed-notification")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			page: intObjecter.toZodSchema(),
			quantityPerPage: positiveIntObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, page, quantityPerPage } = pickup("body");

			const processedNotifications = await findProcessedNotificationToUserUsecase.execute({
				userId,
				page,
				quantityPerPage,
			});

			const simpleProcessedNotifications = processedNotifications
				.map(
					(processedNotification) => match({ processedNotification })
						.returnType<SimpleNotification>()
						.with(
							{ processedNotification: P.instanceOf(RegisterNotificationEntity) },
							({ processedNotification }) => processedNotification.toSimpleObject(),
						)
						.with(
							{ processedNotification: P.instanceOf(ReplyToPostNotificationEntity) },
							({ processedNotification }) => processedNotification.toSimpleObject(),
						)
						.exhaustive(),
				);

			return new OkHttpResponse("notications.found", simpleProcessedNotifications);
		},
		makeResponseContract(OkHttpResponse, "notications.found", endpointFindProcessedNotification),
	);
