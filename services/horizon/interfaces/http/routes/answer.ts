import { SchoolAPI } from "@interfaces/providers/school";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";
import { match } from "ts-pattern";
import { endpointAnswerSchema } from "../schemas/answer";
import { answerConfig } from "@interfaces/configs/answer";

useMustBeConnectedBuilder()
	.createRoute("POST", "/create-answer")
	.extract({
		body: {
			postId: zod.string(),
			content: zod.string()
				.max(answerConfig.create.maxLength)
				.min(answerConfig.create.minLength),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { postId, content, user } = pickup(["postId", "content", "user"]);

			const schoolResponse = await SchoolAPI.replyToPost({
				postId,
				content,
				author: {
					id: user.id,
					username: user.username,
				},
			});

			return match(schoolResponse)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "answer.created" },
					(_response) => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.handler(
		() => new CreatedHttpResponse(
			"answer.created",
		),
		makeResponseContract(CreatedHttpResponse, "answer.created"),
	);

useBuilder()
	.createRoute("POST", "/answer-list")
	.extract({
		body: {
			postId: zod.string(),
			page: zod.coerce.number(),
		},
	})
	.cut(
		async({ pickup, dropper }) => {
			const { postId, page } = pickup(["postId", "page"]);

			const schoolResponse = await SchoolAPI.findAnswers(
				postId,
				answerConfig.findAnswers.quantityPerPage,
				page,
			);

			return match(schoolResponse)
				.with(
					{ information: "post.notfound" },
					() => new NotFoundHttpResponse("post.notfound"),
				)
				.with(
					{ information: "answers.found" },
					(response) => dropper({ answers: response.body }),
				)
				.exhaustive();
		},
		["answers"],
		makeResponseContract(NotFoundHttpResponse, "post.notfound"),
	)
	.handler(
		(pickup) => {
			const answers = pickup("answers");

			return new OkHttpResponse(
				"answerList.found",
				answers,
			);
		},
		makeResponseContract(OkHttpResponse, "answerList.found", endpointAnswerSchema.array()),
	);
