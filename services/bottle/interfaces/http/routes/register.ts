import { RegisterNotificationEntity } from "@business/domains/entities/notification/register";
import { userIdObjecter } from "@business/domains/entities/user";
import { createAndSendRegisterNotificationUsecase } from "@interfaces/usecases";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-register-notification")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { userId } = pickup("body");

			const result = await createAndSendRegisterNotificationUsecase.execute({ userId });

			return match({ result })
				.with(
					{ result: { information: "user-not-exist" } },
					() => new NotFoundHttpResponse("user.notfound"),
				)
				.with(
					{ result: P.instanceOf(RegisterNotificationEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(NotFoundHttpResponse, "user.notfound"),
	)
	.handler(
		() => new OkHttpResponse("notification.sent"),
		makeResponseContract(OkHttpResponse, "notification.sent"),
	);
