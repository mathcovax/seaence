import { answerContentObjecter, AnswerEntity, answerIdObjecter } from "@business/domains/entities/answer";
import { postIdObjecter } from "@business/domains/entities/post";
import { findAnswersFromPostUsecase, findOldestUnprocessedAnswerUsecase, getTotalCountOfUnprocessedAnswersUsecase, indicateAnswerIsCompliantUsecase, indicateAnswerIsNotCompliantAndCreateWarningUsecase, replyToPostUsecase } from "@interfaces/usecase";
import { iWantPostExistById } from "../checkers/post";
import { endpointAnswerSchema, endpointUnprocessedAnswerDetails } from "../schemas/answer";
import { intObjecter, toSimpleObject, UsecaseError } from "@vendors/clean";
import { userIdObjecter, usernameObjecter } from "@business/domains/common/user";
import { iWantAnswerExistById } from "../checkers/answer";
import { warningMakeUserBanObjecter, warningReasonObjecter } from "@business/domains/common/warning";
import { match, P } from "ts-pattern";

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

useBuilder()
	.createRoute("GET", "/find-oldest-unprocessed-answer")
	.cut(
		async({ dropper }) => {
			const result = await findOldestUnprocessedAnswerUsecase.execute();

			return match({ result })
				.with(
					{ result: null },
					() => new NotFoundHttpResponse("oldestUnprocessedAnswer.notfound"),
				)
				.with(
					{ result: P.instanceOf(AnswerEntity) },
					({ result: answer }) => dropper({ answer }),
				)
				.exhaustive();
		},
		["answer"],
		makeResponseContract(NotFoundHttpResponse, "oldestUnprocessedAnswer.notfound"),
	)
	.handler(
		(pickup) => {
			const answer = pickup("answer");

			return new OkHttpResponse(
				"oldestUnprocessedAnswer.found",
				answer.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "oldestUnprocessedAnswer.found", endpointAnswerSchema),
	);

useBuilder()
	.createRoute("GET", "/unprocessed-answer-details")
	.handler(
		async() => {
			const totalCount = await getTotalCountOfUnprocessedAnswersUsecase.execute();

			return new OkHttpResponse(
				"unprocessedAnswer.details",
				{ totalCount: totalCount.value },
			);
		},
		makeResponseContract(OkHttpResponse, "unprocessedAnswer.details", endpointUnprocessedAnswerDetails),
	);

useBuilder()
	.createRoute("PATCH", "/answers/{answerId}/is-compliant")
	.extract({
		params: {
			answerId: answerIdObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantAnswerExistById,
		(pickup) => pickup("answerId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const answer = pickup("answer");

			const updatedAnswer = await indicateAnswerIsCompliantUsecase.execute({
				answer,
			});

			if (updatedAnswer instanceof UsecaseError) {
				return new ForbiddenHttpResponse("answer.wrongStatus");
			}

			return dropper({ updatedAnswer });
		},
		["updatedAnswer"],
		makeResponseContract(ForbiddenHttpResponse, "answer.wrongStatus"),
	)
	.handler(
		(pickup) => {
			const answer = pickup("updatedAnswer");

			return new OkHttpResponse(
				"answer.updated",
				answer.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "answer.updated", endpointAnswerSchema),
	);

useBuilder()
	.createRoute("PATCH", "/answers/{answerId}/is-not-compliant-and-create-warning")
	.extract({
		params: {
			answerId: answerIdObjecter.toZodSchema(),
		},
		body: {
			makeUserBan: warningMakeUserBanObjecter.toZodSchema(),
			reason: warningReasonObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantAnswerExistById,
		(pickup) => pickup("answerId"),
	)
	.presetCheck(
		iWantPostExistById,
		(pickup) => pickup("answer").postId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const {
				answer,
				post,
				makeUserBan,
				reason,
			} = pickup(["answer", "post", "makeUserBan", "reason"]);

			const updatedAnswer = await indicateAnswerIsNotCompliantAndCreateWarningUsecase.execute({
				answer,
				post,
				reason,
				makeUserBan,
			});

			if (updatedAnswer instanceof UsecaseError) {
				return new ForbiddenHttpResponse("answer.wrongStatus");
			}

			return dropper({ updatedAnswer });
		},
		["updatedAnswer"],
		makeResponseContract(ForbiddenHttpResponse, "answer.wrongStatus"),
	)
	.handler(
		(pickup) => {
			const answer = pickup("updatedAnswer");

			return new OkHttpResponse(
				"answer.updated",
				answer.toSimpleObject(),
			);
		},
		makeResponseContract(OkHttpResponse, "answer.updated", endpointAnswerSchema),
	);
