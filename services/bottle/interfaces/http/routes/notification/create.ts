import { IWantUserExistsById } from "@interfaces/http/checkers/user";
import { AnswerBanNotificationSchema } from "@interfaces/http/schemas/notification/answerBan";
import { AnswerWarningNotificationSchema } from "@interfaces/http/schemas/notification/answerWarning";
import { PostBanNotificationSchema } from "@interfaces/http/schemas/notification/postBan";
import { PostWarningNotificationRoute } from "@interfaces/http/schemas/notification/postWarning";
import { createUserAnswerBanNotificationUsecase, createUserAnswerWarningNotificationUsecase, createUserPostBanNotificationUsecase, createUserPostWarningNotificationUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/notification-post-warning-create")
	.extract({
		body: PostWarningNotificationRoute.create.entrypoint,
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

			return new CreatedHttpResponse("notification.postWarning.created");
		},
		makeResponseContract(CreatedHttpResponse, "notification.postWarning.created"),
	);

useBuilder()
	.createRoute("POST", "/notification-post-ban-create")
	.extract({
		body: PostBanNotificationSchema.create.entrypoint,
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

			return new CreatedHttpResponse("notification.postBan.created");
		},
		makeResponseContract(CreatedHttpResponse, "notification.postBan.created"),
	);

useBuilder()
	.createRoute("POST", "/notification-answer-warning-create")
	.extract({
		body: AnswerWarningNotificationSchema.create.entrypoint,
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
					answerId,
					reason,
				},
				user,
			} = pickup(["body", "user"]);

			await createUserAnswerWarningNotificationUsecase.execute({
				user,
				warningId,
				postId,
				answerId,
				reason,
			});

			return new CreatedHttpResponse("notification.answerWarning.created");
		},
		makeResponseContract(CreatedHttpResponse, "notification.answerWarning.created"),
	);

useBuilder()
	.createRoute("POST", "/notification-answer-ban-create")
	.extract({
		body: AnswerBanNotificationSchema.create.entrypoint,
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
					answerId,
					reason,
				},
				user,
			} = pickup(["body", "user"]);

			await createUserAnswerBanNotificationUsecase.execute({
				user,
				warningId,
				postId,
				answerId,
				reason,
			});

			return new CreatedHttpResponse("notification.answerBan.created");
		},
		makeResponseContract(CreatedHttpResponse, "notification.answerBan.created"),
	);
