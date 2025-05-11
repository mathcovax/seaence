import { userEmailObjecter, userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { createAndSendRegisterUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/create-register-notification")
	.extract({
		body: zod.object({
			userId: userIdObjecter.toZodSchema(),
			userEmail: userEmailObjecter.toZodSchema(),
			username: usernameObjecter.toZodSchema(),
		}),
	})
	.handler(
		async(pickup) => {
			const { userId, userEmail, username } = pickup("body");

			await createAndSendRegisterUsecase.execute({
				userId,
				userEmail,
				username,
			});

			return new OkHttpResponse("notification.sent");
		},
		makeResponseContract(OkHttpResponse, "notification.sent"),
	);
