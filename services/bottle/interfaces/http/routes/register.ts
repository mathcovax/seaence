import { userEmailObjecter, userIdObjecter, usernameObjecter } from "@business/domains/entities/user";
import { createAndSendInscriptionUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/send-registration-email")
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

			await createAndSendInscriptionUsecase.execute({
				userId,
				userEmail,
				username,
			});

			return new OkHttpResponse("notification.sent");
		},
		makeResponseContract(OkHttpResponse, "notification.sent"),
	);
