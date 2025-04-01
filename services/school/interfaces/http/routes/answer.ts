import { userObjecter } from "@business/domains/common/user";
import { answerContentObjecter } from "@business/domains/entities/answer";
import { postIdObjecter } from "@business/domains/entities/post";
import { getAnswersFromPostUsecase, replyToPostUsecase } from "@interfaces/usecase";
import { iWantPostExistById } from "../checkers/post";
import { endpointAnswerSchema } from "../schemas/answer";
import { intObjecter } from "@business/domains/common/Int";
import { toSimpleObject } from "@vendors/clean";

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

			const repliedAnswer = await replyToPostUsecase
				.execute({
					post,
					content,
					author,
				})
				.then((answer) => answer.toSimpleObject());

			return new CreatedHttpResponse(
				"answer.created",
				repliedAnswer,
			);
		},
		makeResponseContract(CreatedHttpResponse, "answer.created", endpointAnswerSchema),
	);

useBuilder()
	.createRoute("GET", "/posts/{postId}/answers")
	.extract({
		params: {
			postId: postIdObjecter.toZodSchema(),
		},
		query: {
			page: intObjecter.toZodSchema(),
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
