import { userObjecter } from "@business/domains/common/user";
import { createAndSendRegisterNotificationUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/create-register-notification")
	.extract({
		body: userObjecter.toZodSchema(),
	})
	.handler(
		async(pickup) => {
			const user = pickup("body");

			await createAndSendRegisterNotificationUsecase.execute({ user });

			return new OkHttpResponse("notification.sent");
		},
		makeResponseContract(OkHttpResponse, "notification.sent"),
	);
