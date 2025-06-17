import { answerContentObjecter } from "@business/domains/entities/answer";
import { postIdObjecter } from "@business/domains/entities/post";
import { findAnswersFromPostUsecase, replyToPostUsecase } from "@interfaces/usecase";
import { iWantPostExistById } from "../checkers/post";
import { endpointAnswerSchema } from "../schemas/answer";
import { intObjecter, toSimpleObject } from "@vendors/clean";
import { userIdObjecter, usernameObjecter } from "@business/domains/common/user";

useBuilder()
	.createRoute("POST", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
		body: zod.object({
			content: answerContentObjecter.toZodSchema(),
			authorId: userIdObjecter.toZodSchema(),
			authorName: usernameObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		async(pickup) => {
			const { post } = pickup(["post"]);
			const { content, authorId, authorName } = pickup("body");

			await replyToPostUsecase
				.execute({
					post,
					content,
					authorId,
					authorName,
				});

			return new CreatedHttpResponse(
				"answer.created",
			);
		},
		makeResponseContract(CreatedHttpResponse, "answer.created"),
	);

useBuilder()
	.createRoute("GET", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
		query: {
			page: zoderce.number().pipe(intObjecter.toZodSchema()),
			quantityPerPage: zoderce.number().pipe(intObjecter.toZodSchema()),
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		async(pickup) => {
			const { post, page, quantityPerPage } = pickup(["post", "page", "quantityPerPage"]);

			const answers = await findAnswersFromPostUsecase
				.execute({
					post,
					page,
					quantityPerPage,
				})
				.then((answer) => answer.map(toSimpleObject));

			return new OkHttpResponse(
				"answers.found",
				answers,
			);
		},
		makeResponseContract(OkHttpResponse, "answers.found", endpointAnswerSchema.array()),
	);
