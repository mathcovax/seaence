import { userObjecter } from "@business/domains/common/user";
import { answerContentObjecter } from "@business/domains/entities/answer";
import { postIdObjecter } from "@business/domains/entities/post";
import { getAnswersFromPostUsecase, replyToPostUsecase } from "@interfaces/usecase";
import { iWantPostExistById } from "../checkers/post";
import { endpointAnswerSchema } from "../schemas/answer";
import { intObjecter, toSimpleObject } from "@vendors/clean";

useBuilder()
	.createRoute("POST", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
		body: {
			content: answerContentObjecter.toZodSchema(),
			author: userObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		async(pickup) => {
			const { post, content, author } = pickup(["post", "content", "author"]);

			await replyToPostUsecase
				.execute({
					post,
					content,
					author,
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
		},
	})
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("postId"),
	)
	.handler(
		async(pickup) => {
			const { post, page } = pickup(["post", "page"]);

			const answers = await getAnswersFromPostUsecase
				.execute({
					post,
					page,
				})
				.then((answer) => answer.map(toSimpleObject));

			return new OkHttpResponse(
				"answers.found",
				answers,
			);
		},
		makeResponseContract(OkHttpResponse, "answers.found", endpointAnswerSchema.array()),
	);
